1. Clone repository
***REMOVED***
***REMOVED*** 
***REMOVED***
***REMOVED***
***REMOVED***
5. Execute next commands from main project folder to create front folder: `npx create-react-app front`
6. Open the package.json file located in the front folder and insert the following line: `"homepage": "/app"`, immediately after the project description
7. Setup APP_PORT for your application in the .env file. For example 8088 (`APP_PORT=8088`)
8. Go to main project folder and execute: `docker network create nginx-docker-app-network &&  docker-compose up -d`
