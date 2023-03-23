# This is not a production Dockerfile.
# It was created for this test purposes only.
FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "star:dev"]
