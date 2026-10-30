/* =====================================================================
   SUJAG CREATIVE - CONTENT FILE (site-data.js)
   Edit this file to change numbers, contact details and projects.
   Keep every comma, quote and bracket. One item per line.
   ===================================================================== */

/* Contact details (used on every page) */
const SITE = {
  name: "SUJAG Creative",
  phone: "0304 0962799",            /* shown on the site */
  phoneIntl: "923040962799",        /* same number, no + or spaces, starts with 92 */
  whatsapp: "0325 3061605",
  whatsappIntl: "923253061605",
  whatsappMessage: "Hello SUJAG Creative, I would like to discuss a project.",
  location: "Khairpur Mir's, Sindh, Pakistan",
  email: "",                        /* add your email here when you have one */
  socials: [                        /* e.g. {n: "Facebook", u: "https://facebook.com/yourpage"} */
  ]
};

/* Home page numbers (they count up when visitors scroll to them) */
const STATS = { completed: 10, ongoing: 2, happy: 100 };

/* Google Analytics: paste your own Measurement ID, e.g. "G-ABC123XYZ9". Leave "" to switch it off. */
const GA_ID = "";

/* Projects. type: "website" | "app" | "wordpress" | "design"   status: "Completed" or "Ongoing"
   Format: {name: "", type: "", status: "", year: "", desc: "", tags: ["", ""], link: "", result: ""} */
const PROJECTS = [
  {name: "SALU Community", type: "website", status: "Completed", year: "2026",
   desc: "An independent student guidance platform for Shah Abdul Latif University, Khairpur, with admissions and merit lists, 28 departments across 7 faculties, seats and fees, scholarships, an aggregate calculator, past papers, quizzes and free mock tests.",
   tags: ["Education", "Student guidance", "Interactive tools"], link: "https://salucommunity.github.io/",
   image: "assets/salu-community-website.jpg", result: ""}
];

/* Client reviews. Leave empty [] to hide the section.
   Format: {name: "", role: "", text: ""} */
const TESTIMONIALS = [
];
