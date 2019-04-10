#!/usr/bin/env node

const fs = require('fs')
const { parse } = require('yaml')
const validate = require('jskos-validate')

let error = 0

process.argv.splice(2).forEach( file => {
  let kos = parse(fs.readFileSync(file, 'utf8'))
  Object.keys(kos).forEach( id => {
    if (validate.scheme(kos[id])) {
      console.log(JSON.stringify(kos[id]))
    } else {
      console.error(`ConceptScheme ${id} in ${file} is no valid JSKOS`)
      error = 1
    }
  })
})

process.exit(error)
