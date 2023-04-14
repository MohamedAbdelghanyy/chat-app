# Chat App
V1.0

#Installation
1. Open the 'chat-app' directory run cli, type 'composer install' and hit enter.
2. Open the directory named 'react' that is located inside 'chat-app' directory, run cli, type 'npm install' and hit enter.

#Configuring Database
1. Open the '.env' file located inside 'chat-app' directory.
2. Set the 'DB_CONNECTION' to 'sqlite' and comment all the other db config. variables.

#Configuring API URL
1. Open the '.env' file located inside 'chat-app/react' directory.
2. Add this variable and assign your laravel app url to it VITE_API_BASE_URL: http://127.0.0.1:8000

#Configuring WebSockets
1. Go to pusher.com and create an account.
2. Copy the PUSHER_APP_ID, PUSHER_APP_KEY and PUSHER_APP_SECRET.
3. Open the '.env' file located inside 'chat-app' directory.
4. Paste the PUSHER_APP_ID, PUSHER_APP_KEY and PUSHER_APP_SECRET values to their variables.
5. Open the '.env' file located inside 'chat-app/react' directory.
6. Add this variable and assign your PUSHER_APP_KEY to it VITE_PUSHER_APP_KEY: EXAMPLEKEY

#Run
1. Open the 'chat-app' directory run cli, type 'php artisan serve' and hit enter.
2. Open the directory named 'react' that is located inside 'chat-app' directory, run cli, type 'npm run dev' and hit enter.
