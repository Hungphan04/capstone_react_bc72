import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { LoadingButton } from '@mui/lab';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { userApi } from '../../../apis/user.api';
import { PATH } from '../../../routes/path';
import { setCurrentUser } from '../../../store/slices/user.slice';

const schema = yup.object().shape({
  taiKhoan: yup.string().required('Tên đăng nhập không được để trống'),
  matKhau: yup.string().required('Mật khẩu không được để trống'),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate: handleLogin, isPending } = useMutation({
    mutationFn: (formValues) => userApi.login(formValues),
    onSuccess: (data) => {
      const currentUser = data.content;
      toast.success('Đăng nhập thành công');
      dispatch(setCurrentUser(currentUser));
      currentUser.maLoaiNguoiDung === 'QuanTri' ? navigate(PATH.ADMIN) : navigate(PATH.HOME);
    },
    onError: (error) => {
      toast.error(error.content || 'Đăng nhập thất bại. Vui lòng thử lại sau');
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: '',
      matKhau: '',
    },
    resolver: yupResolver(schema),
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onSubmit = (formValues) => {
    const data = {
      taiKhoan: formValues.taiKhoan.trim(),
      matKhau: formValues.matKhau.trim(),
    };
    handleLogin(data);
  };

  return (
    <Box className="w-[450px]">
      <Typography fontSize={40} fontWeight={700} textAlign={'center'} component="h4">
        Đăng nhập
      </Typography>
      <Typography className=" text-gray-500 text-center my-2">Hi, chào mừng bạn trở lại 👋</Typography>

      <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <TextField
            {...register('taiKhoan')}
            fullWidth
            placeholder="Tên đăng nhập"
            label="Tên đăng nhập"
            name="taiKhoan"
            error={!!errors.taiKhoan}
            helperText={errors.taiKhoan?.message}
          />
          <TextField
            type={showPassword ? 'text' : 'password'}
            {...register('matKhau')}
            fullWidth
            placeholder="Mật khẩu"
            label="Mật khẩu"
            name="matKhau"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPassword ? 'hide the password' : 'display the password'}
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
          <LoadingButton
            loading={isPending}
            disabled={isPending}
            fullWidth
            variant="contained"
            size="large"
            color="primary"
            type="submit"
            loadingPosition="start"
          >
            Đăng nhập
          </LoadingButton>
        </Stack>
      </form>
    </Box>
  );
}