FROM shion1305/pnpm:22-alpine3.20 AS builder
WORKDIR /root
COPY . .
ARG NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL
RUN pnpm install
COPY . /root
RUN pnpm run build
CMD [ "pnpm", "start" ]
EXPOSE 3000
