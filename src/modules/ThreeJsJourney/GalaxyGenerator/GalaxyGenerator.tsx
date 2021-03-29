import React, { HTMLProps } from "react"
import { Canvas } from "react-three-fiber"
import { OrbitControls } from "@react-three/drei"
// import { useTweaks } from "use-tweaks"
import useDatGui from "../../../common/hooks/useDatGui"

import { Galaxy } from "./Galaxy"

export const GalaxyGenerator = (props: HTMLProps<HTMLElement>) => {
  const tweaks = useDatGui(
    {
      count: { value: 100000, min: 100, max: 1000000, step: 100 },
      size: { value: 0.01, min: 0.001, max: 0.05, step: 0.0001 },
      radius: { value: 5, min: 0.01, max: 20, step: 0.01 },
      branches: { value: 3, min: 2, max: 20, step: 1 },
      spin: { value: 1, min: -5, max: 5, step: 0.001 },
      randomness: { value: 0.5, min: 0, max: 2 },
      randomnessBranchPower: { value: 3, min: 1, max: 10, step: 0.001 },
      randomnessRadiusPower: { value: 1.5, min: 1, max: 10, step: 0.001 },
      insideColor: "#ff6030",
      outsideColor: "#1b3984",
    },
    { width: 360 }
  )

  return (
    <Canvas
      concurrent
      gl={{ antialias: false }}
      camera={{ position: [3, 3, 3], fov: 75, near: 0.1, far: 100 }}
      colorManagement={false}
      onCreated={({ gl }) => {
        gl.setClearColor("black")
      }}
      {...props}
    >
      <Galaxy {...tweaks} />
      <OrbitControls enableDamping />
    </Canvas>
  )
}