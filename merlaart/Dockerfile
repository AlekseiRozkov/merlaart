# Используем официальный Node.js образ
FROM node:18

# Задаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта в контейнер
COPY . .

# Выполняем build проекта
RUN npm run build

# Указываем команду запуска
CMD ["npm", "start"]

# Указываем порт, который будет использовать контейнер
EXPOSE 3000
