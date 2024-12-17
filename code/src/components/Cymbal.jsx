// Cymbal.jsx
import { useGLTF } from "@react-three/drei";

export function Cymbal(props) {
  const { nodes, materials } = useGLTF("/models/Cymbal_ao.glb");
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Sphere.geometry} material={materials.phong1SG} />
    </group>
  );
}

useGLTF.preload("/models/Cymbal_ao.glb");
