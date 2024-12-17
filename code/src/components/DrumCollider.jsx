import { useCallback, useRef } from "react";

// Composant pour détecter les interactions (collisions) sur les tambours
export const DrumCollider = ({
  radius = 0.1, // Rayon du cylindre
  height = 0.1, // Hauteur du cylindre
  position = [0, 0, 0], // Position par défaut
  onHit, // Fonction à appeler lorsqu'une interaction est détectée
  ...props
}) => {
  const isInside = useRef(false); // État pour suivre si la souris est "dans" l'objet

  // Callback appelé lorsque la souris entre dans le cylindre
  const onPointerEnter = useCallback(
    (e) => {
      e.stopPropagation(); // Empêche l'événement de se propager
      if (!isInside.current) {
        onHit(); // Appelle la fonction d'interaction
        isInside.current = true;
      }
    },
    [onHit]
  );

  // Callback appelé lorsque la souris quitte le cylindre
  const onPointerLeave = useCallback(() => {
    isInside.current = false; // Réinitialise l'état
  }, []);

  return (
    <group position={position} {...props}>
      {/* Mesh pour visualiser et détecter les interactions */}
      <mesh
        visible={true} // Visible pour le débogage
        onPointerEnter={onPointerEnter} // Interaction d'entrée
        onPointerLeave={onPointerLeave} // Interaction de sortie
      >
        <cylinderGeometry args={[radius, radius, height, 16]} />
        <meshStandardMaterial color="pink" opacity={0.5} transparent />
      </mesh>
    </group>
  );
};
