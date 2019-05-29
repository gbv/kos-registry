default: kos-registry.json

kos.ndjson: kos.yaml
	./yaml2ndjson.js scheme $< > $@

wikidata.ndjson:
	npm run wikidata

dante.ndjson:
	curl -sk https://api.dante.gbv.de/voc/ | jq -c .[] > $@

all.ndjson: kos.ndjson dante.ndjson wikidata.ndjson
	./combine.js $?

registry.ndjson: registry.yaml
	./yaml2ndjson.js registry $< > $@

kos-registry.json: registry.ndjson all.ndjson
	jq --slurpfile schemes all.ndjson '.+{schemes:$$schemes}' registry.ndjson > $@
