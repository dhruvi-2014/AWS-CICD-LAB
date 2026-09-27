FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY src ./src
COPY views ./views
COPY public ./public
RUN mkdir -p data && chown -R node:node /app
USER node
ENV PORT=8080
EXPOSE 8080
CMD ["node","src/server.js"]
