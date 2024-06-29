import { Html } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import { Physics, RigidBody } from '@react-three/rapier';
import { Car } from './Car';

type Item = { id: string; position: [number, number, number] };
type DropType = 'ball' | 'car';

const createItem = (i: number): Item => ({
  id: `item-${i + 1}`,
  // position: [4, 2, Math.random() * 2.0 - 1.0],
  position: [8, 1, 0],
});

export const SimpleRapierPhysics = () => {
  const [items, setItems] = useState<Item[]>(Array.from({ length: 1 }, (_, i) => createItem(i)));
  // const [dropType, setDropType] = useState<DropType>('ball');
  const [dropType, setDropType] = useState<DropType>('car');
  const { size } = useThree();
  // create button position
  const buttonWidth = 130;
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
          onClick={() => setItems([...items, createItem(items.length)])}
        >
          create
        </button>
        <button style={{ width: buttonWidth, height: buttonHeight }} onClick={() => setItems([])}>
          reset
        </button>
        <div>
          dropType:
          <select value={dropType} onChange={(e) => setDropType(e.target.value as DropType)}>
            <option value="ball">ball</option>
            <option value="car">car</option>
          </select>
        </div>
      </Html>

      <Suspense>
        <Physics debug={true} colliders={false}>
          <RigidBody type="fixed" colliders="cuboid" rotation={[0, 0, Math.PI / 18]}>
            <mesh position={[0, -2, 0]}>
              <boxGeometry args={[20, 0.4, 4]} />
              <meshStandardMaterial color={'orange'} />
            </mesh>
            {/* guard */}
            <mesh position={[0, -1.6, 1.8]}>
              <boxGeometry args={[20, 0.4, 0.4]} />
              <meshStandardMaterial color={'gray'} />
            </mesh>
            {/* guard */}
            <mesh position={[0, -1.6, -1.8]}>
              <boxGeometry args={[20, 0.4, 0.4]} />
              <meshStandardMaterial color={'gray'} />
            </mesh>
          </RigidBody>

          <RigidBody
            type="fixed"
            colliders="cuboid"
            rotation={[0, 0, -Math.PI / 18]}
            position={[-19, 0, 0]}
          >
            <mesh position={[0, -2, 0]}>
              <boxGeometry args={[20, 0.4, 4]} />
              <meshStandardMaterial color={'orange'} />
            </mesh>
            {/* guard */}
            <mesh position={[0, -1.6, 1.8]}>
              <boxGeometry args={[20, 0.4, 0.4]} />
              <meshStandardMaterial color={'gray'} />
            </mesh>
            {/* guard */}
            <mesh position={[0, -1.6, -1.8]}>
              <boxGeometry args={[20, 0.4, 0.4]} />
              <meshStandardMaterial color={'gray'} />
            </mesh>
          </RigidBody>

          {items.map((item) =>
            dropType === 'ball' ? (
              <RigidBody colliders="ball" position={item.position} key={item.id}>
                <mesh>
                  <sphereGeometry args={[0.2, 10, 10]} />
                  <meshStandardMaterial color={'red'} />
                </mesh>
              </RigidBody>
            ) : (
              <Car position={item.position} key={item.id} />
            ),
          )}
        </Physics>
      </Suspense>
    </>
  );
};
