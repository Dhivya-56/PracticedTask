import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import {
  Button,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

function Home1() {
  const [data, setData] = useState([]);
const[loading,setLoading]=useState(false)
  const [selectedData, setSelectedData] = useState(() => {
    const storeItem = localStorage.getItem("cartData");
    return storeItem ? JSON.parse(storeItem) : [];
  });
  const navigate = useNavigate();

  function fetchData() {
    setLoading(true);
    axios
      .get("https://api.jikan.moe/v4/anime")
      .then((res) => {
        const responseData = res.data;
        setLoading(false)
        setData(responseData.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  function AddCart(ele) {

    const updatedData = [...selectedData, ele];
    setSelectedData(updatedData);
    localStorage.setItem("cartData", JSON.stringify(updatedData));
  }

  function isItemInCart(ele) {
    return selectedData.some((item) => item.mal_id === ele.mal_id);

  } console.log(selectedData)

  function handleDetails(id) {
    navigate(`/details/${id}`);
  }


  return (
    <Box
      sx={{
        display: "flex",
        gap: "1rem",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {data.length > 0 && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "14px",
          }}
        >
          {data.map((item) => (
            <Card
              key={item.mal_id}
              sx={{
                maxWidth: 350,
              }}
            >
              <CardActionArea>
                <Box
                  sx={{
                    padding: "15px",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="320"
                    image={item.images?.jpg?.image_url}
                    alt="image"
                  />
                  <CardContent>
                    <Typography component="h5">Name: {item.title}</Typography>
                    <Typography component="h5">Rating: {item.rating}</Typography>
                    <Typography component="h5">Status: {item.status}</Typography>
                    <Typography component="h5">Score: {item.score}</Typography>
                    <Typography component="h5">Source: {item.source}</Typography>
                  </CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-evenly",
                    }}
                  >
                    {isItemInCart(item) ? (
                      <Button variant="outlined" disabled>
                        Added
                      </Button>
                    ) : (
                      <Button variant="contained" onClick={() => AddCart(item)}>
                        Add To Cart
                      </Button>
                    )}
                    <Button onClick={() => handleDetails(item.mal_id)}>
                      More Details
                    </Button>
                  </Box>
                </Box>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      )}:<CircularProgress/>;
    </Box>
  );
}

export default Home1;

