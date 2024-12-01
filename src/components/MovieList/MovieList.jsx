import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { movieApi } from "../../apis/movie.api";
import MovieCard from "../MovieCard/MovieCard";
import { Box, Grid, Pagination, Typography } from "@mui/material";

export default function MovieList() {
  const [page, setPage] = useState(1);
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ["movieList", page],
    queryFn: () => movieApi.getMovieListPagination({ page }),
    keepPreviousData: true,  
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading movies.</div>;

  const count = data?.totalPages || 0;

  const handlePageChange = (_event, newPage) => {
    setPage(newPage);
  };

  return (
    <div className="p-10 mb-10">
      <Typography sx={{ fontSize: "30px", fontWeight: 600 }}>
        PHIM HOT
      </Typography>
      <Box style={{ padding: "20px" }}>
        <Grid container spacing={3}>
          {data?.items?.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.maPhim}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>

        <Box my={6} mx={3} display="flex" justifyContent="flex-end">
          <Pagination
            count={count}
            page={page}
            onChange={handlePageChange} 
            color="primary"
          />
        </Box>
      </Box>
    </div>
  );
}
