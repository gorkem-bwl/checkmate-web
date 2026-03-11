"use client";

import { useRef, useEffect } from "react";

// Variant B: Minimalist outline continents with glowing connection lines
export function GlobeVariantB() {
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
      controls.autoRotateSpeed = 0.3;
      controls.enableDamping = true;
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.enableRotate = false;

      const globeRadius = 22;

      // Very subtle solid sphere
      const sphereGeo = new THREE.SphereGeometry(globeRadius - 0.1, 48, 48);
      const sphereMat = new THREE.MeshBasicMaterial({
        color: 0xf0fdf4,
        transparent: true,
        opacity: 0.4,
      });
      scene.add(new THREE.Mesh(sphereGeo, sphereMat));

      // Outline ring at equator
      const eqGeo = new THREE.RingGeometry(globeRadius * 1.005, globeRadius * 1.015, 128);
      const eqMat = new THREE.MeshBasicMaterial({
        color: 0x6ee7b7,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide,
      });
      const eqRing = new THREE.Mesh(eqGeo, eqMat);
      eqRing.rotation.x = Math.PI / 2;
      scene.add(eqRing);

      // Load map and create continent OUTLINES using edge detection
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
        const data = imageData.data;
        const w = img.width;
        const h = img.height;

        // Edge detection: find pixels where land meets ocean
        function isLand(px: number, py: number) {
          if (px < 0 || px >= w || py < 0 || py >= h) return false;
          const idx = (py * w + px) * 4;
          return data[idx] < 80;
        }

        const dotDensity = 3;

        for (let lat = -90; lat < 90; lat += 180 / (h * dotDensity / 100)) {
          const radius = Math.cos((Math.abs(lat) * Math.PI) / 180) * globeRadius;
          const circumference = radius * Math.PI * 2;
          const dotsForLat = circumference * dotDensity / 10;

          for (let x = 0; x < dotsForLat; x++) {
            const lng = -180 + (x * 360) / dotsForLat;

            const pixelX = Math.floor(((lng + 180) / 360) * w);
            const pixelY = Math.floor(((90 - lat) / 180) * h);

            const current = isLand(pixelX, pixelY);
            // Check neighbors for edge
            const neighbors = [
              isLand(pixelX - 1, pixelY),
              isLand(pixelX + 1, pixelY),
              isLand(pixelX, pixelY - 1),
              isLand(pixelX, pixelY + 1),
            ];

            const isEdge = current && neighbors.some((n) => !n);
            const isInterior = current && !isEdge;

            if (isEdge || isInterior) {
              const phi = (90 - lat) * (Math.PI / 180);
              const theta = (lng + 180) * (Math.PI / 180);

              const px = -(globeRadius * Math.sin(phi) * Math.cos(theta));
              const py = globeRadius * Math.cos(phi);
              const pz = globeRadius * Math.sin(phi) * Math.sin(theta);

              const dotGeo = new THREE.CircleGeometry(isEdge ? 0.14 : 0.08, 5);
              const dotMat = new THREE.MeshBasicMaterial({
                color: isEdge ? 0x059669 : 0x6ee7b7,
                transparent: true,
                opacity: isEdge ? 0.9 : 0.3,
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

      // Connection arcs with glow effect
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

      for (const [i, j] of arcPairs) {
        const start = latLngToVec3(arcPoints[i].lat, arcPoints[i].lng, globeRadius);
        const end = latLngToVec3(arcPoints[j].lat, arcPoints[j].lng, globeRadius);
        const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5).normalize().multiplyScalar(globeRadius * 1.4);

        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        const points = curve.getPoints(50);

        // Thick glow line
        const geo1 = new THREE.BufferGeometry().setFromPoints(points);
        const mat1 = new THREE.LineBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.15 });
        arcGroup.add(new THREE.Line(geo1, mat1));

        // Core line
        const geo2 = new THREE.BufferGeometry().setFromPoints(points);
        const mat2 = new THREE.LineBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.5 });
        arcGroup.add(new THREE.Line(geo2, mat2));
      }

      // City markers — double ring style
      for (const point of arcPoints) {
        const pos = latLngToVec3(point.lat, point.lng, globeRadius + 0.3);

        // Inner dot
        const innerGeo = new THREE.CircleGeometry(0.3, 16);
        const innerMat = new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.9, side: THREE.DoubleSide });
        const inner = new THREE.Mesh(innerGeo, innerMat);
        inner.position.copy(pos);
        inner.lookAt(0, 0, 0);
        arcGroup.add(inner);

        // Outer ring
        const outerGeo = new THREE.RingGeometry(0.55, 0.7, 16);
        const outerMat = new THREE.MeshBasicMaterial({ color: 0x6ee7b7, transparent: true, opacity: 0.5, side: THREE.DoubleSide });
        const outer = new THREE.Mesh(outerGeo, outerMat);
        outer.position.copy(pos);
        outer.lookAt(0, 0, 0);
        arcGroup.add(outer);
      }

      let animationId: number;
      const clock = new THREE.Clock();

      function animate() {
        animationId = requestAnimationFrame(animate);
        clock.getElapsedTime();
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
