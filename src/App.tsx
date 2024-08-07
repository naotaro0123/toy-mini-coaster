import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import './App.css';
// import { SimpleRapierPhysics } from './components/SimpleRapierPhysics';
import { ToyMiniCoaster } from './components/ToyMiniCoaster';

function App() {
  return (
    <>
      <Canvas camera={{ position: [0, 6, -10], zoom: 1.6 }}>
        <color attach="background" args={['lightgray']} />
        <OrbitControls />
        {/* <HelloCube /> */}
        {/* <SimpleCannonPhysics /> */}
        {/* <SimpleRapierPhysics /> */}
        <ToyMiniCoaster />
      </Canvas>
    </>
  );
}

export default App;
