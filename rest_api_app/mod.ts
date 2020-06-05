import { Application } from "https://deno.land/x/oak/mod.ts";
const env = Deno.env.toObject();
const HOST = env.HOST || "127.0.0.1";
const PORT = env.PORT || 4000;
const app = new Application();
console.log(`API is listening on ${HOST}:${PORT}...`);
app.use((ctx) => {
    ctx.response.body = "Hello World!";
});  
await app.listen(`${HOST}:${PORT}`);