import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MovieItem from "./Movies/MovieItem";
import { getAllMovies } from "../api-helpers/api-helpers";


const HomePage = () => {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        getAllMovies()
            .then((data) => setMovies(data.movies))
            .catch((err) => console.log(err))
    }, []);
    // console.log(movies);
    return (
        <Box width={"100%"} height={"100%"} margin={"auto"} marginTop={2}>
            <Box margin={'auto'} width={'80%'} height={'40%'} padding={2}>
                <img
                    src='https://www.tbsnews.net/sites/default/files/styles/big_3/public/images/2022/08/27/maxresdefault_1_0.jpg'
                    alt="Kong and Godzilla 2"
                    width={"100%"}
                    height={"100%"}
                />
            </Box>
            <Box margin={'auto'} padding={5}>
                <Typography variant={"h4"} textAlign={"center"}>Welcome to the Movies App</Typography>
            </Box>
            <Box display={"flex"} width={"100%"} justifyContent={"center"} flexWrap={"wrap"}>
                {movies && movies.slice(0,3).map((movie, index,) => (
                    <MovieItem
                        id={movie._id} title={movie.title} posterUrl={movie.posterUrl} releaseDate={movie.releaseDate} key={index} />
                ))}
            </Box>
        </Box>
    )
}
export default HomePage;