const withTM = require("next-transpile-modules")([
  "three",
  "@react-three/drei",
  "postprocessing",
])

module.exports = withTM({
  redirects: async () => [
    {
      source: "/static/:slug*",
      destination: "/static/:slug*/index.html",
      permanent: true,
    },
    {
      source: "/test/lol",
      destination: "/test",
      permanent: false,
    },
  ],
})
