// src/components/Login.jsx
import React, { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  InputAdornment,
  IconButton,
  Divider,
  Stack,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  School,
  AutoAwesome,
} from "@mui/icons-material";
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await authService.login(email, password);
      } else {
        await authService.register(email, password);
      }
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Box className="fade-in">
          <Paper
            elevation={24}
            sx={{
              p: 6,
              borderRadius: 4,
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            {/* Header */}
            <Stack spacing={2} alignItems="center" sx={{ mb: 4 }}>
              <Box
                sx={{
                  background:
                    "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                  borderRadius: "50%",
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <School sx={{ fontSize: 40, color: "white" }} />
              </Box>

              <Typography
                variant="h3"
                component="h1"
                align="center"
                sx={{
                  fontWeight: 700,
                  background:
                    "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                CampusConnect
              </Typography>

              <Typography
                variant="body1"
                align="center"
                color="text.secondary"
                sx={{ maxWidth: 300 }}
              >
                Your gateway to campus life, events, and academic success
              </Typography>
            </Stack>

            <Divider sx={{ mb: 4 }}>
              <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                {isLogin ? "Welcome Back" : "Join CampusConnect"}
              </Typography>
            </Divider>

            {error && (
              <Alert
                severity="error"
                sx={{ mb: 3, borderRadius: 2 }}
                icon={<AutoAwesome />}
              >
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                      backgroundColor: "transparent",
                      "&:hover fieldset": {
                        borderColor: "primary.main",
                      },
                      "&.Mui-focused": {
                        backgroundColor: "transparent",
                      },
                      "& input": {
                        backgroundColor: "transparent !important",
                        "&:-webkit-autofill": {
                          WebkitBoxShadow: "0 0 0 1000px transparent inset",
                          WebkitTextFillColor: "inherit",
                          transition: "background-color 5000s ease-in-out 0s",
                        },
                        "&:-webkit-autofill:focus": {
                          WebkitBoxShadow: "0 0 0 1000px transparent inset",
                          WebkitTextFillColor: "inherit",
                        },
                        "&:-webkit-autofill:hover": {
                          WebkitBoxShadow: "0 0 0 1000px transparent inset",
                          WebkitTextFillColor: "inherit",
                        },
                      },
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="primary" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                      backgroundColor: "transparent",
                      "&:hover fieldset": {
                        borderColor: "primary.main",
                      },
                      "&.Mui-focused": {
                        backgroundColor: "transparent",
                      },
                      "& input": {
                        backgroundColor: "transparent !important",
                        "&:-webkit-autofill": {
                          WebkitBoxShadow: "0 0 0 1000px transparent inset",
                          WebkitTextFillColor: "inherit",
                          transition: "background-color 5000s ease-in-out 0s",
                        },
                        "&:-webkit-autofill:focus": {
                          WebkitBoxShadow: "0 0 0 1000px transparent inset",
                          WebkitTextFillColor: "inherit",
                        },
                        "&:-webkit-autofill:hover": {
                          WebkitBoxShadow: "0 0 0 1000px transparent inset",
                          WebkitTextFillColor: "inherit",
                        },
                      },
                    },
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{
                    mt: 2,
                    py: 1.5,
                    borderRadius: 3,
                    background:
                      "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    textTransform: "none",
                    boxShadow: "0 8px 32px rgba(37, 99, 235, 0.3)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #1d4ed8 0%, #6d28d9 100%)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 12px 40px rgba(37, 99, 235, 0.4)",
                    },
                    "&:disabled": {
                      background:
                        "linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)",
                    },
                  }}
                >
                  {loading ? (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box className="pulse-animation">✨</Box>
                      {isLogin ? "Signing in..." : "Creating account..."}
                    </Box>
                  ) : isLogin ? (
                    "Sign In"
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </Stack>
            </form>

            <Divider sx={{ my: 4 }} />

            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </Typography>
              <Button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                }}
                variant="text"
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
                style={{ color: "#ffffff" }}
              >
                {isLogin ? "Create new account" : "Sign in instead"}
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
