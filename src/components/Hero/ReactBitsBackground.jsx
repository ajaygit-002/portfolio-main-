'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import styles from './Hero.module.css';

function ParticleSwarm(props) {
  const ref = useRef();
  
  // Generate random particles (3000 vertices) optimized with useMemo
  const sphere = useMemo(() => {
    const positions = new Float32Array(3000);
    for (let i = 0; i < 3000; i += 3) {
      const r = 15 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i] = r * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#ffd166"
          size={0.06}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function ReactBitsBackground() {
  return (
    <div className={styles.reactBitsBackground}>
      <Canvas camera={{ position: [0, 0, 8] }}>
        <ParticleSwarm />
      </Canvas>
      <div className={styles.videoOverlay}></div>
    </div>
  );
}
