// src/modules/home/domain/types.ts

/**
 * Represents the data for your personal profile section.
 * This is the static data: Name, Welcome Message, Photo.
 */
export interface ProfileData {
  name: string;
  welcomeMessage: string;
  introText: string;
    imageUrl: string; // The path to the image file
    contactEmail: string;
    whatsappNumber: string;
}

/**
 * Represents a single service card (e.g., "Software Application", "Tutoring").
 * We define it here so both the Dummy Data and the UI know what to expect.
 */
export interface ServiceItem {
  id: string;       // Unique ID for React lists
  title: string;    // Main text (e.g., "Tutoring")
  subTitle?: string; // Optional detail text (e.g., "SHS and University...")
  iconName: string; // A string reference to an icon (we'll map this later)
}