FROM node:current-alpine
COPY . ./app
WORKDIR /app/
RUN npm install
RUN npm run build
COPY . .
CMD ["sh", "-c", "npm run db:deploy && npm run start"]