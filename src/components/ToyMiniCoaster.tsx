import { Debug, Physics } from '@react-three/cannon';
import { MiniCoaster } from './MiniCoaster';
import { button, useControls } from 'leva';
import { useState } from 'react';

export const ToyMiniCoaster = (): JSX.Element => {
  const [items, setItems] = useState<number[]>([]);

  useControls('Action', () => ({
    create: button(() => {
      setItems([...items, items.length + 1]);
      console.log(items);
    }),
    reset: button(() => {
      setItems([]);
      console.log('reset');
    }),
  }));
  return (
    <>
      <group name="lighting">
        <directionalLight position={[5, 5, 3]} intensity={2} />
        <directionalLight position={[-5, -5, -3]} intensity={2} />
      </group>

      <Physics>
        <Debug>
          {/* {items.map((_, i) => (
            <DynamicSphereMesh key={i} position={[1.6, 3, 0]}></DynamicSphereMesh>
          ))} */}
          <MiniCoaster />
        </Debug>
      </Physics>
    </>
  );
};
