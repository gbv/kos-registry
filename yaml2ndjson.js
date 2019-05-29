#!/usr/bin/env node

const fs = require('fs')
const { parse } = require('yaml')
const validate = require('jskos-validate')
const { guessObjectType } = require('jskos-tools')

const typeUris = {
  scheme: 'http://www.w3.org/2004/02/skos/core#ConceptScheme',
  registry: 'http://purl.org/cld/cdtype/CatalogueOrIndex'
}

const typeName = process.argv[2]
if (!typeUris[typeName]) {
  console.error("Missing JSKOS resource type as first argument")
  process.exit(1)
}

let error = 0
process.argv.splice(3).forEach( file => {
  let item = parse(fs.readFileSync(file, 'utf8'))
  Object.keys(item).forEach( id => {
    const type = (item[id].type = item[id].type || [])
    if (type[0] !== typeUris[typeName]) {
      type.unshift(typeUris[typeName]) 
    }    
    if (validate[typeName](item[id])) {
      console.log(JSON.stringify(item[id]))
    } else {
      console.error(`${typeName} ${id} in ${file} is no valid JSKOS`)
      error = 1
    }
  })
})

process.exit(error)
