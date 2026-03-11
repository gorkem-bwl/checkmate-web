"use client";

import { useRef, useEffect } from "react";

// Variant C: Dark glass sphere with bright neon dots and animated data streams
export function GlobeVariantC() {
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
      controls.autoRotateSpeed = 0.5;
      controls.enableDamping = true;
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.enableRotate = false;

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      const globeRadius = 22;

      // Dark translucent sphere
      const sphereGeo = new THREE.SphereGeometry(globeRadius, 48, 48);
      const sphereMat = new THREE.MeshPhongMaterial({
        color: 0x1f2937,
        transparent: true,
        opacity: 0.7,
        shininess: 30,
      });
      scene.add(new THREE.Mesh(sphereGeo, sphereMat));

      // Outer glow
      const glowGeo = new THREE.SphereGeometry(globeRadius * 1.08, 48, 48);
      const glowMat = new THREE.MeshBasicMaterial({
        color: 0x10b981,
        transparent: true,
        opacity: 0.05,
        side: THREE.BackSide,
      });
      scene.add(new THREE.Mesh(glowGeo, glowMat));

      const pointLight = new THREE.PointLight(0x10b981, 0.5, 200);
      pointLight.position.set(40, 40, 40);
      scene.add(pointLight);

      // Continent dots — bright emerald on dark background
      const dotGroup = new THREE.Group();
      scene.add(dotGroup);

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = "/img/world_alpha_mini.jpg";

      const materials: InstanceType<typeof THREE.ShaderMaterial>[] = [];

      const vertexShader = `
        uniform float u_time;
        void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `;

      const fragmentShader = `
        uniform float u_time;
        void main() {
          float pulse = sin(u_time * 2.0) * 0.3 + 0.7;
          vec3 color = vec3(0.06, 0.72, 0.51) * pulse;
          gl_FragColor = vec4(color, 0.95);
        }
      `;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);

        const dotDensity = 3;
        let twinkleOffset = 0;

        for (let lat = -90; lat < 90; lat += 180 / (img.height * dotDensity / 100)) {
          const radius = Math.cos((Math.abs(lat) * Math.PI) / 180) * globeRadius;
          const circumference = radius * Math.PI * 2;
          const dotsForLat = circumference * dotDensity / 10;

          for (let x = 0; x < dotsForLat; x++) {
            const lng = -180 + (x * 360) / dotsForLat;

            const pixelX = Math.floor(((lng + 180) / 360) * img.width);
            const pixelY = Math.floor(((90 - lat) / 180) * img.height);
            const pixelIndex = (pixelY * img.width + pixelX) * 4;

            if (imageData.data[pixelIndex] < 80) {
              const phi = (90 - lat) * (Math.PI / 180);
              const theta = (lng + 180) * (Math.PI / 180);

              const px = -(globeRadius * Math.sin(phi) * Math.cos(theta));
              const py = globeRadius * Math.cos(phi);
              const pz = globeRadius * Math.sin(phi) * Math.sin(theta);

              const dotGeo = new THREE.CircleGeometry(0.12, 5);
              const material = new THREE.ShaderMaterial({
                uniforms: { u_time: { value: twinkleOffset } },
                vertexShader,
                fragmentShader,
                transparent: true,
                side: THREE.DoubleSide,
              });
              materials.push(material);

              const dot = new THREE.Mesh(dotGeo, material);
              dot.position.set(px, py, pz);
              dot.lookAt(0, 0, 0);
              dotGroup.add(dot);
              twinkleOffset += 0.05;
            }
          }
        }
      };

      // Arcs with data stream particles
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

        // Gradient-style arc using segments
        const pts = curve.getPoints(50);
        for (let k = 0; k < pts.length - 1; k++) {
          const segGeo = new THREE.BufferGeometry().setFromPoints([pts[k], pts[k + 1]]);
          const t = k / pts.length;
          const opacity = Math.sin(t * Math.PI) * 0.6;
          const segMat = new THREE.LineBasicMaterial({ color: 0x34d399, transparent: true, opacity });
          arcGroup.add(new THREE.Line(segGeo, segMat));
        }
      }

      // Multiple traveling particles per arc
      const particles: { mesh: InstanceType<typeof THREE.Mesh>; curve: InstanceType<typeof THREE.QuadraticBezierCurve3>; t: number; speed: number }[] = [];
      for (const curve of arcCurves) {
        for (let p = 0; p < 3; p++) {
          const pGeo = new THREE.SphereGeometry(0.18, 6, 6);
          const pMat = new THREE.MeshBasicMaterial({ color: 0x6ee7b7, transparent: true, opacity: 0.9 });
          const mesh = new THREE.Mesh(pGeo, pMat);
          scene.add(mesh);
          particles.push({ mesh, curve, t: p * 0.33, speed: 0.004 });
        }
      }

      // City markers with glow rings
      for (const point of arcPoints) {
        const pos = latLngToVec3(point.lat, point.lng, globeRadius + 0.3);

        const dotGeo = new THREE.CircleGeometry(0.35, 16);
        const dotMat = new THREE.MeshBasicMaterial({ color: 0x34d399, side: THREE.DoubleSide });
        const dot = new THREE.Mesh(dotGeo, dotMat);
        dot.position.copy(pos);
        dot.lookAt(0, 0, 0);
        arcGroup.add(dot);

        // Glow ring
        const ringGeo = new THREE.RingGeometry(0.6, 0.8, 16);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.4, side: THREE.DoubleSide });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.copy(pos);
        ring.lookAt(0, 0, 0);
        arcGroup.add(ring);
      }

      let animationId: number;

      function animate() {
        animationId = requestAnimationFrame(animate);

        for (const mat of materials) {
          mat.uniforms.u_time.value += 0.03;
        }

        for (const p of particles) {
          p.t = (p.t + p.speed) % 1;
          const pos = p.curve.getPoint(p.t);
          p.mesh.position.copy(pos);
          (p.mesh.material as InstanceType<typeof THREE.MeshBasicMaterial>).opacity = Math.sin(p.t * Math.PI) * 0.9;
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
