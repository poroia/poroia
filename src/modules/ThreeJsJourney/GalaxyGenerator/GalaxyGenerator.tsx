import React, { useRef, HTMLProps } from "react"
import { Canvas } from "react-three-fiber"
import { OrbitControls } from "@react-three/drei"
import { useTweakpane } from "../../../common/hooks"
import styles from "./GalaxyGenerator.module.scss"

import { Galaxy } from "./Galaxy"

export const GalaxyGenerator = (props: HTMLProps<HTMLElement>) => {
  const debugContainer = useRef<HTMLDivElement>()
  // prettier-ignore
  const [tweaks] = useTweakpane(
    {
      count: { value: 100000, min: 10000, max: 1000000, step: 10000, onEventType: "finishChange", label: "count (laggy)" },
      size: { value: 0.01, min: 0.001, max: 0.05, step: 0.0001, onEventType: "finishChange", label: "size (laggy)" },
      radius: { value: 5, min: 0.01, max: 20, step: 0.01, onEventType: "finishChange" },
      branches: { value: 3, min: 2, max: 20, step: 1, onEventType: "finishChange" },
      spin: { value: 1, min: -5, max: 5, step: 0.01, onEventType: "finishChange" },
      randomness: { value: 0.5, min: 0, max: 2, step: 0.01, onEventType: "finishChange" },
      randomnessBranchPower: { value: 3, min: 1, max: 10, step: 0.01, onEventType: "finishChange" },
      randomnessRadiusPower: { value: 1.5, min: 1, max: 10, step: 0.01, onEventType: "finishChange" },
      insideColor: "#ff6030",
      outsideColor: "#1b3984",
    },
    { title: "Customization", expanded: false, container: debugContainer }
  )

  return (
    <>
      <Canvas
        concurrent
        gl={{ antialias: false }}
        camera={{ position: [2.75, 2.75, 2.75], fov: 75, near: 0.1, far: 100 }}
        colorManagement={false}
        onCreated={({ gl }) => {
          gl.setClearColor("black")
        }}
        {...props}
      >
        <Galaxy {...tweaks} />
        <OrbitControls enableDamping />
      </Canvas>
      <div className={styles.debug__wrapper}>
        <div ref={debugContainer} className={styles.debug} />
      </div>
    </>
  )
}
