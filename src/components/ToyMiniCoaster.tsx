import { Debug, Physics } from '@react-three/cannon';
import { MiniCoaster } from './MiniCoaster';
import { DynamicSphereMesh } from './DynamicSphereMesh';

export const ToyMiniCoaster = (): JSX.Element => {
  return (
    <>
      <group name="lighting">
        <directionalLight position={[5, 5, 3]} intensity={2} />
        <directionalLight position={[-5, -5, -3]} intensity={2} />
      </group>

      <Physics>
        <Debug>
          <DynamicSphereMesh position={[1.6, 3, 0]}></DynamicSphereMesh>

          <MiniCoaster />
        </Debug>
      </Physics>
    </>
  );
};
