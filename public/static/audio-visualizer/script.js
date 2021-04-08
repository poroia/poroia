/**
 * Inspired by:
 *  How To Use Web Audio API To Play The Guitar
 *  - by WebDevSimplified
 *  - https://www.youtube.com/watch?v=eEeUFB1iIDo
 *
 * TODO: https://www.youtube.com/watch?v=laCjGMhASp8
 */

const volume = document.querySelector("#volume")
const bass = document.querySelector("#bass")
const mid = document.querySelector("#mid")
const treble = document.querySelector("#treble")
const visualizer = document.querySelector("#visualizer")

const audio = document.querySelector("#audio")
const context = new AudioContext()
const analyserNode = new AnalyserNode(context, { fftSize: 256 })
const gainNode = new GainNode(context, { gain: volume.value })
const bassEQ = new BiquadFilterNode(context, {
  type: "lowshelf",
  frequency: 500,
  gain: bass.value,
})
const midEQ = new BiquadFilterNode(context, {
  type: "peaking",
  Q: Math.SQRT1_2,
  frequency: 1500,
  gain: mid.value,
})
const trebleEQ = new BiquadFilterNode(context, {
  type: "highshelf",
  frequency: 3000,
  gain: treble.value,
})

setupEventListeners()
resize()
drawVisualizer()

function setupEventListeners() {
  window.addEventListener("resize", resize)
  window.addEventListener("hashchange", resize)

  audio.addEventListener("play", setupContext)

  volume.addEventListener("input", (e) => {
    const value = parseFloat(e.target.value)
    gainNode.gain.setTargetAtTime(value, context.currentTime, 0.01)
  })

  bass.addEventListener("input", (e) => {
    const value = parseInt(e.target.value)
    bassEQ.gain.setTargetAtTime(value, context.currentTime, 0.01)
  })

  mid.addEventListener("input", (e) => {
    const value = parseInt(e.target.value)
    midEQ.gain.setTargetAtTime(value, context.currentTime, 0.01)
  })

  treble.addEventListener("input", (e) => {
    const value = parseInt(e.target.value)
    trebleEQ.gain.setTargetAtTime(value, context.currentTime, 0.01)
  })
}

async function setupContext() {
  if (context.state === "suspended") {
    await context.resume()
  }
  const source = context.createMediaElementSource(audio)
  source
    .connect(bassEQ)
    .connect(midEQ)
    .connect(trebleEQ)
    .connect(gainNode)
    .connect(analyserNode)
    .connect(context.destination)
}

function drawVisualizer() {
  requestAnimationFrame(drawVisualizer)

  const bufferLength = analyserNode.frequencyBinCount
  const dataArray = new Uint8Array(bufferLength)
  analyserNode.getByteFrequencyData(dataArray)
  const { width, height } = visualizer
  const barWidth = width / bufferLength

  const canvasContext = visualizer.getContext("2d")
  canvasContext.clearRect(0, 0, width, height)

  dataArray.forEach((e, i) => {
    const y = ((e / 255) * height) / 2
    const x = barWidth * i

    canvasContext.fillStyle = `hsl(${(y / height) * 400}, 100%, 50%)`
    canvasContext.fillRect(x, height - y, barWidth, y)
  })
}

function resize() {
  visualizer.width = visualizer.clientWidth * window.devicePixelRatio
  visualizer.height = visualizer.clientHeight * window.devicePixelRatio
}
