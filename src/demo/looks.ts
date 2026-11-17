/**
 * The visual identity of each niche demo: hero style, how offerings are shown,
 * niche-specific sections and photos. Photos are from Unsplash (free licence,
 * commercial use allowed) and served from Unsplash's image CDN.
 */

export type HeroStyle = "photo" | "split" | "bold" | "shop";
export type OfferStyle = "menu" | "plans" | "rooms" | "courses" | "programs" | "services" | "cart";

export type Look = {
  hero: string;
  gallery: string[];
  heroStyle: HeroStyle;
  offerStyle: OfferStyle;
  /** Short proof points shown as a band under the hero. */
  facts?: [string, string][];
  /** Grouping for shop-style catalogues (item name → category). */
  categories?: Record<string, string>;
  /** Sample people for clinic/coaching (clearly sample content). */
  people?: { name: string; role: string; photo?: string }[];
  amenities?: string[];
  quickLinks?: string[];
  special?: { title: string; text: string };
  plansPopular?: string;
  courseTimes?: Record<string, string>;
};

/** The Growth Kit pitched at the bottom of each demo: outcomes, not "a website". */
export type Kit = { name: string; setup: string; monthly: string; promise: string; items: string[] };

const restaurantKit: Kit = {
  name: "Restaurant Growth Kit",
  setup: "₹9,999",
  monthly: "₹1,499",
  promise: "Keep the commission you pay delivery apps on your regular customers.",
  items: ["Direct WhatsApp ordering, no commission", "Monthly offers to your customers on WhatsApp", "Google review engine: more stars, more new customers", "Digital loyalty card"],
};

export const kits: Record<string, Kit> = {
  salon: {
    name: "Salon Growth Kit",
    setup: "₹4,999",
    monthly: "₹999",
    promise: "Customers come back on time, and new ones find you through reviews.",
    items: ["Online booking with reminders", "“Due for your next visit” WhatsApp reminders", "Google review engine", "Monthly offers and loyalty card"],
  },
  coaching: {
    name: "Coaching Growth Kit",
    setup: "₹9,999",
    monthly: "₹1,499",
    promise: "More admissions, fees on time, parents kept informed.",
    items: ["Admission enquiries straight to WhatsApp", "Fee reminders with UPI payment link", "Parent progress updates on WhatsApp", "Referral system and Google review engine"],
  },
  school: {
    name: "School Growth Kit",
    setup: "₹9,999",
    monthly: "₹1,499",
    promise: "More admissions, fees on time, parents kept informed.",
    items: ["Admission enquiries straight to WhatsApp", "Fee reminders with UPI payment link", "Notices and updates to parents on WhatsApp", "Google review engine"],
  },
  supermarket: {
    name: "Shop Growth Kit",
    setup: "₹4,999",
    monthly: "₹799",
    promise: "Your regulars order on WhatsApp, and your offers reach them every month.",
    items: ["WhatsApp ordering page for your products", "Monthly offers to opted-in customers", "Google review engine", "Missed-call ordering (coming soon)"],
  },
  bookshop: {
    name: "Shop Growth Kit",
    setup: "₹4,999",
    monthly: "₹799",
    promise: "Parents reserve on WhatsApp instead of queuing in the school rush.",
    items: ["WhatsApp reservation page for book sets", "Season offers to opted-in customers", "Google review engine", "Missed-call ordering (coming soon)"],
  },
  clinic: {
    name: "Clinic Growth Kit",
    setup: "₹9,999",
    monthly: "₹1,999",
    promise: "Fewer missed appointments, more patients finding you on Google.",
    items: ["Appointment booking with WhatsApp reminders", "Google review engine", "Auto-replies for timings, fees and location", "Marathi/Hindi WhatsApp receptionist (coming soon)"],
  },
  gym: {
    name: "Gym Growth Kit",
    setup: "₹4,999",
    monthly: "₹999",
    promise: "More trials, on-time renewals, members who stay.",
    items: ["Free-trial booking", "Renewal reminders with UPI payment link", "Google review engine", "Diet & workout plans add-on"],
  },
  restaurant: restaurantKit,
  bakery: { ...restaurantKit, name: "Bakery Growth Kit", setup: "₹4,999", monthly: "₹999", items: ["Direct WhatsApp orders and custom-cake requests", "Birthday and festival offers on WhatsApp", "Google review engine", "Digital loyalty card"] },
  hotel: {
    name: "Hotel Growth Kit",
    setup: "₹9,999",
    monthly: "₹1,499",
    promise: "Direct bookings without paying booking sites.",
    items: ["Direct booking requests on WhatsApp", "Checkout review request to every guest", "Offers to past guests for festivals and seasons", "Google review engine"],
  },
};

export const img = (id: string, w = 1200) => `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`;

export const looks: Record<string, Look> = {
  salon: {
    hero: "1580618672591-eb180b1a973f",
    gallery: ["1634449571010-02389ed0f9b0", "1570172619644-dfd03ed5d881", "1596462502278-27bfdc403348", "1633681926022-84c23e8cb2d6"],
    heroStyle: "photo",
    offerStyle: "menu",
    facts: [
      ["Bridal", "packages"],
      ["Hygienic", "sanitised tools"],
      ["Online", "booking"],
    ],
    special: { title: "This month's glow offer", text: "Facial + hair spa together at a special price. Ask when you book." },
  },
  coaching: {
    hero: "1758685845902-acd5db1b532b",
    gallery: ["1709290749293-c6152a187b14", "1664382953518-4a664ab8a8c9", "1722573783625-eceb04251036", "1686624386665-4cd01b96d0f6"],
    heroStyle: "split",
    offerStyle: "courses",
    facts: [
      ["Small", "batches"],
      ["Weekly", "tests"],
      ["Free", "demo lecture"],
    ],
    courseTimes: {
      "Class 10 Board (Maths & Science)": "Mon–Sat · 7–9 am / 5–7 pm",
      "Class 11–12 Science (PCM / PCB)": "Mon–Sat · 6–8 pm",
      "JEE Foundation": "Tue, Thu, Sat · 4–6 pm",
      "NEET Foundation": "Mon, Wed, Fri · 4–6 pm",
      "Spoken English": "Weekends · 10 am–12 pm",
      "Crash course": "Before board exams",
    },
    people: [
      { name: "Prof. R. Kulkarni", role: "Mathematics · 15 yrs" },
      { name: "Dr. S. Patil", role: "Biology · NEET mentor" },
      { name: "Prof. A. Joshi", role: "Physics & Chemistry" },
    ],
  },
  school: {
    hero: "1592066575517-58df903152f2",
    gallery: ["1692269725836-fbd72e98883f", "1524069290683-0457abfe42c3", "1719159381916-062fa9f435a6", "1786667395469-72695a7becd8"],
    heroStyle: "split",
    offerStyle: "programs",
    quickLinks: ["Admissions", "Fee structure", "Notices", "Transport", "Gallery", "Contact office"],
  },
  supermarket: {
    hero: "1604719312566-8912e9227c6a",
    gallery: ["1542838132-92c53300491e", "1583258292688-d0213dc5a3a8", "1764955307141-056b240923a1", "1601598851547-4302969d0614"],
    heroStyle: "shop",
    offerStyle: "cart",
    special: { title: "Month-start offer", text: "Stock up for the month: atta, oil and dal at special prices this week." },
    categories: {
      "Wheat atta": "Staples",
      "Basmati rice": "Staples",
      "Toor dal": "Staples",
      Sugar: "Staples",
      "Sunflower oil": "Staples",
      "Tea powder": "Staples",
      Milk: "Dairy & eggs",
      Eggs: "Dairy & eggs",
      Bread: "Dairy & eggs",
      Onions: "Vegetables",
      Potatoes: "Vegetables",
      "Detergent powder": "Household",
    },
  },
  bookshop: {
    hero: "1774070231417-4bf4d2025878",
    gallery: ["1513185041617-8ab03f83d6c5", "1550399105-c4db5fb85c18", "1457369804613-52c61a468e7d", "1764337482439-ae67981bff34"],
    heroStyle: "shop",
    offerStyle: "cart",
    special: { title: "School season", text: "Complete textbook sets for all classes. Reserve now, pick up without queues." },
    categories: {
      "Class 5 textbook set": "School sets",
      "Class 8 textbook set": "School sets",
      "Class 10 textbook set": "School sets",
      "Notebook pack (12)": "Stationery",
      "Geometry box": "Stationery",
      "Art & craft kit": "Stationery",
      "Competitive exam guide": "Exam guides",
      "Story books for kids": "Kids",
    },
  },
  clinic: {
    hero: "1758691463582-11aea602cd4a",
    gallery: ["1758691462878-6edc3d3da1be", "1638202993928-7267aad84c31", "1758691461990-03b49d969495", "1673865641073-4479f93a7776"],
    heroStyle: "split",
    offerStyle: "services",
    people: [{ name: "Dr. A. Deshmukh", role: "MBBS, MD (General Medicine)", photo: "1758691463582-11aea602cd4a" }],
    facts: [
      ["Same-day", "appointments"],
      ["On-site", "lab tests"],
      ["WhatsApp", "reminders"],
    ],
  },
  gym: {
    hero: "1689877020200-403d8542d95d",
    gallery: ["1517836357463-d25dfeac3438", "1761839258420-5c3e2f2e2a74", "1758875569612-94d5e0f1a35f", "1526506118085-60ce8714f8c5"],
    heroStyle: "bold",
    offerStyle: "plans",
    plansPopular: "Quarterly",
    facts: [
      ["5:30", "am opening"],
      ["1st", "session free"],
      ["Diet", "plans included"],
    ],
  },
  restaurant: {
    hero: "1742281257687-092746ad6021",
    gallery: ["1589778655375-3e622a9fc91c", "1567337710282-00832b415979", "1588644525273-f37b60d78512", "1680993032090-1ef7ea9b51e5"],
    heroStyle: "photo",
    offerStyle: "cart",
    special: { title: "Today's special", text: "Unlimited special thali with sweet and buttermilk, lunch and dinner." },
    categories: {
      "Paneer butter masala": "Mains",
      "Dal tadka": "Mains",
      "Veg biryani": "Rice",
      "Jeera rice": "Rice",
      "Special thali": "Thali",
      "Masala dosa": "South Indian",
      "Butter naan": "Breads",
      "Gulab jamun (2)": "Desserts",
      "Cold coffee": "Drinks",
    },
  },
  hotel: {
    hero: "1611892440504-42a792e24d32",
    gallery: ["1618773928121-c32242e63f39", "1782890790046-2aefb0b503cb", "1759328257280-28bdb3050be3", "1631049307264-da0ec9d70304"],
    heroStyle: "photo",
    offerStyle: "rooms",
    amenities: ["Free Wi-Fi", "Hot water 24/7", "Parking", "AC rooms", "Room service", "Near bus stand"],
  },
  bakery: {
    hero: "1583338917451-face2751d8d5",
    gallery: ["1626263468007-a9e0cf83f1ac", "1547398847-19d7560a6257", "1542826438-bd32f43d626f", "1595144780677-6d0b5abbd089"],
    heroStyle: "split",
    offerStyle: "cart",
    special: { title: "Order a custom cake", text: "Birthdays, anniversaries, office parties. Tell us the theme a day in advance." },
    categories: {
      "Black forest cake": "Cakes",
      "Chocolate truffle cake": "Cakes",
      "Custom birthday cake": "Cakes",
      "Pineapple pastry": "Pastries",
      Cupcakes: "Pastries",
      "Butter cookies": "Cookies & bread",
      "Fresh bread": "Cookies & bread",
      "Veg puff": "Snacks",
    },
  },
};

/** Sample customer reviews per niche. Labelled as samples on the page; the client's real Google reviews replace them. */
export const sampleReviews: Record<string, [string, string][]> = {
  salon: [
    ["Booked on WhatsApp in a minute and didn't have to wait at all. Lovely hair spa.", "Priya S."],
    ["My bridal makeup was perfect. Everyone asked who did it!", "Sneha K."],
    ["Clean, friendly and fairly priced. My regular place now.", "Anjali M."],
  ],
  coaching: [
    ["My son's marks went from 62% to 88% in one year. Teachers really care.", "Parent of Class 10 student"],
    ["Small batches and regular tests. Doubts get solved the same day.", "Rohan P."],
    ["The weekly WhatsApp updates keep us informed about attendance and marks.", "Mrs. Kulkarni"],
  ],
  school: [
    ["Caring teachers and a safe campus. Our daughter loves going to school.", "Parent, Class 3"],
    ["Admission was simple and the office answered every question on WhatsApp.", "Parent, Class 1"],
    ["Good balance of studies, sports and values.", "Parent, Class 7"],
  ],
  supermarket: [
    ["I send my list on WhatsApp in the morning and it's home by evening.", "Meena J."],
    ["Fresh vegetables and better prices than the big stores.", "Rahul D."],
    ["The monthly offers on WhatsApp save us a lot.", "Sunita P."],
  ],
  bookshop: [
    ["They had every textbook on our school list, packed and ready.", "Parent of Class 8"],
    ["Ordered competitive exam books on WhatsApp, delivered next day.", "Amit K."],
    ["Great stationery collection and very helpful staff.", "Neha R."],
  ],
  clinic: [
    ["Booked my slot on WhatsApp and was seen on time. Very thorough doctor.", "Suresh P."],
    ["Explains everything patiently. Our whole family's doctor now.", "Kavita D."],
    ["Clean clinic, reasonable fees, and reminders for follow-ups.", "Mahesh G."],
  ],
  gym: [
    ["Lost 9 kg in 4 months with the trainer's diet plan.", "Akash T."],
    ["Good equipment, clean, and not overcrowded in the morning.", "Pooja N."],
    ["Trainers actually correct your form. Best gym in the area.", "Vikram S."],
  ],
  restaurant: [
    ["Ordered on WhatsApp and the food came hot. Thali is amazing.", "Nitin K."],
    ["Perfect place for family dinners. Quick service.", "Shweta R."],
    ["Cheaper ordering direct than on apps, and same great taste.", "Arjun M."],
  ],
  hotel: [
    ["Clean rooms, hot water and very helpful staff. Booked on WhatsApp easily.", "Ramesh & family"],
    ["Close to the temple and peaceful. Will stay again.", "Deepak S."],
    ["Good value for money. The breakfast was lovely.", "Lata V."],
  ],
  bakery: [
    ["The custom birthday cake looked exactly like the photo I sent.", "Rina P."],
    ["Fresh bread every morning, and the cookies are addictive.", "Sameer K."],
    ["Ordered on WhatsApp, ready on time for pickup.", "Asha D."],
  ],
};
