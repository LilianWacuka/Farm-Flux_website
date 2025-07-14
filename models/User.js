import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username:{ type: String, required: true, unique: true },
    email:{ type: String, required: true, unique: true },
    password:{ type: String, required: true },
    country: {String},
    subscriptionPlan: { type: String, default: "free"},
    subscriptionExpiry: Date,

}, {timestamps: true}
);
export default mongoose.model("User", userSchema);