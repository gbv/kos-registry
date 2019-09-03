#!/usr/bin/env node

const ndjson = require('fs-ndjson')
const jskos = require("jskos-tools")

let schemes = []
let count = 0
console.warn("Combining ndjson files...")

process.argv.splice(2).forEach(file => {
  console.warn(`Reading KOS from file ${file}...`)
  let _schemes = ndjson.readFileSync(file)
  console.warn(`- Read ${_schemes.length} KOS from file ${file}.`)
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

console.warn(`=> A total of ${count} KOS were combined into ${schemes.length} KOS.`)

schemes.forEach(scheme => console.log(JSON.stringify(scheme)))
