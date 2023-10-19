import React, { useState, useEffect } from 'react';
import {
    Autocomplete,
    Button,
    Card,
    CardContent,
    CardMedia,
    Stack,
    TextField,
    Typography,
    Dialog,
    IconButton,
    DialogTitle,
    Box,
    InputLabel,
    Select,
    MenuItem,
    FormControl
} from '@mui/material';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';

const Myfile1 = () => {
    const apiUrl = 'https://api.jikan.moe/v4/anime';
    const [animeData, setAnimeData] = useState([]);
    const [selected, setSelected] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchData, setSearchData] = useState([])
    const [drop, setDrop] = useState('all');
    const [dropData, setDropData] = useState([])
    const [dropped, setDropped] = useState([])
    const [selectedAnime, setSelectedAnime] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        axios
            .get("https://api.jikan.moe/v4/anime")
            .then((response) => {
                const dropDownVal = [];
                const selectopVal = response.data.data.map((val) => {
                    const arr = [];

                    val.genres.map((item) => {
                        arr.push(item.name);
                        dropDownVal.push("all")
                        dropDownVal.push(item.name);
                    });
                    return { ...val, arr };
                });
                const dropDownfilVal = [...new Set(dropDownVal)];
                console.log(dropDownVal)
                console.log(dropDownfilVal)
                setAnimeData(selectopVal);
                setDropData(dropDownfilVal,"all");
               
                setSelected(selectopVal)
                setDropped(dropDownfilVal)
                
            })
            .catch((error) => {
                console.error(error);
            });

    }, []);


    const handleAddToSelected = (anime) => {
        setSelectedAnime((prevSelectedAnime) => [...prevSelectedAnime, anime]);
    };

    const handleRemoveFromSelected = (id) => {
        setSelectedAnime((prevSelectedAnime) =>
            prevSelectedAnime.filter((anime) => anime.mal_id !== id)
        );
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleChange(e) {
        setSearchText(e.target.value)
    }

    function handleChange1(e) {
        setDrop(e.target.value)

    }

    useEffect(() => {
        // if (drop === 'all') {
        //     const allvalues = animeData.filter((item) => item.title.toLowerCase().includes(searchText.toLowerCase()))
        //     // setSelected(allvalues);
        //     setSearchData(allvalues)
        // }
        // else {
            if (drop) {
                const filteredAnime = dropped.filter((item) =>
                    item.title.toLowerCase().includes(searchText.toLowerCase())
                );
                setSelected(filteredAnime);
            }
            else {
                const filterSearch = animeData.filter((item) => item.title.toLowerCase().includes(searchText.toLowerCase()))
                setSearchData(filterSearch)
                setSelected(filterSearch)

            }
        // }
    }, [searchText])

    useEffect(() => {
        if (searchText) {

            const filteredAnime = searchData.filter((item) =>
                item.genres.some((genre) => genre.name === drop)
            );
            setSelected(filteredAnime);
        } else {

            // if (drop === 'all') {
            //     const filteredAnime1 = animeData.filter((item) =>
            //         item.genres.some((genre) => genre)
            //     );
            //     setSelected(filteredAnime1);
            // }
            // else {
                const filteredAnime = animeData.filter((item) =>
                    item.genres.some((genre) => genre.name === drop)
                );
                setSelected(filteredAnime);
                setDropped(filteredAnime);
            // }

        }
    }, [drop]);
    useEffect(() => {
        // if (drop === 'all') {
        //     const filteredAnime2 = animeData.filter((item) => item.title.toLowerCase().includes(searchText.toLowerCase()))

        //     setSelected(filteredAnime2);
        //     const filteredAnime3 = animeData.filter((item) =>
        //         item.genres.some((genre) => genre))

        //     setDropped(filteredAnime3);

        // }
        // else {


            const filterSearch = animeData.filter((item) => item.title.toLowerCase().includes(searchText.toLowerCase()))

            setSearchData(filterSearch)

            const filteredAnime = animeData.filter((item) =>
                item.genres.some((genre) => genre.name === drop)
            );
            setDropped(filteredAnime);
        // }
    }, [searchText, drop])

    function handleClick() {
        setSearchText('')
        setDrop('')
        setSelected(animeData);
    }
    console.log(selected)
    return (
        <Box component="div" sx={{ p: 2, border: '1px dashed grey' }}>
            <Stack
                spacing={2}
                sx={{ p: 3 }}
                direction="row"
                display="flex"
                justifyContent="space-around"

                bgcolor="#35A29F"
                position="sticky"
                top="0%">
                <TextField
                    id="outlined-basic"
                    label="Search Item"
                    variant="outlined"
                    sx={{ background: "rgb(232, 241, 250)", borderColor: "#53af5b !important" }}
                    value={searchText}
                    onChange={handleChange}
                />
                <FormControl sx={{ m: 1, minWidth: 230 }}>
                    <InputLabel id="demo-simple-select-label" sx={{ fontSize: 20 }}>Select Item</InputLabel>
                    <Select

                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        sx={{ background: "rgb(232, 241, 250)" }}
                        value={drop}
                        label="SelectItem"
                        onChange={handleChange1}
                    >
                        {dropData.map((drdata, index) => {

                            return (
                                <MenuItem key={index} defaultValue="all" value={drdata}>{drdata}</MenuItem>
                            )

                        })}


                    </Select>

                </FormControl>
                <Button variant="contained" onClick={handleClick}>
                    Clear
                </Button>

                <Button variant="contained" onClick={handleOpen}>
                    Visit Here
                </Button>
            </Stack>

            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="md"

            >
                <DialogTitle id="customized-dialog-title" sx={{ mx: 45 }}>Selected List</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>

                {selectedAnime.length ? <Stack>
                    {selectedAnime.map((select) => (

                        <Card key={select.mal_id} sx={{ display: 'grid', maxWidth: 275, m: 1, mx: 36, p: 2 }}>
                            <CardMedia
                                component="img"
                                sx={{ width: 100, height: 100 }}
                                image={select.images?.jpg?.image_url}
                                alt={select.title}
                            />
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {select.title}
                                </Typography>
                                <Button variant="outlined" onClick={() => handleRemoveFromSelected(select.mal_id)}>
                                    Remove
                                </Button>
                            </CardContent>
                        </Card>

                    ))} </Stack> : <Typography variant="h5" sx={{ textAlign: "center", color: 'gray' }}>No Data Displayed</Typography>}

            </Dialog>

            {selected.length > 0 && (
                <Box sx={{ p: 2 }}>
                    <Typography variant="h5">Search Results:</Typography>
                    <Box display="grid" gridTemplateColumns="repeat(3, 1fr)"  >
                        {selected.map((item) => (
                            <Card key={item.mal_id} sx={{ maxWidth: 275, m: 1 }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 100, height: 100 }}
                                    image={item.images?.jpg?.image_url}
                                    alt={item.title}
                                />
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Source: {item.source}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Status: {item.status}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Rating: {item.rating}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Score: {item.score}
                                    </Typography>
                                    {!selectedAnime.some((sele) => sele.mal_id === item.mal_id) ? (
                                        <Button variant="outlined" onClick={() => handleAddToSelected(item)}>
                                            Move to visit
                                        </Button>
                                    ) : (
                                        <Button variant="outlined" disabled>
                                            Added
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default Myfile1;


