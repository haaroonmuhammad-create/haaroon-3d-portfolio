'use client';

import { Canvas, useLoader } from '@react-three/fiber';
import { ContactShadows, Grid, OrbitControls } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { Suspense, useMemo } from 'react';
import * as THREE from 'three';

function Mesh({ url }: { url: string }) {
  const source = useLoader(STLLoader, url);
  const geometry = useMemo(() => {
    const g = source.clone();
    g.computeVertexNormals();
    g.center();
    g.computeBoundingBox();
    const size = new THREE.Vector3();
    g.boundingBox?.getSize(size);
    const max = Math.max(size.x, size.y, size.z) || 1;
    const scale = 2.75 / max;
    g.scale(scale, scale, scale);
    g.computeBoundingBox();
    const minY = g.boundingBox?.min.y ?? -1;
    g.translate(0, -minY - 1.15, 0);
    return g;
  }, [source]);

  return (
    <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow>
      <meshStandardMaterial color="#4d73e8" metalness={0.36} roughness={0.25} />
    </mesh>
  );
}

export default function ModelViewer({ url, autoRotate = true }: { url: string; autoRotate?: boolean }) {
  return (
    <div className="h-full min-h-[310px] w-full overflow-hidden rounded-[28px] bg-[#071225]">
      <Canvas camera={{ position: [4.25, 3.1, 4.7], fov: 39 }} dpr={[1, 1.6]} shadows>
        <color attach="background" args={['#071225']} />
        <fog attach="fog" args={['#071225', 8, 14]} />
        <ambientLight intensity={1.05} />
        <directionalLight position={[4, 6, 5]} intensity={2.4} castShadow color="#e5edff" />
        <directionalLight position={[-4, 3, -2]} intensity={1.35} color="#6389ff" />
        <pointLight position={[0, -3, 3]} intensity={1.05} color="#2d5fff" />
        <Suspense fallback={null}><Mesh url={url} /></Suspense>
        <Grid position={[0, -1.16, 0]} args={[10, 10]} cellSize={0.45} cellThickness={0.45} cellColor="#294574" sectionSize={2.25} sectionThickness={0.75} sectionColor="#355a96" fadeDistance={8} fadeStrength={1.2} infiniteGrid />
        <ContactShadows position={[0, -1.14, 0]} opacity={0.38} scale={7} blur={2.6} far={4} />
        <OrbitControls enablePan={false} minDistance={2.2} maxDistance={8} autoRotate={autoRotate} autoRotateSpeed={0.65} />
      </Canvas>
    </div>
  );
}
