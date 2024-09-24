

## Getting Started

First, run the frontend server:

Add an `env file` and copy the code from `.env.local`

```bash
npm run dev
```
##    Make Custom Form:

- `npm install react-hook-form`

**1. CustomForm.tsx**

```typescript
import React from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";


type IFormProps = {
  children: React.ReactNode;
  onSubmit:SubmitHandler<FieldValues>;
  defaultValues?:Record<string, any>;
};

const CustomForm = ({ children,onSubmit,defaultValues }: IFormProps) => {
  const methods = useForm({defaultValues});
  const { handleSubmit } = methods;



  //handler function
  const submit: SubmitHandler<FieldValues> = (data) => {
    // console.log(data);
    onSubmit(data)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)}>{children}</form>
    </FormProvider>
  );
};

export default CustomForm;


```

**2. CustomTextInput.tsx**

```typescript
import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";


type TInputProps={
    name: string;
    label:string;
    type: string;
    size?:"small";
    fullWidth?:boolean;
    placeholder?:string;
    toolTipText?:string |undefined;
    disabled?: boolean;
    required?: boolean;
    // size?:"small" |"medium";
}


const CustomInput = ({ name, label, type, size, fullWidth,placeholder,toolTipText='' }:TInputProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field}) => (
        <TextField
        {...field}
          label={label}
          type={type}
          variant="outlined"
          size={size}
          fullWidth={fullWidth}
          placeholder={placeholder}
          id={name}
        />

      )}
    />
  );
};

export default CustomInput;


```

**3. Login.tsx**

```typescript
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

const LoginPage = () => {
  const router = useRouter();

  const [defaultValues, setDefaultValues] = useState({
    email: "patient111@gmail.com",
    password: "123456",
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
          </Stack>
          {/* -------- ------------------- Form Handleing Part --------------  ------------------- */}
          <Box >
            <CustomForm onSubmit={handleLogin} defaultValues={defaultValues}>
              <Grid container spacing={2} my={1}>
                <Grid item md={6}>
                  <CustomInput
                    name="email"
                    type="email"
                    label="Email"
                    size="small"
                    fullWidth={true}
                    required={true}
                  />
                </Grid>
                <Grid item md={6}>
                  <CustomInput
                    name="password"
                    label="Password"
                    type="text"
                    size="small"
                    fullWidth={true}
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



```

