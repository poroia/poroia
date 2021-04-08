const withTM = require("next-transpile-modules")([
  "three",
  "@react-three/drei",
  "postprocessing",
])

module.exports = withTM({
  redirects: async () => [
    {
      source: "/sketch/:slug/",
      destination: "/sketch/:slug/index.html",
      permanent: true,
    },
    {
      source: "/test/lol",
      destination: "/test",
      permanent: false,
    },
  ],
})
