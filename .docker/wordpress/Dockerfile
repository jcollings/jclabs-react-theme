FROM wordpress:php7.4-apache

#
# Install Xdebug
#
ENV XDEBUG_PORT 9000
ARG XDEBUG_REMOTE_HOST=host.docker.internal
RUN yes | pecl install xdebug && \
    echo "zend_extension=$(find /usr/local/lib/php/extensions/ -name xdebug.so)" > /usr/local/etc/php/conf.d/xdebug.ini && \
    echo "xdebug.remote_enable=1" >> /usr/local/etc/php/conf.d/xdebug.ini && \
    echo "xdebug.remote_autostart=1" >> /usr/local/etc/php/conf.d/xdebug.ini && \
    echo "xdebug.remote_host=$XDEBUG_REMOTE_HOST" >> /usr/local/etc/php/conf.d/xdebug.ini

#
# Install SSL Cert
# 
RUN apt-get update && \
    apt-get install -y --no-install-recommends ssl-cert && \
    a2enmod ssl && \
    a2ensite default-ssl

#
# Capture all mail sending it to mailcatcher
# 
COPY mailcatcher.php /var/www/html/wp-content/mu-plugins/mailcatcher.php

#
# Install WP CLI
#
RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar && \
    chmod +x wp-cli.phar && \
    mv wp-cli.phar /usr/local/bin/wp

#
# Install Yarn
#
RUN apt-get update && \
    apt-get install -y gnupg2 && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && \
    apt-get -y install yarn

#
# Install phpunit
#
RUN apt-get update && \
    apt-get install -y subversion && \
    curl https://phar.phpunit.de/phpunit-7.5.phar -L -o phpunit-7.5.phar && \
    chmod +x phpunit-7.5.phar && \
    mv phpunit-7.5.phar /usr/local/bin/phpunit

#
# Install Zip
#
RUN apt-get update && \
    apt-get install -y zip && \
    apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

#
# Install Composer
#
RUN curl -sS https://getcomposer.org/installer | php \
    && mv composer.phar /usr/local/bin/ \
    && ln -s /usr/local/bin/composer.phar /usr/local/bin/composer
ENV PATH="~/.composer/vendor/bin:./vendor/bin:${PATH}"

#
# Cleanup
#
RUN apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

EXPOSE 9000