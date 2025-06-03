# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# ✅ Run Prisma generate
RUN npx prisma generate

# Build the app (this will use Prisma client)
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]
