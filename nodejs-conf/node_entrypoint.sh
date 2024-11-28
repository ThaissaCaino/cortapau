#!/bin/bash

cd /home/node/app

npm -g uninstall nodemon --save
npm install nodemon

npm install express cors multer bcrypt passport body-parser passport-local-mongoose jsonwebtoken ejs express-ejs-layouts  bcryptjs express-session


npm run start.dev
#node app.js