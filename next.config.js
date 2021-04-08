const withTM = require("next-transpile-modules")([
  "three",
  "@react-three/drei",
  "postprocessing",
])

module.exports = {
  redirects: async () => [
    {
      source: "/sketch/:slug/index.html",
      destination: "/sketch/:slug",
      permanent: true,
    },
    {
      source: "/test/lol",
      destination: "/test",
      permanent: false,
    },
  ],
  withTM,
}
