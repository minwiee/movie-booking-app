import { Box, Button, Checkbox, FormLabel, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { addMovie } from '../../api-helpers/api-helpers';

const labelProps = {
    mt: 2,
    mb: 1
}

const AddMovie = () => {
    const [inputs, setInputs] = useState({ title: "", description: "", posterUrl: "", releaseDate: "", featured: false })
    const [actors, setActors] = useState([])
    const [actor, setActor] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false);
    const handleChange = (e) => {
        setInputs((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs, actors);
        addMovie({ ...inputs, actors })
            .then(res => console.log(res))
            .catch(err => console.log(err))
        setIsSubmitted(true);
    }
    useEffect(() => {
        if (isSubmitted) {
            alert('Your movie was added successful!');
        }
    }, [isSubmitted]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box width={"50%"} padding={10} margin='auto' display={'flex'} flexDirection='column' boxShadow={'10px 10px 20px #ccc'}>

                    <Typography textAlign={'center'} variant='h5' fontFamily={'verdana'}>Add Movie</Typography>

                    <FormLabel sx={labelProps}>Title</FormLabel>
                    <TextField value={inputs.title} onChange={handleChange} name='title' variant='standard' margin='normal'></TextField>
                    <FormLabel sx={labelProps}>Description</FormLabel>
                    <TextField value={inputs.description} onChange={handleChange} name='description' variant='standard' margin='normal'></TextField>
                    <FormLabel sx={labelProps}>Poster Url</FormLabel>
                    <TextField value={inputs.posterUrl} onChange={handleChange} name='posterUrl' variant='standard' margin='normal'></TextField>
                    <FormLabel sx={labelProps}>Release Date</FormLabel>
                    <TextField type='date' value={inputs.releaseDate} onChange={handleChange} name='releaseDate' variant='standard' margin='normal'></TextField>
                    <FormLabel sx={labelProps}>Actor</FormLabel>
                    <Box display={'flex'}>
                        <TextField value={actor} name='actor' onChange={(e) => setActor(e.target.value)} variant='standard' margin='normal'></TextField>
                        <Button onClick={() => { setActors([...actors, actor]); setActor("") }}>Add Actor</Button>
                    </Box>
                    <FormLabel sx={labelProps}>Featured</FormLabel>
                    <Checkbox name="featured" checked={inputs.featured}
                        onClick={(e) => setInputs((prevState) => ({ ...prevState, featured: e.target.checked }))}
                        sx={{ mr: 'auto' }}></Checkbox>
                    <Button type="submit" sx={{ mt: 2 }} variant='contained' fullWidth>Add Movie</Button>
                </Box>
            </form>
        </div>
    );
}

export default AddMovie;