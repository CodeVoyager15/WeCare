"use client";
// import AuthButton from "@/components/UI/AuthButton/AuthButton";
import { getUserInfo, removeUser } from "@/services/auth.services";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {

  // using lazy loading 
  const AuthButton =dynamic(()=>import("@/components/UI/AuthButton/AuthButton"),{ssr:false})

  return (
    <Container>
      <Stack
        py={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4" component={Link} href="/" fontWeight={600}>
          B
          <Box component="span" color="primary.main">
            S
          </Box>{" "}
          Health-Care
        </Typography>

        <Stack direction="row" justifyContent="space-between" gap={4}>
          <Typography component={Link} href="/consultation">
            Consultation
          </Typography>
          <Typography>Health Plans</Typography>
          <Typography>Medicine</Typography>
          <Typography>Diagnostics</Typography>
          <Typography>NGOs</Typography>
        </Stack>
        <AuthButton/>
      </Stack>
    </Container>
  );
};

export default Navbar;
