"use client";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.services";
import CustomForm from "@/components/Forms/CustomForm";
import CustomInput from "@/components/Forms/CustomInput";
import { useState } from "react";
// import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidationSchema } from "@/zodValidation/loginValidationSchema";
import { error } from "console";

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [defaultValues, setDefaultValues] = useState({
    email: "patient111@gmail.com",
    password: "",
    // email: "patient112@gmail.com",
    // password: "123456",
  });

  const handleLogin = async (values: FieldValues) => {
    console.log(values);
    try {
      const res = await userLogin(values);
      console.log(res);
      if (res?.data?.accessToken) {
        toast.success(res?.message, { richColors: true });
        storeUserInfo({ accessToken: res?.data?.accessToken });
        router.push("/");
      } else {
        setError(res?.message);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <Container>
      <Stack
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 600,
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            p: 4,
            textAlign: "center",
          }}
        >
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <Image src={assets.svgs.logo} width={50} height={50} alt="logo" />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Login Thakurgaon HealthCare
              </Typography>
            </Box>

            <Box>
              {error && (
                <Typography
                  component="p"
                  sx={{
                    backgroundColor: "red",
                    color: "white",
                    padding: "1px 10px",
                    fontWeight: "bolder",
                    width: "100%",
                  }}
                >
                  {error}
                </Typography>
              )}
            </Box>
          </Stack>
          {/* -------- ------------------- Form Handleing Part --------------  ------------------- */}
          <Box>
            <CustomForm
              onSubmit={handleLogin}
              defaultValues={defaultValues}
              resolver={zodResolver(loginValidationSchema)}
            >
              <Grid container spacing={2} my={1}>
                <Grid item md={6}>
                  <CustomInput
                    name="email"
                    type="email"
                    label="Email"
                    size="small"
                    fullWidth={true}

                    // required={true} if present customized validation not work
                  />
                </Grid>
                <Grid item md={6}>
                  <CustomInput
                    name="password"
                    label="Password"
                    type="text"
                    size="small"
                    fullWidth={true}
                    placeholder="123456"
                  />
                </Grid>
              </Grid>

              <Typography mb={1} textAlign="end" component="p" fontWeight={300}>
                Forgot Password?
              </Typography>

              <Button
                sx={{
                  margin: "10px 0px",
                }}
                fullWidth={true}
                type="submit"
              >
                Login
              </Button>
              <Typography component="p" fontWeight={300}>
                Don&apos;t have an account?{" "}
                <Link className="text-blue-500 font-bold" href="/register">
                  Create an account
                </Link>
              </Typography>
            </CustomForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
