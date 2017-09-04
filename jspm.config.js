SystemJS.config({
  paths: {
    "npm:": "jspm_packages/npm/",
    "ii-1/": "src/",
    "ii/": "web/"
  },
  browserConfig: {
    "baseURL": "/"
  },
  devConfig: {
    "map": {
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.25"
    }
  },
  transpiler: "plugin-babel",
  packages: {
    "ii-1": {
      "format": "esm",
      "meta": {
        "*.js": {
          "loader": "plugin-babel"
        }
      }
    },
    "ii": {
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
    "npm:*.json"
  ],
  map: {},
  packages: {}
});
