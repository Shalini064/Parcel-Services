const mongoose = require("mongoose");


const parcelSchema = new mongoose.Schema({
    parcelId :{
        type:Number,
        index:true,
        unique:true,
        require:true,
        sparse:true
    },
    parcelWeight   :{
        type:String,
        required:true
    },
    parcelLoadUnloadStatus:{
        type:String,
        required:false
    },
    truckId:{
        type:Number,
        required:false
    }

})

//create a new collection 
const Parcel = new mongoose.model('Parcel',parcelSchema);
module.exports = Parcel;