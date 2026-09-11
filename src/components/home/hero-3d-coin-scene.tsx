"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Hero3DCoinSceneProps {
  logoUrl?: string | null;
}

export function Hero3DCoinScene({ logoUrl }: Hero3DCoinSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ═══ 1. SCENE & RENDERER SETUP ═══
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020617, 0.015); // Deep slate-950 fog for depth

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 2, 28);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // ═══ 2. LIGHTING (Cinematic Sci-Fi Studio) ═══
    const ambientLight = new THREE.AmbientLight(0x0f172a, 2.5);
    scene.add(ambientLight);

    // Key Light (Warm Gold Specular)
    const keyLight = new THREE.DirectionalLight(0xfff3b0, 4.0);
    keyLight.position.set(15, 20, 15);
    scene.add(keyLight);

    // Fill Light (Cyber Cyan)
    const cyanLight = new THREE.PointLight(0x38bdf8, 5.0, 50);
    cyanLight.position.set(-15, 8, 8);
    scene.add(cyanLight);

    // Accent Light (Royal Blue)
    const blueLight = new THREE.PointLight(0x6366f1, 6.0, 60);
    blueLight.position.set(12, -8, -5);
    scene.add(blueLight);

    // Gold Rim Light
    const goldRimLight = new THREE.PointLight(0xf59e0b, 5.0, 40);
    goldRimLight.position.set(0, 15, -12);
    scene.add(goldRimLight);

    // ═══ 3. DYNAMIC 3D SPLINE TRACK (AICM Style Loop) ═══
    // A sweeping 3D infinity roller curve through 3D space
    const trackPoints = [
      new THREE.Vector3(-18, 5, -12),
      new THREE.Vector3(-10, -3, -4),
      new THREE.Vector3(-2, 4, 6),
      new THREE.Vector3(8, -1, 8),
      new THREE.Vector3(16, 5, 2),
      new THREE.Vector3(12, -4, -10),
      new THREE.Vector3(0, 3, -16),
      new THREE.Vector3(-12, -1, -14),
    ];

    const splineCurve = new THREE.CatmullRomCurve3(trackPoints, true, "catmullrom", 0.35);

    // Center Glowing Maglev Beam
    const tubeGeometry = new THREE.TubeGeometry(splineCurve, 240, 0.12, 16, true);
    const tubeMaterial = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 1.8,
      roughness: 0.2,
      metalness: 0.9,
    });
    const mainTube = new THREE.Mesh(tubeGeometry, tubeMaterial);
    scene.add(mainTube);

    // Outer Dual Guide Rails (Offset Curves)
    const createOffsetRail = (offsetDistance: number, colorHex: number) => {
      const sampleCount = 200;
      const offsetPoints: THREE.Vector3[] = [];
      for (let i = 0; i <= sampleCount; i++) {
        const u = i / sampleCount;
        const pt = splineCurve.getPointAt(u);
        const tangent = splineCurve.getTangentAt(u);
        const up = new THREE.Vector3(0, 1, 0);
        const normal = new THREE.Vector3().crossVectors(tangent, up).normalize();
        offsetPoints.push(pt.clone().add(normal.multiplyScalar(offsetDistance)));
      }
      const railCurve = new THREE.CatmullRomCurve3(offsetPoints, true);
      const railGeo = new THREE.TubeGeometry(railCurve, 200, 0.04, 8, true);
      const railMat = new THREE.MeshStandardMaterial({
        color: colorHex,
        emissive: colorHex,
        emissiveIntensity: 1.2,
        roughness: 0.3,
        metalness: 0.8,
      });
      return new THREE.Mesh(railGeo, railMat);
    };

    const railLeft = createOffsetRail(1.2, 0x60a5fa);
    const railRight = createOffsetRail(-1.2, 0xa855f7);
    scene.add(railLeft);
    scene.add(railRight);

    // Connecting Energy Rings along the track
    const ringCount = 36;
    const ringGeometry = new THREE.TorusGeometry(1.3, 0.03, 8, 24);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 1.5,
      metalness: 0.9,
      roughness: 0.3,
    });

    const trackRings: THREE.Mesh[] = [];
    for (let i = 0; i < ringCount; i++) {
      const u = i / ringCount;
      const pt = splineCurve.getPointAt(u);
      const tangent = splineCurve.getTangentAt(u);
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.position.copy(pt);
      ring.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), tangent);
      scene.add(ring);
      trackRings.push(ring);
    }

    // ═══ 4. GENERATE HIGH-RES SCHOOL LOGO COIN TEXTURE ═══
    const createCoinFaceTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext("2d");
      if (!ctx) return new THREE.CanvasTexture(canvas);

      const cx = 512;
      const cy = 512;
      const r = 480;

      // Outer Metallic Gold Gradient Base
      const outerGrad = ctx.createRadialGradient(cx, cy, 300, cx, cy, r);
      outerGrad.addColorStop(0, "#fef08a");
      outerGrad.addColorStop(0.3, "#f59e0b");
      outerGrad.addColorStop(0.7, "#d97706");
      outerGrad.addColorStop(1, "#78350f");

      ctx.fillStyle = outerGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      // Engraved Coin Border Rings
      ctx.strokeStyle = "#451a03";
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.arc(cx, cy, r - 16, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = "#fde68a";
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(cx, cy, r - 32, 0, Math.PI * 2);
      ctx.stroke();

      // Reeded micro-dots around the rim
      const dotCount = 72;
      ctx.fillStyle = "#fffbeb";
      for (let i = 0; i < dotCount; i++) {
        const angle = (i / dotCount) * Math.PI * 2;
        const dx = cx + Math.cos(angle) * (r - 24);
        const dy = cy + Math.sin(angle) * (r - 24);
        ctx.beginPath();
        ctx.arc(dx, dy, 5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Inner Deep Royal Blue / Navy Enamel Center
      const innerGrad = ctx.createRadialGradient(cx, cy, 50, cx, cy, 380);
      innerGrad.addColorStop(0, "#ffffff");
      innerGrad.addColorStop(0.65, "#f8fafc");
      innerGrad.addColorStop(1, "#e2e8f0");

      ctx.fillStyle = innerGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 380, 0, Math.PI * 2);
      ctx.fill();

      // Inner Gold Lip Border
      ctx.strokeStyle = "#d97706";
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.arc(cx, cy, 380, 0, Math.PI * 2);
      ctx.stroke();

      // Render School Logo
      const activeLogo = logoUrl || "/uploads/d4f85d59-3252-4527-abe9-66982ada3054.jpg";
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = activeLogo;

      const texture = new THREE.CanvasTexture(canvas);
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;

      img.onload = () => {
        const logoSize = 480;
        ctx.drawImage(img, cx - logoSize / 2, cy - logoSize / 2, logoSize, logoSize);

        // Circular Inscription: "โรงเรียนสาธิต มจร • SATIT MCU"
        ctx.font = "bold 34px Sarabun, sans-serif";
        ctx.fillStyle = "#78350f";
        ctx.textAlign = "center";
        ctx.fillText("โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย", cx, 880);

        ctx.font = "900 42px Inter, sans-serif";
        ctx.fillStyle = "#1e3a8a";
        ctx.fillText("★ SATIT MCU ★", cx, 180);

        texture.needsUpdate = true;
      };

      img.onerror = () => {
        // Fallback Vector Emblem if image fails to load
        ctx.fillStyle = "#1e3a8a";
        ctx.beginPath();
        ctx.arc(cx, cy, 180, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = "900 90px Inter, sans-serif";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("MCU", cx, cy);

        texture.needsUpdate = true;
      };

      return texture;
    };

    const coinFaceTexture = createCoinFaceTexture();

    // ═══ 5. CREATE 3D COIN MESHES (เหรียญโลโก้โรงเรียนสาธิต มจร) ═══
    const coinCount = 7;
    const coinRadius = 1.6;
    const coinThickness = 0.28;
    const coinGeometry = new THREE.CylinderGeometry(coinRadius, coinRadius, coinThickness, 64);

    // Materials: [Side Edge, Top Face, Bottom Face]
    const coinEdgeMaterial = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.96,
      roughness: 0.2,
      bumpScale: 0.05,
    });

    const coinFaceMaterial = new THREE.MeshStandardMaterial({
      map: coinFaceTexture,
      metalness: 0.65,
      roughness: 0.25,
    });

    const coinMaterials = [coinEdgeMaterial, coinFaceMaterial, coinFaceMaterial];

    interface CoinInstance {
      group: THREE.Group;
      mesh: THREE.Mesh;
      trailLight: THREE.PointLight;
      tOffset: number;
      spinSpeed: number;
    }

    const coins: CoinInstance[] = [];

    for (let i = 0; i < coinCount; i++) {
      const coinGroup = new THREE.Group();
      const coinMesh = new THREE.Mesh(coinGeometry, coinMaterials);
      // Orient cylinder so circular face points toward travel axis
      coinMesh.rotation.x = Math.PI / 2;
      coinGroup.add(coinMesh);

      // Trailing Glow Light for each coin (Cyan/Amber alternating)
      const isGold = i % 2 === 0;
      const trailLight = new THREE.PointLight(
        isGold ? 0xfbbf24 : 0x38bdf8,
        2.5,
        10
      );
      coinGroup.add(trailLight);

      scene.add(coinGroup);

      coins.push({
        group: coinGroup,
        mesh: coinMesh,
        trailLight,
        tOffset: i / coinCount,
        spinSpeed: 0.025 + Math.random() * 0.015,
      });
    }

    // ═══ 6. AMBIENT FLOATING GOLD & BLUE PARTICLES (Stardust) ═══
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const cGold = new THREE.Color(0xf59e0b);
    const cBlue = new THREE.Color(0x38bdf8);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      particlePositions[idx] = (Math.random() - 0.5) * 45;
      particlePositions[idx + 1] = (Math.random() - 0.5) * 25;
      particlePositions[idx + 2] = (Math.random() - 0.5) * 35;

      const chosenColor = Math.random() > 0.5 ? cGold : cBlue;
      particleColors[idx] = chosenColor.r;
      particleColors[idx + 1] = chosenColor.g;
      particleColors[idx + 2] = chosenColor.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ═══ 7. INTERACTIVE MOUSE PARALLAX & ANIMATION LOOP ═══
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 2;

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseX = normX * 4;
      mouseY = normY * 2;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || window.innerWidth;
      const newH = container.clientHeight || window.innerHeight;
      camera.aspect = newW / newH;
      // Adjust camera distance for mobile
      if (newW < 768) {
        camera.position.z = 38;
      } else {
        camera.position.z = 28;
      }
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // IntersectionObserver to pause rendering when out of viewport
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsedTime = (performance.now() - startTime) * 0.001;
      const runSpeed = 0.032; // Speed of coins traveling along the loop

      // Update Coins Position & Rotation along Spline
      coins.forEach((coin) => {
        const u = (elapsedTime * runSpeed + coin.tOffset) % 1.0;
        const pos = splineCurve.getPointAt(u);
        const tangent = splineCurve.getTangentAt(u).normalize();

        coin.group.position.copy(pos);

        // Bank/Orient along track tangent
        const up = new THREE.Vector3(0, 1, 0);
        coin.group.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), tangent);

        // Spin coin continuously on its disk axis
        coin.mesh.rotation.z += coin.spinSpeed;
      });

      // Pulse track rings
      trackRings.forEach((ring, idx) => {
        const scale = 1 + Math.sin(elapsedTime * 3 + idx * 0.4) * 0.06;
        ring.scale.set(scale, scale, scale);
      });

      // Slowly rotate particle dust field
      particles.rotation.y = elapsedTime * 0.015;
      particles.rotation.x = Math.sin(elapsedTime * 0.01) * 0.08;

      // Mouse Parallax Damping
      targetCameraX += (mouseX - targetCameraX) * 0.04;
      targetCameraY += (2 + mouseY - targetCameraY) * 0.04;

      camera.position.x = targetCameraX;
      camera.position.y = targetCameraY;
      camera.lookAt(0, 1, 0);

      renderer.render(scene, camera);
    };

    animate();

    // ═══ CLEANUP ═══
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      scene.clear();
      renderer.dispose();
      coinFaceTexture.dispose();
      coinGeometry.dispose();
      tubeGeometry.dispose();
    };
  }, [logoUrl]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
