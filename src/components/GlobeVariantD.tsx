"use client";

import { useRef, useEffect } from "react";

// Variant D: Hexagonal grid pattern with filled hex continents
export function GlobeVariantD() {
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

      // Very faint sphere
      const sphereGeo = new THREE.SphereGeometry(globeRadius - 0.2, 48, 48);
      const sphereMat = new THREE.MeshBasicMaterial({
        color: 0xf9fafb,
        transparent: true,
        opacity: 0.5,
      });
      scene.add(new THREE.Mesh(sphereGeo, sphereMat));

      // Hexagon helper function
      function createHexShape(size: number) {
        const shape = new THREE.Shape();
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i - Math.PI / 6;
          const x = size * Math.cos(angle);
          const y = size * Math.sin(angle);
          if (i === 0) shape.moveTo(x, y);
          else shape.lineTo(x, y);
        }
        shape.closePath();
        return shape;
      }

      // Load map and place hexagons
      const hexGroup = new THREE.Group();
      scene.add(hexGroup);

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

        const hexSize = 0.22;
        const spacing = 2.2; // Degrees between hex centers

        for (let lat = -85; lat < 85; lat += spacing) {
          const offset = (Math.floor((lat + 90) / spacing) % 2) * (spacing / 2);

          for (let lng = -180; lng < 180; lng += spacing) {
            const adjustedLng = lng + offset;

            const pixelX = Math.floor(((adjustedLng + 180) / 360) * img.width) % img.width;
            const pixelY = Math.floor(((90 - lat) / 180) * img.height);
            if (pixelY < 0 || pixelY >= img.height) continue;
            const pixelIndex = (pixelY * img.width + pixelX) * 4;

            const r = imageData.data[pixelIndex];
            const isLand = r < 80;

            const phi = (90 - lat) * (Math.PI / 180);
            const theta = (adjustedLng + 180) * (Math.PI / 180);

            const px = -(globeRadius * Math.sin(phi) * Math.cos(theta));
            const py = globeRadius * Math.cos(phi);
            const pz = globeRadius * Math.sin(phi) * Math.sin(theta);

            if (isLand) {
              // Filled hex for land
              const shape = createHexShape(hexSize);
              const hexGeo = new THREE.ShapeGeometry(shape);
              const hexMat = new THREE.MeshBasicMaterial({
                color: 0x10b981,
                transparent: true,
                opacity: 0.7,
                side: THREE.DoubleSide,
              });
              const hex = new THREE.Mesh(hexGeo, hexMat);
              hex.position.set(px, py, pz);
              hex.lookAt(0, 0, 0);
              hexGroup.add(hex);
            } else {
              // Outline-only hex for ocean (sparse)
              if (Math.random() < 0.15) {
                const edgesPoints: InstanceType<typeof THREE.Vector3>[] = [];
                for (let i = 0; i <= 6; i++) {
                  const angle = (Math.PI / 3) * (i % 6) - Math.PI / 6;
                  edgesPoints.push(new THREE.Vector3(
                    hexSize * 0.8 * Math.cos(angle),
                    hexSize * 0.8 * Math.sin(angle),
                    0
                  ));
                }
                const edgeGeo = new THREE.BufferGeometry().setFromPoints(edgesPoints);
                const edgeMat = new THREE.LineBasicMaterial({
                  color: 0xd1d5db,
                  transparent: true,
                  opacity: 0.2,
                });
                const edgeLine = new THREE.Line(edgeGeo, edgeMat);
                edgeLine.position.set(px, py, pz);
                edgeLine.lookAt(
                  px + (px / globeRadius),
                  py + (py / globeRadius),
                  pz + (pz / globeRadius)
                );
                hexGroup.add(edgeLine);
              }
            }
          }
        }
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

      for (const [i, j] of arcPairs) {
        const start = latLngToVec3(arcPoints[i].lat, arcPoints[i].lng, globeRadius);
        const end = latLngToVec3(arcPoints[j].lat, arcPoints[j].lng, globeRadius);
        const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5).normalize().multiplyScalar(globeRadius * 1.35);

        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        // Dashed-style arc
        const pts = curve.getPoints(80);
        for (let k = 0; k < pts.length - 1; k += 2) {
          const segGeo = new THREE.BufferGeometry().setFromPoints([pts[k], pts[k + 1]]);
          const segMat = new THREE.LineBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.5 });
          arcGroup.add(new THREE.Line(segGeo, segMat));
        }
      }

      // Markers — hex-shaped
      for (const point of arcPoints) {
        const pos = latLngToVec3(point.lat, point.lng, globeRadius + 0.3);
        const shape = createHexShape(0.5);
        const markerGeo = new THREE.ShapeGeometry(shape);
        const markerMat = new THREE.MeshBasicMaterial({
          color: 0x059669,
          transparent: true,
          opacity: 0.9,
          side: THREE.DoubleSide,
        });
        const marker = new THREE.Mesh(markerGeo, markerMat);
        marker.position.copy(pos);
        marker.lookAt(0, 0, 0);
        arcGroup.add(marker);
      }

      let animationId: number;

      function animate() {
        animationId = requestAnimationFrame(animate);
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
