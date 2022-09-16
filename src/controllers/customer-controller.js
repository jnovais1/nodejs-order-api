'use strict'
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer-repository');
const md5 = require('md5');

exports.post = async (req, res, next) => {
    //esse contrato e o fluentValidator remove
    //a quantidade de ifs que teria aqui. 
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O nome deve possuir no mínimo 3 caracteres.');
    contract.isEmail(req.body.email, 'E-mail inválido');
    contract.hasMinLen(req.body.password, 6, 'A senha deve possuir no mínimo 6 caracteres.');

    //se os dados estabelecidos no contrato acima forem inválidos 
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            //encriptar a senha 
            password: md5(req.body.password + global.SALT_KEY)
        });
        res.status(201).send({
            message: 'Cliente cadastrado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: "Falha ao cadastrar sua requisição."
        });
    }
}
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
    try {
        const customer = await repository.authenticate({
            email: req.body.email,
            //encriptar a senha 
            password: md5(req.body.password + global.SALT_KEY)
        });
        res.status(201).send({
            message: 'Cliente cadastrado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: "Falha ao cadastrar sua requisição."
        });
    }
}