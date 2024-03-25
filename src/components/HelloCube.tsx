import { useState } from 'react';

type Item = { id: string; position: [number, number, number] };

export const HelloCube = () => {
  const [items, setItems] = useState<Item[]>([]);

  return (
    <>
      <group>
        <directionalLight position={[5, 5, 3]} intensity={2} />
        <directionalLight position={[-5, -5, -3]} intensity={2} />
      </group>
      <mesh
        position={[0, 0, 0]}
        scale={[2, 2, 2]}
        onClick={() =>
          setItems([
            ...items,
            {
              id: `item-${items.length + 1}`,
              position: [Math.random() * 1.0, Math.random() * 3.0, 0],
            },
          ])
        }
      >
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
