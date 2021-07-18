const mongoose = require('mongoose');
mongoose.promise = global.promise;
mongoose.connect('mongodb://127.0.0.1:27017/taskmanagerdb', {useNewUrlParser: true ,useUnifiedTopology: true })
.then(()=>{console.log("DB successfully connected")})
.catch((error)=> {console.log(error)}); 
module.exports = mongoose;
