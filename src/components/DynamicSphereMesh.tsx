import { useSphere } from '@react-three/cannon';
import { MeshProps } from '@react-three/fiber';
import * as THREE from 'three';

const SphereMesh = (meshProps: MeshProps) => {
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

export const DynamicSphereMesh = (props: MeshProps): JSX.Element => {
  return (
    <SphereMesh
      name="ball"
      position={props.position}
      args={[
        new THREE.SphereGeometry(0.2, 10, 10),
        new THREE.MeshStandardMaterial({ color: 'red' }),
      ]}
    ></SphereMesh>
  );
};
