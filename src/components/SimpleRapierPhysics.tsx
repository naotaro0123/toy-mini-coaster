import { Html } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import { Physics, RigidBody } from '@react-three/rapier';
import * as THREE from 'three';

type Item = { id: string; position: [number, number, number] };
type DropType = 'ball' | 'car';

const bodyLength = 12;
const bodyWidth = 8;
const bodyShape = new THREE.Shape();
bodyShape.moveTo(0, 0);
bodyShape.lineTo(0, bodyWidth);
bodyShape.lineTo(bodyLength, bodyWidth);
bodyShape.lineTo(bodyLength, 0);
bodyShape.lineTo(0, 0);

const bodyExtrudeSettings = {
  steps: 1,
  depth: 6,
  bevelEnabled: true,
  bevelThickness: 2,
  bevelSize: 1,
  bevelOffset: -4,
  bevelSegments: 5,
};

const TireMesh = (props: { position: [number, number, number] }): JSX.Element => {
  return (
    <mesh position={props.position} scale={[0.8, 0.8, 0.8]}>
      <sphereGeometry args={[0.2, 40, 40]} />
      <meshStandardMaterial color={'red'} opacity={0.5} transparent={true} />
    </mesh>
  );
};

const createItem = (i: number): Item => ({
  id: `item-${i + 1}`,
  position: [4, 2, Math.random() * 2.0 - 1.0],
});

export const SimpleRapierPhysics = () => {
  const [items, setItems] = useState<Item[]>(Array.from({ length: 1 }, (_, i) => createItem(i)));
  const [dropType, setDropType] = useState<DropType>('ball');
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
          <RigidBody type="fixed" colliders="cuboid" rotation={[0, 0, Math.PI / 8]}>
            {/* <RigidBody type="fixed" colliders="cuboid"> */}
            <mesh position={[0, -2, 0]}>
              <boxGeometry args={[10, 0.4, 4]} />
              <meshStandardMaterial color={'orange'} />
            </mesh>
            {/* guard */}
            <mesh position={[0, -1.6, 1.8]}>
              <boxGeometry args={[10, 0.4, 0.4]} />
              <meshStandardMaterial color={'gray'} />
            </mesh>
            {/* guard */}
            <mesh position={[0, -1.6, -1.8]}>
              <boxGeometry args={[10, 0.4, 0.4]} />
              <meshStandardMaterial color={'gray'} />
            </mesh>
          </RigidBody>

          {items.map((item) => (
            <>
              {dropType === 'ball' ? (
                <RigidBody colliders="ball" position={item.position}>
                  <mesh>
                    <sphereGeometry args={[0.2, 10, 10]} />
                    <meshStandardMaterial color={'red'} />
                  </mesh>
                </RigidBody>
              ) : (
                <>
                  <RigidBody colliders="trimesh" position={[0, 0.5, 0]}>
                    <mesh>
                      <boxGeometry args={[1.4, 0.1, 0.5]} />
                      <meshStandardMaterial color={'green'} />
                    </mesh>
                  </RigidBody>

                  <RigidBody colliders="hull" position={[0, 0.4, 0]} rotation={[0, Math.PI / 2, 0]}>
                    <mesh rotation={[0, 0, Math.PI / 2]}>
                      <cylinderGeometry args={[0.05, 0.05, 1, 20]} />
                      <meshStandardMaterial color={'blue'} />
                    </mesh>
                    <TireMesh position={[0.4, 0, 0]} />
                    <TireMesh position={[-0.4, 0, 0]} />
                  </RigidBody>

                  <RigidBody colliders="trimesh" position={[0, 0.3, 0]}>
                    <mesh>
                      <boxGeometry args={[1.4, 0.1, 0.5]} />
                      <meshStandardMaterial color={'green'} />
                    </mesh>
                  </RigidBody>

                  {/* back */}
                  {/* <RigidBody colliders="hull" position={[1, 0.4, 0]} rotation={[0, Math.PI / 2, 0]}>
                    <mesh rotation={[0, 0, Math.PI / 2]}>
                      <cylinderGeometry args={[0.05, 0.05, 1, 20]} />
                      <meshStandardMaterial color={'blue'} />
                    </mesh>
                    <TireMesh position={[0.4, 0, 0]} />
                    <TireMesh position={[-0.4, 0, 0]} />
                  </RigidBody> */}

                  {/* <mesh position={item.position} scale={0.1}>
                      <extrudeGeometry args={[bodyShape, bodyExtrudeSettings]} />
                      <meshStandardMaterial color={'blue'} />
                    </mesh> */}
                </>
              )}
            </>
          ))}
        </Physics>
      </Suspense>
    </>
  );
};
