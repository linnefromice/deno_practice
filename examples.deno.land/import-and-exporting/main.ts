import { sayHello } from "./utils.ts"
sayHello("World")

import * as utils from "./utils.ts"
utils.sayHello("World (from pkg)")

import { VERSION } from "https://deno.land/std/version.ts"
console.log(VERSION)