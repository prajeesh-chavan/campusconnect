// src/components/EventsFeed.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Box,
  AppBar,
  Toolbar,
  ButtonGroup,
  Avatar,
  Stack,
  IconButton,
  Paper,
} from "@mui/material";
import {
  Event as EventIcon,
  Person,
  Notifications,
  Dashboard as DashboardIcon,
  SmartToy,
  Logout,
  AccessTime,
  LocationOn,
  Group,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { eventsService } from "../services/eventsService";
import { authService } from "../services/authService";

const EventsFeed = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set a shorter timeout for loading state
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 200);

    const unsubscribe = eventsService.subscribeToEvents(
      (events) => {
        setEvents(events);
        setLoading(false);
        clearTimeout(loadingTimeout);
      },
      filter === "all" ? null : filter
    );

    return () => {
      clearTimeout(loadingTimeout);
      unsubscribe();
    };
  }, [filter]);

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const categories = [
    { value: "all", label: "All Events" },
    { value: "placement", label: "Placements" },
    { value: "workshop", label: "Workshops" },
    { value: "cultural", label: "Cultural" },
  ];

  const getCategoryColor = (category) => {
    switch (category) {
      case "placement":
        return "#2563eb";
      case "workshop":
        return "#7c3aed";
      case "cultural":
        return "#10b981";
      default:
        return "#6b7280";
    }
  };

  const getCategoryGradient = (category) => {
    switch (category) {
      case "placement":
        return "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)";
      case "workshop":
        return "linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)";
      case "cultural":
        return "linear-gradient(135deg, #10b981 0%, #34d399 100%)";
      default:
        return "linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)";
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f8fafc",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Box className="pulse-animation" sx={{ fontSize: "4rem", mb: 2 }}>
            📅
          </Box>
          <Typography
            variant="h5"
            sx={{ fontWeight: 600, color: "primary.main" }}
          >
            Loading amazing events...
          </Typography>
        </Box>
      </Box>
    );
  }

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
            <EventIcon sx={{ fontSize: 28 }} />
            <Typography variant="h5" component="div" sx={{ fontWeight: 700 }}>
              Campus Events
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={2}>
            <Button
              color="inherit"
              onClick={() => navigate("/dashboard")}
              startIcon={<DashboardIcon />}
              sx={{
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: 3,
                px: 2,
              }}
            >
              Dashboard
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate("/chat")}
              startIcon={<SmartToy />}
              sx={{
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: 3,
                px: 2,
              }}
            >
              Ask Bot
            </Button>
            <IconButton
              color="inherit"
              sx={{ background: "rgba(255, 255, 255, 0.1)" }}
            >
              <Notifications />
            </IconButton>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                background: "rgba(255, 255, 255, 0.2)",
              }}
            >
              <Person />
            </Avatar>
            <Button
              color="inherit"
              onClick={handleLogout}
              startIcon={<Logout />}
              sx={{
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: 3,
                px: 2,
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
            Campus Events
          </Typography>

          <Typography
            variant="h5"
            color="text.secondary"
            sx={{
              mb: 4,
              fontWeight: 400,
              maxWidth: 600,
              mx: "auto",
            }}
          >
            Discover amazing opportunities and connect with your campus
            community
          </Typography>
        </Box>

        {/* Filter Buttons */}
        <Paper
          elevation={2}
          sx={{
            p: 3,
            mb: 6,
            borderRadius: 4,
            background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
          }}
        >
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Filter Events
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            {categories.map((cat) => (
              <Button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                variant={filter === cat.value ? "contained" : "outlined"}
                sx={{
                  borderRadius: 3,
                  px: 3,
                  py: 1,
                  fontWeight: 600,
                  ...(filter === cat.value && {
                    background: getCategoryGradient(cat.value),
                    border: "none",
                  }),
                }}
                style={{ color: "white" }}
              >
                {cat.label}
              </Button>
            ))}
          </Stack>
        </Paper>

        {/* Events Grid */}
        {events.length === 0 ? (
          <Paper
            sx={{
              p: 6,
              textAlign: "center",
              borderRadius: 4,
              background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
            }}
          >
            <Box sx={{ fontSize: "4rem", mb: 2 }}>📋</Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              No events found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Check back later for exciting new events and opportunities!
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={4}>
            {events.map((event) => (
              <Grid item xs={12} md={6} lg={4} key={event.id}>
                <Card
                  className="hover-lift"
                  sx={{
                    height: "100%",
                    borderRadius: 4,
                    border: "none",
                    background:
                      "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
                    overflow: "hidden",
                    position: "relative",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: getCategoryGradient(event.category),
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      p: 4,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box sx={{ mb: 3 }}>
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        sx={{ mb: 2 }}
                      >
                        <Chip
                          label={event.category}
                          size="small"
                          sx={{
                            background: getCategoryGradient(event.category),
                            color: "white",
                            fontWeight: 600,
                            borderRadius: 2,
                          }}
                        />
                      </Stack>

                      <Typography
                        variant="h5"
                        component="h2"
                        sx={{ fontWeight: 700, mb: 2, lineHeight: 1.3 }}
                      >
                        {event.title}
                      </Typography>

                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{
                          lineHeight: 1.6,
                          mb: 3,
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {event.description}
                      </Typography>
                    </Box>

                    <Box sx={{ mt: "auto" }}>
                      <Stack spacing={2} sx={{ mb: 3 }}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <AccessTime
                            sx={{ fontSize: 18, color: "text.secondary" }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {event.date
                              ? typeof event.date === "string"
                                ? new Date(event.date).toLocaleDateString(
                                    "en-US",
                                    {
                                      weekday: "short",
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    }
                                  )
                                : new Date(
                                    event.date.seconds * 1000
                                  ).toLocaleDateString("en-US", {
                                    weekday: "short",
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })
                              : "Date TBD"}
                            {event.time && ` • ${event.time}`}
                          </Typography>
                        </Box>

                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <LocationOn
                            sx={{ fontSize: 18, color: "text.secondary" }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {event.location}
                          </Typography>
                        </Box>

                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Group
                            sx={{ fontSize: 18, color: "text.secondary" }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {event.organizer}
                            {event.registrations &&
                              event.maxRegistrations &&
                              ` • ${event.registrations}/${event.maxRegistrations} registered`}
                          </Typography>
                        </Box>
                      </Stack>

                      {/* Skills Tags */}
                      {event.skills && event.skills.length > 0 && (
                        <Box sx={{ mb: 2 }}>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ mb: 1, display: "block" }}
                          >
                            Skills:
                          </Typography>
                          <Stack
                            direction="row"
                            spacing={1}
                            flexWrap="wrap"
                            useFlexGap
                          >
                            {event.skills.slice(0, 3).map((skill, index) => (
                              <Chip
                                key={index}
                                label={skill}
                                size="small"
                                variant="outlined"
                                sx={{
                                  fontSize: "0.7rem",
                                  height: 24,
                                  borderColor: getCategoryColor(event.category),
                                  color: getCategoryColor(event.category),
                                }}
                              />
                            ))}
                            {event.skills.length > 3 && (
                              <Chip
                                label={`+${event.skills.length - 3} more`}
                                size="small"
                                variant="outlined"
                                sx={{
                                  fontSize: "0.7rem",
                                  height: 24,
                                  borderColor: getCategoryColor(event.category),
                                  color: getCategoryColor(event.category),
                                }}
                              />
                            )}
                          </Stack>
                        </Box>
                      )}

                      {/* Eligibility */}
                      {event.eligibility && (
                        <Box sx={{ mb: 2 }}>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ mb: 0.5, display: "block" }}
                          >
                            Eligibility:
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontSize: "0.85rem" }}
                          >
                            {event.eligibility}
                          </Typography>
                        </Box>
                      )}

                      {(event.registrationLink ||
                        event.registrations !== undefined) && (
                        <Button
                          variant="contained"
                          fullWidth
                          onClick={() => {
                            if (event.registrationLink) {
                              window.open(event.registrationLink, "_blank");
                            } else {
                              alert("Registration will open soon!");
                            }
                          }}
                          sx={{
                            borderRadius: 3,
                            py: 1.5,
                            fontWeight: 600,
                            textTransform: "none",
                            background: getCategoryGradient(event.category),
                            boxShadow: "none",
                            "&:hover": {
                              transform: "translateY(-2px)",
                              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
                            },
                          }}
                        >
                          {event.registrations >= event.maxRegistrations
                            ? "Registration Full"
                            : "Register Now"}
                        </Button>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default EventsFeed;
