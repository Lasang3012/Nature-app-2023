# Dockerfile  
FROM node:18  
WORKDIR /app  
COPY package.json ./app
RUN yarn global add nodemon && yarn install
COPY . /app
EXPOSE 8088  
CMD ["yarn", "start"]
VOLUME /app