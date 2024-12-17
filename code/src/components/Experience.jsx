import { Gltf, OrbitControls } from "@react-three/drei";
import { Instruments } from "./Instruments";
import { useEffect } from "react";
import { useSong } from "../hooks/useSong";

// Composant principal pour la scène 3D
export const Experience = () => {
  const setPlayNoteFn = useSong((state) => state.setPlayNoteFn);

  // Initialisation de la fonction de lecture des sons
  useEffect(() => {
    // Configuration de la fonction qui jouera les sons en fonction des notes
    setPlayNoteFn((note) => {
      const audio = new Audio(`/audios/${note.toLowerCase()}.mp3`); // Chemin vers le fichier audio
      audio.currentTime = 0; // Redémarre le son au début
      audio.play();
      console.log(`Playing note: ${note}`); // Affiche la note dans la console
    });
  }, [setPlayNoteFn]);

  return (
    <>
      {/* Contrôles pour naviguer dans la scène 3D */}
      <OrbitControls />

      {/* Lumière ambiante */}
      <ambientLight />

      {/* Groupe contenant les éléments principaux de la scène */}
      <group position={[0, 0, 3]}>
        {/* Chargement du modèle 3D principal */}
        <Gltf src="models/vrSCENE0.glb" receiveShadow />
        <Instruments /> {/* Composant pour les instruments */}
      </group>

      {/* Lumière directionnelle avec ombres */}
      <directionalLight
        intensity={2.5} // Intensité de la lumière
        position={[5, 2, 2]} // Position de la source lumineuse
        shadow-radius={5} // Rayon des ombres
        castShadow
      />

      {/* Arrière-plan ou environnement */}
      <Gltf scale={[0.6, 0.6, 0.6]} src="models/LightBlueSky.glb" />
    </>
  );
};
