/**
 * Industry demo websites. Each niche is a complete sample site that is
 * personalised from the link (business name, city, phone). Prices and
 * content are samples; the demo banner says so on every page.
 */

export type IconName =
  | "Scissors"
  | "GraduationCap"
  | "School"
  | "ShoppingCart"
  | "BookOpen"
  | "Stethoscope"
  | "Dumbbell"
  | "UtensilsCrossed"
  | "BedDouble"
  | "CakeSlice";

export type Item = { name: string; desc?: string; price?: string; amount?: number };

export type Feature =
  | { type: "booking"; title: string; text: string; button: string; optionLabel: string; fields: ("date" | "time" | "nights" | "guests")[] }
  | { type: "order"; title: string; text: string; button: string }
  | { type: "enquiry"; title: string; text: string; button: string; optionLabel: string; extraLabel: string };

export type Niche = {
  slug: string;
  label: string;
  icon: IconName;
  serif: boolean;
  dark?: boolean;
  colors: { bg: string; surface: string; ink: string; muted: string; accent: string; onAccent: string };
  defaultName: string;
  kicker: string;
  headline: string;
  sub: string;
  highlights: [string, string][];
  offeringsTitle: string;
  offerings: Item[];
  feature: Feature;
  gallery: string[];
  notices?: string[];
  hours: string;
  price: string;
};

export const niches: Niche[] = [
  {
    slug: "salon",
    label: "Beauty parlour & salon",
    icon: "Scissors",
    serif: true,
    colors: { bg: "#fbf6f4", surface: "#ffffff", ink: "#2b1720", muted: "#7a6068", accent: "#b5446e", onAccent: "#ffffff" },
    defaultName: "Glamour Beauty Parlour",
    kicker: "Beauty parlour · {city}",
    headline: "Look your best, every day.",
    sub: "Hair, skin and bridal care at {name}. Book your appointment online in seconds and skip the wait.",
    highlights: [
      ["Trained beauticians", "Experienced staff for hair, skin and bridal looks."],
      ["Hygienic & safe", "Fresh towels, sanitised tools, quality products."],
      ["Book in 30 seconds", "Pick a service and time, confirm on WhatsApp."],
    ],
    offeringsTitle: "Services & prices",
    offerings: [
      { name: "Haircut & styling", price: "₹300" },
      { name: "Hair spa", price: "₹800" },
      { name: "Hair colour", price: "from ₹1,200" },
      { name: "Glow facial", price: "₹900" },
      { name: "Threading & waxing", price: "from ₹150" },
      { name: "Manicure & pedicure", price: "₹700" },
      { name: "Party makeup", price: "₹2,500" },
      { name: "Bridal makeup", price: "from ₹8,000" },
    ],
    feature: { type: "booking", title: "Book an appointment", text: "Choose a service and time. We confirm on WhatsApp.", button: "Book on WhatsApp", optionLabel: "Service", fields: ["date", "time"] },
    gallery: ["Bridal looks", "Hair styling", "Skin care", "Our studio"],
    hours: "Tue–Sun · 10:00–20:00",
    price: "₹4,999",
  },
  {
    slug: "coaching",
    label: "Coaching classes",
    icon: "GraduationCap",
    serif: false,
    colors: { bg: "#f5f7ff", surface: "#ffffff", ink: "#101a3f", muted: "#55608a", accent: "#2a55e5", onAccent: "#ffffff" },
    defaultName: "Bright Future Classes",
    kicker: "Coaching classes · {city}",
    headline: "Better marks start with better teaching.",
    sub: "{name} prepares students for boards, JEE and NEET with small batches, weekly tests and personal attention.",
    highlights: [
      ["Small batches", "Every student gets noticed and helped."],
      ["Weekly tests", "Regular practice with detailed feedback."],
      ["Parent updates", "Attendance and marks shared on WhatsApp."],
    ],
    offeringsTitle: "Courses & fees",
    offerings: [
      { name: "Class 10 Board (Maths & Science)", desc: "Full year, notes and test series", price: "₹18,000 / year" },
      { name: "Class 11–12 Science (PCM / PCB)", desc: "Theory, numericals and board prep", price: "₹35,000 / year" },
      { name: "JEE Foundation", desc: "Concept building from Class 9", price: "₹40,000 / year" },
      { name: "NEET Foundation", desc: "Biology-focused with mock tests", price: "₹40,000 / year" },
      { name: "Spoken English", desc: "Confidence, grammar, interviews", price: "₹6,000 / 3 months" },
      { name: "Crash course", desc: "Revision before exams", price: "₹8,000" },
    ],
    feature: { type: "enquiry", title: "Admission enquiry", text: "Tell us about the student. We call you back with batch timings.", button: "Send enquiry", optionLabel: "Course", extraLabel: "Student's class" },
    gallery: ["Classrooms", "Toppers", "Test series", "Study material"],
    hours: "Mon–Sat · 07:00–21:00",
    price: "₹4,999",
  },
  {
    slug: "school",
    label: "School",
    icon: "School",
    serif: true,
    colors: { bg: "#f4faf7", surface: "#ffffff", ink: "#0f2e24", muted: "#4f6b61", accent: "#1f8a5b", onAccent: "#ffffff" },
    defaultName: "Saraswati Vidya Mandir",
    kicker: "School · {city}",
    headline: "Where curious minds grow.",
    sub: "{name} offers caring teachers, modern classrooms and a safe campus. Admissions are open for 2026–27.",
    highlights: [
      ["Experienced teachers", "Qualified staff who know every child."],
      ["Smart classrooms", "Digital boards, labs and a library."],
      ["Safe campus", "CCTV, secure gates and school transport."],
    ],
    offeringsTitle: "Admissions 2026–27",
    offerings: [
      { name: "Pre-primary", desc: "Nursery, LKG, UKG", price: "Admissions open" },
      { name: "Primary", desc: "Classes 1–5", price: "Admissions open" },
      { name: "Middle school", desc: "Classes 6–8", price: "Limited seats" },
      { name: "Secondary", desc: "Classes 9–10", price: "Limited seats" },
    ],
    feature: { type: "enquiry", title: "Admission enquiry", text: "Share a few details and our office will contact you.", button: "Send enquiry", optionLabel: "Admission for", extraLabel: "Child's name" },
    gallery: ["Campus", "Science lab", "Sports day", "Annual function"],
    notices: ["Admissions open for 2026–27", "Parent–teacher meeting on Saturday", "Annual sports day next month"],
    hours: "Mon–Sat · 08:00–14:00 (office till 16:00)",
    price: "₹9,999",
  },
  {
    slug: "supermarket",
    label: "Supermarket & kirana",
    icon: "ShoppingCart",
    serif: false,
    colors: { bg: "#fffaf2", surface: "#ffffff", ink: "#2a1a06", muted: "#7a6448", accent: "#e8771a", onAccent: "#ffffff" },
    defaultName: "Shree Ganesh Supermarket",
    kicker: "Supermarket · {city}",
    headline: "Daily groceries, delivered to your door.",
    sub: "Order from {name} on WhatsApp in one minute. Fresh stock every day and free home delivery above ₹500.",
    highlights: [
      ["Order on WhatsApp", "Pick items here, send the list in one tap."],
      ["Free delivery", "On orders above ₹500 in the area."],
      ["Fresh every day", "Vegetables, dairy and staples restocked daily."],
    ],
    offeringsTitle: "Shop popular items",
    offerings: [
      { name: "Wheat atta", desc: "5 kg", price: "₹260", amount: 260 },
      { name: "Basmati rice", desc: "1 kg", price: "₹120", amount: 120 },
      { name: "Toor dal", desc: "1 kg", price: "₹160", amount: 160 },
      { name: "Sugar", desc: "1 kg", price: "₹46", amount: 46 },
      { name: "Sunflower oil", desc: "1 litre", price: "₹150", amount: 150 },
      { name: "Tea powder", desc: "250 g", price: "₹130", amount: 130 },
      { name: "Milk", desc: "1 litre", price: "₹56", amount: 56 },
      { name: "Eggs", desc: "12 pcs", price: "₹84", amount: 84 },
      { name: "Onions", desc: "1 kg", price: "₹40", amount: 40 },
      { name: "Potatoes", desc: "1 kg", price: "₹35", amount: 35 },
      { name: "Bread", desc: "400 g", price: "₹45", amount: 45 },
      { name: "Detergent powder", desc: "1 kg", price: "₹120", amount: 120 },
    ],
    feature: { type: "order", title: "Your basket", text: "Add items, then send the order on WhatsApp. Pay on delivery.", button: "Order on WhatsApp" },
    gallery: ["Fresh vegetables", "Staples", "Dairy", "Home delivery"],
    hours: "Every day · 07:00–22:00",
    price: "₹9,999",
  },
  {
    slug: "bookshop",
    label: "Bookshop & stationery",
    icon: "BookOpen",
    serif: true,
    colors: { bg: "#f8f5ef", surface: "#ffffff", ink: "#1d2433", muted: "#5d6575", accent: "#a63d2f", onAccent: "#ffffff" },
    defaultName: "Gyan Book Depot",
    kicker: "Books & stationery · {city}",
    headline: "Every book on your school list, ready to pick up.",
    sub: "Reserve textbooks, notebooks and stationery at {name} on WhatsApp. We pack it, you collect it.",
    highlights: [
      ["Complete school sets", "Textbooks for all major boards and classes."],
      ["Reserve on WhatsApp", "No queues during the school rush."],
      ["Competitive exam books", "Guides for MPSC, banking, JEE and NEET."],
    ],
    offeringsTitle: "Popular this season",
    offerings: [
      { name: "Class 5 textbook set", price: "₹1,450", amount: 1450 },
      { name: "Class 8 textbook set", price: "₹1,980", amount: 1980 },
      { name: "Class 10 textbook set", price: "₹2,450", amount: 2450 },
      { name: "Notebook pack (12)", price: "₹420", amount: 420 },
      { name: "Geometry box", price: "₹180", amount: 180 },
      { name: "Competitive exam guide", price: "₹550", amount: 550 },
      { name: "Story books for kids", price: "₹199", amount: 199 },
      { name: "Art & craft kit", price: "₹350", amount: 350 },
    ],
    feature: { type: "order", title: "Reserve your books", text: "Add what you need and send the list. We keep it ready for pickup.", button: "Reserve on WhatsApp" },
    gallery: ["School sets", "Stationery", "Exam guides", "Kids' corner"],
    hours: "Mon–Sat · 09:00–21:00",
    price: "₹9,999",
  },
  {
    slug: "clinic",
    label: "Clinic & doctor",
    icon: "Stethoscope",
    serif: false,
    colors: { bg: "#f3f9fb", surface: "#ffffff", ink: "#0b2a33", muted: "#4f6c75", accent: "#0e7c91", onAccent: "#ffffff" },
    defaultName: "Arogya Family Clinic",
    kicker: "Family clinic · {city}",
    headline: "Caring treatment for your whole family.",
    sub: "Consult the doctor at {name} without long waits. Book your appointment online and get reminders on WhatsApp.",
    highlights: [
      ["Experienced doctor", "Trusted care for adults and children."],
      ["Less waiting", "Book a time slot before you come."],
      ["Tests on site", "Basic lab tests and health check-ups."],
    ],
    offeringsTitle: "Services",
    offerings: [
      { name: "General consultation", price: "₹400" },
      { name: "Child health", price: "₹400" },
      { name: "Diabetes & BP check-up", price: "₹600" },
      { name: "Full health check-up", price: "₹1,800" },
      { name: "Vaccination", price: "As advised" },
      { name: "Home visit", price: "₹1,000" },
    ],
    feature: { type: "booking", title: "Book an appointment", text: "Choose a service and preferred time. The clinic confirms on WhatsApp.", button: "Request appointment", optionLabel: "Service", fields: ["date", "time"] },
    gallery: ["Consultation room", "Waiting area", "Lab", "Pharmacy"],
    hours: "Mon–Sat · 10:00–14:00, 17:00–21:00",
    price: "₹9,999",
  },
  {
    slug: "gym",
    label: "Gym & fitness",
    icon: "Dumbbell",
    serif: false,
    dark: true,
    colors: { bg: "#0d0f0c", surface: "#171a15", ink: "#f3f6ee", muted: "#a3ab98", accent: "#b6f23a", onAccent: "#0d0f0c" },
    defaultName: "Iron Core Fitness",
    kicker: "Gym & fitness · {city}",
    headline: "Stronger every week.",
    sub: "Modern equipment, certified trainers and plans for every goal at {name}. Your first session is free.",
    highlights: [
      ["Certified trainers", "Workout and diet plans that fit you."],
      ["Modern equipment", "Strength, cardio and functional zones."],
      ["Free trial", "Try a session before you join."],
    ],
    offeringsTitle: "Membership plans",
    offerings: [
      { name: "Monthly", price: "₹1,200" },
      { name: "Quarterly", price: "₹3,200" },
      { name: "Half-yearly", price: "₹5,800" },
      { name: "Yearly", price: "₹10,000" },
      { name: "Personal training", price: "₹4,000 / month" },
      { name: "Zumba & yoga", price: "₹1,000 / month" },
    ],
    feature: { type: "booking", title: "Book your free trial", text: "Pick your goal and a day. We confirm on WhatsApp.", button: "Book free trial", optionLabel: "Goal", fields: ["date"] },
    gallery: ["Strength zone", "Cardio", "Group classes", "Transformations"],
    hours: "Mon–Sat · 05:30–22:00 · Sun 07:00–12:00",
    price: "₹4,999",
  },
  {
    slug: "restaurant",
    label: "Restaurant & café",
    icon: "UtensilsCrossed",
    serif: true,
    colors: { bg: "#fff8f0", surface: "#ffffff", ink: "#2b140a", muted: "#7d5a48", accent: "#c2410c", onAccent: "#ffffff" },
    defaultName: "Annapurna Family Restaurant",
    kicker: "Pure veg restaurant · {city}",
    headline: "Homestyle food, made fresh.",
    sub: "Order your favourites from {name} on WhatsApp for pickup or delivery, or book a table for the family.",
    highlights: [
      ["Fresh & hygienic", "Cooked fresh every day in a clean kitchen."],
      ["Order on WhatsApp", "Choose dishes here, send in one tap."],
      ["Family seating", "Comfortable space for groups and parties."],
    ],
    offeringsTitle: "Menu favourites",
    offerings: [
      { name: "Paneer butter masala", price: "₹240", amount: 240 },
      { name: "Dal tadka", price: "₹160", amount: 160 },
      { name: "Veg biryani", price: "₹220", amount: 220 },
      { name: "Special thali", price: "₹199", amount: 199 },
      { name: "Masala dosa", price: "₹120", amount: 120 },
      { name: "Butter naan", price: "₹45", amount: 45 },
      { name: "Jeera rice", price: "₹140", amount: 140 },
      { name: "Gulab jamun (2)", price: "₹70", amount: 70 },
      { name: "Cold coffee", price: "₹110", amount: 110 },
    ],
    feature: { type: "order", title: "Your order", text: "Add dishes, then send on WhatsApp for pickup or delivery.", button: "Order on WhatsApp" },
    gallery: ["Signature dishes", "Dining hall", "Thali", "Desserts"],
    hours: "Every day · 11:00–23:00",
    price: "₹9,999",
  },
  {
    slug: "hotel",
    label: "Hotel & lodge",
    icon: "BedDouble",
    serif: true,
    colors: { bg: "#f6f4ee", surface: "#ffffff", ink: "#1c2a22", muted: "#5e6b62", accent: "#9a7429", onAccent: "#ffffff" },
    defaultName: "Shanti Residency",
    kicker: "Hotel & lodge · {city}",
    headline: "A calm, clean stay in {city}.",
    sub: "Comfortable rooms at {name} for families and travellers. Check prices and request your booking on WhatsApp.",
    highlights: [
      ["Clean rooms", "Fresh linen, hot water and daily housekeeping."],
      ["Central location", "Close to the bus stand and main landmarks."],
      ["Easy booking", "Send dates on WhatsApp, get instant confirmation."],
    ],
    offeringsTitle: "Rooms & rates",
    offerings: [
      { name: "Standard non-AC", desc: "2 guests", price: "₹1,200 / night" },
      { name: "Deluxe AC", desc: "2 guests", price: "₹1,800 / night" },
      { name: "Family room", desc: "4 guests", price: "₹2,800 / night" },
      { name: "Dormitory bed", desc: "Per person", price: "₹450 / night" },
    ],
    feature: { type: "booking", title: "Request a booking", text: "Choose a room and dates. We confirm availability on WhatsApp.", button: "Request booking", optionLabel: "Room", fields: ["date", "nights", "guests"] },
    gallery: ["Deluxe room", "Family room", "Reception", "Dining"],
    hours: "Reception open 24 hours",
    price: "₹9,999",
  },
  {
    slug: "bakery",
    label: "Bakery & cake shop",
    icon: "CakeSlice",
    serif: true,
    colors: { bg: "#fff6f6", surface: "#ffffff", ink: "#3a1f1a", muted: "#80625c", accent: "#d0567a", onAccent: "#ffffff" },
    defaultName: "Sweet Crumbs Bakery",
    kicker: "Bakery & cakes · {city}",
    headline: "Freshly baked happiness.",
    sub: "Cakes, pastries and fresh bread from {name}. Order on WhatsApp for pickup or doorstep delivery.",
    highlights: [
      ["Baked fresh daily", "Bread and pastries out of the oven every morning."],
      ["Custom cakes", "Birthday and party cakes made to order."],
      ["Eggless options", "Most cakes available eggless."],
    ],
    offeringsTitle: "Bestsellers",
    offerings: [
      { name: "Black forest cake", desc: "500 g", price: "₹450", amount: 450 },
      { name: "Chocolate truffle cake", desc: "1 kg", price: "₹950", amount: 950 },
      { name: "Custom birthday cake", desc: "from 1 kg", price: "from ₹900", amount: 900 },
      { name: "Pineapple pastry", price: "₹60", amount: 60 },
      { name: "Cupcakes", desc: "6 pcs", price: "₹240", amount: 240 },
      { name: "Butter cookies", desc: "250 g", price: "₹160", amount: 160 },
      { name: "Fresh bread", price: "₹45", amount: 45 },
      { name: "Veg puff", price: "₹25", amount: 25 },
    ],
    feature: { type: "order", title: "Your order", text: "Add items, then send on WhatsApp. Custom cakes need 1 day's notice.", button: "Order on WhatsApp" },
    gallery: ["Celebration cakes", "Pastries", "Cookies", "Fresh bread"],
    hours: "Every day · 08:00–22:00",
    price: "₹4,999",
  },
];

export const getNiche = (slug: string) => niches.find((n) => n.slug === slug);
