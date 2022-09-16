'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

const ValidationContract = require('../validators/fluent-validator');

const repository = require('../repositories/product-repository');

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
exports.getBySlug = async (req, res, next) => {
    try {
        var data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar requisição."
        });
    }
}
exports.getById = async (req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar requisição."
        });
    }
}

//com a pesquisa de uma tag na url acha os produtos
//da tag pesquisada (1 vantagem do banco nosql)
exports.getByTag = async (req, res, next) => {
    try {
        var data = await repository.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar requisição."
        });
    }
}

exports.post = async (req, res, next) => {
    //esse contrato e o fluentValidator remove
    //a quantidade de ifs que teria aqui. 
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O título deve possuir no mínimo 3 caracteres.');
    contract.hasMinLen(req.body.slug, 3, 'Slug deve possuir no mínimo 3 caracteres.');
    contract.hasMinLen(req.body.description, 3, 'A descrição deve possuir no mínimo 3 caracteres.');

    //se os dados estabelecidos no contrato acima forem inválidos 
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    try {
        await repository.create(req.body)
        res.status(201).send({
            message: 'Produto cadastrado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: "Falha ao cadastrar produto."
        });
    }
}

exports.put = async (req, res, next) => {
    try {
        await repository.update(req.params.id, req.body)
        res.status(200).send({
            message: 'Produto atualizado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: "Falha ao atualizar produto."
        });
    }
}

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.body.id)
        res.status(200).send({
            message: 'Produto removido com sucesso!'

        });
    } catch (e) {
        res.status(500).send({
            message: "Falha ao remover produto."
        });
    }
};
