# 🌾 KrishiLink — Farmer’s Growth & Connection Platform

A modern web application that connects **farmers, traders, and consumers** in one digital space — empowering collaboration and transparency across the agricultural sector.  
Built with **React Router**, **TailwindCSS**, and **Firebase Authentication**, KrishiLink provides a smooth, secure, and community-driven experience for agricultural networking.

---

## 📝 Description

**KrishiLink** is a social agro-network platform designed to help users share and explore agricultural opportunities.  
Unlike traditional e-commerce platforms, KrishiLink focuses on **connection and collaboration** rather than simple buying and selling.

For now, every user can:
- 🌱 **Post** what they are growing or selling  
- 🧺 **Browse** other users’ crop posts  
- 🤝 **Show interest** to connect and collaborate  

The platform bridges the gap between producers and consumers, fostering a direct community where everyone benefits.

---

## ⚙️ Features

- 🔐 Secure authentication with Firebase  
- 🧭 Dynamic routing with React Router  
- 💬 Post and manage crop listings  
- 👀 View and interact with other users’ posts  
- 💾 Real-time updates and responsive design  
- 🚫 Custom error pages and SweetAlert feedback  

---

## ⚙️ Technologies Used

| Technology | Description | Link |
|-------------|-------------|------|
| **React** | Core library for building the user interface | [React Docs](https://react.dev/) |
| **React Router** | Handles client-side routing and navigation | [React Router](https://reactrouter.com/home) |
| **TailwindCSS** | Utility-first CSS framework for fast UI development | [TailwindCSS Docs](https://tailwindcss.com/docs/installation/using-vite) |
| **DaisyUI** | TailwindCSS component library for elegant UI elements | [DaisyUI Docs](https://daisyui.com/docs/intro/) |
| **Firebase** | Backend-as-a-Service platform for authentication, database, hosting, and more | [Firebase Docs](https://firebase.google.com/docs) |
| **AOS** | Animate on Scroll Library| [AOS Docs](https://github.com/michalsnik/aos) |
| **Swiper** | Modern touch slider and carousel library | [Swiper Docs](https://swiperjs.com/react) |
| **React FAST Marquee** | A lightweight React component that harnesses the power of CSS animations to create silky smooth marquees. | [React FAST Marquee Docs](https://www.react-fast-marquee.com/) |
| **React Icons** | Collection of popular icon libraries for React | [React Icons](https://react-icons.github.io/react-icons/) |
| **React Toastify** | Lightweight notifications for success/error messages | [React Toastify](https://fkhadra.github.io/react-toastify/introduction) |
| **Sweet Alert** | A beautiful replacement for JavaScript's "alert"| [Sweet Alert Docs](https://sweetalert.js.org/) |
| **React Loading Indicators** | A lightweight react loading component library | [React Loading Indicators](https://react-loading-indicators.netlify.app/) |

---

## 🧩 Prerequisites

Make sure you have the following installed before running the project:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)  
- [Git](https://git-scm.com/)  
- A package manager such as **npm**, **yarn**, or **pnpm**

---

## 🧠 Running the Client Locally

Follow these steps to run the KrishiLink client on your local machine:

```bash
# 1️⃣ Clone the repository
git clone https://github.com/y-m-amin/krishiLink-client.git

# 2️⃣ Navigate into the project directory
cd krishilink-client

# 3️⃣ Install dependencies
npm install
# or
yarn install

# 4️⃣ Create a .env file in the root folder
# Add your API base URL and Firebase config variables
VITE_API_BASE_URL=http://localhost:3000 or your server url
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
# (Add other Firebase config keys as needed)

# 5️⃣ Start the development server
npm run dev
# or
yarn dev
