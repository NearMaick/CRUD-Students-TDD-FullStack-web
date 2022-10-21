FROM node:lts
USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY package.json ./
RUN npm install

COPY . .

EXPOSE 3000

RUN npx prisma migrate dev

CMD ["npm", "run", "dev"]