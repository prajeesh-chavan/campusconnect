// src/components/AcademicInsights.jsx
import React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  AppBar,
  Toolbar,
  Button,
  Paper,
  LinearProgress,
  Chip,
  Stack,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  SmartToy,
  Event,
  Logout,
  TrendingUp,
  School,
  Assignment,
  Grade,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

const AcademicInsights = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const subjects = [
    {
      name: "Data Structures & Algorithms",
      grade: "A",
      percentage: 92,
      credits: 4,
      status: "Excellent",
    },
    {
      name: "Database Management Systems",
      grade: "A-",
      percentage: 88,
      credits: 3,
      status: "Good",
    },
    {
      name: "Software Engineering",
      grade: "B+",
      percentage: 82,
      credits: 3,
      status: "Good",
    },
    {
      name: "Machine Learning",
      grade: "A",
      percentage: 90,
      credits: 4,
      status: "Excellent",
    },
    {
      name: "Computer Networks",
      grade: "B",
      percentage: 78,
      credits: 3,
      status: "Satisfactory",
    },
  ];

  const upcomingAssignments = [
    {
      subject: "Machine Learning",
      title: "Neural Networks Project",
      dueDate: "2025-07-25",
      priority: "High",
    },
    {
      subject: "Software Engineering",
      title: "System Design Report",
      dueDate: "2025-07-22",
      priority: "Medium",
    },
    {
      subject: "Database Management",
      title: "Query Optimization Lab",
      dueDate: "2025-07-28",
      priority: "Low",
    },
  ];

  const getGradeColor = (percentage) => {
    if (percentage >= 90) return "#10b981";
    if (percentage >= 80) return "#f59e0b";
    if (percentage >= 70) return "#ef4444";
    return "#6b7280";
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "#ef4444";
      case "Medium":
        return "#f59e0b";
      case "Low":
        return "#10b981";
      default:
        return "#6b7280";
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "#f8fafc" }}>
      {/* AppBar */}
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
            <TrendingUp sx={{ fontSize: 28 }} />
            <Typography variant="h5" component="div" sx={{ fontWeight: 700 }}>
              Academic Insights
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
              onClick={() => navigate("/events")}
              startIcon={<Event />}
              sx={{
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: 3,
                px: 2,
              }}
            >
              Events
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
        {/* Header */}
        <Box sx={{ mb: 6, textAlign: "center" }}>
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
            Academic Performance
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: "auto" }}
          >
            Track your academic progress and performance metrics
          </Typography>
        </Box>

        {/* Overall Stats */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 4,
                borderRadius: 4,
                textAlign: "center",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
              }}
            >
              <School sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
                3.67
              </Typography>
              <Typography variant="body1">Current GPA</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 4,
                borderRadius: 4,
                textAlign: "center",
                background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                color: "white",
              }}
            >
              <Assignment sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
                17
              </Typography>
              <Typography variant="body1">Credits Completed</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 4,
                borderRadius: 4,
                textAlign: "center",
                background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                color: "white",
              }}
            >
              <Grade sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
                85%
              </Typography>
              <Typography variant="body1">Average Score</Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Subject Performance */}
        <Paper sx={{ p: 4, borderRadius: 4, mb: 6 }}>
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
            Subject Performance
          </Typography>
          <Grid container spacing={3}>
            {subjects.map((subject, index) => (
              <Grid item xs={12} key={index}>
                <Card sx={{ borderRadius: 3, border: "1px solid #e5e7eb" }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {subject.name}
                      </Typography>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Chip
                          label={subject.status}
                          sx={{
                            background: `${getGradeColor(
                              subject.percentage
                            )}20`,
                            color: getGradeColor(subject.percentage),
                            fontWeight: 600,
                          }}
                        />
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 700,
                            color: getGradeColor(subject.percentage),
                          }}
                        >
                          {subject.grade}
                        </Typography>
                      </Stack>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box sx={{ flex: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={subject.percentage}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: "#e5e7eb",
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: getGradeColor(
                                subject.percentage
                              ),
                              borderRadius: 4,
                            },
                          }}
                        />
                      </Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ minWidth: 60 }}
                      >
                        {subject.percentage}% ({subject.credits} credits)
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Upcoming Assignments */}
        <Paper sx={{ p: 4, borderRadius: 4 }}>
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
            Upcoming Assignments
          </Typography>
          <Grid container spacing={3}>
            {upcomingAssignments.map((assignment, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    borderRadius: 3,
                    border: "1px solid #e5e7eb",
                    height: "100%",
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ mb: 2 }}>
                      <Chip
                        label={assignment.priority}
                        size="small"
                        sx={{
                          background: `${getPriorityColor(
                            assignment.priority
                          )}20`,
                          color: getPriorityColor(assignment.priority),
                          fontWeight: 600,
                          mb: 2,
                        }}
                      />
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        {assignment.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {assignment.subject}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        Due:{" "}
                        {new Date(assignment.dueDate).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
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

export default AcademicInsights;
