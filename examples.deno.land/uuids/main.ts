// UUIDs (universally unique identifier) can be used to uniquely identify some object or data.
// a random UUID can be generated using the builtin Web Cryptography API
// This type of UUID is also known as `UUID v4`
const _uuid = crypto.randomUUID();
console.log("Random UUID: ", _uuid)

import * as uuid from "https://deno.land/std@0.119.0/uuid/mod.ts"

console.log(uuid.validate("not a UUID")) // -> false
console.log(uuid.validate("6ec0bd7f-11c0-43da-975e-2a8ad9ebae0")) // -> false (8-4-4-4-11)
console.log(uuid.validate("6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b")) // -> true (8-4-4-4-12)

// a time-based (v1) UUID
console.log(uuid.v1.generate())

// SHA-1 namespaced (v5) UUIDs can alse be generated.
// For this you need to specify a namespace and data
const NAMESPACE_URL = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
const data = new TextEncoder().encode("deno.land");
console.log(await uuid.v5.generate(NAMESPACE_URL, data));
