import React from 'react';
import { Canvas } from 'react-three-fiber';
import { OrbitControls } from '@react-three/drei';

const ThreeDScatterPlot = ({ data }) => {
  return (
    <Canvas style={{ height: '100%' }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {data.map((point, index) => (
        <mesh key={index} position={[point.x, point.y, point.z]}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshStandardMaterial color={'orange'} />
        </mesh>
      ))}
      <OrbitControls />
    </Canvas>
  );
};

export default ThreeDScatterPlot;
