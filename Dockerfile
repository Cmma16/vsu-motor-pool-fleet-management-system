# Base PHP image with necessary extensions
FROM php:8.3-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git curl zip unzip libpng-dev libonig-dev libxml2-dev \
    libzip-dev libcurl4-openssl-dev libssl-dev \
    npm nodejs

# Install PHP extensions# Install PHP extensions (including GD)
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
&& docker-php-ext-install pdo pdo_mysql mbstring zip exif pcntl bcmath gd

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set working directory
WORKDIR /var/www

# Copy app files
COPY . .

# Install PHP dependencies
RUN composer install

# Install Node dependencies and build frontend
RUN npm install && npm run build

# Laravel setup
RUN php artisan config:cache && php artisan route:cache

# Expose port Render will use
EXPOSE 8080

# Start Laravel development server
CMD php artisan serve --host=0.0.0.0 --port=8080
