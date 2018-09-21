#!/bin/sh

#git clone git@github.com:savyir/vamyar-nuxt.git


export PATH=/usr/local/bin
npm i -g npm@latest
npm i -g yarn@latest
#npm i -g pm2@latest
npm i -g forever@latest
#npm i -g strongloop@latest

export PATH=/usr/local/bin
yarn

forever stopall || true
pm2 stop all  || true
pm2 delete all  || true

yarn build

forever start "/usr/local/bin/npm"  start --prefix "/var/www/vamyar.tk/vamyar-nuxt"
forever list

#pm2 start "/usr/local/bin/npm" --name "server" -- start
