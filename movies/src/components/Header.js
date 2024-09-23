import React, { useEffect, useState } from "react";
import { AppBar, Box, Toolbar, TextField, Autocomplete, Tab, Tabs, useScrollTrigger, Slide } from "@mui/material"
import TheatersIcon from '@mui/icons-material/Theaters';
import { getAllMovies } from "../api-helpers/api-helpers";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../store";
// import Autocomplete from "@mui/material";
const HideOnScroll = (props) => {
    const { children } = props;
    const trigger = useScrollTrigger();
    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
};


const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn)
    const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn)

    const [value, setValue] = useState(0);
    const [movies, setMovies] = useState([]);
    // const [selectedMovie, setSelectedMovie] = useState();   
    useEffect(() => {
        getAllMovies()
            .then((data) => setMovies(data.movies))
            .catch((err) => console.log(err))
    }, []);
    const logout = (isAdmin)=> {
        dispatch(isAdmin?adminActions.logout():userActions.logout())
    }
    const handleChange = (e, val) => {
        const movie = movies.find((movie) => movie.title === val);
        if(isUserLoggedIn){
            navigate(`/booking/${movie._id}`)
        }
    }
    return (
        <HideOnScroll>
            <AppBar position={"sticky"} sx={{ bgcolor: "#53ccec" }}>
                <Toolbar  >
                    <Box width={'20%'}>
                        <Link to="/">
                            <TheatersIcon label='icon' />
                        </Link>
                        {/* <TheatersIcon /> */}
                    </Box>
                    <Box width={'30%'} margin={'auto'}>
                        <Autocomplete
                            onChange={handleChange} 
                            freeSolo
                            options={movies && movies.map((option) => option.title)}
                            renderInput={(params) => (
                                <TextField sx={{ input: { color: "#000181" } }} variant="standard" {...params} label="Search movies" />
                            )}
                        />

                    </Box>
                    <Box display={'flex'}>
                        <Tabs textColor="inherit" indicatorColor="secondary" value={value} onChange={(e, value) => setValue(value)}>
                            <Tab label="Movies" LinkComponent={Link} to="/movies" />
                            {!isAdminLoggedIn && !isUserLoggedIn &&
                                <>
                                    <Tab label="Admin" LinkComponent={Link} to="/admin" />
                                    <Tab label="Auth" LinkComponent={Link} to="/auth" />
                                </>
                            }
                            {isUserLoggedIn &&
                                <>
                                    <Tab label="Profile" LinkComponent={Link} to="/user" />
                                    <Tab onClick = {() => logout(false)} label="Logout" LinkComponent={Link} to="/" />
                                </>
                            }
                            {isAdminLoggedIn &&
                                <>
                                    <Tab label="Add Movies" LinkComponent={Link} to="/add" />
                                    <Tab label="Profile" LinkComponent={Link} to="/user-admin" />
                                    <Tab onClick = {() => logout(true)} label="Logout" LinkComponent={Link} to="/" />
                                </>
                            }

                        </Tabs>
                    </Box>
                </Toolbar>
            </AppBar>
        </HideOnScroll>
    )
}

export default Header