

redoc-cli bundle ../src/files/api.v.1.0.yaml --options.theme.colors.primary.main=orange
rm ../src/files/docs/index.v.1.0.html
mv ./redoc-static.html ../src/files/docs/index.v.1.0.html

redoc-cli bundle ../src/files/api.v.2.0.yaml --options.theme.colors.primary.main=orange
rm ../src/files/docs/index.v.2.0.html
mv ./redoc-static.html ../src/files/docs/index.v.2.0.html

