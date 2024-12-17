import { Gltf, OrbitControls } from "@react-three/drei";
import { Instruments } from "./Instruments";

export const Experience = () => {
  return (
    <>
      <ambientLight />
      <OrbitControls />
      {/* <DirectionalLight castShadow position={[5, 5, 2]} /> */}

      <group position={[0, 0, 3]}>
        <Gltf src="models/vrSCENE0.glb" receiveShadow />
        <Instruments />
      </group>

      <directionalLight
        intensity={2.5}
        position={[5, 2, 2]}
        shadow-radius={5}
        castShadow
      />
      <Gltf scale={[0.6, 0.6, 0.6]} src="models/LightBlueSky.glb" />
      {/* <mesh>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh> */}
    </>
  );
};
