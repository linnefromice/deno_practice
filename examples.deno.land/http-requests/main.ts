let resp;
const _url = "https://example.com"
resp = await fetch(_url)

console.log(resp.status)
console.log(resp.headers.get("Content-Type"))
console.log(await resp.text())

resp = await fetch(_url)
console.log(await resp.arrayBuffer())
// resp = await fetch(_url)
// console.log(await resp.json())
resp = await fetch(_url)
console.log(await resp.blob())

resp = await fetch(_url)
for await (const chunk of resp.body!) {
  console.log("chuck", chunk)
}

const body = `{ "name": "Deno" }`
resp = await fetch(_url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-API-Key": "foobar"
  },
  body
})
console.log(await resp.text())
// console.log(await resp.json())

// `fetch` also accepts a `Request` object instead of URL + options
const req = new Request("https://example.com", {
  method: "DELETE",
});
resp = await fetch(req)

const url = "https://example.com"
new Request(url, {
  method: "POST",
  body: new Uint8Array([1,2,3])
})
new Request(url, {
  method: "POST",
  body: new Blob(["Hello, World!"])
})
new Request(url, {
  method: "POST",
  body: new URLSearchParams({ "foo": "bar" })
})

const formData = new FormData()
formData.append("name", "Deno")
formData.append("file", new Blob(["Hello, World"]), "hello.txt")
resp = await fetch("https://example.com", {
  method: "POST",
  body: formData
})

// Fetch also supports streaming the request body.
const bodyStream = new ReadableStream({
  start(controller) {
    controller.enqueue("Hello, World!")
    controller.close()
  }
})
resp = await fetch("https://example.com", {
  method: "POST",
  body: bodyStream
})
