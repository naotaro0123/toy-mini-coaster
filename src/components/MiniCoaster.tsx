import { MeshProps } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';

const rotateAngle = Math.PI / 48;
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
      <boxGeometry args={[4.1, 0.3, 0.1]} />
      <meshStandardMaterial color={guardrailColor} />
    </mesh>
  );
};

const DownWallMesh = (props: DownMeshProps): JSX.Element => {
  return (
    <group
      name={`${props.name}-down-wall`}
      position={props.position}
      rotation={[0, 0, props.rotateDirection === 'right' ? rotateAngle : -rotateAngle]}
    >
      <mesh name={`${props.name}-down-wall-front`}>
        <boxGeometry args={[3.3, 0.1, 0.7]} />
        <meshStandardMaterial color={baseColor} />
      </mesh>
      <DownGardRailMesh
        name={`${props.name}-down-wall-back`}
        position={[props.rotateDirection === 'right' ? -0.28 : 0.28, 0, 0.4]}
      />
      <DownGardRailMesh
        name={`${props.name}-down-wall-front`}
        position={[props.rotateDirection === 'right' ? -0.28 : 0.28, 0, -0.4]}
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
          <mesh name="bottom-wall-back" position={[0, -1.9, 0.55]}>
            <boxGeometry args={bottomGuardRailBoxArgs} />
            <meshStandardMaterial color={guardrailColor} />
          </mesh>
          <mesh name="bottom-wall-front" position={[0, -1.9, -0.55]}>
            <boxGeometry args={bottomGuardRailBoxArgs} />
            <meshStandardMaterial color={guardrailColor} />
          </mesh>
        </group>

        <mesh name="left-wall" position={[2, 0.16, 0]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[4.5, 0.2, 1]} />
          <meshStandardMaterial color={baseColor} />
        </mesh>

        <mesh name="right-wall" position={[-2, 0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[4.3, 0.2, 1]} />
          <meshStandardMaterial color={baseColor} />
        </mesh>

        <group name="first-down-wall" position={[0.28, 2.1, 0]} rotation={[0, 0, rotateAngle]}>
          <mesh name="first-down-wall-base">
            <boxGeometry args={[3.3, 0.1, 1]} />
            <meshStandardMaterial color={baseColor} />
          </mesh>
          <DownGardRailMesh name="first-down-wall-back1" position={[-0.28, 0, 0.55]} />
          <DownGardRailMesh name="first-down-wall-back2" position={[-0.28, 0, 0.4]} />
          <DownGardRailMesh name="first-down-wall-front1" position={[-0.28, 0, -0.55]} />
          <DownGardRailMesh name="first-down-wall-front2" position={[-0.28, 0, -0.4]} />
        </group>

        <DownWallMesh name="second" position={[-0.25, 1.2, 0]} rotateDirection="left" />
        <DownWallMesh name="first" position={[0.25, 0.2, 0]} rotateDirection="right" />
        <DownWallMesh name="fourth" position={[-0.25, -0.8, 0]} rotateDirection="left" />
        <DownWallMesh name="fifth" position={[0.28, -1.85, 0]} rotateDirection="right" />
      </RigidBody>
    </group>
  );
};
