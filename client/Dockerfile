
FROM node:alpine

ENV CI=true
ENV WDS_SOCKET_PORT=0
ENV BROWSER=none
ENV HOST=0.0.0.0

WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "start"]
