# Dockerfile  
FROM node:18  
WORKDIR /app  
ADD package.json ./app
RUN yarn global add nodemon && yarn install
ADD . /app
EXPOSE 8088  
CMD ["yarn", "start"]
VOLUME /app