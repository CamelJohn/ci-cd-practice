# Build stage
FROM node:20 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Production stage
FROM node:20 as final

WORKDIR /app

COPY --from=build /app/dist/ ./dist

COPY package*.json ./

RUN npm install

EXPOSE 3000

CMD ["node", "dist/index.js"]