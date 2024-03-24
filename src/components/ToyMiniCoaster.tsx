export const ToyMiniCoaster = (): JSX.Element => {
  return (
    <>
      <group name="lighting">
        <directionalLight position={[5, 5, 3]} intensity={2} />
        <directionalLight position={[-5, -5, -3]} intensity={2} />
      </group>
      <group name="mini-coaster">
        <group name="bottom-wall" position={[0, -2, 0]}>
          <mesh name="bottom-wall-base" position={[0, 0, 0]}>
            <boxGeometry args={[4.2, 0.2, 1]} />
            <meshStandardMaterial color={'orange'} />
          </mesh>
          <mesh name="bottom-wall-back" position={[0, 0.1, 0.55]}>
            <boxGeometry args={[4.2, 0.4, 0.1]} />
            <meshStandardMaterial color={'peru'} />
          </mesh>
          <mesh name="bottom-wall-front" position={[0, 0.1, -0.55]}>
            <boxGeometry args={[4.2, 0.4, 0.1]} />
            <meshStandardMaterial color={'peru'} />
          </mesh>
        </group>

        <mesh name="left-wall" position={[2, 0.3, 0]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[4.4, 0.2, 1]} />
          <meshStandardMaterial color={'orange'} />
        </mesh>
        <mesh name="right-wall" position={[-2, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[4, 0.2, 1]} />
          <meshStandardMaterial color={'orange'} />
        </mesh>

        <group name="top-wall" position={[0, 2.1, 0]} rotation={[0, 0, Math.PI / 24]}>
          <mesh name="top-wall-base" position={[0.25, 0, 0]}>
            <boxGeometry args={[3.3, 0.1, 0.7]} />
            <meshStandardMaterial color={'orange'} />
          </mesh>
          <mesh name="top-wall-back" position={[0, 0, 0.4]}>
            <boxGeometry args={[4.2, 0.2, 0.1]} />
            <meshStandardMaterial color={'peru'} />
          </mesh>
          <mesh name="top-wall-front" position={[0, 0, -0.4]}>
            <boxGeometry args={[4.2, 0.2, 0.1]} />
            <meshStandardMaterial color={'peru'} />
          </mesh>
        </group>

        <group name="second-top-wall" position={[0, 1.2, 0]} rotation={[0, 0, -Math.PI / 24]}>
          <mesh name="second-top-wall-base" position={[-0.25, 0, 0]}>
            <boxGeometry args={[3.3, 0.1, 0.7]} />
            <meshStandardMaterial color={'orange'} />
          </mesh>
          <mesh name="second-top-wall-back" position={[0, 0, 0.4]}>
            <boxGeometry args={[4.2, 0.2, 0.1]} />
            <meshStandardMaterial color={'peru'} />
          </mesh>
          <mesh name="second-top-wall-front" position={[0, 0, -0.4]}>
            <boxGeometry args={[4.2, 0.2, 0.1]} />
            <meshStandardMaterial color={'peru'} />
          </mesh>
        </group>

        <group name="third-top-wall" position={[0, 0.2, 0]} rotation={[0, 0, Math.PI / 24]}>
          <mesh name="third-top-wall-base" position={[0.25, 0, 0]}>
            <boxGeometry args={[3.3, 0.1, 0.7]} />
            <meshStandardMaterial color={'orange'} />
          </mesh>
          <mesh name="third-top-wall-back" position={[0, 0, 0.4]}>
            <boxGeometry args={[4.2, 0.2, 0.1]} />
            <meshStandardMaterial color={'peru'} />
          </mesh>
          <mesh name="third-top-wall-front" position={[0, 0, -0.4]}>
            <boxGeometry args={[4.2, 0.2, 0.1]} />
            <meshStandardMaterial color={'peru'} />
          </mesh>
        </group>

        <group name="fourth-top-wall" position={[0, -0.8, 0]} rotation={[0, 0, -Math.PI / 24]}>
          <mesh name="fourth-top-wall-base" position={[-0.25, 0, 0]}>
            <boxGeometry args={[3.3, 0.1, 0.7]} />
            <meshStandardMaterial color={'orange'} />
          </mesh>
          <mesh name="fourth-top-wall-back" position={[0, 0, 0.4]}>
            <boxGeometry args={[4.2, 0.2, 0.1]} />
            <meshStandardMaterial color={'peru'} />
          </mesh>
          <mesh name="fourth-top-wall-front" position={[0, 0, -0.4]}>
            <boxGeometry args={[4.2, 0.2, 0.1]} />
            <meshStandardMaterial color={'peru'} />
          </mesh>
        </group>

        <group name="fifth-top-wall" position={[0.28, -1.8, 0]} rotation={[0, 0, Math.PI / 24]}>
          <mesh name="fifth-top-wall-base" position={[0, 0, 0]}>
            <boxGeometry args={[3.3, 0.1, 0.7]} />
            <meshStandardMaterial color={'orange'} />
          </mesh>
          <mesh name="fifth-top-wall-back" position={[0, 0, 0.4]}>
            <boxGeometry args={[3.3, 0.2, 0.1]} />
            <meshStandardMaterial color={'peru'} />
          </mesh>
          <mesh name="fifth-top-wall-front" position={[0, 0, -0.4]}>
            <boxGeometry args={[3.3, 0.2, 0.1]} />
            <meshStandardMaterial color={'peru'} />
          </mesh>
        </group>
      </group>
    </>
  );
};
