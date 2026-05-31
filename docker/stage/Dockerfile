# syntax=docker/dockerfile:1

FROM node:22-bookworm-slim AS base
WORKDIR /app

# --- Build Stage ---
FROM base AS build-deps
ENV NODE_ENV=development
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm ci

FROM base AS build
ENV NODE_ENV=development
COPY --from=build-deps /app/node_modules ./node_modules
COPY . .
# Nitro handles absolutely everything here. It will automatically generate
# the .output directory and the server/index.mjs entrypoint.
RUN npm run build

# --- Production Dependencies Stage ---
FROM base AS prod-deps
ENV NODE_ENV=production
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --omit=dev

# --- Hardened Final Stage ---
FROM node:22-bookworm-slim AS runtime
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
WORKDIR /app

COPY --from=prod-deps --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/package.json ./package.json
COPY --from=build --chown=node:node /app/.output ./.output

USER node
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "const port=process.env.PORT||'3000'; fetch('http://127.0.0.1:'+port+'/').then((r)=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"

CMD ["node", ".output/server/index.mjs"]