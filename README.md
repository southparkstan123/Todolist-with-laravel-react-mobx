# Todo list app

## Start up the app in local environment
### Part 1 - Server side setting
1. Clone the repo from github
2. Clone the '.env.example' file and modify the configurations such as databases to this file, save the file as '.env'.
3. Run 'php artisan key:generate' to generate the application encryption key.
4. Run 'php artisan migrate' for database migration.
5. Run 'php artisan db:seed' for seeding the fake data.

### Part 2 - Client side setting
1. Run 'yarn install' to install the package
2. Run 'yarn run hot' to start the app by hot-reload
3. Run 'yarn run build' to build the app