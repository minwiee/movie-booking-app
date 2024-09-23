import jwt from "jsonwebtoken";
import Movie from "../models/Movie.js";
import Admin from "../models/Admin.js";
import mongoose from "mongoose";
export const addMovie = async(req, res, next) => {
    const extractedToken = req.headers.authorization.split(" ")[1];
    if(!extractedToken && extractedToken.trim() === ""){
        return res.status(404).json({message: "Token not found"});
    }
    // console.log(extractedToken);

    let adminId;

    // Verify the token
    jwt.verify(extractedToken, process.env.SECRET_KEY, (error, dectypted) => {
        if(error){
            return res.status(400).json({message: `${error.message}`});
        }
        else{
            adminId = dectypted.id;
            return;
        }
    });

    //create mmovie
    const {title, description, actors, releaseDate, posterUrl, featured} = req.body;
    if(!title || title.trim()==="" || !description || description.trim() ==="" 
         || !posterUrl ||posterUrl.trim() ===""){
        return res.status(422).json({message: "All fields are required"});
    }

    let movie;
    try {
        movie = new Movie({
            title,
            description,
            actors,
            releaseDate: new Date(`${releaseDate}`),
            posterUrl,
            featured,
            admin: adminId
        });


        const session = await mongoose.startSession();
        const adminUser = await Admin.findById(adminId);
        session.startTransaction();
        await movie.save({session});
        adminUser.addedMovies.push(movie);
        await adminUser.save({session});
        await session.commitTransaction();
        
        // movie = await movie.save();
    } catch (error) {
        return console.log(error);
    }

    if(!movie){
        return res.status(500).json({message: "Request failed, try again"});
    }
    return res.status(201).json({movie});
}

export const getAllMovies = async(req, res, next) => {
    let movies;
    try{
        movies = await Movie.find();
    }
    catch(error){
        return console.log(error);
    }
    if(!movies){
        return res.status(500).json({message: "No movies found"});
    }
    return res.status(200).json({movies});
};

export const getMovieById = async(req, res, next) => {
    let movie;
    let id = req.params.id;
    try{
        movie = await Movie.findById(id);
    }
    catch (err){
        console.log(err);
    }
    if(!movie){
        return res.status(404).json({message: "No movie found by that Id"});
    }
    return res.status(200).json({movie});
}

export const deleteMovie = async(req, res, next) => {
    let movie;
    let id = req.params.id;
    try{
        movie = await Movie.findByIdAndDelete(id).populate("admin");
        const session = await mongoose.startSession();
        session.startTransaction();
        await movie.admin.addedMovies.pull(movie);
        await movie.admin.save({session});
        session.commitTransaction();

        // movie = await Movie.findByIdAndDelete(id);
    }
    catch (err){
        console.log(err);
    }
    if(!movie){
        return res.status(404).json({message: "No movie found by that Id"});
    }
    return res.status(200).json({message: "Movie deleted successfully"});
}