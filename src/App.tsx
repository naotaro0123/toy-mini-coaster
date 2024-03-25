import './App.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { HelloCube } from './components/HelloCube';

function App() {
  return (
    <>
      <Canvas camera={{ position: [0, 6, -10], zoom: 3 }}>
        <color attach="background" args={['lightgray']} />
        <OrbitControls />
        <HelloCube />
        {/* <ToyMiniCoaster /> */}
      </Canvas>
    </>
  );
}

export default App;
