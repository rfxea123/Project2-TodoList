const Mongoose = require('mongoose');

const dbURI='mongodb://localhost:27017/TosoListV01';

Mongoose.connect(dbURI);

const db=Mongoose.connection;

db.on('error', (err)=>{
    console.log('ERROR in MongoDB');
});

db.on('connected', (err)=>{
    console.log('MongoDB is CONNECTED ...');
});