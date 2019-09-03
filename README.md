# KOS Registry

[![Build Status](https://travis-ci.org/gbv/kos-registry.svg?branch=master)](https://travis-ci.org/gbv/kos-registry)
[![GitHub Release](https://img.shields.io/github/release-date/gbv/kos-registry.svg)](https://github.com/gbv/kos-registry/releases/latest)
![License](https://img.shields.io/github/license/gbv/kos-registry.svg)

> Source files and script to aggregate information about knowledge organization schemes

This repository is used to aggregate information about knowledge organization schemes (KOS) relevant to [project coli-conc](https://coli-conc.gbv.de/). The information is aggregated from:

* YAML file `kos.yml` stored in this repository
* [DANTE API](https://api.dante.gbv.de/)
* [Wikidata](https://www.wikidata.org/)

KOS information from [BARTOC](https://bartoc.org/) will be added in a later version.

YAML file `registry.yaml` in this repository further contains metadata about the aggregated KOS registry.

## Releases

Each commit to the `master` branch results in two files published [as GitHub release](https://github.com/gbv/kos-registry/releases):

* `kos-registry.json` contains a [JSKOS Registry](https://gbv.github.io/jskos/jskos.html#registries)
* `kos-registry.ndjson` only contains the list of [JSKOS Concept Schemes](https://gbv.github.io/jskos/jskos.html#concept-schemes)

It's possible to download the latest release files this way:

    curl -s https://api.github.com/repos/gbv/kos-registry/releases/latest \
    | jq -r '.assets[].browser_download_url' | xargs wget -N

## Requirements

To locally aggregate you need:

* [jq](https://stedolan.github.io/jq/)
* some npm modules (run `npm install`)
* make

## Usage

Calling `npm run all` (or just `make`) will create the following files:

* `kos.ndjson`
* `wikidata.ndjson`
* `dante.ndjson`

It will also combine those files by merging overlapping concept schemes into the [relase files](#releases).  Conflicting values are ignored so information in `kos.yaml` has priority.

Call `npm run validate` to validate the files. See `Makefile` for individual conversion steps.

## See also

* [cocoda-mappings](https://github.com/gbv/cocoda-mappings/) - repository with mapping data
* [jskos-data](https://github.com/gbv/jskos-data/) - repository with concept schemes including concepts

## License

All data in this repository can be used freely as public domain ([Creative Commons Zero v1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/))
