#!/bin/sh

#sudo su -
#rm -rf vamyar-nuxt 
#git clone git@github.com:savyir/vamyar-nuxt.git


export PATH=/usr/local/bin
npm i -g npm@latest
npm i -g yarn@latest
npm i -g pm2@latest

export PATH=/opt/rh/rh-nodejs8/root/usr/bin
pm2 delete all
export PATH=/usr/local/bin
yarn
#npm test
#yarn run prod2 
pm2 stop all  || true
pm2 delete all  || true
yarn build
pm2 start npm --name nuxt -- start
#pm2 start all
#pm2 start "/usr/local/bin/npm" --name "server" -- start
