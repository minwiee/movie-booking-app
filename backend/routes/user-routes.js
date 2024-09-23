import express from 'express';
import {deleteUser, getAllUsers, getBookingsOfUser, getUserById, login, signup, updateUser} from '../controllers/user-controller.js';
//test get API
const userRouter = express.Router();

userRouter.get('/', getAllUsers); //lay danh sach tat ca user trong database
userRouter.get('/:id', getUserById)
userRouter.post('/signup', signup); //them user vao database
userRouter.put('/:id', updateUser); //update user theo id cua nguoi dung
userRouter.delete('/:id', deleteUser); //xoa user theo id cua nguoi dung
userRouter.post('/login', login); //dang nhap
userRouter.get("/bookings/:id", getBookingsOfUser); //lay danh sach booking cua user theo id cua nguoi dung
export default userRouter;