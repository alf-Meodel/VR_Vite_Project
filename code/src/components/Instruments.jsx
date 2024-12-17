// Instruments.jsx
import React, { memo, useMemo } from "react";
import { Cymbal } from "./Cymbal";
import { Drum } from "./Drum";

export const Instruments = memo(() => {
  const instruments = useMemo(
    () => ({
      cymbal: <Cymbal scale={1.6} />,
      middle: <Drum scale={0.06} />,
      side: <Drum scale={0.04} />,
    }),
    []
  );

  return (
    <group>
      <group position={[0, 1, 0]}>{instruments.cymbal}</group>
    </group>
  );
});
