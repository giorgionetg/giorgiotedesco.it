#!/usr/bin/env bash
set -euo pipefail

did='did:plc:27g2oqb2vz6k2mkezsx4a2sx'
file=${1:-}
if [[ $# -ne 1 || ! -f "$file" ]]; then
  echo 'Uso: yarn pds:create <record.json>' >&2
  exit 1
fi
collection=$(jq -er 'if type == "object" and (."$type" | type == "string") then ."$type" else empty end' "$file")

pds=$(curl -fsS "https://plc.directory/$did" | jq -er --arg did "$did" 'select(.id == $did) | .service[] | select(.id == "#atproto_pds" and .type == "AtprotoPersonalDataServer") | .serviceEndpoint')
if [[ ! "$pds" =~ ^https://[a-zA-Z0-9.-]+$ ]]; then
  echo 'Indirizzo PDS non valido.' >&2
  exit 1
fi

read -r -s -p 'App password AT Protocol: ' password < /dev/tty
echo >&2
session=$(printf '%s' "$password" | jq -Rs --arg identifier "$did" '{identifier: $identifier, password: .}' | curl -fsS -H 'Content-Type: application/json' --data-binary @- "$pds/xrpc/com.atproto.server.createSession")
unset password
token=$(printf '%s' "$session" | jq -er --arg did "$did" 'select(.did == $did) | .accessJwt | select(type == "string" and length > 0)')
unset session

body=$(jq -n --arg repo "$did" --arg collection "$collection" --slurpfile record "$file" '{repo: $repo, collection: $collection, record: $record[0]}')
result=$(printf 'header = "Authorization: Bearer %s"\n' "$token" | curl -fsS --config - -H 'Content-Type: application/json' --data-binary "$body" "$pds/xrpc/com.atproto.repo.createRecord")
unset token body
printf '%s\n' "$result" | jq -er '.uri'
