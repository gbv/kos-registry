# KOS Registry

[![Build Status](https://travis-ci.org/gbv/kos-registry.svg?branch=master)](https://travis-ci.org/gbv/kos-registry)

> Source files and script to aggregate information about knowledge organization schemes

This repository is used to aggregate information *about* knowledge organization schemes (KOS) relevant to [project coli-conc](https://coli-conc.gbv.de/).

## Requirements

* jq
* some npm modules (run `npm install`)
* make

## Sources

* `kos.yml` (a YAML file with information about concept schemes)
* [DANTE API](https://api.dante.gbv.de/)
* [Wikidata](https://www.wikidata.org/)

File `registry.yaml` further contains metadata about this KOS registry.

## Usage

Calling `npm run all` will create the following files:

* `kos.ndjson`
* `wikidata.ndjson`
* `dante.ndjson`

It will also combine those files by merging overlapping concept schemes into
`all.ndjson`. Conflicting values are ignored so information in `kos.yaml` has
priority.

Call `npm run validate` to validate the files. See `Makefile` for individual conversion steps.

## See also

* [cocoda-mappings](https://github.com/gbv/cocoda-mappings/) - repository with mapping data
* [jskos-data](https://github.com/gbv/jskos-data/) - repository with concept schemes including concepts

## License

All data in this repository can be used freely as public domain ([Creative
Commons Zero v1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/))
