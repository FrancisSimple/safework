// src/modules/home/data/servicesMock.ts
import { ProfileData, ServiceItem } from "../domain/types";

// 1. Your Profile Dummy Data
// valid changes here will instantly update the UI (once we build it).
export const PROFILE_MOCK: ProfileData = {
  name: "Francis",
  welcomeMessage: "Welcome.",
  introText: "I am Francis, and here are some of the ways my relationship with you could be of help:",
  imageUrl: "/profpic.jpg", // We will add a real image later
  contactEmail: "franciskwamesewor@gmail.com", // Replace with your email
  whatsappNumber: "233256591970"
};

// 2. The Services List Dummy Data
export const SERVICES_MOCK: ServiceItem[] = [
  { 
    id: '1', 
    title: 'Software Application', 
    subTitle: 'Mobile, Web, Desktop', 
    iconName: 'code' 
  },
  { 
    id: '2', 
    title: 'Tutoring', 
    subTitle: 'SHS and University - Core Engineering Concepts', 
    iconName: 'book' 
  },
  { 
    id: '3', 
    title: 'Courses', 
    subTitle: 'Mobile, Backend, Web', 
    iconName: 'video' 
  },
  { 
    id: '4', 
    title: 'General Consultancy', 
    subTitle: 'Tech Strategy & Architecture', 
    iconName: 'chat' 
  },
];