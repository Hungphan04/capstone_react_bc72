import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Button,
  Modal,
  Box,
  Typography,
} from "@mui/material";
import { FaStar } from "react-icons/fa";

export default function MovieCard({ movie }) {
  const [modalIsOpen, setIsOpen] = useState(false);

  const customStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const getVideoId = (url) => {
    const match = url.match(
      /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^\/\n\s]+\/[^\n\s]+\/?|(?:v|e(?:mbed)?)\/|\S+?[?&]v=)|(?:https?:\/\/(?:www\.)?youtu\.be\/))([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : null;
  };

  return (
    <Card
      sx={{
        position: "relative",
        width: "100%",
        height: "450px",
        borderRadius: "8px",
        boxShadow: 3,
        overflow: "hidden",
        transition: "transform 0.3s ease",
        "&:hover": { transform: "scale(1.05)" },
        "&:hover .overlay": { opacity: 0.9 },
        "&:hover .action-buttons": { opacity: 1 },
      }}
    >
      <Link to={`/movie/${movie.maPhim}`} className="relative w-full">
        <img
          className="w-full object-cover"
          src={movie.hinhAnh}
          alt={movie.tenPhim}
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
        />
      </Link>
      <Box
        className="overlay"
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "100%",
          background: "rgba(0, 0, 0, 0.7)",
          opacity: 0,
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          transition: "opacity 0.3s ease",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "white",
            padding: "16px",
            fontSize: "18px",
          }}
        >
          {movie.tenPhim}
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          sx={{ paddingLeft: "16px", paddingBottom: "16px" }}
        >
          <FaStar style={{ color: "#FFD700", marginRight: "4px" }} />
          <Typography variant="body2">{movie.danhGia} / 10</Typography>
        </Box>
      </Box>
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: 0,
          width: "100%",
          height: "100%",
          opacity: 0,
          transition: "opacity 0.3s ease",
        }}
        className="action-buttons"
      >
        <Box sx={{ display: "flex", gap: "8px", flexDirection: "column" }}>
          <Button
            component={Link}
            to={`/movie/${movie.maPhim}`}
            variant="contained"
            sx={{
              backgroundColor: "rgba(255, 87, 34, 0.8)",
              color: "white",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "rgba(255, 87, 34, 1)",
              },
            }}
          >
            Mua vé
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: "white",
              borderColor: "white",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "bold",
              "&:hover": {
                borderColor: "rgba(255, 87, 34, 0.8)",
                color: "rgba(255, 87, 34, 0.8)",
              },
            }}
            onClick={() => setIsOpen(true)}
          >
            Trailer
          </Button>
        </Box>
      </CardContent>
      <Modal
        open={modalIsOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="movie-trailer"
        aria-describedby="modal-to-show-trailer"
      >
        <Box sx={customStyles}>
          {movie.trailer && (
            <iframe
              width="100%"
              height="400px"
              src={`https://www.youtube.com/embed/${getVideoId(movie.trailer)}`}
              title="Movie Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </Box>
      </Modal>
    </Card>
  );
}
