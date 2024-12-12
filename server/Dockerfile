FROM node:18-alpine as development
WORKDIR /app
COPY package*.json ./
RUN npm install && npm cache clean --force
COPY *ts* /app/
EXPOSE 8000
CMD [ "npm", "run", "dev" ]