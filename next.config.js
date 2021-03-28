const withTM = require("next-transpile-modules")([
  "three",
  "@react-three/drei",
  "postprocessing",
])

module.exports = withTM()
