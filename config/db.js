const mysql = require('mysql2');
const config= require('./config');


const pool=mysql.createPool({
    host: config.HOST,
    user: config.USER,
    password: config.PASSWORD,
    database: config.DATABASE,
    port: config.DB_PORT
});

const promisePool = pool.promise();

module.exports= promisePool;