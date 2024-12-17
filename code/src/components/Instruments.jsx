import React, { memo, useMemo, useCallback } from "react";
import { Cymbal } from "./Cymbal";
import { Drum } from "./Drum";
import { DrumCollider } from "./DrumCollider";
import { NOTES_COLORS, useSong } from "../hooks/useSong";

export const Instruments = memo(() => {
  // Récupération de la fonction playNote depuis le store zustand
  const playNote = useSong((state) => state.playNote);

  // Fonction callback pour les collisions de chaque instrument
  const onHitCymbal = useCallback(() => {
    playNote("Crash");
  }, [playNote]);

  const onHitMiddle = useCallback(() => {
    playNote("Middle");
  }, [playNote]);

  const onHitSide = useCallback(() => {
    playNote("Side");
  }, [playNote]);

  const instruments = useMemo(
    () => ({
      cymbal: <Cymbal scale={0.8} />,
      middle: <Drum color={NOTES_COLORS["Middle"]} scale={0.02} />,
      side: <Drum color={NOTES_COLORS["Side"]} scale={0.02} />,
    }),
    []
  );

  return (
    <group>
      {/* Cymbal avec DrumCollider */}
      <group position={[0.1, 0.5, 0.5]}>
        <DrumCollider radius={0.3} height={0.5} onHit={onHitCymbal} />
        {instruments.cymbal}
      </group>

      {/* Middle Drum avec DrumCollider */}
      <group position={[0.2, 0.2, 0.5]}>
        <DrumCollider radius={0.3} height={0.5} onHit={onHitMiddle} />
        {instruments.middle}
      </group>

      {/* Side Drum avec DrumCollider */}
      <group position={[-0.1, 0.2, 0.5]}>
        <DrumCollider radius={0.3} height={0.5} onHit={onHitSide} />
        {instruments.side}
      </group>
    </group>
  );
});
