// src/components/ChatBot.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  AppBar,
  Toolbar,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { geminiService } from "../services/geminiService";
import { authService } from "../services/authService";
import { auth } from "../firebase/config";

// Helper function to format markdown text
const formatMarkdownText = (text) => {
  // Convert **bold** to React elements
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      // Remove the ** and make it bold
      const boldText = part.slice(2, -2);
      return <strong key={index}>{boldText}</strong>;
    }
    return part;
  });
};

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      text: "Hi! I'm AskCampusBot 🤖. Ask me anything about campus life, placements, exams, or events!",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserProfile({
        name: user.displayName || "Student",
        year: 3,
        department: "Computer Science",
      });
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await geminiService.getCampusResponse(
        input,
        userProfile
      );
      const botMessage = { text: response, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("ChatBot Error:", error);
      let errorMessage =
        "Sorry, I encountered an error. Please try again later! 😅";

      if (error.message.includes("API request failed")) {
        errorMessage =
          "Sorry, there seems to be an issue with my AI service. Please check your internet connection and try again! 🔄";
      } else if (error.message.includes("No valid response")) {
        errorMessage =
          "I couldn't generate a proper response. Could you please rephrase your question? 🤔";
      }

      const botErrorMessage = {
        text: errorMessage,
        sender: "bot",
      };
      setMessages((prev) => [...prev, botErrorMessage]);
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Toolbar sx={{ px: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <Box
              sx={{
                background: "rgba(255, 255, 255, 0.2)",
                borderRadius: "50%",
                p: 1,
                mr: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              🤖
            </Box>
            <Typography variant="h5" component="div" sx={{ fontWeight: 700 }}>
              AskCampusBot
            </Typography>
          </Box>
          <Button
            color="inherit"
            onClick={() => navigate("/dashboard")}
            sx={{
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: 3,
              mx: 1,
            }}
          >
            Dashboard
          </Button>
          <Button
            color="inherit"
            onClick={() => navigate("/events")}
            sx={{
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: 3,
              mx: 1,
            }}
          >
            Events
          </Button>
          <Button
            color="inherit"
            onClick={handleLogout}
            sx={{
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: 3,
              mx: 1,
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container
        maxWidth="md"
        sx={{
          height: "90vh",
          display: "flex",
          flexDirection: "column",
          py: 3,
        }}
      >
        <Box sx={{ mb: 3, textAlign: "center" }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 800,
              background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1,
            }}
          >
            Chat with CampusBot
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Ask me anything about campus life, events, academics, and more!
          </Typography>
        </Box>

        <Paper
          elevation={12}
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            borderRadius: 4,
            background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
            border: "1px solid rgba(0, 0, 0, 0.08)",
          }}
        >
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              p: 3,
              background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)",
            }}
          >
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent:
                    msg.sender === "user" ? "flex-end" : "flex-start",
                  mb: 2,
                }}
              >
                <Paper
                  elevation={msg.sender === "user" ? 8 : 4}
                  sx={{
                    p: 3,
                    maxWidth: "75%",
                    background:
                      msg.sender === "user"
                        ? "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)"
                        : "#ffffff",
                    color: msg.sender === "user" ? "#fff" : "#374151",
                    borderRadius:
                      msg.sender === "user"
                        ? "24px 24px 8px 24px"
                        : "24px 24px 24px 8px",
                    border: msg.sender === "bot" ? "1px solid #e5e7eb" : "none",
                    boxShadow:
                      msg.sender === "user"
                        ? "0 8px 32px rgba(37, 99, 235, 0.3)"
                        : "0 4px 16px rgba(0, 0, 0, 0.08)",
                  }}
                >
                  {msg.sender === "bot" && (
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Box
                        sx={{
                          background:
                            "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                          borderRadius: "50%",
                          width: 24,
                          height: 24,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mr: 1,
                          fontSize: "12px",
                        }}
                      >
                        🤖
                      </Box>
                      <Typography
                        variant="caption"
                        sx={{ fontWeight: 600, color: "primary.main" }}
                      >
                        CampusBot
                      </Typography>
                    </Box>
                  )}
                  <Typography
                    variant="body1"
                    sx={{
                      whiteSpace: "pre-wrap",
                      lineHeight: 1.6,
                      fontSize: "1rem",
                    }}
                  >
                    {msg.sender === "bot"
                      ? formatMarkdownText(msg.text)
                      : msg.text}
                  </Typography>
                </Paper>
              </Box>
            ))}
            {loading && (
              <Box
                sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}
              >
                <Paper
                  elevation={4}
                  sx={{
                    p: 3,
                    background: "#ffffff",
                    borderRadius: "24px 24px 24px 8px",
                    border: "1px solid #e5e7eb",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      background:
                        "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                      borderRadius: "50%",
                      width: 24,
                      height: 24,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 2,
                      fontSize: "12px",
                    }}
                  >
                    🤖
                  </Box>
                  <CircularProgress size={16} sx={{ mr: 1 }} />
                  <Typography
                    variant="body1"
                    sx={{ color: "#6b7280", fontStyle: "italic" }}
                  >
                    CampusBot is thinking...
                  </Typography>
                </Paper>
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>

          <Box
            sx={{
              p: 3,
              background: "#ffffff",
              borderTop: "1px solid #e5e7eb",
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16,
            }}
          >
            <Box sx={{ display: "flex", gap: 2, alignItems: "flex-end" }}>
              <TextField
                fullWidth
                multiline
                maxRows={4}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about campus events, academics, placements..."
                disabled={loading}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 4,
                    background: "#f8fafc",
                    "&:hover fieldset": {
                      borderColor: "primary.main",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "primary.main",
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                sx={{
                  minWidth: 60,
                  height: 56,
                  borderRadius: 4,
                  background:
                    "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                  boxShadow: "0 4px 16px rgba(37, 99, 235, 0.3)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #1d4ed8 0%, #6d28d9 100%)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(37, 99, 235, 0.4)",
                  },
                  "&:disabled": {
                    background: "#9ca3af",
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  <Typography sx={{ fontSize: "1.2rem" }}>🚀</Typography>
                )}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default ChatBot;
