import { Physics, RigidBody } from '@react-three/rapier';
import { MiniCoaster } from './MiniCoaster';
import { useState } from 'react';
import { Html } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

type Item = { id: string; position: [number, number, number] };

export const ToyMiniCoaster = (): JSX.Element => {
  const [items, setItems] = useState<Item[]>([]);
  const [debug, setDebug] = useState<boolean>(true);
  const { size } = useThree();
  // create button position
  const buttonWidth = 80;
  const buttonHeight = 40;
  const htmlTop = -size.height / 2;
  const htmlRight = -size.width / 2;

  return (
    <>
      <group name="lighting">
        <directionalLight position={[5, 5, 3]} intensity={2} />
        <directionalLight position={[-5, -5, -3]} intensity={2} />
      </group>
      <Html
        style={{
          position: 'absolute',
          top: htmlTop,
          right: htmlRight,
          margin: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        <button
          style={{ width: buttonWidth, height: buttonHeight }}
          onClick={() =>
            setItems([
              ...items,
              {
                id: `item-${items.length + 1}`,
                position: [1.6, 3, 0],
              },
            ])
          }
        >
          create
        </button>
        <button style={{ width: buttonWidth, height: buttonHeight }} onClick={() => setItems([])}>
          reset
        </button>
        <div>
          <label>debug</label>
          <input type="checkbox" checked={debug} onChange={(e) => setDebug(e.target.checked)} />
        </div>
      </Html>

      <Physics debug={debug} colliders={false}>
        <MiniCoaster />
        {items.map((item) => (
          <>
            <RigidBody colliders="ball">
              <mesh position={item.position}>
                <sphereGeometry args={[0.2, 10, 10]} />
                <meshStandardMaterial color={'red'} />
              </mesh>
            </RigidBody>
          </>
        ))}
      </Physics>
    </>
  );
};
