import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Link,
  TextField,
  Button,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";

const Footer = () => {
  const [email, setEmail] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Subscribed with email: ${email}`);
  };
  return (
    <Box sx={{ px: 12, color: "white"}} className="bg-gray-900">
      <Grid container justifyContent="center" sx={{ py: 4 }}>
        <Grid item xs={12} md={6} textAlign="center">
          <Typography variant="h5" gutterBottom sx={{ color: "white" }}>
            Stay Updated
          </Typography>
          <Typography variant="body1" color="#949494" paragraph>
            Sign up for our newsletter to get the latest movie updates.
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Enter your email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                mb: 2,
                "& .MuiInputLabel-root": { color: "#949494" },
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                },
              }}
            />
            <Button type="submit" variant="contained" sx={{bgcolor: "#949494"}} fullWidth>
              Subscribe
            </Button>
          </form>
        </Grid>
      </Grid>
      <Divider sx={{ my: 3, borderColor: "#949494" }} />
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={4} textAlign={"center"}>
          <Typography variant="h5" gutterBottom sx={{ color: "white" }}>
            MovieApp
          </Typography>
          <Typography variant="body1" color="#949494" fontSize={15}>
            Subscribe for the latest updates!
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4} textAlign="center">
          <Typography variant="h5" gutterBottom sx={{ color: "white" }}>
            Quick Links
          </Typography>
          <Link
            href="/"
            variant="body1"
            color="#949494"
            underline="hover"
          >
            Home
          </Link>
          <br />
          <Link
            href="/about"
            variant="body1"
            color="#949494"
            underline="hover"
          >
            About Us
          </Link>
          <br />
          <Link
            href="/contact"
            variant="body1"
            color="#949494"
            underline="hover"
          >
            Contact
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4} textAlign="center">
          <Typography variant="h5" gutterBottom sx={{ color: "white" }}>
            Follow Us
          </Typography>
          <IconButton href="#" sx={{ mx: 1, color: "grey"}}>
            <Facebook />
          </IconButton>
          <IconButton href="#" sx={{ mx: 1, color: "grey"}}>
            <Instagram />
          </IconButton>
          <IconButton href="#" sx={{ mx: 1, color: "grey"}}>
            <Twitter />
          </IconButton>
          <IconButton href="#" sx={{ mx: 1, color: "grey"}}>
            <YouTube />
          </IconButton>
        </Grid>
      </Grid>
      <Divider sx={{ my: 3, borderColor: "#949494" }} />
      <Grid container justifyContent="center" className="pb-6">
        <Grid item xs={12} textAlign="center">
          <Typography variant="body2" color="#949494">
            &copy; {new Date().getFullYear()} MovieApp. All rights reserved.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
