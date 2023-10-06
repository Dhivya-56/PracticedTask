import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function Details() {
  const { id } = useParams();
  const [detailData, setDetailData] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.jikan.moe/v4/anime/${id}`)
      .then((res) => {
        const responseData = res.data;
        console.log("Response Data:", responseData);
        setDetailData(responseData.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!detailData) {
    return <Typography sx={{fontSize:20,textAlign:'center',fontWeight:800}}>ERROR: NOT FOUND</Typography>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "30px",
      }}
    >
      <Typography variant="h5">Details:</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Box>
          <img
            src={detailData.images?.jpg?.image_url}
            alt={detailData.title}
            style={{ width: "300px", marginTop: "20px" }}
          />
        </Box>
        <Box
          sx={{
            marginTop: "90px",
            marginLeft: "40px",
          }}
        >
          <Typography variant="h4">
            <b>{detailData.title}</b>
          </Typography>
          <Typography variant="h6">Rating: {detailData.rating}</Typography>
          <Typography variant="h6">Status: {detailData.status}</Typography>
          <Typography variant="h6">Score: {detailData.score}</Typography>
          <Typography variant="h6">Season: {detailData.season}</Typography>
          <Typography variant="h6">Source: {detailData.source}</Typography>
          <Typography variant="h6">Themes:</Typography>
          {detailData.themes.map((theme) => (
            <Box>
              <li style={{marginLeft:"30px"}}>{theme.name}</li>
            </Box>
          ))}
        </Box>
      </Box>
      <Typography variant="body1" marginTop="20px">
        <u>Synopsis: </u>
        <br />
        {detailData.synopsis}
      </Typography>
    </Box>
  );
}

export default Details;