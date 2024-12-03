import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fetcher from "../../../apis/fetcher";
import Modal from "react-modal";
import { Box, Typography, Grid, CardMedia, Card, Button } from "@mui/material";
import { format } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PATH } from "../../../routes/path";

export default function MovieDetail() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [trailerModalIsOpen, setTrailerModalIsOpen] = useState(false);
  const [cinemas, setCinemas] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState("");
  const [selectedShowTime, setSelectedShowTime] = useState("");
  const navigate = useNavigate();
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "80%",
      maxWidth: "800px",
      maxHeight: "80vh",
      overflowY: "auto",
      backgroundColor: "#fcfcf0",
      zIndex: 1050,
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      zIndex: 1040,
    },
  };

  const buttonStyles = {
    default: {
      backgroundColor: "#fcfcf0",
      color: "#000",
      "&:hover": {
        backgroundColor: "#f0f0e1",
      },
    },
    selected: {
      backgroundColor: "#000",
      color: "#fff",
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

    const fetchCinemaAndShowTimes = async () => {
      try {
        const response = await fetcher.get(
          `/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`
        );
        setCinemas(response.data.content.heThongRapChieu);
      } catch (error) {
        setError(error);
      }
    };

    fetchMovieDetail();
    fetchCinemaAndShowTimes();
  }, [id]);
  const handleConfirmBooking = () => {
    if (selectedCinema && selectedShowTime) {
      const cinemaName =
        cinemas.find((cinema) => cinema.maHeThongRap === selectedCinema)
          ?.tenHeThongRap || "Rạp không xác định";

      const selectedShow = cinemas
        .flatMap((cinema) =>
          cinema.cumRapChieu.flatMap((cumRap) =>
            cumRap.lichChieuPhim.find(
              (lichChieu) => lichChieu.maLichChieu === selectedShowTime
            )
          )
        )
        .find((show) => show);

      if (selectedShow) {
        const selectedDate = new Date(selectedShow.ngayChieuGioChieu);
        toast.info(
          `Đặt vé thành công. Đừng quên bạn có hẹn với ${cinemaName} vào lúc ${format(
            selectedDate,
            "HH:mm"
          )} ngày ${format(selectedDate, "dd/MM/yyyy")}.`,
          { position: "top-center", autoClose: 2000 }
        );
      } else {
        toast.error("Không tìm thấy lịch chiếu được chọn.", {
          position: "top-center",
          autoClose: 2000,
        });
      }
      setIsOpen(false);
    } else {
      toast.warn("Vui lòng chọn rạp và giờ chiếu trước khi xác nhận!", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

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
            {movieDetails.moTa ||
              "Phim Cám là tác phẩm điện ảnh được chuyển thể từ truyện cổ tích “Tấm Cám” với tên gọi cũ là phim Con Cám. Có rất nhiều dị bản của Tấm Cám mang hơi hướng thần kỳ, kinh dị nhưng điểm chung đó là đều phản ánh các mâu thuẫn và mối quan hệ mẹ kế - con chồng trong thời đại cũ. Nhận thấy được tiềm năng khai thác từ chủ đề này, đạo diễn Trần Hữu Tấn đã phát triển và dựng thành phim Tấm Cám bản gốc kinh dị."}
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
            sx={{ marginBottom: "10px", flexGrow: 0 }}
          >
            Ngày khởi chiếu:{" "}
            {movieDetails.ngayKhoiChieu &&
            !isNaN(new Date(movieDetails.ngayKhoiChieu))
              ? format(new Date(movieDetails.ngayKhoiChieu), "dd/MM/yyyy")
              : "Coming soon"}
          </Typography>
          <Typography
            variant="body2"
            sx={{ marginBottom: "10px", flexGrow: 0 }}
          >
            Tình trạng: {movieDetails.dangChieu ? "Đang chiếu" : "Sắp chiếu"}
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              marginTop: "auto",
              alignItems: "flex-start",
            }}
          >
            <Button
              variant="contained"
              color="warning"
              onClick={() => {
                const isLoggedIn = localStorage.getItem("user");
                if (!isLoggedIn) {
                  navigate(PATH.LOGIN);
                  return;
                }
                setIsOpen(true);
              }}
            >
              Đặt vé ngay
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setTrailerModalIsOpen(true)}
              sx={{
                backgroundColor: "#1e1e1e",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#000",
                },
              }}
            >
              Xem trailer
            </Button>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => setIsOpen(false)}
              style={customStyles}
              contentLabel="Movie Ticket Booking"
            >
              <Typography variant="h5" gutterBottom>
                Chọn Rạp và Giờ Chiếu
              </Typography>
              <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    {cinemas.map((cinema) => (
                      <Button
                        key={cinema.maHeThongRap}
                        variant="contained"
                        sx={{
                          ...buttonStyles.default,
                          ...(selectedCinema === cinema.maHeThongRap &&
                            buttonStyles.selected),
                        }}
                        onClick={() => setSelectedCinema(cinema.maHeThongRap)}
                      >
                        {cinema.tenHeThongRap}
                      </Button>
                    ))}
                  </Box>
                </Grid>
              </Grid>
              {selectedCinema && (
                <Grid container spacing={2}>
                  {cinemas
                    .filter((cinema) => cinema.maHeThongRap === selectedCinema)
                    .flatMap((cinema) =>
                      cinema.cumRapChieu.map((cumRap) => (
                        <Grid item xs={12} key={cumRap.maCumRap}>
                          <Typography variant="h6">
                            {cumRap.tenCumRap}
                          </Typography>
                          <Box
                            sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}
                          >
                            {cumRap.lichChieuPhim.map((lichChieu) => (
                              <Button
                                key={lichChieu.maLichChieu}
                                variant="contained"
                                sx={{
                                  ...buttonStyles.default,
                                  ...(selectedShowTime ===
                                    lichChieu.maLichChieu &&
                                    buttonStyles.selected),
                                }}
                                onClick={() =>
                                  setSelectedShowTime(lichChieu.maLichChieu)
                                }
                              >
                                {format(
                                  new Date(lichChieu.ngayChieuGioChieu),
                                  "HH:mm dd/MM/yyyy"
                                )}
                              </Button>
                            ))}
                          </Box>
                        </Grid>
                      ))
                    )}
                </Grid>
              )}

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#000",
                  color: "#fff",
                  marginTop: 2,
                  marginLeft: "auto",
                  display: "block",
                  "&:hover": {
                    backgroundColor: "#333",
                  },
                }}
                onClick={handleConfirmBooking}
              >
                Xác nhận đặt vé
              </Button>
            </Modal>
            <Modal
              isOpen={trailerModalIsOpen}
              onRequestClose={() => setTrailerModalIsOpen(false)}
              style={customStyles}
              contentLabel="Trailer"
            >
              <Typography variant="h5" gutterBottom>
                Xem Trailer
              </Typography>
              {movieDetails.trailer && (
                <iframe
                  width="100%"
                  height="400px"
                  src={`https://www.youtube.com/embed/${getVideoId(
                    movieDetails.trailer
                  )}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </Modal>
          </Box>
        </Grid>
      </Grid>
      <ToastContainer
        style={{
          width: "600px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
    </Box>
  );
}
