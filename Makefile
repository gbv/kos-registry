default: kos-registry.ndjson

kos.ndjson: kos.yaml
	./yaml2ndjson.js scheme $< > $@

wikidata.ndjson:
	npm run wikidata

dante.ndjson:
	curl -sk https://api.dante.gbv.de/voc/ | jq -c .[] > $@

kos-registry.ndjson: kos.ndjson dante.ndjson wikidata.ndjson
	./combine.js $? | jq --sort-keys -c . > $@

registry.ndjson: registry.yaml
	./yaml2ndjson.js registry $< > $@

kos-registry.json: registry.ndjson kos-registry.ndjson
	jq --sort-keys --slurpfile schemes kos-registry.ndjson '.+{schemes:$$schemes}' registry.ndjson > $@
