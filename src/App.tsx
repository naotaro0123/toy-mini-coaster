import './App.css';
import { HelloCube } from './components/HelloCube';
import { Canvas } from '@react-three/fiber';

function App() {
  return (
    <>
      <Canvas camera={{ position: [0, 5, -15] }}>
        <directionalLight position={[0, 5, 5]} intensity={1} />
        <HelloCube position={[0, 0, 0]} scale={[5, 5, 5]} />
      </Canvas>
    </>
  );
}

export default App;
