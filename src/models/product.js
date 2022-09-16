'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schema = new Schema({
    // cria _id automaticamente
    title: {
        type: String,
        required: true,
        trim:true
    },
    slug: { //compõe a url
            //ex: cadeira gamer > cadeira-gamer
        type: String,
        required: [true, 'O slug é obrigatório.'],
        trim: true,
        index: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
    },
    active: { //forma como é criado
        type: Boolean,
        required: true,
        default: true
    },
    tags: [{ //array que receberá varias tags
        type: String,
        require: true
    }],
   /*image: {
//imagem é do tipo string para nao salvar a imagem
//no banco de dados, entao pegamos apenas o caminho.
        type: String,
        required: true,
        trim: true
    }*/
});

module.exports = mongoose.model('Product', schema)