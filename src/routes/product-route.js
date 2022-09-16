'use strict';
const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');
const authService = require('../services/auth-service');
router.get('/', controller.get);
//o ":" é a ser inserido na pesquisa na url
//ex: localhost:3000/slug-a-ser-pesquisado
router.get('/:slug', controller.getBySlug);
router.get('/admin/:id', controller.getById);
router.get('/tags/:tag', controller.getByTag);

//authservice.authorize faz com quem só quem tenha o token possa cadastrar produtos
//formas de utilizar o token: /products?token='MEUTOKEN'
//Headers > x-access-token > MEUTOKEN 
//body > "Token": "MEUTOKEN"
router.post('/', authService.authorize, controller.post);

router.put('/:id', controller.put);

router.delete('/', controller.delete);

module.exports = router;