# KOS Registry

> Source files and script to aggregate information about concept schemes

This repository is used to aggregate information about knowledge organization schemes relevant to project coli-conc.

## Requirements

* jq
* npm (run `npm install`)

## Sources

* `kos.yml` - YAML file with information about concept schemes
* DANTE API
* Wikidata

## Usage

Calling `npm run all` will create the following files:

* `kos.ndjson`
* `wikidata.ndjson`
* `dante.ndjson`

Call `npm run validate` to validate the files.

## See also

* [cocoda-mappings](https://github.com/gbv/cocoda-mappings/) - repository with mapping data
* [jskos-data](https://github.com/gbv/jskos-data/) - repository with concept schemes including concepts

## License

All data in this repository can be used freely as public domain ([Creative
Commons Zero v1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/))
