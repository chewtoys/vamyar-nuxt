pm2 stop all
git pull origin master
yarn
yarn build
pm2 start buildNuxt