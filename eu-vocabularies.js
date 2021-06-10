/**
 * Query vocabulary metadata from EU Publications Office.
 */
const fs = require('fs')
const SparqlClient = require('sparql-http-client')

const endpointUrl = ' http://publications.europa.eu/webapi/rdf/sparql'

const client = new SparqlClient({ endpointUrl })
const query = fs.readFileSync('./eu-vocabularies.rq', {encoding:'utf8', flag:'r'})

const staticFields = {
    publisher: [
      {
        uri: "http://viaf.org/viaf/229069752",
        prefLabel: { en: "Publications Office of the European Union" }
      }
    ],
    // will be moved to publisher, see <https://github.com/gbv/bartoc.org/issues/96>
    ADDRESS: {
      country: "Luxembourg",
      locality: "Luxembourg",
      code: "L-2985",
      street: "2 rue Mercier",
    },
    CONTACT: "op-eu-vocabularies@publications.europa.eu",

/*
    # Hard coded fields
    BIND("EN" as ?lng )
    BIND("Free" as ?field_access )
    BIND("General works, Computer science and Information" as ?field_subject_area )
    BIND("001 Knowledge" as ?field_ddc )
    BIND("government" as ?field_topic )
    BIND("CC0: Creative Commons Zero (Public Domain)" as ?field_license )
    BIND("V: general class" as ?field_ilc )
    BIND("Publications Office of the European Union" as ?field_autor )
*/ 
}

client.query.select(query).then(stream => {
  stream.on('data', row => {
    const scheme = { ...staticFields }
    scheme.uri = row.sameAsWork.value
    scheme.title = { en: row.title.value } // TODO: add something like "EU"?
    scheme.description = { en: [row.description.value] } // TODO: strip HTML
    // TODO
    console.log(JSON.stringify(scheme,null,2))
  })
  stream.on('error', err => { console.error(err) })
})
