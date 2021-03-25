import React, { useRef } from "react"
import { useFrame } from "react-three-fiber"
import { Mesh } from "three"

const Box = (props) => {
  const mesh = useRef<Mesh>()

  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01
  })

  return (
    <mesh {...props} ref={mesh}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"orange"} />
    </mesh>
  )
}

export default Box
