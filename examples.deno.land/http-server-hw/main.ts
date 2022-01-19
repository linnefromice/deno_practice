import { serve } from "https://deno.land/std@0.119.0/http/server.ts"

function handler(_req: Request): Response {
  console.log("Received request...")
  return new Response("Hello, World!")
}

console.log("Listening on http://localhost:8000")
serve(handler)
