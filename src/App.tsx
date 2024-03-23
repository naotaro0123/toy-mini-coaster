import './App.css';
import { Canvas } from '@react-three/fiber';
import { ToyMiniCoaster } from './components/ToyMiniCoaster';
import { OrbitControls } from '@react-three/drei';

function App() {
  return (
    <>
      <Canvas camera={{ position: [0, 5, -10], zoom: 4 }}>
        <color attach="background" args={['lightgray']} />
        <directionalLight position={[0, 5, -10]} intensity={1} />
        <directionalLight position={[0, 5, 10]} intensity={1} />
        <OrbitControls />
        {/* <HelloCube position={[0, 0, 0]} scale={[5, 5, 5]} /> */}
        <ToyMiniCoaster />
      </Canvas>
    </>
  );
}

export default App;
