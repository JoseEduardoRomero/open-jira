import { useState, useCallback, ChangeEvent } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import {
  TextField,
  Typography,
  Stack,
  IconButton,
  Link,
  Button,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import Logo from "../../assets/OpenJira.png";

const LoginPage: NextPage = () => {
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [viewPassword, setViewPassword] = useState<Boolean>(false);

  const handleEmail = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setEmail(value);
  }, []);

  const handlePassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const { value } = e.target;
      setPassword(value);
    },
    []
  );

  const handleViewPassword = useCallback((): void => {
    setViewPassword((prevState) => !prevState);
  }, []);

  return (
    <Stack
      width="100%"
      height="100vh"
      alignItems="center"
      justifyContent="center"
      p={8}
      maxWidth="1500px"
      margin="auto"
    >
      <Stack
        direction="row"
        height="100%"
        borderRadius="15px"
        width="100%"
        boxShadow="0 0 8px rgba(0,0,0,16%)"
      >
        <Stack
          bgcolor="primary.main"
          flexBasis={1}
          flexGrow={1}
          height="100%"
          sx={{
            borderTopLeftRadius: "20px",
            borderBottomLeftRadius: "20px",
          }}
          alignItems="center"
          justifyContent="center"
        >
          Hola
        </Stack>
        <Stack
          flexBasis={1}
          flexGrow={1}
          alignItems="center"
          justifyContent="center"
          p={2}
        >
          <Stack>
            <Image
              width={400}
              height={100}
              style={{
                objectFit: "contain",
              }}
              src={Logo}
              alt="Logo main"
            />
          </Stack>
          <Stack alignItems="center" justifyContent="center" spacing={2}>
            <Typography variant="h4">Open Jira</Typography>
            <Typography
              variant="body1"
              textAlign="center"
              color={grey[500]}
              maxWidth="500px"
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's
            </Typography>
          </Stack>
          <Stack spacing={2} mt={4} width="320px">
            <TextField
              fullWidth
              onChange={handleEmail}
              value={email}
              type="email"
              label="Email"
              InputProps={{
                endAdornment: (
                  <AlternateEmailOutlinedIcon
                    sx={{ height: "15px", color: grey[500] }}
                  />
                ),
              }}
            />
            <TextField
              fullWidth
              type={viewPassword ? "text" : "password"}
              value={password}
              onChange={handlePassword}
              label="Password"
              InputProps={{
                endAdornment: (
                  <IconButton
                    sx={{
                      height: "25px",
                      width: "25px",
                    }}
                    onClick={handleViewPassword}
                  >
                    {viewPassword ? (
                      <VisibilityOffOutlinedIcon
                        sx={{ height: "15px", color: grey[500] }}
                      />
                    ) : (
                      <RemoveRedEyeOutlinedIcon
                        sx={{ height: "15px", color: grey[500] }}
                      />
                    )}
                  </IconButton>
                ),
              }}
            />
          </Stack>
          <Stack width="320px" alignItems="flex-end" mt={1}>
            <Link href="#" underline="hover" fontSize="12px">
              Olvidaste tu contraseña?
            </Link>
          </Stack>
          <Stack mt={4} width="320px">
            <Button fullWidth variant="contained">
              Log In
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LoginPage;
