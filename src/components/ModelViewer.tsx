
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid, Environment, Stage, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Simple House model component
const SimpleHouse = () => {
  // House base
  return (
    <group>
      {/* Floor */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      
      {/* Main building structure */}
      <mesh position={[0, 1, 0]} castShadow>
        <boxGeometry args={[6, 2, 4]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
      
      {/* Roof */}
      <mesh position={[0, 2.5, 0]} castShadow>
        <coneGeometry args={[4, 2, 4]} />
        <meshStandardMaterial color="#c0392b" />
      </mesh>
      
      {/* Door */}
      <mesh position={[0, 0.75, 2.01]} castShadow>
        <boxGeometry args={[1, 1.5, 0.1]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      
      {/* Windows */}
      <mesh position={[-1.5, 1, 2.01]} castShadow>
        <boxGeometry args={[1, 0.8, 0.1]} />
        <meshStandardMaterial color="#87CEEB" />
      </mesh>
      
      <mesh position={[1.5, 1, 2.01]} castShadow>
        <boxGeometry args={[1, 0.8, 0.1]} />
        <meshStandardMaterial color="#87CEEB" />
      </mesh>
    </group>
  );
};

// Model Viewer component
const ModelViewer = ({ showGrid = true }) => {
  return (
    <div className="w-full h-full canvas-container">
      <Canvas shadows camera={{ position: [10, 10, 10], fov: 50 }}>
        <PerspectiveCamera makeDefault position={[10, 10, 10]} />
        <color attach="background" args={['#f6f9fc']} />
        <ambientLight intensity={0.5} />
        <directionalLight
          castShadow
          position={[10, 10, 10]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        
        <Stage environment="city" shadows>
          <SimpleHouse />
        </Stage>
        
        {showGrid && (
          <Grid 
            infiniteGrid 
            cellSize={1}
            cellThickness={0.5}
            cellColor="#6f9ede"
            sectionSize={3}
            sectionThickness={1}
            sectionColor="#2c5282"
            fadeDistance={30}
          />
        )}
        
        <OrbitControls 
          enableDamping 
          dampingFactor={0.05} 
          minDistance={5} 
          maxDistance={20} 
          makeDefault 
        />
      </Canvas>
    </div>
  );
};

export default ModelViewer;
