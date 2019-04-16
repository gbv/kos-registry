#!/usr/bin/env node

const fs = require('fs')
const { parse } = require('yaml')
const validate = require('jskos-validate')

const uri = 'http://www.w3.org/2004/02/skos/core#ConceptScheme'
let error = 0

process.argv.splice(2).forEach( file => {
  let kos = parse(fs.readFileSync(file, 'utf8'))
  Object.keys(kos).forEach( id => {
    const type = (kos[id].type = kos[id].type || [])
    if (type[0] !== uri) {
      type.unshift(uri) 
    }
    if (validate.scheme(kos[id])) {
      console.log(JSON.stringify(kos[id]))
    } else {
      console.error(`ConceptScheme ${id} in ${file} is no valid JSKOS`)
      error = 1
    }
  })
})

process.exit(error)
