await Deno.mkdir("new_dir")
await Deno.mkdir("./dir/dir2/subbir", { recursive: true })

await Deno.remove("./new_dir")
await Deno.remove("./dir", { recursive: true })

Deno.mkdirSync("new_dir")
Deno.removeSync("new_dir")
