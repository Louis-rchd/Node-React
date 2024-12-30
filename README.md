# Project in Node & React course

For this project we decided to code a School management website.

## Components

We decided to implement three pages to manage teachers, students and courses. It's linked to a PostgreSQL database.
We can add delete and get these objects.

We also added a map with the campus of the ESILV marked on it, a HighChart and a AGGrid which is not working for now.

## Launching it

To launch the front end, you can do the command
```bash
npm install
ng serve
```

To launch the back end, you can do the command
```bash
npm install
npm start
```

## Linking it with PostgreSQL database

We exported the database using 
```bash
pg_dump -h localhost -U postgres -W -d school > mybackup.sql 
```
There is a my_backup.sql file in the backend in github
You can execute the command following in the CMD to add the sql file in a new database:
(psql is often located in C:\Programs\PostgreSQL\bin)
```bash
psql -h localhost -U postgres -W -d mydatabase < mybackup.sql
```
You need to have administrator right so the command will work.

You also need to complete the .env file in the back-end folder to put your database credentials so as the backend will be able to connect to your PostgreSQL