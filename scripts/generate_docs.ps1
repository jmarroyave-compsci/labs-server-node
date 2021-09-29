redoc-cli bundle src/files/api.v.1.0.yaml --options.theme.colors.primary.main=orange
Move-Item -force redoc-static.html src/files/docs/index.v.1.0.html

redoc-cli bundle src/files/api.v.2.0.yaml --options.theme.colors.primary.main=orange
Move-Item -force redoc-static.html src/files/docs/index.v.2.0.html
