'use strict'

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('../../config');

const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'jnovais',
    password: '123456',
    database: 'juan'
});
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});
connection.query('SELECT * FROM users', function(err, rows, fields){
    if(!err){
        console.log('Resultado: ', rows);
    }else {
        console.log("Erro ao realizar consulta");
    }
});

//instanciando o produto
const Product = require('./models/product');
//instanciando cliente
const Customer = require('./models/customer');
//instanciando os pedidos
const Order = require('./models/order');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//trazendo as rotas
const indexRoutes = require('./routes/index-route.js');
const productRoute = require('./routes/product-route');
const customerRoute = require('./routes/customer-route');
const orderRoute = require('./routes/order-route');

app.use('/', indexRoutes);
app.use('/products', productRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);


module.exports = app;
