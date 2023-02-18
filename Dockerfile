FROM node:18-alpine AS build
WORKDIR /app
RUN npm i -g pnpm
COPY . .
RUN pnpm i --ignore-scripts
RUN pnpm build

FROM node:18-alpine
WORKDIR /app
COPY --from=build /app/dist .

EXPOSE 8080
CMD ["node", "main.js"]