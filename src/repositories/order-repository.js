'use strict'
const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.get = async (data) => {
    var res = await Order.find({})
    .populate('customer', 'name email')
    .populate('items.product', 'title');
    //sem as funcoes populate, nao mostra quem
    //é o cliente e nem o item do pedido
    return res;
}

exports.create = async (data) => {
    var order = new Order(data);
    await order.save();
}