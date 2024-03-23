import * as THREE from 'three';

export const ToyMiniCoaster = () => {
  const boxPositions: THREE.Vector3[] = [
    { x: 0, y: 0, z: 0 },
    { x: 0, y: 1, z: 0 },
  ].map(({ x, y, z }) => new THREE.Vector3(x, y, z));
  const boxRotations: THREE.Euler[] = [
    { x: 0, y: 0, z: 45 },
    { x: 0, y: 0, z: 0 },
  ].map(({ x, y, z }) => new THREE.Euler(x, y, z));

  return (
    <>
      <group>
        {boxPositions.map((position, i) => (
          <mesh key={i} position={position} rotation={boxRotations[i]}>
            <boxGeometry args={[3, 0.2, 1]} />
            <meshStandardMaterial color={'orange'} />
          </mesh>
        ))}
      </group>
    </>
  );
};
