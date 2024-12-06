import mongoose from "mongoose";

const profileSchema=new mongoose.Schema({
    userId: { type: String },
    name: {type:String },
    bio:{type:String},
    profile:{type:String},
    dob:{type:String},
    note:{type:String}
})

export default mongoose.model.userData||mongoose.model('userData',profileSchema);


