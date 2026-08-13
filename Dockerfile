FROM node:23-alpine AS builder

WORKDIR /app

RUN corepack enable pnpm

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV NEXT_PUBLIC_APP_ENV=${NODE_ENV}

ARG NEXT_PUBLIC_BASE_API_PRODUCTION
ENV NEXT_PUBLIC_BASE_API_PRODUCTION=${NEXT_PUBLIC_BASE_API_PRODUCTION}

ARG NEXT_PUBLIC_BACKOFFICE_PATH
ENV NEXT_PUBLIC_BACKOFFICE_PATH=${NEXT_PUBLIC_BACKOFFICE_PATH}

ARG NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
ENV NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=${NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

FROM node:23-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder --chown=node:node /app/public ./public

RUN mkdir .next
RUN chown node:node .next

COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node
EXPOSE 3000

CMD ["node", "server.js"]
