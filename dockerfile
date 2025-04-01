FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG PORT=3000
ENV PORT=$PORT
EXPOSE 3000

CMD ["npm", "run", "dev"]