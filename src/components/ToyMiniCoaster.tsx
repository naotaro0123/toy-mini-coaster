import { Physics, RigidBody } from '@react-three/rapier';
import { MiniCoaster } from './MiniCoaster';
import { useState } from 'react';
import { Html } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

type Item = { id: string; position: [number, number, number] };
type DropType = 'ball' | 'car';

export const ToyMiniCoaster = (): JSX.Element => {
  const [items, setItems] = useState<Item[]>([]);
  const [dropType, setDropType] = useState<DropType>('ball');
  const [debug, setDebug] = useState<boolean>(true);
  const { size } = useThree();
  // button settings
  const buttonWidth = 130;
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
          drop {dropType}
        </button>
        <button style={{ width: buttonWidth, height: buttonHeight }} onClick={() => setItems([])}>
          reset {dropType}s
        </button>
        <div>
          dropType:
          <select value={dropType} onChange={(e) => setDropType(e.target.value as DropType)}>
            <option value="ball">ball</option>
            <option value="car">car</option>
          </select>
        </div>
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
