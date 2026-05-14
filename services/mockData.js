export const serviceCategories = [
  { id: 1, name: "Plumbing", icon: "Wrench", color: "#2196F3" },
  { id: 2, name: "Electrical", icon: "Zap", color: "#FF9800" },
  { id: 3, name: "Cleaning", icon: "Sparkles", color: "#4CAF50" },
  { id: 4, name: "Painting", icon: "Paintbrush", color: "#9C27B0" },
  { id: 5, name: "AC Repair", icon: "Wind", color: "#00BCD4" },
  { id: 6, name: "Carpentry", icon: "Hammer", color: "#795548" },
  { id: 7, name: "Pest Control", icon: "Bug", color: "#F44336" },
  { id: 8, name: "Shifting", icon: "Truck", color: "#607D8B" },
  { id: 9, name: "Appliances", icon: "Refrigerator", color: "#3F51B5" },
  { id: 10, name: "Gardening", icon: "TreePine", color: "#8BC34A" },
  { id: 11, name: "Security", icon: "Shield", color: "#1B4332" },
  { id: 12, name: "Tailor", icon: "Scissors", color: "#E91E63" },
];

export const providers = [
  {
    id: 1, name: "Ahmed Raza", service: "Plumbing", rating: 4.8, reviews: 142,
    price: "PKR 1,500", priceNum: 1500, experience: "8 years",
    area: "Gulberg", verified: true, available: true, responseTime: "15 min",
    avatar: "AR", phone: "+92 300 1234567",
    bio: "Expert plumber specializing in leak repairs, pipe installations, and bathroom fittings. Serving Gulberg and DHA areas.",
    skills: ["Leak Repair", "Pipe Fitting", "Bathroom", "Water Heater"],
    completedJobs: 312, onTimeRate: 96,
  },
  {
    id: 2, name: "Muhammad Bilal", service: "Electrical", rating: 4.9, reviews: 218,
    price: "PKR 1,200", priceNum: 1200, experience: "12 years",
    area: "DHA Phase 5", verified: true, available: true, responseTime: "10 min",
    avatar: "MB", phone: "+92 301 2345678",
    bio: "Licensed electrician with expertise in wiring, switchboard repairs, and UPS installations across Lahore.",
    skills: ["Wiring", "Switchboard", "UPS", "Generator"],
    completedJobs: 489, onTimeRate: 98,
  },
  {
    id: 3, name: "Ali Hassan", service: "Cleaning", rating: 4.7, reviews: 97,
    price: "PKR 2,000", priceNum: 2000, experience: "5 years",
    area: "Johar Town", verified: true, available: false, responseTime: "20 min",
    avatar: "AH", phone: "+92 302 3456789",
    bio: "Professional deep cleaning services for homes and offices. Uses eco-friendly products.",
    skills: ["Deep Clean", "Sofa Wash", "Kitchen", "Bathroom"],
    completedJobs: 178, onTimeRate: 94,
  },
  {
    id: 4, name: "Usman Tariq", service: "AC Repair", rating: 4.6, reviews: 64,
    price: "PKR 1,800", priceNum: 1800, experience: "6 years",
    area: "Model Town", verified: false, available: true, responseTime: "25 min",
    avatar: "UT", phone: "+92 303 4567890",
    bio: "AC repair and maintenance specialist. All brands serviced including split and window units.",
    skills: ["AC Service", "Gas Refill", "Installation", "Repair"],
    completedJobs: 102, onTimeRate: 91,
  },
  {
    id: 5, name: "Farhan Sheikh", service: "Painting", rating: 4.9, reviews: 183,
    price: "PKR 3,500", priceNum: 3500, experience: "10 years",
    area: "Bahria Town", verified: true, available: true, responseTime: "30 min",
    avatar: "FS", phone: "+92 304 5678901",
    bio: "Premium interior and exterior painting. Specializing in texture, wallpaper, and decorative finishes.",
    skills: ["Interior", "Exterior", "Texture", "Wallpaper"],
    completedJobs: 267, onTimeRate: 97,
  },
  {
    id: 6, name: "Kamran Akbar", service: "Carpentry", rating: 4.5, reviews: 53,
    price: "PKR 2,500", priceNum: 2500, experience: "15 years",
    area: "Iqbal Town", verified: true, available: true, responseTime: "35 min",
    avatar: "KA", phone: "+92 305 6789012",
    bio: "Master carpenter specializing in custom furniture, kitchen cabinets, and wood repair.",
    skills: ["Furniture", "Cabinets", "Doors", "Wood Repair"],
    completedJobs: 198, onTimeRate: 89,
  },
];

export const bookings = [
  { id: "KB-1001", provider: providers[0], service: "Plumbing", status: "in-progress", date: "Today, 2:00 PM", statusStep: 2 },
  { id: "KB-1002", provider: providers[1], service: "Electrical", status: "completed", date: "Yesterday", statusStep: 4 },
  { id: "KB-1003", provider: providers[4], service: "Painting", status: "upcoming", date: "Tomorrow, 10:00 AM", statusStep: 0 },
];

export const chatMessages = [
  { id: 1, sender: "provider", text: "Assalam o Alaikum! I'm on my way. Will reach in 15 minutes.", time: "2:05 PM" },
  { id: 2, sender: "user", text: "Walaikum Assalam! Great, I'll be home.", time: "2:06 PM" },
  { id: 3, sender: "provider", text: "Can you share the exact location pin?", time: "2:07 PM" },
  { id: 4, sender: "user", text: "Sent via WhatsApp. Gate number 42, street 5.", time: "2:08 PM" },
  { id: 5, sender: "provider", text: "Perfect, almost there! 🚗", time: "2:18 PM" },
];

export const adminStats = {
  totalUsers: 12450, totalProviders: 348, activeBookings: 89,
  monthlyRevenue: "PKR 2.4M", pendingApprovals: 12, openDisputes: 5,
  completionRate: 94, avgRating: 4.7,
};

export const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
];

export const statusSteps = [
  { label: "Booking Confirmed", icon: "CheckCircle" },
  { label: "Finding Provider", icon: "Search" },
  { label: "On the Way", icon: "Navigation" },
  { label: "In Progress", icon: "Wrench" },
  { label: "Completed", icon: "Star" },
];
