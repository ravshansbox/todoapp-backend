FROM node:20-alpine AS base
WORKDIR /app
COPY package.json package-lock.json ./

FROM base AS dev
RUN npm ci
COPY . ./
RUN npm run build

FROM base AS prod
RUN npm ci --omit=dev

FROM base
COPY --from=dev /app/dist ./src
COPY --from=prod /app/node_modules ./node_modules
CMD node src

