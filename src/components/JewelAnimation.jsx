import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

class ArcCurve extends THREE.Curve {
  constructor(radius = 1, startAngle = 0, endAngle = Math.PI / 3) {
    super();
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
  }
  getPoint(t) {
    const angle = this.startAngle + (this.endAngle - this.startAngle) * t;
    return new THREE.Vector3(
      this.radius * Math.cos(angle),
      this.radius * Math.sin(angle),
      0
    );
  }
}

// Positions pré-calculées
const startPositions = [
  new THREE.Vector3(-1.5, 0, 0),
  new THREE.Vector3(0, 1.5, 0),
  new THREE.Vector3(0, 0, 1),
];
const endPos = new THREE.Vector3(0, 0, 0);
const diamondStartPos = new THREE.Vector3(2, 1.5, -1);
const diamondEndPos = new THREE.Vector3(0.3, 1, 0);

const goldMaterialProps = {
  color: '#ddac17',
  metalness: 1,
  roughness: 0.05,
  clearcoat: 1,
  clearcoatRoughness: 0.1,
  emissive: '#ecc440',
  emissiveIntensity: 0.3,
  envMapIntensity: 1.5,
  side: THREE.DoubleSide,
};

const JewelAnimation = () => {
  const scroll = useScroll();
  const arcRefs = [useRef(), useRef(), useRef()];
  const diamondRef = useRef();

  const arcAngle = (2 * Math.PI) / 3;

  // Matériau or créé une seule fois
  const goldMaterial = useMemo(() => new THREE.MeshPhysicalMaterial(goldMaterialProps), []);

  // Géométries des arcs
  const geometries = useMemo(() => [
    new THREE.TubeGeometry(new ArcCurve(1, 0, arcAngle), 64, 0.1, 8, false),
    new THREE.TubeGeometry(new ArcCurve(1, arcAngle, 2 * arcAngle), 64, 0.1, 8, false),
    new THREE.TubeGeometry(new ArcCurve(1, 2 * arcAngle, 3 * arcAngle), 64, 0.1, 8, false),
  ], [arcAngle]);

  // Chargement du diamant
  const { scene } = useGLTF('/models/diamond2.glb');

  // Appliquer le matériau au diamant après chargement
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshPhysicalMaterial({
          color: '#fff0f0ff',
          metalness: 0,
          roughness: 0.1,
          clearcoat: 1,
          clearcoatRoughness: 0.1,
          transmission: 0.98,
          thickness: 2,
          ior: 2.4,
          emissive: '#700000',
          emissiveIntensity: 0.1,
          transparent: true,
          opacity: 0.95,
          envMapIntensity: 1,
          side: THREE.DoubleSide,
          reflectivity: 1,
        });
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  useFrame(() => {
    const t = scroll.offset;

    // ----------- Mouvements des arcs -----------
    arcRefs.forEach((ref, i) => {
      if (!ref.current) return;
      ref.current.position.lerpVectors(startPositions[i], endPos, t);
      ref.current.geometry = geometries[i];
      ref.current.rotation.z = (1 - t) * (i * arcAngle);
    });

    // ----------- Mouvements du diamant -----------
    if (diamondRef.current) {
      diamondRef.current.position.lerpVectors(diamondStartPos, diamondEndPos, t);

      let rotX, rotY, posZ = 0;

      if (t < 0.5) {
        rotX = Math.PI / 2 + t * Math.PI * 2;
        rotY = t * Math.PI * 4;
      } else if (t < 0.85) {
        const phaseT = (t - 0.5) / 0.35;
        rotX = THREE.MathUtils.lerp(Math.PI / 2 + Math.PI, Math.PI / 2, phaseT);
        rotY = THREE.MathUtils.lerp(Math.PI, Math.PI / 4, phaseT);
      } else {
        const phaseT = (t - 0.85) / 0.18;
        rotX = THREE.MathUtils.lerp(Math.PI / 2, -0.3, phaseT);
        rotY = THREE.MathUtils.lerp(Math.PI / 4, Math.PI / 2, phaseT);
        posZ = THREE.MathUtils.lerp(0, 0.5, phaseT);
      }

      diamondRef.current.rotation.x = rotX;
      diamondRef.current.rotation.y = rotY;
      diamondRef.current.position.z += posZ;
    }
  });

  return (
    <group>
      {arcRefs.map((ref, i) => (
        <mesh
          key={i}
          ref={ref}
          material={goldMaterial}
          castShadow
          receiveShadow
        />
      ))}

      <primitive
        ref={diamondRef}
        object={scene}
        scale={[0.7, 0.7, 0.7]}
        position={[0.7, 0.7, 0]}
        castShadow
        receiveShadow
      />
    </group>
  );
};

export default JewelAnimation;
