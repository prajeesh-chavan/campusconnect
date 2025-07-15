import { db } from "../firebase/config";
import {
  collection,
  query,
  orderBy,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

// Dummy events data
const dummyEvents = [
  {
    id: "1",
    title: "Google Software Engineer Placement Drive",
    description:
      "Google is visiting our campus for recruitment of Software Engineer positions. Bring your resume and be prepared for technical interviews covering data structures, algorithms, and system design.",
    category: "placement",
    date: "2025-07-25",
    time: "10:00 AM",
    location: "Main Auditorium",
    organizer: "Placement Cell",
    registrations: 156,
    maxRegistrations: 200,
    skills: ["Java", "Python", "Data Structures", "Algorithms"],
    eligibility: "CSE, IT students with 7+ CGPA",
  },
  {
    id: "2",
    title: "React.js Workshop: Building Modern Web Apps",
    description:
      "Learn to build modern, responsive web applications using React.js. This hands-on workshop covers components, hooks, state management, and deployment strategies.",
    category: "workshop",
    date: "2025-07-22",
    time: "2:00 PM",
    location: "Computer Lab 1",
    organizer: "Tech Club",
    registrations: 45,
    maxRegistrations: 50,
    skills: ["JavaScript", "React", "HTML", "CSS"],
    eligibility: "All students with basic JavaScript knowledge",
  },
  {
    id: "3",
    title: "Annual Cultural Fest - Spectrum 2025",
    description:
      "Join us for the biggest cultural celebration of the year! Dance competitions, music performances, drama, art exhibitions, and much more. Prizes worth ₹50,000!",
    category: "cultural",
    date: "2025-07-30",
    time: "6:00 PM",
    location: "Open Ground",
    organizer: "Cultural Committee",
    registrations: 320,
    maxRegistrations: 500,
    skills: ["Dancing", "Singing", "Acting", "Art"],
    eligibility: "All students and faculty",
  },
  {
    id: "4",
    title: "Microsoft Internship Program",
    description:
      "Microsoft is offering summer internship opportunities for students in their pre-final year. Great opportunity to work on real-world projects and get mentorship.",
    category: "placement",
    date: "2025-07-28",
    time: "11:00 AM",
    location: "Seminar Hall 2",
    organizer: "Placement Cell",
    registrations: 89,
    maxRegistrations: 150,
    skills: ["C#", ".NET", "Azure", "Problem Solving"],
    eligibility: "Pre-final year students with 6.5+ CGPA",
  },
  {
    id: "5",
    title: "Machine Learning & AI Workshop",
    description:
      "Dive deep into the world of artificial intelligence and machine learning. Learn about neural networks, deep learning, and practical implementation using Python and TensorFlow.",
    category: "workshop",
    date: "2025-07-26",
    time: "9:00 AM",
    location: "AI Lab",
    organizer: "AI Research Club",
    registrations: 67,
    maxRegistrations: 80,
    skills: ["Python", "TensorFlow", "Mathematics", "Statistics"],
    eligibility: "Students with programming background",
  },
  {
    id: "6",
    title: "Photography Exhibition: Campus Through Lens",
    description:
      'Showcase your photography skills! Submit your best campus photographs and win exciting prizes. Theme: "Life at Campus" - capturing moments, emotions, and stories.',
    category: "cultural",
    date: "2025-08-02",
    time: "4:00 PM",
    location: "Art Gallery",
    organizer: "Photography Club",
    registrations: 78,
    maxRegistrations: 100,
    skills: ["Photography", "Image Editing", "Creativity"],
    eligibility: "All students",
  },
  {
    id: "7",
    title: "Cybersecurity Awareness Seminar",
    description:
      "Learn about the latest cybersecurity threats and how to protect yourself and organizations. Industry experts will share insights on ethical hacking and security practices.",
    category: "workshop",
    date: "2025-08-05",
    time: "1:00 PM",
    location: "Main Auditorium",
    organizer: "Cybersecurity Club",
    registrations: 134,
    maxRegistrations: 200,
    skills: ["Network Security", "Ethical Hacking", "Cybersecurity"],
    eligibility: "All technical students",
  },
  {
    id: "8",
    title: "Startup Pitch Competition",
    description:
      "Present your innovative startup ideas to industry mentors and investors. Winner gets ₹1 lakh seed funding and incubation support. Registration includes mentorship sessions.",
    category: "cultural",
    date: "2025-08-08",
    time: "10:00 AM",
    location: "Innovation Hub",
    organizer: "Entrepreneurship Cell",
    registrations: 23,
    maxRegistrations: 30,
    skills: ["Business Planning", "Presentation", "Innovation"],
    eligibility: "All students with startup ideas",
  },
];

export const eventsService = {
  getEvents: async (category = null) => {
    // Return dummy events immediately for better performance
    const filteredEvents = category
      ? dummyEvents.filter((event) => event.category === category)
      : dummyEvents;
    return filteredEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
  },

  subscribeToEvents: (callback, category = null) => {
    // Return dummy events immediately for better performance
    const filteredEvents = category
      ? dummyEvents.filter((event) => event.category === category)
      : dummyEvents;

    // Call callback immediately with dummy data
    setTimeout(() => {
      callback(
        filteredEvents.sort((a, b) => new Date(b.date) - new Date(a.date))
      );
    }, 50); // Small delay to simulate loading but much faster

    // Return a cleanup function
    return () => {};
  },
};
