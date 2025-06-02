# Ciberistas Backend

The backend directory inside the repository is meant to store all code
related to the database and the endpoints required to run the web app.

## Commands

As of this moment, I havent built anything to start it automatically.
We will need to create a bash script to start all services.
Meanwhile, here are the main commands to use the db and its endpoints:

```
# To start the mysql server
mysqld --datadir=$PWD/backend/mysql-data --socket=$PWD/backend/mysql-data/mysql.sock --skip-networking &

# Use the mysql client
mysql -u root --socket=$PWD/backend/mysql-data/mysql.sock

# Shutdown the mysql server
mysqladmin -u root --socket=$PWD/backend/mysql-data/mysql.sock shutdown
```

> [!Important]
> The previous commands are correct only if you are using the structure defined in flake.nix.
> In case you didn't use the nix flake, consider declaring ./backend/mysql-data as the mysql data directory.
> And always start the client from the root directory of the project.

### MySQL commands

When you start the mysql server, you will need to create a database and
a few tables. I took the time to write the process in a few sql files,
so the process is simplified to the following:

```
# Inside the mysql client
SOURCE backend/setup.sql
```

This will create the database `ciberistas`, and the tables `workshops` and `dates`.
