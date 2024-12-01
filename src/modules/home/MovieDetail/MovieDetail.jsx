import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetcher from "../../../apis/fetcher";
import Modal from "react-modal";
import YouTube from "react-youtube";
import { Box, Typography, Grid, CardMedia, Card, Button } from "@mui/material";
import { format } from "date-fns";

export default function MovieDetail() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };
  const getVideoId = (url) => {
    const match = url.match(
      /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^\/\n\s]+\/[^\n\s]+\/?|(?:v|e(?:mbed)?)\/|\S+?[?&]v=)|(?:https?:\/\/(?:www\.)?youtu\.be\/))([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : null;
  };
  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await fetcher.get(
          `/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`
        );
        setMovieDetails(response.data.content);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return (
      <Typography color="error">
        Something went wrong. Please try again later.
      </Typography>
    );
  }

  if (!movieDetails) {
    return <Typography>No movie details found.</Typography>;
  }

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", padding: "20px" }}>
      <Box
        sx={{
          backgroundColor: "#20232a",
          padding: "10px 20px",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h5" sx={{ color: "#fff", fontWeight: "bold" }}>
          Chi tiết phim
        </Typography>
      </Box>
      <Grid container spacing={4}>
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Card
            sx={{
              width: "100%",
              maxWidth: 250,
              height: "auto",
              overflow: "hidden",
              boxShadow: 3,
            }}
          >
            <CardMedia
              component="img"
              image={movieDetails.hinhAnh || "https://via.placeholder.com/300"}
              alt={movieDetails.tenPhim || "Movie Poster"}
              sx={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
              }}
            />
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          md={9}
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              marginBottom: "10px",
              flexGrow: 0,
            }}
          >
            {movieDetails.tenPhim || "Unknown Title"}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "gray",
              marginBottom: "20px",
              flexGrow: 0,
            }}
          >
            {movieDetails.moTa || 'Phim kinh dị "Cám" là phiên bản phóng tác từ truyện cổ tích "Tấm Cám", sẽ ra mắt vào ngày 20 tháng 9 năm 2024. Phim nội dung xoay quanh những tình huống kinh dị đẫm máu, kèm theo các nhân vật mới như Hai Hoàng, Bờm và Bạch Lão, khác biệt so với phiên bản gốc.'}
          </Typography>
          {movieDetails.danhGia && (
            <Typography
              variant="h6"
              sx={{
                marginBottom: "10px",
                fontWeight: "bold",
                flexGrow: 0,
              }}
            >
              Đánh giá: {movieDetails.danhGia} / 10
            </Typography>
          )}
          <Typography
            variant="body2"
            sx={{ marginBottom: "20px", flexGrow: 0 }}
          >
            Release Date:{" "}
            {movieDetails.ngayKhoiChieu &&
            !isNaN(new Date(movieDetails.ngayKhoiChieu))
              ? format(new Date(movieDetails.ngayKhoiChieu), "dd/MM/yyyy")
              : "Coming soon"}
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              marginTop: "auto",
              alignItems: "flex-start",
            }}
          >
            <Button variant="contained" color="warning">
              Watch Movie
            </Button>
            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center w-full md:w-auto justify-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Xem trailer
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => setIsOpen(false)}
              style={customStyles}
              contentLabel="Movie Trailer"
            >
              {movieDetails.trailer && (
                <YouTube videoId={getVideoId(movieDetails.trailer)} opts={opts} />
              )}
            </Modal>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
