const mongoose = require("mongoose");


const truckSchema = new mongoose.Schema({
    truckId :{
        type:Number,
        index:true,
        unique:true,
        require:true,
        sparse:true
    }
})

//create a new collection 
const Truck = new mongoose.model('Truck',truckSchema);
module.exports = Truck;