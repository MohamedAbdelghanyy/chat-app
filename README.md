# Chat App

- `V1.2`

## Development

### Prerequisites

1. Make sure you have [composer](https://getcomposer.org/download/) installed.
2. Make sure you have latest stable version of [node](https://nodejs.org/en/download/) installed.

### Installation
1. Open the `chat-app` directory run cli, type `composer install` and hit enter.
2. Open the directory named `react` that is located inside `chat-app` directory, run cli, type `npm install` and hit enter.

### Database Configuration
1. Open the `.env` file located inside `chat-app` directory.
2. Make sure that the `DB_CONNECTION` is `mysql`, set `DB_DATABASE` to `chat_app` and fill all the other DB config. variables.
3. Run cli and type `php artisan migrate`.

### API Configuration
1. Open the `.env` file located inside `chat-app/react` directory.
2. Add this variable and assign your laravel app url to it `VITE_API_BASE_URL: http://EXAMPLE:8000`.

### WebSockets Configuration
1. Go to pusher.com and create an account.
2. Copy the `PUSHER_APP_ID`, `PUSHER_APP_KEY` and `PUSHER_APP_SECRET`.
3. Open the `.env` file located inside `chat-app` directory.
4. Paste the `PUSHER_APP_ID`, `PUSHER_APP_KEY` and `PUSHER_APP_SECRET` values to their variables.
5. Open the `.env` file located inside `chat-app/react` directory.
6. Add this variable and assign your PUSHER_APP_KEY to it `VITE_PUSHER_APP_KEY`: `EXAMPLEKEY`.

### Multi-Tenancy Configuration
1. Open the `config/tenancy.php` file.
2. Search for `central_domains` array and set your main domain to it.

### Run
1. Open the `chat-app` directory run cli, type `php artisan serve` and hit enter.
2. Open the directory named `react` that is located inside `chat-app` directory, run cli, type `npm run dev` and hit enter.

## Deployment

### React
1. Open the directory named `react` that is located inside `chat-app` directory.
2. Make a copy of `.env` file and renameit to `.env.production`
3. Change the `VITE_API_BASE_URL` to your live api URL.
4. Open cli and type `npm run build`.
5. Upload the components of `react/dist` folder to your hosting's `public_html` folder.
6. Upload the `.htaccess` file located in the `react` directory to your hosting's `public_html` folder.

### Laravel
1. Open the `.env` file located inside your `chat-app` directory, set `APP_ENV` to `prod` , `APP_DEBUG` to `false` and `APP_URL` to your domain.
2. Upload your `chat-app` directory components to your hosting `one level above the public_html folder`.
3. Move all the `public` directory components to the `public_html` directory.
4. Open the `.env` file located inside your laravel directory and update your mysql information.
5. Connect to your hosting account via SSH, navigate to your laravel directory, type `php artisan migrate` and hit enter.

## Notes
1. The project is developed using [ReactJS](https://react.dev) and [Laravel](https://laravel.com).
1. The UI is implemented using [MaterialUI](https://mui.com) Library.
2. The WebSockets is implemented using [Pusher](https://pusher.com) Services.
2. The Tenancy is implemented using [stancl/tenancy](https://tenancyforlaravel.com) Package.
