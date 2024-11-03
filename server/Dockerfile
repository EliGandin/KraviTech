FROM node:18-alpine as development
WORKDIR /app
COPY package*.json ./
RUN npm install && npm cache clean --force
COPY *ts* /app/
#COPY ./routes /app/routes/
#COPY ./globals /app/globals/
#COPY ./middlewares /app/middlewares/
#COPY ./repositories /app/repositories/
#COPY . .
EXPOSE 8000
CMD [ "npm", "run", "dev" ]