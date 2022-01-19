// import JSON file to use `import` keyword
// exec 'deno run --allow-read main.ts'
import file from "./version.json" assert { type: "json" };
console.log(file.version);

const module = await import("./version.json", {
  assert: { type: "json" },
});
console.log(module.default.version);
