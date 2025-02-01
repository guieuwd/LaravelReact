
# Setup

1. Clone repository (<https://github.com/jenia-buianov/nginx-docker-app/tree/master>)
2. Open cloned folder
3. Create back folder with laravel sail support executing command:
`composer create-project laravel/laravel back && cd back && composer require laravel/sail --dev && php artisan sail:install`
4. Remove the docker-compose.yml file from the "back" folder.
5. Move .env file from back folder to main project folder
6. Execute next commands from main project folder to create front folder: `npx create-react-app front`
7. Open the package.json file located in the front folder and insert the following line: `"homepage": "/app"`, immediately after the project description
9. Move .env file from back folder to main project folder
10. Setup APP_PORT for your application in the .env file. For example 8088 (`APP_PORT=8088`)
11. Go to main project folder and execute: `docker network create nginx-docker-app-network &&  docker-compose up -d`
12. Backend Url( <http://localhost:8088> ) && Frontend Url (<http://localhost:3000/>)

if necessary, use npm config set legacy-peer-deps true .
if ajv package error, check which version you need => npm list ajv . Install appropiate version such as npm install --save-dev ajv@^8.

# Authentication and Authorization

1. For user authentication, we use laravel sanctum for tokenization.
2. Tests can be found at phpunit ./tests/Feature/Authentication

# Testing

Using phpunit . php artisan test.

Feature tests will be used for user perceptive testing and Unit tests are for component based testing such as complex functions.

Unit Tests --> Integration Tests --> End to end Tests --> UI Tests.

# Logging and search

## Elastic search 
    - Using password generated from => bin/elasticsearch-reset-password auto -u elastic
