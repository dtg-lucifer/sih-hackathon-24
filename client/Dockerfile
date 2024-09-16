FROM node:alpine AS builder
LABEL maintainer="Piush Bose <dev.bosepiush@gmail.com>"

WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .
RUN npm run build

# ---------------------------------------------------

FROM node:alpine AS prod

WORKDIR /src

COPY --from=builder /app/dist .
COPY --from=builder /app/package*.json .

RUN npm install --omit=dev

EXPOSE 4173

USER nobody
CMD ["npm", "run", "preview"]