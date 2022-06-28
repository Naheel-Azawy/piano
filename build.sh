#!/bin/sh

[ -d node_modules ] || npm i

exec tsc --allowJs -t es3 "$@"       \
     node_modules/elemobj/elemobj.js \
     src/piano.js                    \
     src/piano_text.js               \
     src/main.js                     \
     --outFile bundle.js
