import mongoose from "mongoose";
import Booking from "../models/Booking.js";
import Movie from "../models/Movie.js";
import User from "../models/User.js";
export const newBooking = async (req, res, next) => {
    const {movie, date, seatNumber, user} = req.body;

    let existingMovie;
    let existingUser;
    try{
        existingMovie = await Movie.findById(movie);
        // console.log(existingMovie.title);
        existingUser = await User.findById(user);
        // console.log(existingUser.name);
    }
    catch(err){
        return console.log(err);
    }
    if(!existingMovie){
        return res.status(404).json({message: "Movie  not found!"});
    }
    if(!existingUser){
        return res.status(404).json({message: "User not found!"});
    }
    let booking;
    try{
        booking = new Booking({movie, date: new Date(`${date}`), seatNumber, user});

        const session = await mongoose.startSession();
        session.startTransaction();
        existingUser.bookings.push(booking);
        existingMovie.bookings.push(booking);
        await existingUser.save({session});
        await existingMovie.save({session});
        await booking.save({session});
        session.commitTransaction();

    }
    catch(err){
        return console.log(err);
    }
    if(!booking){
        return res.status(500).json({message:"Unable to create booking"})
    }
    return res.status(201).json({booking})
}

export const getBookingById = async (req, res, next) => {
    const id = req.params.id;
    let booking;
    try{
        booking = await Booking.findById(id);
    }
    catch(err){
        console.log(err);
    }
    if(!booking){
        return res.status(404).json({message: "No booking found by that Id"});
    }
    return res.status(200).json({booking});
}
export const deleteBooking = async(req, res, next)=>{
    const id = req.params.id;
    let booking;
    try{
        booking = await Booking.findByIdAndDelete(id).populate("movie user");
        const session = await mongoose.startSession();
        session.startTransaction();
        await booking.user.bookings.pull(booking);
        await booking.movie.bookings.pull(booking);
        await booking.movie.save({session});
        await booking.user.save({session});
        session.commitTransaction();
    }
    catch(err){
        console.log(err);
    }   
    if(!booking){
        return res.status(404).json({message: "No booking found by that Id"});
    }   
    return res.status(200).json({message: "Booking deleted successfully!"});
}