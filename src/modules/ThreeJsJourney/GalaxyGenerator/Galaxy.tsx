import React, { useEffect, useMemo, useRef } from "react"
import { useFrame } from "react-three-fiber"
import { Mesh, Color, AdditiveBlending } from "three"

interface GalaxyProps {
  count: number
  size: number
  radius: number
  branches: number
  spin: number
  randomness: number
  randomnessPower: number
  randomnessRadiusPower: number
  insideColor: string
  outsideColor: string
}

export const Galaxy = (props: GalaxyProps) => {
  const points = useRef<Mesh>()

  const [positions, colors] = useMemo(() => generateAttributes(props), [props])

  useEffect(() => {
    points.current.geometry.attributes.position.needsUpdate = true
    points.current.geometry.attributes.color.needsUpdate = true
  }, [props])

  useFrame((state) => {
    points.current.rotation.y = state.clock.elapsedTime * 0.05
  })

  return (
    <points ref={points} scale={[2 / 3, 2 / 3, 2 / 3]}>
      <pointsMaterial
        size={props.size}
        depthWrite={false}
        blending={AdditiveBlending}
        toneMapped={false}
        vertexColors
      />
      <bufferGeometry>
        <bufferAttribute
          attachObject={["attributes", "position"]}
          array={positions}
          itemSize={3}
          count={positions.length / 3}
        />
        <bufferAttribute
          attachObject={["attributes", "color"]}
          array={colors}
          itemSize={3}
          count={colors.length / 3}
          needsUpdate
        />
      </bufferGeometry>
    </points>
  )
}

const generateAttributes = (
  props: GalaxyProps
): [Float32Array, Float32Array] => {
  let positions = [],
    colors = []

  const colorInside = new Color(props.insideColor)
  const colorOutside = new Color(props.outsideColor)

  for (let i = 0; i < props.count; i++) {
    // position
    const radius =
      Math.pow(Math.random(), props.randomnessRadiusPower) * props.radius
    const spinAngle = radius * props.spin
    const branchAngle = ((i % props.branches) / props.branches) * 2 * Math.PI

    const randomX =
      Math.pow(Math.random(), props.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      props.randomness *
      radius
    const randomY =
      Math.pow(Math.random(), props.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      props.randomness *
      radius
    const randomZ =
      Math.pow(Math.random(), props.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      props.randomness *
      radius

    positions.push(Math.sin(branchAngle + spinAngle) * radius + randomX)
    positions.push(randomY)
    positions.push(Math.cos(branchAngle + spinAngle) * radius + randomZ)

    // Color
    const mixedColor = colorInside.clone()
    mixedColor.lerp(colorOutside, radius / props.radius)

    colors.push(mixedColor.r)
    colors.push(mixedColor.g)
    colors.push(mixedColor.b)
  }
  return [new Float32Array(positions), new Float32Array(colors)]
}
