import { useSphere, useBox, Physics, Debug, BodyProps } from '@react-three/cannon';
import { Html } from '@react-three/drei';
import { MeshProps, useThree } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import * as THREE from 'three';

type Item = { id: string; position: [number, number, number] };
type BoxMeshProps = MeshProps & { type: BodyProps['type'] };

const BoxMesh = (meshProps: BoxMeshProps) => {
  const { name, position, args, type } = meshProps;
  // 0: boxGeometry, 1: meshStandardMaterial
  if (args?.[0] === undefined || args?.[1] === undefined) {
    return <></>;
  }
  const size = (args[0] as THREE.BoxGeometry).parameters;
  const color = (args[1] as THREE.MeshStandardMaterial).color;

  const [ref] = useBox<THREE.Mesh>(() => ({
    type: type,
    mass: 1,
    args: [size.width, size.height, size.depth],
    position: position as [number, number, number],
  }));
  return (
    <mesh ref={ref} name={name} position={position}>
      <boxGeometry args={[size.width, size.height, size.depth]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const SphereMesh = (meshProps: MeshProps) => {
  const { name, position, args } = meshProps;
  // 0: sphereGeometry, 1: meshStandardMaterial
  if (args?.[0] === undefined || args?.[1] === undefined) {
    return <></>;
  }
  const size = (args[0] as THREE.SphereGeometry).parameters;
  const color = (args[1] as THREE.MeshStandardMaterial).color;

  const [ref] = useSphere<THREE.Mesh>(() => ({
    type: 'Dynamic',
    mass: 1,
    args: [size.radius],
    position: position as [number, number, number],
  }));
  return (
    <mesh ref={ref} name={name} position={position}>
      <sphereGeometry args={[size.radius]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export const SimpleCannonPhysics = () => {
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
        <Physics>
          <Debug>
            <BoxMesh
              type={'Static'}
              name="box"
              position={[0, -2, 0]}
              args={[
                new THREE.BoxGeometry(10, 0.4, 4),
                new THREE.MeshStandardMaterial({ color: 'orange' }),
              ]}
            ></BoxMesh>

            {items.map((item, i) => (
              <>
                {i % 2 === 0 ? (
                  <SphereMesh
                    key={item.id}
                    name="ball"
                    position={item.position}
                    args={[
                      new THREE.SphereGeometry(0.2, 10, 10),
                      new THREE.MeshStandardMaterial({ color: 'red' }),
                    ]}
                  ></SphereMesh>
                ) : (
                  <BoxMesh
                    type={'Dynamic'}
                    key={item.id}
                    name="box"
                    position={item.position}
                    args={[
                      new THREE.BoxGeometry(0.4, 0.2, 0.2),
                      new THREE.MeshStandardMaterial({ color: 'blue' }),
                    ]}
                  ></BoxMesh>
                )}
              </>
            ))}
          </Debug>
        </Physics>
      </Suspense>
    </>
  );
};
