#!/usr/bin/env node

const jskos = require("jskos-tools")
const fs = require("fs")

let schemes = []
let count = 0
console.log("Combining files...")

process.argv.splice(2).forEach(file => {
  console.log(`Reading KOS from file ${file}...`)
  let content = fs.readFileSync(file, "utf8")
  let _schemes
  let errors = []
  if (file.endsWith(".ndjson")) {
    _schemes = []
    content.split("\n").forEach(json => {
      if (!json) {
        return
      }
      try {
        let scheme = JSON.parse(json)
        _schemes.push(scheme)
      } catch(error) {
        errors.push(error)
      }
    })
  } else {
    try {
      _schemes = JSON.parse(content)
    } catch(error) {
      errors.push(error)
    }
  }
  if (errors.length) {
    console.error(`- ${errors.length} errors when reading KOS from file ${file}:`)
    errors.forEach(error => {
      console.error(`- ${error}`)
    })
    console.warn("- !!!!! Resulting KOS file will likely have missing entries !!!!!")
  }
  if (!Array.isArray(_schemes)) {
    _schemes = [_schemes]
  }
  _schemes = _schemes.filter(scheme => scheme != null)
  if (_schemes.length == 0) {
    console.warn(`- No KOS read from file ${file}.`)
    return
  }
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

console.log(`=> A total of ${count} KOS were combined into a resulting ${schemes.length} KOS.`)
let file = "all.ndjson"
console.log(`- Now writing to ${file}...`)

try {
  let content = schemes.reduce((total, current) => total += `${JSON.stringify(current)}\n`, "")
  fs.writeFileSync(file, content)
  console.log(`- File written.`)
} catch(error) {
  console.error(`- Error writing to file: ${error}`)
}
