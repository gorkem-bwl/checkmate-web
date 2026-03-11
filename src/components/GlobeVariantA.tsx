"use client";

import { useRef, useEffect } from "react";

// Variant A: Dense dotted continents with graticule grid lines
export function GlobeVariantA() {
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
      controls.autoRotateSpeed = 0.4;
      controls.enableDamping = true;
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.enableRotate = false;

      const globeRadius = 22;

      // Transparent wireframe sphere for structure
      const wireGeo = new THREE.SphereGeometry(globeRadius, 24, 24);
      const wireMat = new THREE.MeshBasicMaterial({
        color: 0xd1d5db,
        wireframe: true,
        transparent: true,
        opacity: 0.15,
      });
      scene.add(new THREE.Mesh(wireGeo, wireMat));

      // Graticule lines (latitude/longitude grid)
      const graticuleGroup = new THREE.Group();
      scene.add(graticuleGroup);

      // Latitude lines every 30 degrees
      for (let lat = -60; lat <= 60; lat += 30) {
        const phi = (90 - lat) * (Math.PI / 180);
        const r = globeRadius * Math.sin(phi);
        const y = globeRadius * Math.cos(phi);
        const curve = new THREE.EllipseCurve(0, 0, r, r, 0, 2 * Math.PI, false, 0);
        const pts = curve.getPoints(64);
        const pts3d = pts.map((p) => new THREE.Vector3(p.x, y, p.y));
        const geo = new THREE.BufferGeometry().setFromPoints(pts3d);
        const mat = new THREE.LineBasicMaterial({ color: 0xd1d5db, transparent: true, opacity: 0.2 });
        graticuleGroup.add(new THREE.Line(geo, mat));
      }

      // Longitude lines every 30 degrees
      for (let lng = 0; lng < 360; lng += 30) {
        const theta = lng * (Math.PI / 180);
        const points: InstanceType<typeof THREE.Vector3>[] = [];
        for (let i = 0; i <= 64; i++) {
          const phi = (i / 64) * Math.PI;
          points.push(new THREE.Vector3(
            globeRadius * Math.sin(phi) * Math.cos(theta),
            globeRadius * Math.cos(phi),
            globeRadius * Math.sin(phi) * Math.sin(theta)
          ));
        }
        const geo = new THREE.BufferGeometry().setFromPoints(points);
        const mat = new THREE.LineBasicMaterial({ color: 0xd1d5db, transparent: true, opacity: 0.2 });
        graticuleGroup.add(new THREE.Line(geo, mat));
      }

      // Dense continent dots
      const dotGroup = new THREE.Group();
      scene.add(dotGroup);

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

        const dotDensity = 3.5; // Higher density for more detail

        for (let lat = -90; lat < 90; lat += 180 / (img.height * dotDensity / 100)) {
          const radius = Math.cos((Math.abs(lat) * Math.PI) / 180) * globeRadius;
          const circumference = radius * Math.PI * 2;
          const dotsForLat = circumference * dotDensity / 10;

          for (let x = 0; x < dotsForLat; x++) {
            const lng = -180 + (x * 360) / dotsForLat;

            const pixelX = Math.floor(((lng + 180) / 360) * img.width);
            const pixelY = Math.floor(((90 - lat) / 180) * img.height);
            const pixelIndex = (pixelY * img.width + pixelX) * 4;

            const r = imageData.data[pixelIndex];

            if (r < 80) {
              const phi = (90 - lat) * (Math.PI / 180);
              const theta = (lng + 180) * (Math.PI / 180);

              const px = -(globeRadius * Math.sin(phi) * Math.cos(theta));
              const py = globeRadius * Math.cos(phi);
              const pz = globeRadius * Math.sin(phi) * Math.sin(theta);

              const dotGeo = new THREE.CircleGeometry(0.12, 6);
              const dotMat = new THREE.MeshBasicMaterial({
                color: 0x10b981,
                transparent: true,
                opacity: 0.8,
                side: THREE.DoubleSide,
              });

              const dot = new THREE.Mesh(dotGeo, dotMat);
              dot.position.set(px, py, pz);
              dot.lookAt(0, 0, 0);
              dotGroup.add(dot);
            }
          }
        }
      };

      // Arc connections with animated pulse dots
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
        const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5).normalize().multiplyScalar(globeRadius * 1.35);

        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        arcCurves.push(curve);
        const points = curve.getPoints(50);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.35 });
        arcGroup.add(new THREE.Line(geometry, material));
      }

      // Pulsing markers at cities
      const markers: InstanceType<typeof THREE.Mesh>[] = [];
      for (const point of arcPoints) {
        const pos = latLngToVec3(point.lat, point.lng, globeRadius + 0.3);
        const markerGeo = new THREE.CircleGeometry(0.4, 16);
        const markerMat = new THREE.MeshBasicMaterial({
          color: 0x10b981,
          transparent: true,
          opacity: 0.8,
          side: THREE.DoubleSide,
        });
        const marker = new THREE.Mesh(markerGeo, markerMat);
        marker.position.copy(pos);
        marker.lookAt(0, 0, 0);
        markers.push(marker);
        arcGroup.add(marker);

        // Outer ring pulse
        const ringGeo = new THREE.RingGeometry(0.5, 0.7, 16);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0x10b981,
          transparent: true,
          opacity: 0.3,
          side: THREE.DoubleSide,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.copy(pos);
        ring.lookAt(0, 0, 0);
        arcGroup.add(ring);
      }

      // Traveling dots along arcs
      const travelDots: { mesh: InstanceType<typeof THREE.Mesh>; curve: InstanceType<typeof THREE.QuadraticBezierCurve3>; t: number; speed: number }[] = [];
      for (const curve of arcCurves) {
        const dotGeo = new THREE.SphereGeometry(0.25, 8, 8);
        const dotMat = new THREE.MeshBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.9 });
        const dot = new THREE.Mesh(dotGeo, dotMat);
        scene.add(dot);
        travelDots.push({ mesh: dot, curve, t: Math.random(), speed: 0.003 + Math.random() * 0.002 });
      }

      let animationId: number;
      const clock = new THREE.Clock();

      function animate() {
        animationId = requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();

        // Animate traveling dots
        for (const td of travelDots) {
          td.t = (td.t + td.speed) % 1;
          const pos = td.curve.getPoint(td.t);
          td.mesh.position.copy(pos);
        }

        // Pulse markers
        for (const marker of markers) {
          const scale = 1 + Math.sin(elapsed * 2) * 0.3;
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
