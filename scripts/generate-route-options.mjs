import fs from 'node:fs'
import path from 'node:path'

const root = 'src/app/(frontend)'
const output = 'src/generated/routeOptions.ts'

function scan(dir, segments = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  const hasPage = entries.some(
    (entry) => /^page\.(tsx|ts|jsx|js)$/.test(entry.name),
  )

  const routes = []

  if (hasPage && !segments.some((segment) => segment.includes('['))) {
    const parts = segments.filter(
      (segment) => !segment.startsWith('('),
    )

    const value = parts.length ? `/${parts.join('/')}` : '/'
    const label = parts.length
      ? parts.map((part) =>
          part.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        ).join(' / ')
      : 'Home'

    routes.push({ label, value })
  }

  for (const entry of entries) {
    if (
      entry.isDirectory() &&
      !entry.name.startsWith('_') &&
      !entry.name.startsWith('@')
    ) {
      routes.push(...scan(path.join(dir, entry.name), [...segments, entry.name]))
    }
  }

  return routes
}

const routes = scan(root)

fs.mkdirSync(path.dirname(output), { recursive: true })

fs.writeFileSync(
  output,
  `export const routeOptions = ${JSON.stringify(routes, null, 2)} as const\n`,
)

console.log(`Generated ${routes.length} routes.`)