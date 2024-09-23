import axios from 'axios';

export const getAllMovies = async () => {
    const res = await axios.get("/movie").catch((err) => console.log(err));
    if (res.status !== 200) {
        return console.log("No Data")
    }
    const data = await res.data;
    return data;
}
export const sendUserAuthRequest = async (data, signup) => {
    const res = await axios
    .post(`/user/${signup ? "signup" : "login"}`, {
        name: data.name,
        email: data.email,
        password: data.password
    })
    .catch((err) => console.log(err))
    if(res.status !== 200 && res.status !==201){
        console.log("Khong gui User len duoc")
    }
    const resData = await res.data;
    return resData;
}

export const sendAdminAuthRequest = async(data) => {
    const res = await axios.post("/admin/login", {
        email: data.email,
        password: data.password
    }).catch((err) => console.log(err))
    if(res.status !== 200){
        console.log("Khong gui Admin len duoc")
    }
    const resData = await res.data;
    return resData;
}

export const getMovieDetails = async (id) => {
    const res = await axios.get(`/movie/${id}`)
    .catch(err => console.log(err))
    if(res.status !== 200){
        console.log(res);
        console.log(res.status)
        return console.log("Khong lay duoc movie details")
    }
    const resData = await res.data;
    return resData;
}

export const newBooking = async (data) => {
    const res = await axios.post('/booking', {
        movie: data.movie,
        seatNumber: data.seatNumber,
        date:data.date,
        user: localStorage.getItem("userId")
    })
    .catch(err => console.log(err))
    if(res.status !== 201){
        return console.log("Khong book duoc")
    }
    const resData = await res.data;
    return resData;
}

export const getUserBooking = async()=>{
    const id = localStorage.getItem("userId")
    // console.log("getuserbooking: ", id);
    const res = await axios.get(`/user/bookings/${id}`)
        .catch(err => console.log(err))
    if(res.status !== 200){
        return console.log("Khong lay duoc booking cua user")
    }
    const resData = await res.data;
    // console.log(resData)
    return resData
}

export const deleteBooking = async (id) => {
    const res = await axios
        .delete(`/booking/${id}`)
        .catch(err => console.log(err))
    if(res.status !== 200){
        return console.log("Khong xoa duoc booking")
    }
    const resData = await res.data;
    return resData;
}

export const getUserDetails = async () => {
    const id = localStorage.getItem("userId");
    const res = await axios.get(`/user/${id}`)
    .catch(err => console.log(err))
    if(res.status !== 200){
        return console.log("Khong lay duoc user details")
    }
    const resData = await res.data;
    return resData;
}

export const addMovie = async (data) => {
    const res = await axios.post("/movie", {
        title: data.title,
        description: data.description,
        posterUrl: data.posterUrl,
        releaseDate: data.releaseDate,
        featured: data.featured,
        actors: data.actors,
        admin: localStorage.getItem("adminId")   
    },{
        headers:{
            Authorization: 'Bearer ' + localStorage.getItem("token")
        }
    }).catch(err => console.log(err))  

    if(res.status !== 201){
        return console.log("Khong them duoc movie")
    }
    const resData = await res.data;
    return resData;
}

export const getAdminById = async () => {
    const adminId = localStorage.getItem("adminId");
    const res = await axios.get(`/admin/${adminId}`).catch(err => console.log(err))
    if(res.status !== 200){
        return console.log("Khong lay duoc admin by id")
    }
    const resData = await res.data;
    return resData;
}