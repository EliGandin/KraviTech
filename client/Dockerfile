FROM node:18
WORKDIR /app
COPY package*.json .
RUN npm install && npm cache clean --force
COPY src/ /app/src/
COPY public/ /app/public/
COPY index.html *config* /app/
EXPOSE 5172
CMD [ "npm", "run", "dev" ]