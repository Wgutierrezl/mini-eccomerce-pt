FROM node:20-alpine

WORKDIR /app

# Copiamos dependencias
COPY package*.json ./

RUN npm install

# Copiamos el código
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
