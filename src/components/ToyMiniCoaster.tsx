import { Debug, Physics, useBox, useSphere } from '@react-three/cannon';
import { MeshProps } from '@react-three/fiber';
import * as THREE from 'three';

const StaticBoxMesh = (meshProps: MeshProps) => {
  const { name, position, rotation, args } = meshProps;
  // 0: boxGeometry, 1: meshStandardMaterial
  if (args?.[0] === undefined || args?.[1] === undefined) {
    return <></>;
  }

  const size = (args[0] as THREE.BoxGeometry).parameters;
  const [ref] = useBox<THREE.Mesh>(() => ({
    type: 'Static',
    args: [size.width, size.height, size.depth],
    position: position as [number, number, number],
    rotation: rotation as [number, number, number],
  }));
  return <mesh ref={ref} name={name} args={meshProps.args}></mesh>;
};

const DynamicSphereMesh = (meshProps: MeshProps) => {
  const { name, position, args } = meshProps;
  // 0: sphereGeometry, 1: meshStandardMaterial
  if (args?.[0] === undefined || args?.[1] === undefined) {
    return <></>;
  }
  const size = (args[0] as THREE.SphereGeometry).parameters;

  const [ref] = useSphere<THREE.Mesh>(() => ({
    type: 'Dynamic',
    mass: 1,
    args: [size.radius],
    position: position as [number, number, number],
  }));
  return <mesh ref={ref} name={name} args={meshProps.args}></mesh>;
};

export const ToyMiniCoaster = (): JSX.Element => {
  return (
    <>
      <group name="lighting">
        <directionalLight position={[5, 5, 3]} intensity={2} />
        <directionalLight position={[-5, -5, -3]} intensity={2} />
      </group>

      <Physics>
        <Debug>
          <DynamicSphereMesh
            name="ball"
            position={[1.6, 3, 0]}
            args={[
              new THREE.SphereGeometry(0.2, 10, 10),
              new THREE.MeshStandardMaterial({ color: 'red' }),
            ]}
          ></DynamicSphereMesh>

          <group name="mini-coaster">
            <group name="bottom-wall">
              <StaticBoxMesh
                name="bottom-wall-base"
                position={[0, -2, 0]}
                args={[
                  new THREE.BoxGeometry(4.2, 0.2, 1),
                  new THREE.MeshStandardMaterial({ color: 'orange' }),
                ]}
              ></StaticBoxMesh>
              <StaticBoxMesh
                name="bottom-wall-back"
                position={[0, -1.9, 0.55]}
                args={[
                  new THREE.BoxGeometry(4.2, 0.4, 0.1),
                  new THREE.MeshStandardMaterial({ color: 'peru' }),
                ]}
              ></StaticBoxMesh>
              <StaticBoxMesh
                name="bottom-wall-front"
                position={[0, -1.9, -0.55]}
                args={[
                  new THREE.BoxGeometry(4.2, 0.4, 0.1),
                  new THREE.MeshStandardMaterial({ color: 'peru' }),
                ]}
              ></StaticBoxMesh>
            </group>

            <StaticBoxMesh
              name="left-wall"
              position={[2, 0.3, 0]}
              rotation={[0, 0, Math.PI / 2]}
              args={[
                new THREE.BoxGeometry(4.4, 0.2, 1),
                new THREE.MeshStandardMaterial({ color: 'orange' }),
              ]}
            ></StaticBoxMesh>

            <StaticBoxMesh
              name="right-wall"
              position={[-2, 0.1, 0]}
              rotation={[0, 0, Math.PI / 2]}
              args={[
                new THREE.BoxGeometry(4, 0.2, 1),
                new THREE.MeshStandardMaterial({ color: 'orange' }),
              ]}
            ></StaticBoxMesh>

            <group name="top-wall">
              <StaticBoxMesh
                name="top-wall-base"
                position={[0.28, 2.1, 0]}
                rotation={[0, 0, Math.PI / 24]}
                args={[
                  new THREE.BoxGeometry(3.3, 0.1, 1),
                  new THREE.MeshStandardMaterial({ color: 'orange' }),
                ]}
              ></StaticBoxMesh>
              <StaticBoxMesh
                name="top-wall-back"
                position={[0, 2.1, 0.55]}
                rotation={[0, 0, Math.PI / 24]}
                args={[
                  new THREE.BoxGeometry(4.2, 0.2, 0.1),
                  new THREE.MeshStandardMaterial({ color: 'peru' }),
                ]}
              ></StaticBoxMesh>
              <StaticBoxMesh
                name="top-wall-front"
                position={[0, 2.1, -0.55]}
                rotation={[0, 0, Math.PI / 24]}
                args={[
                  new THREE.BoxGeometry(4.2, 0.2, 0.1),
                  new THREE.MeshStandardMaterial({ color: 'peru' }),
                ]}
              ></StaticBoxMesh>
            </group>

            <group name="second-top-wall">
              <StaticBoxMesh
                name="second-top-wall-base"
                position={[-0.25, 1.2, 0]}
                rotation={[0, 0, -Math.PI / 24]}
                args={[
                  new THREE.BoxGeometry(3.3, 0.1, 0.7),
                  new THREE.MeshStandardMaterial({ color: 'orange' }),
                ]}
              ></StaticBoxMesh>
              <StaticBoxMesh
                name="second-top-wall-back"
                position={[0, 1.2, 0.4]}
                rotation={[0, 0, -Math.PI / 24]}
                args={[
                  new THREE.BoxGeometry(4.2, 0.2, 0.1),
                  new THREE.MeshStandardMaterial({ color: 'peru' }),
                ]}
              ></StaticBoxMesh>
              <StaticBoxMesh
                name="second-top-wall-front"
                position={[0, 1.2, -0.4]}
                rotation={[0, 0, -Math.PI / 24]}
                args={[
                  new THREE.BoxGeometry(4.2, 0.2, 0.1),
                  new THREE.MeshStandardMaterial({ color: 'peru' }),
                ]}
              ></StaticBoxMesh>
            </group>

            <group name="third-top-wall">
              <StaticBoxMesh
                name="third-top-wall-base"
                position={[0.25, 0.2, 0]}
                rotation={[0, 0, Math.PI / 24]}
                args={[
                  new THREE.BoxGeometry(3.3, 0.1, 0.7),
                  new THREE.MeshStandardMaterial({ color: 'orange' }),
                ]}
              ></StaticBoxMesh>
              <StaticBoxMesh
                name="third-top-wall-back"
                position={[0, 0.2, 0.4]}
                rotation={[0, 0, Math.PI / 24]}
                args={[
                  new THREE.BoxGeometry(4.2, 0.2, 0.1),
                  new THREE.MeshStandardMaterial({ color: 'peru' }),
                ]}
              ></StaticBoxMesh>
              <StaticBoxMesh
                name="third-top-wall-front"
                position={[0, 0.2, -0.4]}
                rotation={[0, 0, Math.PI / 24]}
                args={[
                  new THREE.BoxGeometry(4.2, 0.2, 0.1),
                  new THREE.MeshStandardMaterial({ color: 'peru' }),
                ]}
              ></StaticBoxMesh>
            </group>

            <group name="fourth-top-wall">
              <StaticBoxMesh
                name="fourth-top-wall-base"
                position={[-0.25, -0.8, 0]}
                rotation={[0, 0, -Math.PI / 24]}
                args={[
                  new THREE.BoxGeometry(3.3, 0.1, 0.7),
                  new THREE.MeshStandardMaterial({ color: 'orange' }),
                ]}
              ></StaticBoxMesh>
              <StaticBoxMesh
                name="fourth-top-wall-back"
                position={[0, -0.8, 0.4]}
                rotation={[0, 0, -Math.PI / 24]}
                args={[
                  new THREE.BoxGeometry(4.2, 0.2, 0.1),
                  new THREE.MeshStandardMaterial({ color: 'peru' }),
                ]}
              ></StaticBoxMesh>
              <StaticBoxMesh
                name="fourth-top-wall-front"
                position={[0, -0.8, -0.4]}
                rotation={[0, 0, -Math.PI / 24]}
                args={[
                  new THREE.BoxGeometry(4.2, 0.2, 0.1),
                  new THREE.MeshStandardMaterial({ color: 'peru' }),
                ]}
              ></StaticBoxMesh>
            </group>

            <group name="fifth-top-wall">
              <StaticBoxMesh
                name="fifth-top-wall-base"
                position={[0.28, -1.8, 0]}
                rotation={[0, 0, Math.PI / 24]}
                args={[
                  new THREE.BoxGeometry(3.3, 0.1, 0.7),
                  new THREE.MeshStandardMaterial({ color: 'orange' }),
                ]}
              ></StaticBoxMesh>
              <StaticBoxMesh
                name="fifth-top-wall-back"
                position={[0.28, -1.8, 0.4]}
                rotation={[0, 0, Math.PI / 24]}
                args={[
                  new THREE.BoxGeometry(3.3, 0.2, 0.1),
                  new THREE.MeshStandardMaterial({ color: 'peru' }),
                ]}
              ></StaticBoxMesh>
              <StaticBoxMesh
                name="fifth-top-wall-front"
                position={[0.28, -1.8, -0.4]}
                rotation={[0, 0, Math.PI / 24]}
                args={[
                  new THREE.BoxGeometry(3.3, 0.2, 0.1),
                  new THREE.MeshStandardMaterial({ color: 'peru' }),
                ]}
              ></StaticBoxMesh>
            </group>
          </group>
        </Debug>
      </Physics>
    </>
  );
};
