import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

import JewelAnimation from './components/JewelAnimation';
import TextOverlay from './components/TextOverlay';
import ContactForm from './components/ContactForm';
import './App.css';

function Effects() {
  return (
    <EffectComposer>
      <Bloom
        luminanceThreshold={0.1}
        luminanceSmoothing={0.1}
        height={300}
        intensity={0.6}
        kernelSize={3}
      />
    </EffectComposer>
  );
}

export default function App() {
  const [contactTarget, setContactTarget] = useState(null);
  const spotTarget = useRef();
  const spotLightRef = useRef();

  useEffect(() => {
    if (spotLightRef.current && spotTarget.current) {
      spotLightRef.current.target = spotTarget.current;
    }
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="nav-links">
          <a href="#section1">Étape 1</a>
          <a href="#section2">Étape 2</a>
          <a href="#section3">Étape 3</a>
        </div>
        <img src="/images/logo.png" alt="Logo de l'atelier" />
        <a href="#contact" className="contact-button-nav">Contact</a>
      </nav>

      <Canvas shadows camera={{ position: [2, 2, 4], fov: 70 }}>
        <hemisphereLight skyColor="#ffffff" groundColor="#444444" intensity={1} />
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[5, 10, 7]}
          intensity={1.8}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <spotLight
          ref={spotLightRef}
          position={[2, 5, 5]}
          angle={0.3}
          intensity={3}
          penumbra={0.5}
          castShadow
        />
        <primitive object={new THREE.Object3D()} ref={spotTarget} position={[0.7, 0.7, 0]} />
        <pointLight position={[-5, -5, 5]} intensity={1.2} />

        <Environment files="/hdri/aerodynamics_workshop_1k.hdr" background={false} />

        <ScrollControls pages={4} damping={0.1}>
          <TextOverlay />
          <JewelAnimation />
        </ScrollControls>

        <Effects />
      </Canvas>

      <div className="contact-section" id="contact">
        <h2>Un bijou à réparer ?</h2>
        <div className="contact-buttons">
          <button onClick={() => setContactTarget('bijoutier')}>Contacter le bijoutier</button>
        </div>
        {contactTarget && <ContactForm contactTarget={contactTarget} />}
      </div>

      <footer className="footer">
        <div className="footer-links">
          <ul>
            <li>Nom et logo de l'atelier</li>
            <li>Coordonnées (Email, numéro de téléphone)</li>
            <li>Liens vers les réseaux sociaux</li>
          </ul>
        </div>
      </footer>
    </>
  );
}
