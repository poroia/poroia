import React, { HTMLAttributes } from "react"
import { Canvas } from "react-three-fiber"
import useTweakpane from '../../../common/hooks/useTweakpane'
import Box from "./Box"

interface GalaxyGeneratorProps extends HTMLAttributes<HTMLElement> {}

const GalaxyGenerator = (props: GalaxyGeneratorProps) => {
  // const tweaks = useTweakpane()

  return (
    <Canvas {...props}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
    </Canvas>
  )
}

export default GalaxyGenerator
