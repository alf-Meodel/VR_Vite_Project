// Instruments.jsx
import React, { memo, useMemo } from "react";
import { Cymbal } from "./Cymbal";
import { Drum } from "./Drum";
import { NOTES_COLORS } from "../hooks/useSong";

export const Instruments = memo(() => {
  const instruments = useMemo(
    () => ({
      cymbal: <Cymbal scale={1.6} />,
      middle: <Drum color={NOTES_COLORS["Middle"]} scale={0.06} />,
      side: <Drum color={NOTES_COLORS["Side"]} scale={0.04} />,
    }),
    []
  );

  return (
    <group>
      <group position={[0, 1, 0]}>{instruments.cymbal}</group>
      <group position={[1, 1, 0]}>{instruments.middle}</group>
      <group position={[0, 1, 1]}>{instruments.side}</group>
    </group>
  );
});
