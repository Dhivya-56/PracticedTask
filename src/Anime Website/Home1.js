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

function Home1() {
  const [data, setData] = useState([]);

  const [selectedData, setSelectedData] = useState(() => {
    const storeItem = localStorage.getItem("cartData");
    return storeItem ? JSON.parse(storeItem) : [];
  });
  const navigate = useNavigate();

  function fetchData() {
    axios
      .get("https://api.jikan.moe/v4/anime")
      .then((res) => {
        const responseData = res.data;
        setData(responseData.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  function AddCart(ele) {
    console.log("element", ele);
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

  if (!data) {
    return <div>Loading...</div>;
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
          {data.map((ele, index) => (
            <Card
              key={ele.mal_id}
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
                    image={ele.images?.jpg?.image_url}
                    alt="image"
                  />
                  <CardContent>
                    <Typography component="h5">Name: {ele.title}</Typography>
                    <Typography component="h5">Rating: {ele.rating}</Typography>
                    <Typography component="h5">Status: {ele.status}</Typography>
                    <Typography component="h5">Score: {ele.score}</Typography>
                    <Typography component="h5">Source: {ele.source}</Typography>
                  </CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-evenly",
                    }}
                  >
                    {isItemInCart(ele) ? (
                      <Button variant="outlined" disabled>
                        Added
                      </Button>
                    ) : (
                      <Button variant="contained" onClick={() => AddCart(ele)}>
                        Add To Cart
                      </Button>
                    )}
                    <Button onClick={() => handleDetails(ele.mal_id)}>
                      More Details
                    </Button>
                  </Box>
                </Box>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default Home1;

