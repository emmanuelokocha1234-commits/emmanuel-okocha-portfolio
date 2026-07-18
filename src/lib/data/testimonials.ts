export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  isSample: boolean;
};

// Sample placeholders so the section has real layout/content to review.
// Replace with real testimonials as they come in — keep `isSample: false`
// once a quote is genuine so the UI stops badging it as a sample.
export const testimonials: Testimonial[] = [
  {
    name: "Add your first testimonial",
    role: "Client / Collaborator / Mentor",
    quote:
      "This is a sample testimonial slot. Replace the name, role, and quote in src/lib/data/testimonials.ts with real feedback once you have it.",
    isSample: true,
  },
  {
    name: "Add a second testimonial",
    role: "Client / Collaborator / Mentor",
    quote:
      "Testimonials section is fully wired up and styled — it just needs real quotes dropped into the data file to go live.",
    isSample: true,
  },
];
