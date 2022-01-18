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
