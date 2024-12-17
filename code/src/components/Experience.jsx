import { Gltf, OrbitControls } from "@react-three/drei";
import { Instruments } from "./Instruments";
import { useEffect } from "react";
import { useSong } from "../hooks/useSong";

export const Experience = () => {
  const setPlayNoteFn = useSong((state) => state.setPlayNoteFn);

  useEffect(() => {
    // Initialisation de la fonction playNoteFn pour jouer les sons
    setPlayNoteFn((note) => {
      const audio = new Audio(`/audios/${note.toLowerCase()}.mp3`);
      audio.currentTime = 0; // Revenir au début du son
      audio.play();
      console.log(`Playing note: ${note}`);
    });
  }, [setPlayNoteFn]);

  return (
    <>
      <ambientLight />
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
    </>
  );
};
