
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid, Environment, Stage, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Simple House model component
const SimpleHouse = ({ dimensions = { width: 6, length: 4, height: 3 }, roofType = 'pitched' }) => {
  const { width, length, height } = dimensions;
  
  // House base
  return (
    <group>
      {/* Floor */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[width + 4, length + 6]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      
      {/* Main building structure */}
      <mesh position={[0, height/2, 0]} castShadow>
        <boxGeometry args={[width, height, length]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
      
      {/* Roof */}
      {roofType === 'pitched' ? (
        <mesh position={[0, height + 0.5, 0]} castShadow>
          <coneGeometry args={[Math.max(width, length) * 0.7, 2, 4]} />
          <meshStandardMaterial color="#c0392b" />
        </mesh>
      ) : roofType === 'flat' ? (
        <mesh position={[0, height + 0.1, 0]} castShadow>
          <boxGeometry args={[width, 0.2, length]} />
          <meshStandardMaterial color="#95a5a6" />
        </mesh>
      ) : (
        <group>
          {/* Gable roof */}
          <mesh position={[0, height + 0.5, 0]} castShadow rotation={[0, Math.PI / 4, 0]}>
            <coneGeometry args={[Math.max(width, length) * 0.7, 2, 4]} />
            <meshStandardMaterial color="#c0392b" />
          </mesh>
        </group>
      )}
      
      {/* Door */}
      <mesh position={[0, height/2 - 0.25, length/2 + 0.01]} castShadow>
        <boxGeometry args={[1, 1.5, 0.1]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      
      {/* Windows */}
      <mesh position={[-width/3, height/2, length/2 + 0.01]} castShadow>
        <boxGeometry args={[1, 0.8, 0.1]} />
        <meshStandardMaterial color="#87CEEB" />
      </mesh>
      
      <mesh position={[width/3, height/2, length/2 + 0.01]} castShadow>
        <boxGeometry args={[1, 0.8, 0.1]} />
        <meshStandardMaterial color="#87CEEB" />
      </mesh>
    </group>
  );
};

// Model Viewer component
const ModelViewer = ({ 
  showGrid = true, 
  dimensions = { width: 6, length: 4, height: 3 },
  roofType = 'pitched',
  viewMode = '3d'
}) => {
  // Set up camera position based on view mode
  const getCameraPosition = () => {
    switch(viewMode) {
      case 'top':
        return [0, 20, 0] as [number, number, number];
      case 'front':
        return [0, 5, 20] as [number, number, number];
      default: // 3d view
        return [10, 10, 10] as [number, number, number];
    }
  };
  
  return (
    <div className="w-full h-full canvas-container">
      <Canvas shadows camera={{ position: getCameraPosition(), fov: 50 }}>
        <PerspectiveCamera makeDefault position={getCameraPosition()} />
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
          <SimpleHouse dimensions={dimensions} roofType={roofType} />
        </Stage>
        
        {showGrid && viewMode !== 'front' && (
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
