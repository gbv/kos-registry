#!/usr/bin/env node

const ndjson = require('fs-ndjson')
const jskos = require("jskos-tools")
const fs = require("fs")

let schemes = []
let count = 0
console.log("Combining ndjson files...")

process.argv.splice(2).forEach(file => {
  console.log(`Reading KOS from file ${file}...`)
  let _schemes = ndjson.readFileSync(file)
  console.log(`- Read ${_schemes.length} KOS from file ${file}.`)
  count += _schemes.length
  // Integrate _schemes into schemes
  for (let scheme of _schemes) {
    // Try to find existing scheme
    let index = schemes.findIndex(s => jskos.compare(s, scheme))
    if (index == -1) {
      schemes.push(scheme)
    } else {
      // Merge scheme with existing scheme
      schemes[index] = jskos.merge(schemes[index], scheme, { mergeUris: true })
    }
  }
})

console.log(`=> A total of ${count} KOS were combined into ${schemes.length} KOS.`)

let file = "kos-registry.ndjson"
let content = schemes.reduce((total, cur) => total += `${JSON.stringify(cur, Object.keys(cur).sort())}\n`, "")
fs.writeFileSync(file, content)
console.log(`- All KOS written to ${file}`)
