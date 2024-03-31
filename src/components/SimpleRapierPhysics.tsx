import { Html } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import { Physics, RigidBody } from '@react-three/rapier';

type Item = { id: string; position: [number, number, number] };

export const SimpleRapierPhysics = () => {
  const [items, setItems] = useState<Item[]>(
    Array.from({ length: 1 }, (_, i) => ({
      id: `item-${i + 1}`,
      position: [Math.random() * 4.0 - 2.0, 0, Math.random() * 2.0 - 1.0],
    })),
  );
  const { size } = useThree();
  // create button position
  const buttonWidth = 80;
  const buttonHeight = 40;
  const htmlTop = -size.height / 2;
  const htmlRight = -size.width / 2;

  return (
    <>
      <group>
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
                position: [Math.random() * 4.0 - 2.0, 0, Math.random() * 2.0 - 1.0],
              },
            ])
          }
        >
          create
        </button>
        <button style={{ width: buttonWidth, height: buttonHeight }} onClick={() => setItems([])}>
          reset
        </button>
        <button
          style={{ width: buttonWidth, height: buttonHeight }}
          onClick={() => console.log('items', items)}
        >
          debug
        </button>
      </Html>

      <Suspense>
        <Physics debug={true} colliders={false}>
          <RigidBody type="fixed" colliders="cuboid">
            <mesh position={[0, -2, 0]}>
              <boxGeometry args={[10, 0.4, 4]} />
              <meshStandardMaterial color={'orange'} />
            </mesh>
          </RigidBody>

          {items.map((item, i) => (
            <>
              {i % 2 === 0 ? (
                <RigidBody colliders="ball">
                  <mesh position={item.position}>
                    <sphereGeometry args={[0.2, 10, 10]} />
                    <meshStandardMaterial color={'red'} />
                  </mesh>
                </RigidBody>
              ) : (
                <RigidBody colliders="cuboid">
                  <mesh position={item.position}>
                    <boxGeometry args={[0.4, 0.2, 0.2]} />
                    <meshStandardMaterial color={'blue'} />
                  </mesh>
                </RigidBody>
              )}
            </>
          ))}
        </Physics>
      </Suspense>
    </>
  );
};