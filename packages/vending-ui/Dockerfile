FROM node:14-alpine AS build

WORKDIR /build

COPY package.json ./
RUN npm install

ENV NODE_ENV=production

COPY . .
RUN npm run build

# ------

FROM node:14-alpine AS production

RUN adduser -D myuser
USER myuser

ENV NODE_ENV=production

WORKDIR /app
COPY --from=build /build/package*.json ./
COPY --from=build /build/.next ./.next
COPY --from=build /build/public ./public

RUN npm install

# ARG PORT=$PORT
# ENV PORT=$PORT

CMD npm start
