// deno run --unstable --allow-read tool_deno.ts
// sample format of reading file
// {"id":"1","sql":"INSERT INTO user (`1`, `linnefromice`, `20000420`)"}
// {"id":"2","sql":"SELECT * FROM user"}

import { readFileStrSync, writeFileStrSync } from "https://deno.land/std/fs/mod.ts"

function addCounter(tableName:string, innerMap:Map<string, number>) {
    const count = innerMap.get(tableName)
    if (count) {
        innerMap.set(tableName, count + 1)
    } else {
        innerMap.set(tableName, 1)
    }
}

// For SQL
function countSelect(sql:string, map:Map<string, number>) {
    const words = sql.split(" ")
    const fromIndex = words.findIndex((element:string) => element === "FROM")
    addCounter(words[fromIndex + 1], map)
    // DEBUG: console.log(`${words[0]} / ${words[fromIndex + 1]}`)
}
function countInsert(sql:string, map:Map<string, number>) {
    const words = sql.split(" ")
    addCounter(words[2], map)
    // DEBUG:console.log(`${words[0]} / ${words[2]}`)
}
function countUpdate(sql:string, map:Map<string, number>) {
    const words = sql.split(" ")
    addCounter(words[1], map)
    // DEBUG: console.log(`${words[0]} / ${words[1]}`)
}
function countDelete(sql:string, map:Map<string, number>) {
    const words = sql.split(" ")
    addCounter(words[2], map)
    // DEBUG: console.log(`${words[0]} / ${words[2]}`)
}

function countFiles(filepath:string, result:Map<string, Map<string, number>>) {
    const datas = readFileStrSync(filepath, { encoding: "utf8" });
    const dataArray = datas.split(/\r\n|\r|\n/)
    console.log(`FILEPATH: ${filepath} / Row Count: ${dataArray.length}`)
    dataArray.forEach(element => {
        const log = JSON.parse(element)
        const sql = log.sql
        if (sql.match(/^SELECT/) ) {
            const innerMap = result.get('SELECT') || new Map<string, number>() // 本来不要
            countSelect(sql, innerMap)
        } else if (sql.match(/^INSERT/) ) {
            const innerMap = result.get('INSERT') || new Map<string, number>() // 本来不要
            countInsert(sql, innerMap)
        } else if (sql.match(/^UPDATE/) ) {
            const innerMap = result.get('UPDATE') || new Map<string, number>() // 本来不要
            countUpdate(sql, innerMap)
        } else if (sql.match(/^DELETE/) ) {
            const innerMap = result.get('DELETE') || new Map<string, number>() // 本来不要
            countDelete(sql, innerMap)
        } else {
            // do nothing.
        }
    })
}

function writeFileEachCommand(command:string, innerMap:Map<string, number>) {
    writeFileStrSync(`./summary.csv`, "");
    const encoder = new TextEncoder();
    innerMap.forEach((value, key, map) => {
        Deno.writeFileSync(`./summary.csv`, encoder.encode(`${command},${key},${value}\n`), {append: true});
    })
}

const main = () => {
    const result = new Map<string, Map<string, number>>()
    result.set("SELECT", new Map<string, number>())
    result.set("INSERT", new Map<string, number>())
    result.set("UPDATE", new Map<string, number>())
    result.set("DELETE", new Map<string, number>())
    
    // output
    const encoder = new TextEncoder();
    ["SELECT", "INSERT", "UPDATE", "DELETE"].forEach(command => {
        const innerMap = result.get(command) || new Map<string, number>()
        writeFileEachCommand(command, innerMap);
    });
}

main()