'use strict'
const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.get = async () => {
    //se nao retornasse nada, daria erro de req
    const res = await Customer
        .find({
            active: true   //mostra somente produtos ativos
        }, 'name email'); //e esses dados
    return res;
}
exports.create = async (data) => {
    var customer = new Customer(data);
    await customer.save();
}

//
exports.authenticate = async(data) => {
    const res = await Customer.find({
        email: data.email,
        password: data.password
    });
    return res;
}