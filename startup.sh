#!/bin/sh

#git clone git@github.com:savyir/vamyar-nuxt.git


export PATH=/usr/local/bin
npm i -g npm@latest
npm i -g yarn@latest
npm i -g pm2@latest
npm i -g forever@latest
#npm i -g strongloop@latest

forever list

yarn

forever stopall || true
pm2 stop all  || true
pm2 delete all  || true

yarn build

yarn run prod3
forever list

#pm2 start "/usr/local/bin/npm" --name "server" -- start
