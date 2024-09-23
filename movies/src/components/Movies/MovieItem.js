import { Button, Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import './MovieItem.css';

const MovieItem = ({ title, releaseDate, posterUrl, id }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <Card
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            sx={{
                margin: 5, width: 250, height: 320, borderRadius: 5, ":hover": {
                    boxShadow: "10 10 20px  #000000"
                }
            }}>
            {!isHovered && (<img height={"100%"} width={"100%"} src={posterUrl} alt={title} />)}
            {isHovered && (<CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {new Date(releaseDate).toLocaleDateString()}
                    </Typography>
                </CardContent>
                <CardActions>
                    {/* <Button sx={{ margin: "auto" }}>
                        Xem chi tiet 
                    </Button> */}
                    <Button LinkComponent = {Link} to = {`/booking/${id}`} sx={{ margin: "auto" }}>
                        Đặt vé
                    </Button>
                </CardActions>
            </CardActionArea>
            )}
        </Card>

    )
}

export default MovieItem;