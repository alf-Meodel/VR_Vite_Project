// Drum.jsx
import { useGLTF } from "@react-three/drei";

export function Drum({ color, ...props }) {
  const { nodes, materials } = useGLTF("/models/Drum_ao.glb");
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Drum_Circle002_1.geometry}>
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh
        geometry={nodes.Drum_Circle002_1_1.geometry}
        material={materials.DD9944}
      />
      <mesh
        geometry={nodes.Drum_Circle002_1_2.geometry}
        material={materials["455A64"]}
      />
    </group>
  );
}

useGLTF.preload("/models/Drum_ao.glb");
