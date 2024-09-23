import Booking from "../models/Booking.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

//lay danh sach tat ca user trong database
export const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        return console.log(err);
    }

    //k tim thay thi ghi ra file json tbao
    if(!users) {
        return res.status(500).json({message: "Unexpected Error Occured: Can not find users!"});
    }
    
    //tim thay thi tra ve danh sach user
    return res.status(200).json({users });
};

//them user vao database
export const signup = async (req, res, next) => {
    const {name, email, password} = req.body;
    //kiem tra input data co hop le khong
    if (!name && name.trim() === "" &&
        !email && email.trim() === "" &&
        !password && password.trim() === ""
    ) {
        return res.status(422).json({message: "Invalid inputs"});
    }
    const hashedPassword = bcrypt.hashSync(password);
    //tao user moi
    let user;
    try {
        user = new User({ name, email, password: hashedPassword });
        user = await user.save();
    } catch (err) {
        return console.log(err);
    }
    //k tim thay thi ghi ra file json tbao
    if(!user) {
        return res.status(500).json({message: "Unexpected Error Occured: Can not create user!"});
    }
    //tim thay thi tra ve user vua tao
    return res.status(201).json({id: user._id});
};

//update user
export const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const {name, email, password} = req.body;
    //kiem tra input data co hop le khong
    if (!name && name.trim() === "" &&
        !email && email.trim() === "" &&
        !password && password.trim() === ""
    ) {
        return res.status(422).json({message: "Invalid inputs"});
    }
    const hashedPassword = bcrypt.hashSync(password);

    //tim user can update 
    let user;
    try {
        user = await User.findByIdAndUpdate(id, {name, email, password: hashedPassword});
    } catch (err) {
        return console.log(err);
    }

    //k tim thay thi ghi ra file json tbao
    if(!user) {
        return res.status(500).json({message: "Unexpected Error Occured: Can not find to update user!"});
    }

    //tim thay thi tra ve user vua update
    return res.status(200).json({message: "Update user successfully!"});
};

//xoa user
export const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    let user;
    try {
        // user = await User.findByIdAndRemove(id); //phuong thuc nay da bi deprecated
        user = await User.findByIdAndDelete(id);
    }
    catch (err) {
        return console.log(err);
    }
    if (!user){
        return res.status(500).json({message: "Unexpected Error Occured: Can not find to delete user!"});
    }
    return res.status(200).json({message: "Delete user successfully!"});
};

//dang nhap
export const login = async (req, res, next) => {
    const {email, password} = req.body;
    if (!email && email.trim() === "" &&
        !password && password.trim() === "") 
    {
        return res.status(422).json({message: "Invalid inputs"});
    }

    let existingUser;
    try {
        existingUser = await User.findOne({email});
    } catch (error) {
        return console.log(error);
    }
    //user chua ton tai
    if (!existingUser) {
        return res.status(404).json({message: "Invalid id, can not find user."});
    }
    //ton tai roi thi kiem tra password
    //truonghopbandau chua ma hoa password, neu k phai thi nhay xuong truong hop duoi
    try {
        if(password === existingUser.password){
            return res.status(200).json({message: "Login type 1 successfully!"});
        }
    } catch (error) {
        return next(error);
    }
    //neu mahoa password roi thi kiem tra bang decrypt ra r check
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if(!isPasswordCorrect){
        return res.status(400).json({message: "Incorrect password, please try again!"});
    }
    return res.status(200).json({message: "Login successfully hehe!", id: existingUser._id});
}

export const getBookingsOfUser = async (req, res, next) => {
    const id = req.params.id;
    let bookings;
    try {
        // console.log("ham getbooking of user");
        // console.log(id);
        bookings = await Booking.find({user: id}).populate('user movie');
    } catch (err) {
        return console.log(err);
    }
    if(!bookings){
        return res.status(500).json({message: "Unable to get Bookings"})
    }
    // console.log({booking: bookings[0].user.name});
    return res.status(200).json( {bookings});
}
export const getUserById = async (req, res, next) => {
    const id = req.params.id;
    let user;
    try {
        user = await User.findById(id);
    } catch (err) {
        return console.log(err);
    }

    //k tim thay thi ghi ra file json tbao
    if(!user) {
        return res.status(500).json({message: "Unexpected Error Occured: Can not find users!"});
    }
    
    //tim thay thi tra ve danh sach user
    return res.status(200).json({user });
};
