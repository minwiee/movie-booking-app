import mongoose from "mongoose";

//khai bao model user va day len database
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    bookings:[{
        type: mongoose.Types.ObjectId,
        ref: "Booking"
    }]
});

export default mongoose.model("User", userSchema);
