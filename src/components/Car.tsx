import { Box, Cylinder } from '@react-three/drei';
import { GroupProps, useFrame } from '@react-three/fiber';
import { RapierRigidBody, RigidBody, Vector3Tuple, useRevoluteJoint } from '@react-three/rapier';
import { RefObject, createRef, useRef } from 'react';

// https://github.com/pmndrs/react-three-rapier/blob/main/demo/src/examples/car/CarExample.tsx
const WheelJoint = ({
  body,
  wheel,
  bodyAnchor,
  wheelAnchor,
  rotationAxis,
}: {
  body: RefObject<RapierRigidBody>;
  wheel: RefObject<RapierRigidBody>;
  bodyAnchor: Vector3Tuple;
  wheelAnchor: Vector3Tuple;
  rotationAxis: Vector3Tuple;
}) => {
  const joint = useRevoluteJoint(body, wheel, [bodyAnchor, wheelAnchor, rotationAxis]);

  useFrame(() => {
    if (joint.current) {
      joint.current.configureMotorVelocity(20, 10);
      joint.current.configureMotorPosition(-0.2, 1.0, 1.0);
    }
  });

  return null;
};

export const Car = (props: GroupProps) => {
  const bodyX = 0.42;
  const halfBodyX = bodyX / 2;
  const bodyY = 0.1;
  const bodyZ = 0.35;
  // 車体と車輪の隙間を埋めるためのマージン
  const zSubMargin = 0.1;

  const bodyRef = useRef<RapierRigidBody>(null);
  const wheelPositions: [number, number, number][] = [
    [-halfBodyX, 0, bodyZ - zSubMargin],
    [-halfBodyX, 0, -bodyZ + zSubMargin],
    [halfBodyX, 0, bodyZ - zSubMargin],
    [halfBodyX, 0, -bodyZ + zSubMargin],
  ];
  const wheelRefs = useRef(wheelPositions.map(() => createRef<RapierRigidBody>()));
  return (
    <group {...props}>
      <RigidBody colliders="cuboid" ref={bodyRef} type="dynamic" density={10}>
        <Box scale={[bodyX, bodyY, bodyZ]} castShadow receiveShadow name="chassis">
          <meshStandardMaterial color={'red'} />
        </Box>
      </RigidBody>
      {/* タイヤのメッシュ */}
      {wheelPositions.map((wheelPosition, index) => (
        <RigidBody
          position={wheelPosition}
          colliders="hull"
          type="dynamic"
          key={index}
          ref={wheelRefs.current[index]}
        >
          <Cylinder
            rotation={[Math.PI / 2, 0, 0]}
            args={[bodyY + 0.05, bodyY + 0.05, 0.14, 32]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color={'grey'} />
          </Cylinder>
        </RigidBody>
      ))}
      {/* タイヤのジョイント */}
      {wheelPositions.map((wheelPosition, index) => (
        <WheelJoint
          key={index}
          body={bodyRef}
          wheel={wheelRefs.current[index]}
          bodyAnchor={wheelPosition}
          wheelAnchor={[0, 0, 0]}
          rotationAxis={[0, 0, 1]}
        />
      ))}
    </group>
  );
};
