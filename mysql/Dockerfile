FROM mysql:8.0.29

COPY ./init/mysql_init.sql /docker-entrypoint-initdb.d/

CMD ["mysqld"]
