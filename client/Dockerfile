FROM oven/bun:latest

WORKDIR /app
EXPOSE 3000

COPY package.json ./
COPY bun.lockb ./

RUN bun install

COPY . .

RUN bun build

CMD [ "bun", "start" ]