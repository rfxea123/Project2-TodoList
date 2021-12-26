const {Schema, model}= require('mongoose')


const userSchema= new Schema ({
    username: {type: String, required:true},
    email:{type: String, required:true, unique:true},
    password: String
})

const User = model('User', userSchema)

module.exports= User