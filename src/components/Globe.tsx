"use client";

import { useRef, useEffect } from "react";

export function Globe() {
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

      // Scene
      const scene = new THREE.Scene();

      // Camera
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.z = 80;

      // Renderer
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      // Controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.8;
      controls.enableDamping = true;
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.minPolarAngle = Math.PI / 2 - 0.5;
      controls.maxPolarAngle = Math.PI / 2 + 0.5;

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
      scene.add(ambientLight);

      const pointLight = new THREE.PointLight(0xffffff, 1.2, 200);
      pointLight.position.set(50, 50, 50);
      scene.add(pointLight);

      // Globe base sphere
      const globeRadius = 19.5;
      const globeGeometry = new THREE.SphereGeometry(globeRadius, 35, 35);
      const globeMaterial = new THREE.MeshPhongMaterial({
        color: 0x111827,
        transparent: true,
        opacity: 0.85,
        shininess: 5,
      });
      const globe = new THREE.Mesh(globeGeometry, globeMaterial);
      scene.add(globe);

      // Glow
      const glowGeometry = new THREE.SphereGeometry(globeRadius * 1.15, 35, 35);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x10b981,
        transparent: true,
        opacity: 0.04,
        side: THREE.BackSide,
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      scene.add(glow);

      // Dot group
      const dotGroup = new THREE.Group();
      scene.add(dotGroup);

      // Shader for twinkling dots
      const vertexShader = `
        uniform float u_time;
        uniform float u_maxExtrusion;
        varying float vIntensity;

        void main() {
          vIntensity = sin(u_time) * 0.5 + 0.5;
          vec3 newPosition = position;
          if (u_maxExtrusion > 1.0) {
            newPosition = position * u_maxExtrusion;
          }
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `;

      const fragmentShader = `
        varying float vIntensity;
        void main() {
          vec3 colorA = vec3(0.204, 0.78, 0.506);
          vec3 colorB = vec3(0.067, 0.09, 0.15);
          vec3 color = mix(colorB, colorA, vIntensity);
          gl_FragColor = vec4(color, 1.0);
        }
      `;

      // Load world map and place dots
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = "/img/world_alpha_mini.jpg";

      const materials: InstanceType<typeof THREE.ShaderMaterial>[] = [];

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);

        const dotDensity = 2.5;
        const dotSize = 0.1;
        let twinkleOffset = 0;

        for (let lat = -90; lat < 90; lat += 180 / (img.height * dotDensity / 100)) {
          const radius = Math.cos((Math.abs(lat) * Math.PI) / 180) * globeRadius;
          const circumference = radius * Math.PI * 2;
          const dotsForLat = circumference * dotDensity / 10;

          for (let x = 0; x < dotsForLat; x++) {
            const lng = -180 + (x * 360) / dotsForLat;

            // Map lat/lng to image pixel
            const pixelX = Math.floor(((lng + 180) / 360) * img.width);
            const pixelY = Math.floor(((90 - lat) / 180) * img.height);
            const pixelIndex = (pixelY * img.width + pixelX) * 4;

            const r = imageData.data[pixelIndex];
            const g = imageData.data[pixelIndex + 1];
            const b = imageData.data[pixelIndex + 2];

            // Dark pixels = land
            if (r < 80 && g < 80 && b < 80) {
              const phi = (90 - lat) * (Math.PI / 180);
              const theta = (lng + 180) * (Math.PI / 180);

              const px = -(globeRadius * Math.sin(phi) * Math.cos(theta));
              const py = globeRadius * Math.cos(phi);
              const pz = globeRadius * Math.sin(phi) * Math.sin(theta);

              const dotGeometry = new THREE.CircleGeometry(dotSize, 5);
              const material = new THREE.ShaderMaterial({
                uniforms: {
                  u_time: { value: twinkleOffset },
                  u_maxExtrusion: { value: 1.0 },
                },
                vertexShader,
                fragmentShader,
                side: THREE.DoubleSide,
              });
              materials.push(material);

              const dot = new THREE.Mesh(dotGeometry, material);
              dot.position.set(px, py, pz);
              dot.lookAt(0, 0, 0);

              dotGroup.add(dot);
              twinkleOffset += 0.03;
            }
          }
        }
      };

      // Arc points — major monitoring locations across 6 continents
      const arcPoints = [
        { lat: 40.7, lng: -74.0 },   // New York (North America)
        { lat: 51.5, lng: -0.1 },     // London (Europe)
        { lat: 35.7, lng: 139.7 },    // Tokyo (Asia)
        { lat: -33.9, lng: 151.2 },   // Sydney (Oceania)
        { lat: -23.5, lng: -46.6 },   // Sao Paulo (South America)
        { lat: -1.3, lng: 36.8 },     // Nairobi (Africa)
      ];

      // Create arc connections
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

      // Draw arcs between pairs
      const arcPairs = [
        [0, 1], [1, 2], [2, 3], [3, 5], [5, 1], [0, 4], [4, 5],
      ];

      for (const [i, j] of arcPairs) {
        const start = latLngToVec3(arcPoints[i].lat, arcPoints[i].lng, globeRadius);
        const end = latLngToVec3(arcPoints[j].lat, arcPoints[j].lng, globeRadius);

        const mid = new THREE.Vector3()
          .addVectors(start, end)
          .multiplyScalar(0.5)
          .normalize()
          .multiplyScalar(globeRadius * 1.4);

        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        const points = curve.getPoints(50);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
          color: 0x10b981,
          transparent: true,
          opacity: 0.3,
        });
        const line = new THREE.Line(geometry, material);
        arcGroup.add(line);
      }

      // Glow markers at each arc point
      for (const point of arcPoints) {
        const pos = latLngToVec3(point.lat, point.lng, globeRadius + 0.3);
        const markerGeometry = new THREE.CircleGeometry(0.4, 16);
        const markerMaterial = new THREE.MeshBasicMaterial({
          color: 0x10b981,
          transparent: true,
          opacity: 0.8,
          side: THREE.DoubleSide,
        });
        const marker = new THREE.Mesh(markerGeometry, markerMaterial);
        marker.position.copy(pos);
        marker.lookAt(0, 0, 0);
        arcGroup.add(marker);
      }

      // Animation loop
      let animationId: number;
      const clock = new THREE.Clock();

      function animate() {
        animationId = requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();

        for (const mat of materials) {
          mat.uniforms.u_time.value += 0.03;
        }

        // Pulse arc markers
        arcGroup.children.forEach((child) => {
          if (child instanceof THREE.Mesh) {
            const scale = 1 + Math.sin(elapsed * 2) * 0.2;
            child.scale.set(scale, scale, scale);
          }
        });

        controls.update();
        renderer.render(scene, camera);
      }

      animate();

      // Resize handler
      function onResize() {
        if (!containerRef.current) return;
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }

      window.addEventListener("resize", onResize);

      // Cleanup
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

    return () => {
      cancelled = true;
      cleanupRef.current?.();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{ minHeight: "300px" }}
    />
  );
}
