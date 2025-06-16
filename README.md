# Fleet Management System

A web-based Fleet Management System built using **Laravel (PHP)** for the backend and **React (with InertiaJS + Vite)** for the frontend.

## 📦 Tech Stack

- **Frontend**: React 18 + Vite + Tailwind CSS + ShadCN/UI
- **Backend**: Laravel 10 + InertiaJS
- **Database**: MySQL

---

## ⚙️ Requirements

- PHP >= 8.1
- Composer
- Node.js >= 18
- NPM or Yarn
- MySQL/MariaDB
- Git

---

## 🛠️ Setup Instructions

```bash
cd fleet-management-system
composer install
npm install

# Copy the environment file and set DB credentials
cp .env.example .env

# Generate the application key
php artisan key:generate

# Run migrations
php artisan migrate --seed

# Optional: Link storage (for uploaded files)
php artisan storage:link

# Configure your .env file
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=vsufms_db
DB_USERNAME=root
DB_PASSWORD=yourpassword

npm run build
composer run dev
```
