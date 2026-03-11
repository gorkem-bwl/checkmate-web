"use client";

import { useRef, useEffect } from "react";

// Variant E: Particle cloud globe — thousands of tiny floating particles forming continents
export function GlobeVariantE() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let cancelled = false;

    async function init() {
      const THREE = await import("three");
      const { OrbitControls } = await import(
        "three/examples/jsm/controls/OrbitControls.js"
      );

      if (cancelled || !containerRef.current) return;

      const container = containerRef.current;
      const width = container.clientWidth;
      const height = container.clientHeight;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.z = 80;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.35;
      controls.enableDamping = true;
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.enableRotate = false;

      const globeRadius = 22;

      // Atmosphere ring
      const atmosGeo = new THREE.SphereGeometry(globeRadius * 1.03, 48, 48);
      const atmosMat = new THREE.MeshBasicMaterial({
        color: 0x6ee7b7,
        transparent: true,
        opacity: 0.04,
        side: THREE.BackSide,
      });
      scene.add(new THREE.Mesh(atmosGeo, atmosMat));

      // Load world map for particle placement
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = "/img/world_alpha_mini.jpg";

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);

        // Collect land points
        const landPositions: number[] = [];
        const oceanPositions: number[] = [];
        const dotDensity = 4;

        for (let lat = -90; lat < 90; lat += 180 / (img.height * dotDensity / 100)) {
          const radius = Math.cos((Math.abs(lat) * Math.PI) / 180) * globeRadius;
          const circumference = radius * Math.PI * 2;
          const dotsForLat = circumference * dotDensity / 10;

          for (let x = 0; x < dotsForLat; x++) {
            const lng = -180 + (x * 360) / dotsForLat;

            const pixelX = Math.floor(((lng + 180) / 360) * img.width);
            const pixelY = Math.floor(((90 - lat) / 180) * img.height);
            const pixelIndex = (pixelY * img.width + pixelX) * 4;

            const phi = (90 - lat) * (Math.PI / 180);
            const theta = (lng + 180) * (Math.PI / 180);

            const px = -(globeRadius * Math.sin(phi) * Math.cos(theta));
            const py = globeRadius * Math.cos(phi);
            const pz = globeRadius * Math.sin(phi) * Math.sin(theta);

            if (imageData.data[pixelIndex] < 80) {
              landPositions.push(px, py, pz);
            } else if (Math.random() < 0.04) {
              oceanPositions.push(px, py, pz);
            }
          }
        }

        // Land particles — using Points for performance
        const landGeo = new THREE.BufferGeometry();
        landGeo.setAttribute("position", new THREE.Float32BufferAttribute(landPositions, 3));

        const landMat = new THREE.PointsMaterial({
          color: 0x10b981,
          size: 0.35,
          transparent: true,
          opacity: 0.85,
          sizeAttenuation: true,
        });

        scene.add(new THREE.Points(landGeo, landMat));

        // Ocean particles — very sparse, very faint
        const oceanGeo = new THREE.BufferGeometry();
        oceanGeo.setAttribute("position", new THREE.Float32BufferAttribute(oceanPositions, 3));

        const oceanMat = new THREE.PointsMaterial({
          color: 0x9ca3af,
          size: 0.15,
          transparent: true,
          opacity: 0.2,
          sizeAttenuation: true,
        });

        scene.add(new THREE.Points(oceanGeo, oceanMat));
      };

      // Connection arcs
      const arcPoints = [
        { lat: 40.7, lng: -74.0 },
        { lat: 51.5, lng: -0.1 },
        { lat: 35.7, lng: 139.7 },
        { lat: -33.9, lng: 151.2 },
        { lat: -23.5, lng: -46.6 },
        { lat: -1.3, lng: 36.8 },
      ];

      const arcGroup = new THREE.Group();
      scene.add(arcGroup);

      function latLngToVec3(lat: number, lng: number, r: number) {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lng + 180) * (Math.PI / 180);
        return new THREE.Vector3(
          -(r * Math.sin(phi) * Math.cos(theta)),
          r * Math.cos(phi),
          r * Math.sin(phi) * Math.sin(theta)
        );
      }

      const arcPairs = [[0, 1], [1, 2], [2, 3], [3, 5], [5, 1], [0, 4], [4, 5]];
      const arcCurves: InstanceType<typeof THREE.QuadraticBezierCurve3>[] = [];

      for (const [i, j] of arcPairs) {
        const start = latLngToVec3(arcPoints[i].lat, arcPoints[i].lng, globeRadius);
        const end = latLngToVec3(arcPoints[j].lat, arcPoints[j].lng, globeRadius);
        const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5).normalize().multiplyScalar(globeRadius * 1.4);

        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        arcCurves.push(curve);
        const points = curve.getPoints(50);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.45 });
        arcGroup.add(new THREE.Line(geometry, material));
      }

      // Animated data packets traveling along arcs
      const packets: { mesh: InstanceType<typeof THREE.Mesh>; curve: InstanceType<typeof THREE.QuadraticBezierCurve3>; t: number; speed: number }[] = [];
      for (const curve of arcCurves) {
        for (let p = 0; p < 2; p++) {
          const pGeo = new THREE.SphereGeometry(0.2, 6, 6);
          const pMat = new THREE.MeshBasicMaterial({ color: 0x6ee7b7, transparent: true, opacity: 0.9 });
          const mesh = new THREE.Mesh(pGeo, pMat);
          scene.add(mesh);
          packets.push({ mesh, curve, t: p * 0.5, speed: 0.003 + Math.random() * 0.002 });
        }
      }

      // City markers — diamond shape
      const markerMeshes: InstanceType<typeof THREE.Mesh>[] = [];
      for (const point of arcPoints) {
        const pos = latLngToVec3(point.lat, point.lng, globeRadius + 0.4);

        // Diamond marker
        const diaShape = new THREE.Shape();
        const s = 0.4;
        diaShape.moveTo(0, s);
        diaShape.lineTo(s * 0.6, 0);
        diaShape.lineTo(0, -s);
        diaShape.lineTo(-s * 0.6, 0);
        diaShape.closePath();

        const diaGeo = new THREE.ShapeGeometry(diaShape);
        const diaMat = new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.9, side: THREE.DoubleSide });
        const dia = new THREE.Mesh(diaGeo, diaMat);
        dia.position.copy(pos);
        dia.lookAt(0, 0, 0);
        markerMeshes.push(dia);
        arcGroup.add(dia);
      }

      let animationId: number;
      const clock = new THREE.Clock();

      function animate() {
        animationId = requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();

        for (const p of packets) {
          p.t = (p.t + p.speed) % 1;
          const pos = p.curve.getPoint(p.t);
          p.mesh.position.copy(pos);
          (p.mesh.material as InstanceType<typeof THREE.MeshBasicMaterial>).opacity = Math.sin(p.t * Math.PI) * 0.9;
        }

        for (const marker of markerMeshes) {
          const scale = 1 + Math.sin(elapsed * 2.5) * 0.2;
          marker.scale.set(scale, scale, scale);
        }

        controls.update();
        renderer.render(scene, camera);
      }

      animate();

      function onResize() {
        if (!containerRef.current) return;
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }

      window.addEventListener("resize", onResize);

      cleanupRef.current = () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener("resize", onResize);
        controls.dispose();
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    }

    init();
    return () => { cancelled = true; cleanupRef.current?.(); };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full" />;
}
