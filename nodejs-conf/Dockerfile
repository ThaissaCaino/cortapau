FROM node:18-alpine

RUN apk update && apk add bash
RUN apk update && apk add nano curl
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

#COPY --chown=node:node ./node_app/ ./

#COPY --chown=node:node . .

EXPOSE 8080

RUN chown -R node:node /home/node/app 
ADD ./nodejs-conf/node_entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
#RUN npm install -g nodemon
#USER node
CMD /docker-entrypoint.sh

#CMD [ "node", "app.js" ]
#CMD [ "/bin/bash" ]
