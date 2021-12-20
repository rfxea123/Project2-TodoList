const {Schema, model}= require('mongoose')


const todoSchema= new Schema ({
    title: String,
    isCompleted: Boolean
})

const Tode = model('Todo', todoSchema)

module.exports= Tode