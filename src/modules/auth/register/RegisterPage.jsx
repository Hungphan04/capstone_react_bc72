import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { LoadingButton } from "@mui/lab";
import { TextField, Stack, Box, Typography, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { PATH } from "../../../routes/path";
import { setCurrentUser } from "../../../store/slices/user.slice";
import { useDispatch } from "react-redux";

const schema = yup.object().shape({
  taiKhoan: yup.string().required('Tên đăng nhập không được để trống'),
  matKhau: yup.string().required('Mật khẩu không được để trống'),
  reMatKhau: yup.string().oneOf([yup.ref('matKhau'), null], 'Mật khẩu không khớp').required('Bạn phải xác nhận mật khẩu'),
});

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      reMatKhau: "",
    },
    resolver: yupResolver(schema),
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onSubmit = (formValues) => {
    const { taiKhoan, matKhau } = formValues;
  
    const newUser = {
      taiKhoan: taiKhoan.trim(),
      matKhau: matKhau.trim(),
      hoTen: "Tên người dùng",  
    };

    localStorage.setItem("currentUser", JSON.stringify(newUser));

    dispatch(setCurrentUser(newUser));

    toast.success("Đăng ký thành công!");

    navigate(PATH.HOME);
  };

  return (
    <Box className="w-[450px]">
      <Typography fontSize={40} fontWeight={700} textAlign={'center'} component="h4">
        Đăng ký
      </Typography>
      <Typography className=" text-gray-500 text-center my-2">Chào mừng bạn đến với chúng tôi 👋</Typography>

      <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <TextField
            {...register("taiKhoan")}
            fullWidth
            placeholder="Tên đăng nhập"
            label="Tên đăng nhập"
            name="taiKhoan"
            error={!!errors.taiKhoan}
            helperText={errors.taiKhoan?.message}
          />
          <TextField
            type={showPassword ? "text" : "password"}
            {...register("matKhau")}
            fullWidth
            placeholder="Mật khẩu"
            label="Mật khẩu"
            name="matKhau"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPassword ? "hide the password" : "display the password"}
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={!!errors.matKhau}
            helperText={errors.matKhau?.message}
          />
          <TextField
            type={showPassword ? "text" : "password"}
            {...register("reMatKhau")}
            fullWidth
            placeholder="Xác nhận mật khẩu"
            label="Xác nhận mật khẩu"
            name="reMatKhau"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPassword ? "hide the password" : "display the password"}
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={!!errors.reMatKhau}
            helperText={errors.reMatKhau?.message}
          />
          <LoadingButton
            loading={false}
            disabled={false}
            fullWidth
            variant="contained"
            size="large"
            color="primary"
            type="submit"
            loadingPosition="start"
          >
            Đăng ký
          </LoadingButton>
        </Stack>
      </form>
    </Box>
  );
}
