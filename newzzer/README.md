# newzzer

## package structure

- mod.ts ... entry point
- api.ts ... logic for communicating to news api
- type.d.ts ... interface definition
- deps.ts ... store all our imports from external dependencies
- error.ts ... help & error handling

## command

- set API_KEY to .newzzer.json
  - deno run --allow-read --allow-write --allow-env mod.ts --config "API_KEY_HERE"
- get API_KEY from .newzzer.json
  - deno run --allow-read --allow-write --allow-env mod.ts
- execute API
  - deno run --allow-net --allow-read --allow-write --allow-env mod.ts --category technology

## memo

- the name of main file is generally mod.ts
- Every CLI is incomplete without a help message

## Reference

- [Medium - Creating your first News CLI app using Deno](https://medium.com/javascript-in-plain-english/creating-your-first-news-cli-app-using-deno-e1470398c627)