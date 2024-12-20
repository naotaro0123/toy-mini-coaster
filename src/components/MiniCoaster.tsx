import { MeshProps } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';

const rotateAngle = Math.PI / 50;
const baseColor = 'orange';
const guardrailColor = 'peru';
const bottomGuardRailBoxArgs = [4.2, 0.4, 0.1] as [number, number, number];

type DownMeshProps = MeshProps & { rotateDirection: 'left' | 'right' };

const DownGardRailMesh = (props: {
  name: string;
  position: [number, number, number];
}): JSX.Element => {
  return (
    <mesh name={props.name} position={props.position}>
      <boxGeometry args={[4.2, 0.3, 0.1]} />
      <meshStandardMaterial color={guardrailColor} />
    </mesh>
  );
};

const DownWallMesh = (props: DownMeshProps): JSX.Element => {
  const downGardRailPositionX = props.rotateDirection === 'right' ? -0.36 : 0.36;
  return (
    <group
      name={`${props.name}-down-wall`}
      position={props.position}
      rotation={[0, 0, props.rotateDirection === 'right' ? rotateAngle : -rotateAngle]}
    >
      <mesh name={`${props.name}-down-wall-front`}>
        <boxGeometry args={[3.3, 0.15, 0.7]} />
        <meshStandardMaterial color={baseColor} />
      </mesh>
      <DownGardRailMesh
        name={`${props.name}-down-wall-back`}
        position={[downGardRailPositionX, 0, 0.4]}
      />
      <DownGardRailMesh
        name={`${props.name}-down-wall-front`}
        position={[downGardRailPositionX, 0, -0.4]}
      />
    </group>
  );
};

export const MiniCoaster = (): JSX.Element => {
  return (
    <group name="mini-coaster">
      <RigidBody type="fixed" colliders="cuboid">
        <group name="bottom-wall">
          <mesh name="bottom-wall-base" position={[0, -2, 0]}>
            <boxGeometry args={[4.1, 0.2, 1]} />
            <meshStandardMaterial color={baseColor} />
          </mesh>
          <mesh name="bottom-wall-back1" position={[0, -1.9, 0.55]}>
            <boxGeometry args={bottomGuardRailBoxArgs} />
            <meshStandardMaterial color={guardrailColor} />
          </mesh>
          <mesh name="bottom-wall-back2" position={[0, -1.9, 0.45]}>
            <boxGeometry args={bottomGuardRailBoxArgs} />
            <meshStandardMaterial color={guardrailColor} />
          </mesh>
          {/* <mesh name="bottom-wall-back3" position={[0, -1.9, 0.35]}>
            <boxGeometry args={bottomGuardRailBoxArgs} />
            <meshStandardMaterial color={guardrailColor} />
          </mesh> */}
          <mesh name="bottom-wall-front1" position={[0, -1.9, -0.55]}>
            <boxGeometry args={bottomGuardRailBoxArgs} />
            <meshStandardMaterial color={guardrailColor} />
          </mesh>
          <mesh name="bottom-wall-front2" position={[0, -1.9, -0.45]}>
            <boxGeometry args={bottomGuardRailBoxArgs} />
            <meshStandardMaterial color={guardrailColor} />
          </mesh>
          {/* <mesh name="bottom-wall-front3" position={[0, -1.9, -0.35]}>
            <boxGeometry args={bottomGuardRailBoxArgs} />
            <meshStandardMaterial color={guardrailColor} />
          </mesh> */}
        </group>

        <mesh name="left-wall" position={[2, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[4.6, 0.2, 1]} />
          <meshStandardMaterial color={baseColor} />
        </mesh>

        <mesh name="right-wall" position={[-2, 0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[4.3, 0.2, 1]} />
          <meshStandardMaterial color={baseColor} />
        </mesh>

        <group name="top-down-wall" position={[0.4, 2.2, 0]} rotation={[0, 0, rotateAngle]}>
          <mesh name="top-down-wall-base" position={[0, 0, 0]}>
            <boxGeometry args={[3.28, 0.1, 1]} />
            <meshStandardMaterial color={baseColor} />
          </mesh>
          <DownGardRailMesh name="top-down-wall-back1" position={[-0.4, 0, 0.5]} />
          <DownGardRailMesh name="top-down-wall-back2" position={[-0.4, 0, 0.4]} />
          <DownGardRailMesh name="top-down-wall-front1" position={[-0.4, 0, -0.5]} />
          <DownGardRailMesh name="top-down-wall-front2" position={[-0.4, 0, -0.4]} />
        </group>

        <DownWallMesh name="second-down-wall" position={[-0.36, 1.5, 0]} rotateDirection="left" />
        <DownWallMesh name="third-down-wall" position={[0.36, 0.8, 0]} rotateDirection="right" />
        <DownWallMesh name="fourth-down-wall" position={[-0.36, 0.1, 0]} rotateDirection="left" />
        <DownWallMesh name="fifth-down-wall" position={[0.36, -0.6, 0]} rotateDirection="right" />
        <DownWallMesh name="six-down-wall" position={[-0.36, -1.3, 0]} rotateDirection="left" />
      </RigidBody>
    </group>
  );
};
