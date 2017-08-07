SystemJS.config({
  paths: {
    "npm:": "jspm_packages/npm/",
    "github:": "jspm_packages/github/",
    "instadev/": "lib/"
  },
  browserConfig: {
    "baseURL": "/"
  },
  devConfig: {
    "map": {
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.25",
      "babel-plugin-transform-react-jsx": "npm:babel-plugin-transform-react-jsx@6.24.1",
      "core-js": "npm:core-js@2.4.1"
    },
    "packages": {
      "npm:babel-plugin-transform-react-jsx@6.24.1": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.25.0",
          "babel-helper-builder-react-jsx": "npm:babel-helper-builder-react-jsx@6.24.1",
          "babel-plugin-syntax-jsx": "npm:babel-plugin-syntax-jsx@6.18.0"
        }
      },
      "npm:babel-helper-builder-react-jsx@6.24.1": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.25.0",
          "babel-types": "npm:babel-types@6.25.0",
          "esutils": "npm:esutils@2.0.2"
        }
      },
      "npm:babel-types@6.25.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.25.0",
          "esutils": "npm:esutils@2.0.2",
          "to-fast-properties": "npm:to-fast-properties@1.0.3",
          "lodash": "npm:lodash@4.17.4"
        }
      }
    }
  },
  transpiler: "plugin-babel",
  packages: {
    "instadev": {
      "main": "index.js",
      "format": "esm",
      "meta": {
        "*.css": {
          "loader": "css"
        },
        "*.js": {
          "loader": "plugin-babel",
          "babelOptions": {
            "es2015": false,
            "plugins": [
              "babel-plugin-transform-react-jsx"
            ]
          }
        }
      }
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "assert": "npm:jspm-nodelibs-assert@0.2.1",
    "babel-plugin-transform-runtime": "npm:babel-plugin-transform-runtime@6.23.0",
    "babel-runtime": "npm:babel-runtime@6.25.0",
    "babel-standalone": "npm:babel-standalone@6.25.0",
    "buffer": "npm:jspm-nodelibs-buffer@0.2.3",
    "child_process": "npm:jspm-nodelibs-child_process@0.2.1",
    "constants": "npm:jspm-nodelibs-constants@0.2.1",
    "crypto": "npm:jspm-nodelibs-crypto@0.2.1",
    "css": "github:systemjs/plugin-css@0.1.35",
    "d3": "npm:d3@4.10.0",
    "domain": "npm:jspm-nodelibs-domain@0.2.1",
    "draft-js": "npm:draft-js@0.10.1",
    "events": "npm:jspm-nodelibs-events@0.2.2",
    "font-awesome": "npm:font-awesome@4.7.0",
    "fs": "npm:jspm-nodelibs-fs@0.2.1",
    "http": "npm:jspm-nodelibs-http@0.2.0",
    "https": "npm:jspm-nodelibs-https@0.2.2",
    "immutable": "npm:immutable@3.8.1",
    "os": "npm:jspm-nodelibs-os@0.2.2",
    "path": "npm:jspm-nodelibs-path@0.2.3",
    "process": "npm:jspm-nodelibs-process@0.2.1",
    "prop-types": "npm:prop-types@15.5.10",
    "react": "npm:react@15.6.1",
    "react-dom": "npm:react-dom@15.6.1",
    "react-grid-layout": "npm:react-grid-layout@0.14.7",
    "react-resizable": "npm:react-resizable@1.7.1",
    "stream": "npm:jspm-nodelibs-stream@0.2.1",
    "string_decoder": "npm:jspm-nodelibs-string_decoder@0.2.1",
    "url": "npm:jspm-nodelibs-url@0.2.1",
    "util": "npm:jspm-nodelibs-util@0.2.2",
    "vm": "npm:jspm-nodelibs-vm@0.2.1",
    "zlib": "npm:jspm-nodelibs-zlib@0.2.3"
  },
  packages: {
    "npm:react-dom@15.6.1": {
      "map": {
        "object-assign": "npm:object-assign@4.1.1",
        "prop-types": "npm:prop-types@15.5.10",
        "loose-envify": "npm:loose-envify@1.3.1",
        "fbjs": "npm:fbjs@0.8.14"
      }
    },
    "npm:react@15.6.1": {
      "map": {
        "object-assign": "npm:object-assign@4.1.1",
        "prop-types": "npm:prop-types@15.5.10",
        "loose-envify": "npm:loose-envify@1.3.1",
        "fbjs": "npm:fbjs@0.8.14",
        "create-react-class": "npm:create-react-class@15.6.0"
      }
    },
    "npm:prop-types@15.5.10": {
      "map": {
        "fbjs": "npm:fbjs@0.8.14",
        "loose-envify": "npm:loose-envify@1.3.1"
      }
    },
    "npm:create-react-class@15.6.0": {
      "map": {
        "fbjs": "npm:fbjs@0.8.14",
        "loose-envify": "npm:loose-envify@1.3.1",
        "object-assign": "npm:object-assign@4.1.1"
      }
    },
    "npm:fbjs@0.8.14": {
      "map": {
        "loose-envify": "npm:loose-envify@1.3.1",
        "object-assign": "npm:object-assign@4.1.1",
        "core-js": "npm:core-js@1.2.7",
        "setimmediate": "npm:setimmediate@1.0.5",
        "promise": "npm:promise@7.3.1",
        "ua-parser-js": "npm:ua-parser-js@0.7.14",
        "isomorphic-fetch": "npm:isomorphic-fetch@2.2.1"
      }
    },
    "npm:loose-envify@1.3.1": {
      "map": {
        "js-tokens": "npm:js-tokens@3.0.2"
      }
    },
    "npm:promise@7.3.1": {
      "map": {
        "asap": "npm:asap@2.0.6"
      }
    },
    "npm:jspm-nodelibs-stream@0.2.1": {
      "map": {
        "stream-browserify": "npm:stream-browserify@2.0.1"
      }
    },
    "npm:isomorphic-fetch@2.2.1": {
      "map": {
        "node-fetch": "npm:node-fetch@1.7.1",
        "whatwg-fetch": "npm:whatwg-fetch@2.0.3"
      }
    },
    "npm:stream-browserify@2.0.1": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "readable-stream": "npm:readable-stream@2.3.3"
      }
    },
    "npm:node-fetch@1.7.1": {
      "map": {
        "is-stream": "npm:is-stream@1.1.0",
        "encoding": "npm:encoding@0.1.12"
      }
    },
    "npm:readable-stream@2.3.3": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "core-util-is": "npm:core-util-is@1.0.2",
        "isarray": "npm:isarray@1.0.0",
        "util-deprecate": "npm:util-deprecate@1.0.2",
        "process-nextick-args": "npm:process-nextick-args@1.0.7",
        "string_decoder": "npm:string_decoder@1.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.1"
      }
    },
    "npm:jspm-nodelibs-domain@0.2.1": {
      "map": {
        "domain-browser": "npm:domain-browser@1.1.7"
      }
    },
    "npm:jspm-nodelibs-zlib@0.2.3": {
      "map": {
        "browserify-zlib": "npm:browserify-zlib@0.1.4"
      }
    },
    "npm:jspm-nodelibs-url@0.2.1": {
      "map": {
        "url": "npm:url@0.11.0"
      }
    },
    "npm:jspm-nodelibs-buffer@0.2.3": {
      "map": {
        "buffer": "npm:buffer@5.0.7"
      }
    },
    "npm:string_decoder@1.0.3": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.1"
      }
    },
    "npm:encoding@0.1.12": {
      "map": {
        "iconv-lite": "npm:iconv-lite@0.4.18"
      }
    },
    "npm:jspm-nodelibs-http@0.2.0": {
      "map": {
        "http-browserify": "npm:stream-http@2.7.2"
      }
    },
    "npm:browserify-zlib@0.1.4": {
      "map": {
        "readable-stream": "npm:readable-stream@2.3.3",
        "pako": "npm:pako@0.2.9"
      }
    },
    "npm:stream-http@2.7.2": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "readable-stream": "npm:readable-stream@2.3.3",
        "builtin-status-codes": "npm:builtin-status-codes@3.0.0",
        "xtend": "npm:xtend@4.0.1",
        "to-arraybuffer": "npm:to-arraybuffer@1.0.1"
      }
    },
    "npm:url@0.11.0": {
      "map": {
        "punycode": "npm:punycode@1.3.2",
        "querystring": "npm:querystring@0.2.0"
      }
    },
    "npm:jspm-nodelibs-string_decoder@0.2.1": {
      "map": {
        "string_decoder": "npm:string_decoder@0.10.31"
      }
    },
    "npm:jspm-nodelibs-os@0.2.2": {
      "map": {
        "os-browserify": "npm:os-browserify@0.3.0"
      }
    },
    "npm:jspm-nodelibs-crypto@0.2.1": {
      "map": {
        "crypto-browserify": "npm:crypto-browserify@3.11.1"
      }
    },
    "npm:crypto-browserify@3.11.1": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "browserify-sign": "npm:browserify-sign@4.0.4",
        "browserify-cipher": "npm:browserify-cipher@1.0.0",
        "create-hmac": "npm:create-hmac@1.1.6",
        "public-encrypt": "npm:public-encrypt@4.0.0",
        "pbkdf2": "npm:pbkdf2@3.0.13",
        "diffie-hellman": "npm:diffie-hellman@5.0.2",
        "create-ecdh": "npm:create-ecdh@4.0.0",
        "create-hash": "npm:create-hash@1.1.3",
        "randombytes": "npm:randombytes@2.0.5"
      }
    },
    "npm:browserify-sign@4.0.4": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "create-hmac": "npm:create-hmac@1.1.6",
        "create-hash": "npm:create-hash@1.1.3",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "bn.js": "npm:bn.js@4.11.7",
        "elliptic": "npm:elliptic@6.4.0",
        "parse-asn1": "npm:parse-asn1@5.1.0"
      }
    },
    "npm:create-hmac@1.1.6": {
      "map": {
        "create-hash": "npm:create-hash@1.1.3",
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.1",
        "cipher-base": "npm:cipher-base@1.0.4",
        "ripemd160": "npm:ripemd160@2.0.1",
        "sha.js": "npm:sha.js@2.4.8"
      }
    },
    "npm:public-encrypt@4.0.0": {
      "map": {
        "create-hash": "npm:create-hash@1.1.3",
        "randombytes": "npm:randombytes@2.0.5",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "bn.js": "npm:bn.js@4.11.7",
        "parse-asn1": "npm:parse-asn1@5.1.0"
      }
    },
    "npm:diffie-hellman@5.0.2": {
      "map": {
        "randombytes": "npm:randombytes@2.0.5",
        "bn.js": "npm:bn.js@4.11.7",
        "miller-rabin": "npm:miller-rabin@4.0.0"
      }
    },
    "npm:create-hash@1.1.3": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "cipher-base": "npm:cipher-base@1.0.4",
        "ripemd160": "npm:ripemd160@2.0.1",
        "sha.js": "npm:sha.js@2.4.8"
      }
    },
    "npm:create-ecdh@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.7",
        "elliptic": "npm:elliptic@6.4.0"
      }
    },
    "npm:randombytes@2.0.5": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.1"
      }
    },
    "npm:browserify-cipher@1.0.0": {
      "map": {
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
        "browserify-aes": "npm:browserify-aes@1.0.6",
        "browserify-des": "npm:browserify-des@1.0.0"
      }
    },
    "npm:browserify-rsa@4.0.1": {
      "map": {
        "bn.js": "npm:bn.js@4.11.7",
        "randombytes": "npm:randombytes@2.0.5"
      }
    },
    "npm:elliptic@6.4.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.7",
        "inherits": "npm:inherits@2.0.3",
        "brorand": "npm:brorand@1.1.0",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0",
        "hash.js": "npm:hash.js@1.1.3",
        "hmac-drbg": "npm:hmac-drbg@1.0.1",
        "minimalistic-crypto-utils": "npm:minimalistic-crypto-utils@1.0.1"
      }
    },
    "npm:parse-asn1@5.1.0": {
      "map": {
        "create-hash": "npm:create-hash@1.1.3",
        "pbkdf2": "npm:pbkdf2@3.0.13",
        "browserify-aes": "npm:browserify-aes@1.0.6",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
        "asn1.js": "npm:asn1.js@4.9.1"
      }
    },
    "npm:evp_bytestokey@1.0.0": {
      "map": {
        "create-hash": "npm:create-hash@1.1.3"
      }
    },
    "npm:cipher-base@1.0.4": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.1"
      }
    },
    "npm:ripemd160@2.0.1": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "hash-base": "npm:hash-base@2.0.2"
      }
    },
    "npm:browserify-aes@1.0.6": {
      "map": {
        "cipher-base": "npm:cipher-base@1.0.4",
        "create-hash": "npm:create-hash@1.1.3",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
        "inherits": "npm:inherits@2.0.3",
        "buffer-xor": "npm:buffer-xor@1.0.3"
      }
    },
    "npm:sha.js@2.4.8": {
      "map": {
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:browserify-des@1.0.0": {
      "map": {
        "cipher-base": "npm:cipher-base@1.0.4",
        "inherits": "npm:inherits@2.0.3",
        "des.js": "npm:des.js@1.0.0"
      }
    },
    "npm:miller-rabin@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.7",
        "brorand": "npm:brorand@1.1.0"
      }
    },
    "npm:hash.js@1.1.3": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:asn1.js@4.9.1": {
      "map": {
        "bn.js": "npm:bn.js@4.11.7",
        "inherits": "npm:inherits@2.0.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:hmac-drbg@1.0.1": {
      "map": {
        "hash.js": "npm:hash.js@1.1.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0",
        "minimalistic-crypto-utils": "npm:minimalistic-crypto-utils@1.0.1"
      }
    },
    "npm:des.js@1.0.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:hash-base@2.0.2": {
      "map": {
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:draft-js@0.10.1": {
      "map": {
        "immutable": "npm:immutable@3.7.6",
        "object-assign": "npm:object-assign@4.1.1",
        "fbjs": "npm:fbjs@0.8.14"
      }
    },
    "npm:font-awesome@4.7.0": {
      "map": {
        "css": "github:systemjs/plugin-css@0.1.35"
      }
    },
    "npm:react-grid-layout@0.14.7": {
      "map": {
        "lodash.isequal": "npm:lodash.isequal@4.5.0",
        "react-draggable": "npm:react-draggable@2.2.6",
        "react-resizable": "npm:react-resizable@1.7.1",
        "classnames": "npm:classnames@2.2.5",
        "prop-types": "npm:prop-types@15.5.10"
      }
    },
    "npm:react-draggable@2.2.6": {
      "map": {
        "classnames": "npm:classnames@2.2.5"
      }
    },
    "npm:react-resizable@1.7.1": {
      "map": {
        "prop-types": "npm:prop-types@15.5.10",
        "react-draggable": "npm:react-draggable@2.2.6"
      }
    },
    "npm:babel-runtime@6.25.0": {
      "map": {
        "core-js": "npm:core-js@2.4.1",
        "regenerator-runtime": "npm:regenerator-runtime@0.10.5"
      }
    },
    "npm:babel-plugin-transform-runtime@6.23.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.25.0"
      }
    },
    "npm:buffer@5.0.7": {
      "map": {
        "ieee754": "npm:ieee754@1.1.8",
        "base64-js": "npm:base64-js@1.2.1"
      }
    },
    "npm:pbkdf2@3.0.13": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.1",
        "create-hmac": "npm:create-hmac@1.1.6",
        "ripemd160": "npm:ripemd160@2.0.1",
        "sha.js": "npm:sha.js@2.4.8",
        "create-hash": "npm:create-hash@1.1.3"
      }
    },
    "npm:d3@4.10.0": {
      "map": {
        "d3-chord": "npm:d3-chord@1.0.4",
        "d3-collection": "npm:d3-collection@1.0.4",
        "d3-brush": "npm:d3-brush@1.0.4",
        "d3-dispatch": "npm:d3-dispatch@1.0.3",
        "d3-drag": "npm:d3-drag@1.1.1",
        "d3-force": "npm:d3-force@1.0.6",
        "d3-interpolate": "npm:d3-interpolate@1.1.5",
        "d3-array": "npm:d3-array@1.2.0",
        "d3-path": "npm:d3-path@1.0.5",
        "d3-random": "npm:d3-random@1.1.0",
        "d3-request": "npm:d3-request@1.0.5",
        "d3-geo": "npm:d3-geo@1.6.4",
        "d3-selection": "npm:d3-selection@1.1.0",
        "d3-time-format": "npm:d3-time-format@2.0.5",
        "d3-timer": "npm:d3-timer@1.0.6",
        "d3-voronoi": "npm:d3-voronoi@1.1.2",
        "d3-zoom": "npm:d3-zoom@1.5.0",
        "d3-quadtree": "npm:d3-quadtree@1.0.3",
        "d3-scale": "npm:d3-scale@1.0.6",
        "d3-shape": "npm:d3-shape@1.2.0",
        "d3-polygon": "npm:d3-polygon@1.0.3",
        "d3-axis": "npm:d3-axis@1.0.8",
        "d3-hierarchy": "npm:d3-hierarchy@1.1.5",
        "d3-dsv": "npm:d3-dsv@1.0.5",
        "d3-color": "npm:d3-color@1.0.3",
        "d3-time": "npm:d3-time@1.0.7",
        "d3-ease": "npm:d3-ease@1.0.3",
        "d3-queue": "npm:d3-queue@3.0.7",
        "d3-format": "npm:d3-format@1.2.0",
        "d3-transition": "npm:d3-transition@1.1.0"
      }
    },
    "npm:d3-chord@1.0.4": {
      "map": {
        "d3-array": "npm:d3-array@1.2.0",
        "d3-path": "npm:d3-path@1.0.5"
      }
    },
    "npm:d3-brush@1.0.4": {
      "map": {
        "d3-dispatch": "npm:d3-dispatch@1.0.3",
        "d3-drag": "npm:d3-drag@1.1.1",
        "d3-interpolate": "npm:d3-interpolate@1.1.5",
        "d3-selection": "npm:d3-selection@1.1.0",
        "d3-transition": "npm:d3-transition@1.1.0"
      }
    },
    "npm:d3-drag@1.1.1": {
      "map": {
        "d3-dispatch": "npm:d3-dispatch@1.0.3",
        "d3-selection": "npm:d3-selection@1.1.0"
      }
    },
    "npm:d3-force@1.0.6": {
      "map": {
        "d3-collection": "npm:d3-collection@1.0.4",
        "d3-dispatch": "npm:d3-dispatch@1.0.3",
        "d3-quadtree": "npm:d3-quadtree@1.0.3",
        "d3-timer": "npm:d3-timer@1.0.6"
      }
    },
    "npm:d3-geo@1.6.4": {
      "map": {
        "d3-array": "npm:d3-array@1.2.0"
      }
    },
    "npm:d3-request@1.0.5": {
      "map": {
        "d3-collection": "npm:d3-collection@1.0.4",
        "d3-dispatch": "npm:d3-dispatch@1.0.3",
        "d3-dsv": "npm:d3-dsv@1.0.5",
        "xmlhttprequest": "npm:xmlhttprequest@1.8.0"
      }
    },
    "npm:d3-shape@1.2.0": {
      "map": {
        "d3-path": "npm:d3-path@1.0.5"
      }
    },
    "npm:d3-scale@1.0.6": {
      "map": {
        "d3-array": "npm:d3-array@1.2.0",
        "d3-collection": "npm:d3-collection@1.0.4",
        "d3-interpolate": "npm:d3-interpolate@1.1.5",
        "d3-time-format": "npm:d3-time-format@2.0.5",
        "d3-color": "npm:d3-color@1.0.3",
        "d3-format": "npm:d3-format@1.2.0",
        "d3-time": "npm:d3-time@1.0.7"
      }
    },
    "npm:d3-zoom@1.5.0": {
      "map": {
        "d3-dispatch": "npm:d3-dispatch@1.0.3",
        "d3-drag": "npm:d3-drag@1.1.1",
        "d3-interpolate": "npm:d3-interpolate@1.1.5",
        "d3-selection": "npm:d3-selection@1.1.0",
        "d3-transition": "npm:d3-transition@1.1.0"
      }
    },
    "npm:d3-interpolate@1.1.5": {
      "map": {
        "d3-color": "npm:d3-color@1.0.3"
      }
    },
    "npm:d3-time-format@2.0.5": {
      "map": {
        "d3-time": "npm:d3-time@1.0.7"
      }
    },
    "npm:d3-transition@1.1.0": {
      "map": {
        "d3-color": "npm:d3-color@1.0.3",
        "d3-dispatch": "npm:d3-dispatch@1.0.3",
        "d3-ease": "npm:d3-ease@1.0.3",
        "d3-interpolate": "npm:d3-interpolate@1.1.5",
        "d3-selection": "npm:d3-selection@1.1.0",
        "d3-timer": "npm:d3-timer@1.0.6"
      }
    },
    "npm:d3-dsv@1.0.5": {
      "map": {
        "commander": "npm:commander@2.11.0",
        "iconv-lite": "npm:iconv-lite@0.4.18",
        "rw": "npm:rw@1.3.3"
      }
    }
  }
});
