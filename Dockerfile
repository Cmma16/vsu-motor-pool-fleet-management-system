# Base PHP image with necessary extensions
FROM php:8.2-fpm
# Install system dependencies and Imagick dev libs
RUN apt-get update && apt-get install -y \
    ca-certificates \
    libmagickwand-dev imagemagick \
    git curl zip unzip \
    libpng-dev libjpeg-dev libfreetype6-dev \
    libonig-dev libxml2-dev libzip-dev libssl-dev \
    npm nodejs default-mysql-client \
    build-essential pkg-config

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install pdo pdo_mysql mbstring zip exif pcntl bcmath gd

# Install and enable Imagick
RUN for i in 1 2 3; do pecl install imagick-3.7.0 && break || sleep 5; done 

RUN echo "extension=imagick.so" > /usr/local/etc/php/conf.d/imagick.ini

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

# Fix permissions
RUN chmod -R 775 storage bootstrap/cache

# Link storage 
RUN php artisan storage:link
CMD php artisan config:clear && \
    php artisan config:cache && \ 
    php artisan route:clear && \
    php artisan route:cache

# Expose port for Render
EXPOSE 8080

# Start Laravel only after .env is available
CMD php artisan serve --host=0.0.0.0 --port=8080
