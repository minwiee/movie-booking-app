import React, { Fragment, useEffect, useState } from "react";
import {  getAdminById } from "../api-helpers/api-helpers";
import { Box, IconButton, List, ListItem, ListItemText, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const AdminProfile = () => {
    const [admin, setAdmin] = useState();
    useEffect(() => {
        getAdminById()
            .then((res) => setAdmin(res.admin))
            .catch(err => console.log(err))
    }, [])
    console.log(admin);
    return (
        <Box width={"100%"} display={'flex'}>
            <Fragment>      {""}
                {admin && <Box flexDirection={"column"} justifyContent={"center"} alignItems={"center"} width={"15%"} padding={3}>
                    <AccountCircleIcon sx={{ fontSize: "10rem", textAlign: 'center', ml: 3}} />
                    <Typography mt={1} padding={1} width={"auto"} textAlign={'center'} border={'1px solid #ccc'} borderRadius={6}>
                        Email: {admin.email}
                    </Typography>

                    {/* {console.log(bookings[0].user.name)} */}
                </Box>
                }
                {admin && admin.addedMovies.length > 0 &&
                    (<Box width={"70%"} display={"flex"} flexDirection={"column"}>
                        <Typography variant={"h4"} textAlign={"center"} padding={2}>Your added movies</Typography>
                        <Box margin={"auto"} display={"flex"} flexDirection={"column"} width={"80%"} >
                            <List>
                                {admin.addedMovies.map((movie, index) => (
                                    <ListItem sx={{ bgcolor: "#00d386", color: "white", textAlign: "center", margin: 1 }}>
                                        <ListItemText sx={{ margin: 1, width: "auto", textAlign: "left" }}>Movie: {movie.title}</ListItemText>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Box>)
                }
            </Fragment>

        </Box>
    )
}
export default AdminProfile;