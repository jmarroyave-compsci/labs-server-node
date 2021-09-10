

redoc-cli bundle ../src/files/api.yaml --options.theme.colors.primary.main=orange
rm ../src/files/docs/index.html
mv ./redoc-static.html ../src/files/docs/index.html