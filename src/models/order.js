'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    customer: {
        //importa o modelo de cliente ja criado
        type: mongoose.Schema.Types.ObjectId,
        //ref define de qual modelo o /\ objectId ira buscar
        ref: 'Customer'
    },
    number: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: String,
        required: true,
        enum: ['created', 'done'],
        default: 'created'
    },
    items: [{ //items é um array que receberá:
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        price: {
            type: Number,
            required: true
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            //ref define de qual modelo o /\ objectId irá buscar
            ref: 'Product'
        }
    }]
});
module.exports = mongoose.model('Order', schema);