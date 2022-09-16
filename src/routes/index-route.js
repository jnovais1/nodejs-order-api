'use strict';

const express = require('express');
const router = express.Router();

//rota raiz somente para testes, ver se a api está rodando 
const route = router.get('/', (req, res, next) => {
    res.status(200).send({
        title: 'API Teste',
        version: '1.0.0'
    });
});

//route é o proprio express.Router
module.exports = router;