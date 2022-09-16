'use strict'
const repository = require('../repositories/order-repository');
const guid = require('guid');

exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar requisição."
        });
    }
}

exports.post = async (req, res, next) => {
    try {    //criamos o data assim, e nao ''req.body''
             //pois nao queremos que 
            //passe "createDate", "status" etc.
        await repository.create({
            customer: req.body.customer,
            //guid gera um numero aleatorio para o pedido
            number: guid.raw().substring(0, 6),
            items: req.body.items
        });
        res.status(201).send({
            message: 'Pedido cadastrado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar requisição'
        });
    }
};