import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { movieApi } from "../../apis/movie.api";
import MovieCard from "../MovieCard/MovieCard";
import { Box, Grid, Pagination, Typography } from "@mui/material";

export default function MovieList() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["movieList", page],
    queryFn: () =>
      movieApi.getMovieListPagination({
        page,
        pageSize: itemsPerPage,
      }),
    keepPreviousData: true,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading movies.</div>;

  const totalPages = data?.totalPages || 0;

  const handlePageChange = (_event, newPage) => {
    setPage(newPage);
  };

  return (
    <div className="p-10 mb-10">
      <Typography sx={{ fontSize: "30px", fontWeight: 600 }}>
        PHIM HOT
      </Typography>
      <Box
        sx={{
          padding: "0 16px", 
          margin: "0 auto", 
          maxWidth: "1200px", 
        }}
      >
        <Grid container spacing={3} sx={{ marginTop: 2 }}>
          {data?.items?.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.maPhim}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
        <Box my={6} mx={3} display="flex" justifyContent="center">
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Box>
    </div>
  );
}
