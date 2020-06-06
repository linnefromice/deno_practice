import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./router.ts";

const env = Deno.env.toObject();
const HOST = env.HOST || "127.0.0.1";
const PORT = env.PORT || 4000;
const app = new Application();
console.log(`API is listening on ${HOST}:${PORT}...`);

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen(`${HOST}:${PORT}`);