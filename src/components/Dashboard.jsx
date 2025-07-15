// src/components/Dashboard.jsx
import React from "react";
import {
  Container,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  AppBar,
  Toolbar,
  Avatar,
  Chip,
  Stack,
  IconButton,
} from "@mui/material";
import {
  Event,
  SmartToy,
  TrendingUp,
  Logout,
  Person,
  Notifications,
  Dashboard as DashboardIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const features = [
    {
      title: "Campus Events",
      description:
        "Discover upcoming placement drives, workshops, cultural events, and academic seminars",
      path: "/events",
      icon: <Event sx={{ fontSize: 40 }} />,
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      stats: "12 upcoming events",
    },
    {
      title: "Ask CampusBot",
      description:
        "Get instant AI-powered answers to your campus-related questions 24/7",
      path: "/chat",
      icon: <SmartToy sx={{ fontSize: 40 }} />,
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      stats: "Available now",
    },
    {
      title: "Academic Insights",
      description:
        "Track your academic progress and get personalized study recommendations",
      path: "/insights",
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      stats: "Your semester overview",
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", background: "#f8fafc" }}>
      {/* Modern AppBar */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Toolbar sx={{ px: 3 }}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{ flexGrow: 1 }}
          >
            <DashboardIcon sx={{ fontSize: 28 }} />
            <Typography variant="h5" component="div" sx={{ fontWeight: 700 }}>
              CampusConnect
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={2}>
            <Button
              color="inherit"
              onClick={handleLogout}
              startIcon={<Logout />}
              sx={{
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: 3,
                px: 3,
              }}
            >
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Hero Section */}
        <Box sx={{ mb: 6, textAlign: "center" }} className="fade-in">
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 800,
              background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 2,
            }}
          >
            Welcome Back!
          </Typography>

          <Typography
            variant="h5"
            color="text.secondary"
            sx={{
              mb: 3,
              fontWeight: 400,
              maxWidth: 600,
              mx: "auto",
            }}
          >
            Your personalized campus dashboard is ready to help you succeed
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            flexWrap="wrap"
            sx={{ mb: 4 }}
          >
            <Chip
              label="✨ AI Assistant Ready"
              color="primary"
              variant="outlined"
              sx={{ borderRadius: 3 }}
            />
            <Chip
              label="📅 12 New Events"
              color="secondary"
              variant="outlined"
              sx={{ borderRadius: 3 }}
            />
            <Chip
              label="🎯 Semester in Progress"
              color="success"
              variant="outlined"
              sx={{ borderRadius: 3 }}
            />
          </Stack>
        </Box>

        {/* Feature Cards */}
        <Box
          sx={{
            display: "flex",
            gap: 4,
            flexWrap: { xs: "wrap", md: "nowrap" },
            justifyContent: "center",
          }}
        >
          {features.map((feature, index) => (
            <Box
              key={index}
              sx={{
                flex: { xs: "1 1 100%", md: "1 1 0" },
                minWidth: { md: "300px" },
                maxWidth: { xs: "100%", md: "400px" },
              }}
            >
              <Card
                className="hover-lift"
                sx={{
                  height: "100%",
                  width: "100%",
                  borderRadius: 4,
                  border: "none",
                  background:
                    "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
                  overflow: "hidden",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: feature.gradient,
                  },
                }}
              >
                <CardContent sx={{ p: 4, flex: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 3,
                    }}
                  >
                    <Box
                      sx={{
                        background: feature.gradient,
                        borderRadius: "50%",
                        p: 2,
                        mr: 2,
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Box>
                      <Typography
                        variant="h5"
                        component="h2"
                        sx={{ fontWeight: 700, mb: 0.5 }}
                      >
                        {feature.title}
                      </Typography>
                      <Chip
                        label={feature.stats}
                        size="small"
                        sx={{
                          background: "rgba(37, 99, 235, 0.1)",
                          color: "primary.main",
                          fontWeight: 600,
                        }}
                      />
                    </Box>
                  </Box>

                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      lineHeight: 1.6,
                      mb: 3,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>

                <CardActions sx={{ p: 4, pt: 0 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => navigate(feature.path)}
                    sx={{
                      background: feature.gradient,
                      borderRadius: 3,
                      py: 1.5,
                      fontWeight: 600,
                      textTransform: "none",
                      fontSize: "1.1rem",
                      boxShadow: "none",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
                      },
                    }}
                  >
                    Explore Now
                  </Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          mt: "auto",
          py: 3,
          px: 3,
          background: "linear-gradient(135deg, #f8fafc 0%, #e5e7eb 100%)",
          borderTop: "1px solid #e5e7eb",
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ fontWeight: 500 }}
        >
          Developed by{" "}
          <Typography
            component="a"
            href="https://www.linkedin.com/in/manjusha-kapade30/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "primary.main",
              textDecoration: "none",
              fontWeight: 600,
              "&:hover": {
                textDecoration: "underline",
                color: "primary.dark",
              },
            }}
          >
            Manjusha Kapade
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
