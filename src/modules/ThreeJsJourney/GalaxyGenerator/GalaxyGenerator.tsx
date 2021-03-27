import React, { HTMLAttributes } from "react"
import { Canvas } from "react-three-fiber"
import { useTweaks } from "use-tweaks"
import Box from "./Box"

interface GalaxyGeneratorProps {
  rootProps: HTMLAttributes<HTMLElement>
}

const GalaxyGenerator = (props: GalaxyGeneratorProps) => {
  const tweaks = useTweaks({
    positionX1: { value: -1.2, min: -4, max: 4 },
    positionX2: { value: 1.2, min: -4, max: 4 },
  })

  console.log(tweaks)

  return (
    <Canvas {...props.rootProps}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Box position={[tweaks.positionX1, 0, 0]} />
      <Box position={[tweaks.positionX2, 0, 0]} />
    </Canvas>
  )
}

export default GalaxyGenerator
