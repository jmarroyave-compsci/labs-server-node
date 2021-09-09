

redoc-cli bundle ../files/api.yaml --options.theme.colors.primary.main=orange
rm ../docs/index.html
mv ./redoc-static.html ../docs/index.html