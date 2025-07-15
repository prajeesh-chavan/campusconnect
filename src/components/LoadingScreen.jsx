// src/components/LoadingScreen.jsx
import React from "react";
import { Box, Typography, CircularProgress, Stack } from "@mui/material";
import { Dashboard as DashboardIcon } from "@mui/icons-material";

const LoadingScreen = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <Stack
        spacing={4}
        alignItems="center"
        sx={{
          textAlign: "center",
          color: "#2563eb",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Logo Section */}
        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Rotating Background Circle */}
          <Box
            sx={{
              position: "absolute",
              width: 120,
              height: 120,
              borderRadius: "50%",
              background:
                "linear-gradient(45deg, rgba(37, 99, 235, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)",
              animation: "rotate 3s linear infinite",
              "@keyframes rotate": {
                "0%": { transform: "rotate(0deg)" },
                "100%": { transform: "rotate(360deg)" },
              },
            }}
          />

          {/* Icon */}
          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              background: "rgba(37, 99, 235, 0.1)",
              borderRadius: "50%",
              p: 3,
              border: "2px solid rgba(37, 99, 235, 0.2)",
              animation: "pulse 2s ease-in-out infinite",
              "@keyframes pulse": {
                "0%, 100%": { transform: "scale(1)" },
                "50%": { transform: "scale(1.05)" },
              },
            }}
          >
            <DashboardIcon sx={{ fontSize: 48, color: "#2563eb" }} />
          </Box>
        </Box>

        {/* Brand Name */}
        <Box>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 800,
              letterSpacing: "0.02em",
              mb: 1,
              background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            CampusConnect
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 400,
              opacity: 0.9,
              letterSpacing: "0.01em",
            }}
          >
            Your Campus, Connected
          </Typography>
        </Box>

        {/* Loading Animation */}
        <Stack spacing={3} alignItems="center">
          <Box sx={{ position: "relative" }}>
            <CircularProgress
              size={60}
              thickness={4}
              sx={{
                color: "rgba(37, 99, 235, 0.3)",
                position: "absolute",
              }}
              variant="determinate"
              value={100}
            />
            <CircularProgress
              size={60}
              thickness={4}
              sx={{
                color: "#2563eb",
                animation: "loading 1.5s ease-in-out infinite",
                "@keyframes loading": {
                  "0%": { transform: "rotate(0deg)" },
                  "100%": { transform: "rotate(360deg)" },
                },
              }}
            />
          </Box>

          <Typography
            variant="body1"
            sx={{
              fontWeight: 500,
              opacity: 0.8,
              animation: "fadeInOut 2s ease-in-out infinite",
              "@keyframes fadeInOut": {
                "0%, 100%": { opacity: 0.6 },
                "50%": { opacity: 1 },
              },
            }}
          >
            Initializing your experience...
          </Typography>
        </Stack>

        {/* Floating Particles */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          {[...Array(6)].map((_, i) => (
            <Box
              key={i}
              sx={{
                position: "absolute",
                width: 4,
                height: 4,
                background: "rgba(37, 99, 235, 0.4)",
                borderRadius: "50%",
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float${i} ${
                  3 + Math.random() * 2
                }s ease-in-out infinite`,
                [`@keyframes float${i}`]: {
                  "0%, 100%": {
                    transform: "translateY(0px) translateX(0px)",
                    opacity: 0.4,
                  },
                  "50%": {
                    transform: `translateY(${
                      -20 - Math.random() * 20
                    }px) translateX(${-10 + Math.random() * 20}px)`,
                    opacity: 0.8,
                  },
                },
              }}
            />
          ))}
        </Box>
      </Stack>
    </Box>
  );
};

export default LoadingScreen;
