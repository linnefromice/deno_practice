const bytes = new Uint8Array([72, 101, 108, 108, 111]) // H e l l o
await Deno.writeFile("hello.txt", bytes, { mode: 0o644 }) // Hello

await Deno.writeTextFile("hello.txt", "Hello World") // Hello World

const file = await Deno.create("hello.txt") // (vacant)

const written = await file.write(bytes) // Hello
console.log(`${written} bytes written.`)

import { writeAll } from "https://deno.land/std/streams/conversion.ts"
await writeAll(file, new TextEncoder().encode("World!")) // append "World!"

file.close()

Deno.writeFileSync("hello.txt", bytes)
Deno.writeTextFileSync("hello.txt", "Hello World")

const f = Deno.createSync("hello.txt")
import { writeAllSync } from "https://deno.land/std/streams/conversion.ts"
writeAllSync(f, new TextEncoder().encode("World!")) // World
f.close()
