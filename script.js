// Karthik Portfolio - Interactive Script

// Dynamic typewriter words
const words = [
  "MCA Student",
  "Aspiring Software Developer",
  "BCA Graduate",
  "Java & Python Enthusiast",
  "Android Application Builder",
  "Full-Stack Web Craftsman"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingDelay = 120;
const erasingDelay = 60;
const newWordDelay = 1800;
const typingElement = document.getElementById("typing-text");

function typeEffect() {
  if (!typingElement) return;

  const currentWord = words[wordIndex];

  if (isDeleting) {
    typingElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentWord.length) {
    isDeleting = true;
    setTimeout(typeEffect, newWordDelay);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(typeEffect, 400);
  } else {
    setTimeout(typeEffect, isDeleting ? erasingDelay : typingDelay);
  }
}

// Dark / Light Theme Toggle
const themeToggleBtn = document.getElementById("theme-toggle");

function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

themeToggleBtn?.addEventListener("click", () => {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  lucide.createIcons();
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-link");

mobileMenuBtn?.addEventListener("click", () => {
  mobileMenu?.classList.toggle("hidden");
});

mobileLinks.forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu?.classList.add("hidden");
  });
});

// Toast notification helper
function showToast(message) {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toast-message");
  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;
  toast.classList.remove("translate-y-20", "opacity-0");
  toast.classList.add("translate-y-0", "opacity-100");

  setTimeout(() => {
    toast.classList.remove("translate-y-0", "opacity-100");
    toast.classList.add("translate-y-20", "opacity-0");
  }, 3500);
}

// 1-Click Email Copy
function copyEmailToClipboard() {
  const email = "Karthikpoojary392@gmail.com";
  navigator.clipboard.writeText(email).then(() => {
    showToast("Email copied to clipboard: " + email);
  }).catch(() => {
    showToast("Email: " + email);
  });
}

// Contact form submission handler
function handleFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("name")?.value;
  const email = document.getElementById("email")?.value;
  const subject = document.getElementById("subject")?.value;
  const message = document.getElementById("message")?.value;

  // Simulate instant client response and construct mailto link
  showToast("Thank you, " + name + "! Opening your mail client...");

  setTimeout(() => {
    const mailtoUrl = `mailto:Karthikpoojary392@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;
    window.location.href = mailtoUrl;
    document.getElementById("contact-form")?.reset();
  }, 1000);
}

// Project Details Data
const projectDetails = {
  rent: {
    title: "House Rent Management System",
    type: "Full-Stack Web Application",
    badgeColor: "indigo",
    overview: "A full-featured web solution designed to bridge the communication and transaction gap between property landlords and prospective tenants.",
    features: [
      "Property Listings with image uploads, room specifications, rent price, and deposit details.",
      "Tenant Search with multi-filter parameters (location, budget, amenities, property type).",
      "Role-Based Authentication protecting landlord management consoles and tenant inquiry sessions.",
      "Relational Database Schema (MySQL) storing user records, property inventory, and active rental agreements.",
      "Mobile-Friendly, fully responsive layout built with clean CSS3 and JavaScript."
    ],
    techStack: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL", "Apache"],
    keyLearning: "Mastered full-stack relational database normalization, server-side authentication, CRUD operations, and responsive web accessibility."
  },
  vehicle: {
    title: "Vehicle Rental Service Application",
    type: "Android Mobile Application",
    badgeColor: "emerald",
    overview: "A native mobile app built for Android devices enabling users to browse available car/bike rentals in real time and place automated reservations.",
    features: [
      "Catalog browsing with categorized views (Sedan, SUV, Bike, Luxury).",
      "Real-time availability status tracking and transparent daily/hourly pricing breakdown.",
      "Booking management pipeline connecting customer preferences to available fleets.",
      "Google Firebase integration for cloud backend data synchronization, realtime updates, and authentication.",
      "Clean XML layouts adhering to Android Material Design guidelines with smooth transition animations."
    ],
    techStack: ["Java", "Android Studio", "XML", "Firebase Realtime DB", "Firebase Auth"],
    keyLearning: "Gained hands-on proficiency with Android activity lifecycles, XML layout hierarchies, asynchronous background tasks, and Firebase NoSQL database structures."
  }
};

// Modal functions
function openProjectModal(key) {
  const modal = document.getElementById("project-modal");
  const modalContent = document.getElementById("modal-content");
  const data = projectDetails[key];
  if (!modal || !modalContent || !data) return;

  modalContent.innerHTML = `
    <div class="space-y-6">
      <div class="border-b border-slate-200 dark:border-slate-800 pb-4">
        <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-${data.badgeColor}-100 dark:bg-${data.badgeColor}-900/50 text-${data.badgeColor}-700 dark:text-${data.badgeColor}-300 mb-2">
          ${data.type}
        </span>
        <h3 class="text-2xl font-bold">${data.title}</h3>
        <p class="text-slate-600 dark:text-slate-400 text-sm mt-1">${data.overview}</p>
      </div>

      <div class="space-y-3">
        <h4 class="font-bold text-sm uppercase tracking-wider text-slate-500">Core Features & Capabilities</h4>
        <ul class="space-y-2 text-sm text-slate-700 dark:text-slate-300">
          ${data.features.map(f => `
            <li class="flex items-start gap-2.5">
              <i data-lucide="check-circle" class="w-4 h-4 text-${data.badgeColor}-500 mt-0.5 flex-shrink-0"></i>
              <span>${f}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <div class="space-y-3">
        <h4 class="font-bold text-sm uppercase tracking-wider text-slate-500">Tech Stack & Tools</h4>
        <div class="flex flex-wrap gap-2">
          ${data.techStack.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        <span class="font-semibold text-slate-900 dark:text-slate-200">Key Engineering Takeaways: </span>
        ${data.keyLearning}
      </div>

      <div class="flex justify-end pt-2">
        <button onclick="closeProjectModal()" class="px-5 py-2.5 rounded-xl font-semibold text-sm bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
          Close Preview
        </button>
      </div>
    </div>
  `;

  modal.classList.remove("opacity-0", "pointer-events-none");
  modal.classList.add("opacity-100");
  const innerCard = modal.querySelector(".transform");
  innerCard?.classList.remove("scale-95");
  innerCard?.classList.add("scale-100");

  lucide.createIcons();
}

function closeProjectModal() {
  const modal = document.getElementById("project-modal");
  if (!modal) return;
  modal.classList.add("opacity-0", "pointer-events-none");
  modal.classList.remove("opacity-100");
  const innerCard = modal.querySelector(".transform");
  innerCard?.classList.add("scale-95");
  innerCard?.classList.remove("scale-100");
}

// Close modal on backdrop click
document.getElementById("project-modal")?.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    closeProjectModal();
  }
});

// Close modal on ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeProjectModal();
    closeResumeModal();
  }
});

// Resume Modal functions
function openResumeModal() {
  const modal = document.getElementById("resume-modal");
  if (!modal) return;
  modal.classList.remove("opacity-0", "pointer-events-none");
  modal.classList.add("opacity-100");
  const innerCard = modal.querySelector(".transform");
  innerCard?.classList.remove("scale-95");
  innerCard?.classList.add("scale-100");
  lucide.createIcons();
}

function closeResumeModal() {
  const modal = document.getElementById("resume-modal");
  if (!modal) return;
  modal.classList.add("opacity-0", "pointer-events-none");
  modal.classList.remove("opacity-100");
  const innerCard = modal.querySelector(".transform");
  innerCard?.classList.add("scale-95");
  innerCard?.classList.remove("scale-100");
}

document.getElementById("resume-modal")?.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    closeResumeModal();
  }
});

// Initialize on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  typeEffect();
  if (window.lucide) {
    lucide.createIcons();
  }
});
