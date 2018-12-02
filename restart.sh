pm2 stop all
git pull origin develop
yarn
yarn build
pm2 start buildNuxt