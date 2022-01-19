// example of a HTTP server that handles requests with different responses based on the incoming URL

import { serve } from "https://deno.land/std@0.114.0/http/server.ts"

const BOOK_ROUTE = new URLPattern({ pathname: "/books/:id" })

function handler(req: Request): Response {
  console.log("Received request...")
  const match = BOOK_ROUTE.exec(req.url)

  if (match) {
    const id = match.pathname.groups.id
    return new Response(`Book ${id}`)
  }

  return new Response("Not found (try /books/1)", {
    status: 404
  })
}

console.log("Listening on https://localhost:8000")
serve(handler)
