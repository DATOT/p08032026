export function generateCracks(svg: SVGSVGElement) {
  /* ===== Utilities ===== */
  const rand = (min: number, max: number) =>
    Math.random() * (max - min) + min

  const randAngle = () =>
    Math.random() < 0.5 ? rand(-75, -40) : rand(40, 75)

  const clampAngle = (a: number, base: number, maxDrift: number) => {
    let d = ((a - base + 180) % 360) - 180
    return base + Math.max(-maxDrift, Math.min(maxDrift, d))
  }

  /* ===== SVG helpers ===== */
  const MAX_PATHS = 60
  let pathCount = 0
  let fragment = document.createDocumentFragment()

  const makePath = (d: string, cls: string) => {
    if (pathCount >= MAX_PATHS) return
    pathCount++

    const p = document.createElementNS("http://www.w3.org/2000/svg", "path")
    p.setAttribute("d", d)
    p.setAttribute("class", `crack ${cls}`)
    fragment.appendChild(p)
  }

  /* ===== Core ===== */
  let cx = rand(40, 60)
  let cy = rand(40, 60)

  function generateCrack(
    x: number,
    y: number,
    angle: number,
    cls: string,
    depth = 0
  ) {
    if (pathCount >= MAX_PATHS) return

    let d = `M ${x} ${y}`
    const baseAngle = angle
    const steps = rand(12, 22)
    let hold = Math.floor(rand(2, 5))

    for (let i = 0; i < steps; i++) {
      if (hold-- <= 0) {
        const energy = 1 - i / steps
        angle += randAngle() * energy
        angle = clampAngle(angle, baseAngle, 85)
        hold = Math.floor(rand(2, 6))
      }

      const step = rand(1.8, 3.2)
      const nx = x + Math.cos((angle * Math.PI) / 180) * step
      const ny = y + Math.sin((angle * Math.PI) / 180) * step

      if (nx <= 0 || nx >= 100 || ny <= 0 || ny >= 100) break

      x = nx
      y = ny
      d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`

      if (depth === 0 && Math.random() < 0.08) {
        generateCrack(x, y, angle + rand(-45, 45), cls, 1)
      }
    }

    makePath(d, cls)
  }

  svg.innerHTML = ""
  fragment = document.createDocumentFragment()
  pathCount = 0

  const randomEdge = () => {
    const s = Math.floor(rand(0, 4))
    return [
      { x: rand(0, 100), y: 0 },
      { x: 100, y: rand(0, 100) },
      { x: rand(0, 100), y: 100 },
      { x: 0, y: rand(0, 100) },
    ][s]
  }

  const towardCenter = (x: number, y: number) =>
    (Math.atan2(cy - y, cx - x) * 180) / Math.PI + rand(-30, 30)

  for (let i = 0; i < 6; i++) {
    const p = randomEdge()
    generateCrack(p.x, p.y, towardCenter(p.x, p.y), "c1")
  }

  for (let i = 0; i < 10; i++) {
    const p = randomEdge()
    generateCrack(p.x, p.y, towardCenter(p.x, p.y), "c2")
  }

  for (let i = 0; i < 16; i++) {
    const p = randomEdge()
    generateCrack(p.x, p.y, towardCenter(p.x, p.y), "c3")
  }

  svg.appendChild(fragment)
}
