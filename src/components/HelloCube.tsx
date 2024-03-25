import { Html } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useState } from 'react';

type Item = { id: string; position: [number, number, number] };

export const HelloCube = () => {
  const [items, setItems] = useState<Item[]>([]);
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
                position: [items.length + 1, 0, 0],
              },
            ])
          }
        >
          create
        </button>
        <button style={{ width: buttonWidth, height: buttonHeight }} onClick={() => setItems([])}>
          reset
        </button>
      </Html>
      <mesh position={[0, 0, 0]} scale={[2, 2, 2]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color={'orange'} />
      </mesh>

      {items.map((item) => (
        <mesh key={item.id} position={item.position} scale={[2, 2, 2]}>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshStandardMaterial color={'green'} />
        </mesh>
      ))}
    </>
  );
};
