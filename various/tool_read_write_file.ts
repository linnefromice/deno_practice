// deno run --unstable --allow-read tool_deno.ts

import { readFileStrSync } from "https://deno.land/std/fs/mod.ts"

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

const main = () => {
    const result = new Map<string, Map<string, number>>()
    result.set("SELECT", new Map<string, number>())
    result.set("INSERT", new Map<string, number>())
    result.set("UPDATE", new Map<string, number>())
    result.set("DELETE", new Map<string, number>())
    countFiles("./sample.log", result)
    console.log(result)
    // writeFileStrSync("summary_executed_sql_in_test.txt", JSON.stringify(result))
    // writeJsonSync("summary_executed_sql_in_test.json", result)
}

main()