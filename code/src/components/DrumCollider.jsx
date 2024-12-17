import { useCallback, useRef } from "react";

export const DrumCollider = ({
  radius = 0.1,
  height = 0.1,
  position = [0, 0, 0], // Position par défaut
  onHit,
  ...props
}) => {
  const isInside = useRef(false);

  const onPointerEnter = useCallback(
    (e) => {
      e.stopPropagation();
      if (!isInside.current) {
        onHit();
        isInside.current = true;
      }
    },
    [onHit]
  );

  const onPointerLeave = useCallback(() => {
    isInside.current = false;
  }, []);

  return (
    <group position={position} {...props}>
      <mesh
        visible={true} // Debugging
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
      >
        <cylinderGeometry args={[radius, radius, height, 16]} />
        <meshStandardMaterial color="pink" opacity={0.5} transparent />
      </mesh>
    </group>
  );
};
