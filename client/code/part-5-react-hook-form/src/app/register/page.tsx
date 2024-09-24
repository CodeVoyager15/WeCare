"use client";
import assets from "@/assets";
import CustomForm from "@/components/Forms/CustomForm";
import CustomInput from "@/components/Forms/CustomInput";
import { registerPatient } from "@/services/actions/registerPatient";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.services";
import { modifyPayload } from "@/utils/modifyPayload";
import { patientRegisterValidationSchema, } from "@/zodValidation/registerValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const defaultValues={
  password: "123456",
  "patient": {
    email:"",
    password:"",
    contactNumber:"0111111111",
    address:"Dhaka, BD"
  }
}

// {
//   "password": "123456",
//   "patient": {
//     "email": "patient111@gmail.com",
//     "name": "Md. Fahim",
//     "contactNumber": "01111111111",
//     "address": "Dhaka, BD"
//   }
// }



const RegisterPage = () => {
  const router = useRouter();



  const onSubmit = async (values: FieldValues) => {
    const data = modifyPayload(values);
    console.log(data);
    try {
      const res = await registerPatient(data);
      console.log(res);

      if (res?.data?.id) {
        toast.success(res?.message, { richColors: true });

        const result = await userLogin({
          password: values.password,
          email: values.patient.email,
        });

        if (result?.data?.accessToken) {
          storeUserInfo({ accessToken: result?.data?.accessToken });
          router.push("/");
        }
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
                Patient Register
              </Typography>
            </Box>
          </Stack>

          <Box>
            <CustomForm defaultValues={defaultValues} onSubmit={onSubmit} resolver={zodResolver(patientRegisterValidationSchema)}>
              <Grid container spacing={2} my={1}>
                <Grid item md={12}>
                  <CustomInput
                    name="patient.name"
                    label="Name"
                    size="small"
                    type="name"
                    fullWidth={true}

                  />
                </Grid>
                <Grid item md={6}>
                  <CustomInput
                    label="Email"
                    type="email"
                    size="small"
                    fullWidth={true}
                    name="patient.email"
                    placeholder="unique"

                  />
                </Grid>
                <Grid item md={6}>
                  <CustomInput
                    label="Password"
                    type="password"
                    size="small"
                    fullWidth={true}
                    name="password"
                    placeholder="123456"
                  />
                </Grid>
                <Grid item md={6}>
                  <CustomInput
                    label="Contact Number"
                    type="tel"
                    size="small"
                    fullWidth={true}
                    name="patient.contactNumber"
                    placeholder="01111111111"
                  />
                </Grid>
                <Grid item md={6}>
                  <CustomInput
                    label="Address"
                    type="text"

                    size="small"
                    fullWidth={true}
                    name="patient.address"
                    placeholder="Thakurgaon,Dhaka"
                  />
                </Grid>
              </Grid>
              <Button
                sx={{
                  margin: "10px 0px",
                }}
                fullWidth={true}
                type="submit"
              >
                Register
              </Button>
              <Typography component="p" fontWeight={300}>
                Do you already have an account?{" "}
                <Link className="text-green-700 font-extrabold" href="/login">
                  Login
                </Link>
              </Typography>
            </CustomForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterPage;
