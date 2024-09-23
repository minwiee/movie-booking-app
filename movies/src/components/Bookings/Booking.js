import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, newBooking } from "../../api-helpers/api-helpers";
import { Box, Button, FormLabel, TextField, Typography } from "@mui/material";
import './Booking.css';
const Booking = () => {
    const [movie, setMovie] = useState();
    const [inputs, setInputs] = useState({ seatNumber: "", date: "" });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const id = useParams().id;
    const today = new Date();
    const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    // console.log(id);
    useEffect(() => {
        getMovieDetails(id)
            .then((res) => {
                setMovie(res.movie)
            })
            .catch((err) => console.log(err))
    }, [id])
    // console.log(movie);
    const handleChange = (e) => {
        setInputs((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        newBooking({ ...inputs, movie: movie._id })
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
        setIsSubmitted(true);

    }
    useEffect(() => {
        if (isSubmitted) {
            alert('Your booking was successful!');
        }
    }, [isSubmitted]);
    return <div>
        {movie && <Fragment>
            <Typography padding={3} fontFamily={"fantasy"} variant="h4" textAlign={"center"} >
                Book Tickets Of Movie: {movie.title}
            </Typography>
            {/* <Box display={"flex"} justifyContent={"center"}> */}
            <Box display={"flex"} justifyContent={"center"} flexDirection={"row"} paddingTop={3} width={"80%"} paddingLeft={3}>
                <img className="movie-poster" width={"30%"} src={movie.posterUrl} alt={movie.title}></img>
                <Box width={"100%"}>
                    <Box width={"80%"} marginTop={3} padding={2}>
                        <Typography paddingTop={2}>{movie.description}</Typography>
                        <Typography fontWeight={"bold"} marginTop={1}>
                            Actors: {movie.actors.join(', ')}
                        </Typography>
                        <Typography fontWeight={'bold'} marginTop={1}>
                            Release Date: {new Date(movie.releaseDate).toDateString()}</Typography>
                    </Box>
                    <Box width={"70%"}>
                        <form onSubmit={handleSubmit}>
                            <Box padding={3} margin={"auto"} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                                <FormLabel>Seat Number </FormLabel>
                                <TextField name="seatNumber" type="number" margin="normal" variant="standard" value={inputs.seatNumber} onChange={handleChange} placeholder="Choose in range 1-20" InputProps={{
                                    inputProps: {
                                        min: 1,
                                        max: 20
                                    }
                                }} required></TextField>
                                <FormLabel>Booking Date</FormLabel>
                                <TextField name="date" type={"date"} margin="normal" variant="standard" value={inputs.date} onChange={handleChange} required InputProps={{
                                    inputProps: {
                                        min: dateString // Replace with the date you want
                                    }
                                }}
                                ></TextField>
                                <Button type="submit" sx={{ mt: 3 }}>Book Now</Button>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Box>
            {/* </Box> */}
        </Fragment>}
    </div>
}
export default Booking;