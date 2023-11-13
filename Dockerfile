FROM node:16.18.0

WORKDIR /usr/src/app/frontend

RUN chown node:node ./
USER node

COPY package.json ./

RUN npm ci && npm cache clean --force

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "preview"]