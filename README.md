# 🌾 KrishiLink — Farmer's Growth & Connection Platform

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://krishilink-e2675.web.app/)
[![React](https://img.shields.io/badge/React-18+-blue)](https://react.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-Latest-orange)](https://firebase.google.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3+-06B6D4)](https://tailwindcss.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payment-635BFF)](https://stripe.com/)

A modern web application that connects **farmers, traders, and consumers** in one digital space — empowering collaboration and transparency across the agricultural sector. Built with **React Router**, **TailwindCSS**, and **Firebase Authentication**, KrishiLink provides a smooth, secure, and community-driven experience for agricultural networking.

## 🎯 Vision

KrishiLink aims to revolutionize agricultural networking by creating a transparent, collaborative ecosystem where farmers can directly connect with traders and consumers, eliminating middlemen and ensuring fair pricing for all stakeholders.

---

## 📝 About KrishiLink

**KrishiLink** is a social agro-network platform designed to help users share and explore agricultural opportunities. Unlike traditional e-commerce platforms, KrishiLink focuses on **connection and collaboration** rather than simple buying and selling.

### What Users Can Do:

- 🌱 **Post Crops** - Share what they are growing or selling with detailed information
- 🧺 **Browse Listings** - Explore other users' crop posts with advanced filtering
- � **Show Interest** - Connect and collaborate with other community members
- � **Manage Profile** - Maintain personal agricultural portfolio
- � **Dashboard Access** - Track posts, interests, and community engagement
- 🔍 **Search & Filter** - Find specific crops or farmers in their area

The platform bridges the gap between producers and consumers, fostering a direct community where everyone benefits from transparent agricultural trade.

---

## ✨ Key Features

### 🔐 Authentication & Security

- Secure user authentication with Firebase
- Protected routes and user session management
- Role-based access control (Admin/User dashboards)

### 🌾 Crop Management

- Create and manage crop listings with detailed information
- Upload crop images and descriptions
- Track crop availability and pricing
- Categorize crops by type and season

### 🤝 Community Interaction

- Express interest in other users' crops
- Direct communication between farmers and buyers
- User profiles with agricultural background
- Community-driven reviews and ratings

### 📱 User Experience

- Responsive design for all devices
- Real-time updates and notifications
- Smooth animations and transitions
- Intuitive navigation and search functionality

### 🛠️ Admin Features

- Comprehensive admin dashboard
- User management and moderation
- Crop listing oversight
- Platform analytics and reporting

---

## 🛠️ Technologies Used

| Technology                   | Description                                                                                               | Link                                                                      |
| ---------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| **React**                    | Core library for building the user interface                                                              | [React Docs](https://react.dev/)                                          |
| **React Router**             | Handles client-side routing and navigation                                                                | [React Router](https://reactrouter.com/home)                              |
| **TailwindCSS**              | Utility-first CSS framework for fast UI development                                                       | [TailwindCSS Docs](https://tailwindcss.com/docs/installation/using-vite)  |
| **DaisyUI**                  | TailwindCSS component library for elegant UI elements                                                     | [DaisyUI Docs](https://daisyui.com/docs/intro/)                           |
| **Firebase**                 | Backend-as-a-Service platform for authentication, database, hosting, and more                             | [Firebase Docs](https://firebase.google.com/docs)                         |
| **AOS**                      | Animate on Scroll Library                                                                                 | [AOS Docs](https://github.com/michalsnik/aos)                             |
| **Swiper**                   | Modern touch slider and carousel library                                                                  | [Swiper Docs](https://swiperjs.com/react)                                 |
| **React FAST Marquee**       | A lightweight React component that harnesses the power of CSS animations to create silky smooth marquees. | [React FAST Marquee Docs](https://www.react-fast-marquee.com/)            |
| **React Icons**              | Collection of popular icon libraries for React                                                            | [React Icons](https://react-icons.github.io/react-icons/)                 |
| **React Toastify**           | Lightweight notifications for success/error messages                                                      | [React Toastify](https://fkhadra.github.io/react-toastify/introduction)   |
| **Sweet Alert**              | A beautiful replacement for JavaScript's "alert"                                                          | [Sweet Alert Docs](https://sweetalert.js.org/)                            |
| **React Loading Indicators** | A lightweight react loading component library                                                             | [React Loading Indicators](https://react-loading-indicators.netlify.app/) |
| **Stripe**                   | Payment processing platform for secure online transactions                                                | [Stripe Docs](https://stripe.com/docs)                                    |

---

## 📋 Prerequisites

Make sure you have the following installed before running the project:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Git](https://git-scm.com/)
- A package manager such as **npm**, **yarn**, or **pnpm**
- Firebase account for backend services

---

## 🚀 Getting Started

Follow these steps to run KrishiLink on your local machine:

### 🖥️ Backend Server Setup (Optional)

If you want to run the server locally instead of using the deployed version:

1. **Clone the server repository:**

   ```bash
   git clone https://github.com/y-m-amin/krishiLink-server.git
   cd krishilink-server
   ```

2. **Follow the server setup instructions** in the server repository README

3. **Update your client `.env` file** to point to your local server:
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   ```

### 📱 Client Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/y-m-amin/krishiLink-client.git
cd krishilink-client
```

### 2️⃣ Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3️⃣ Environment Setup

Copy the example environment file and configure it with your values:

```bash
cp .env.example .env
```

Then edit the `.env` file with your configuration:

```env
# === Firebase Config ===
VITE_APIKEY=your_firebase_api_key_here
VITE_AUTHDOMAIN=your_project_id.firebaseapp.com
VITE_PROJECTID=your_project_id_here
VITE_STORAGEBUCKET=your_project_id.firebasestorage.app
VITE_MESSAGINGSENDERID=your_messaging_sender_id_here
VITE_APPID=your_app_id_here

# === Backend API URL ===
VITE_API_BASE_URL=http://localhost:5000  # For local server
# VITE_API_BASE_URL=https://krishi-link-server-red.vercel.app  # For deployed server

# === Stripe Configuration ===
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
```

**Required Setup:**

- **Firebase Project**: Create a Firebase project and get your configuration keys
- **Stripe Account**: Set up a Stripe account and get your publishable key
- **Server**: Either use the deployed server or run locally (see Backend Server Setup above)

### 4️⃣ Start Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will be available at `http://localhost:5173`

---

## 📁 Project Structure

```
krishilink-client/
├── public/                 # Static assets
├── src/
│   ├── api/               # API configuration and calls
│   ├── assets/            # Images and static resources
│   ├── components/        # Reusable UI components
│   │   ├── Home/         # Home page specific components
│   │   └── ...
│   ├── contexts/         # React context providers
│   ├── Firebase/         # Firebase configuration
│   ├── layouts/          # Page layout components
│   ├── pages/            # Application pages
│   │   └── dashboard/    # Dashboard related pages
│   ├── routes/           # Route configurations
│   └── utils/            # Utility functions
├── .env                  # Environment variables
├── package.json          # Project dependencies
└── README.md            # Project documentation
```

---

## 🌐 Live Demo

Experience KrishiLink in action:

👉 **[Visit KrishiLink](https://krishilink-e2675.web.app/)**

### Demo Credentials

For testing purposes, you can create a new account or use the demo features available on the platform.

---

## 🤝 Contributing

We welcome contributions to KrishiLink! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add some amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow React best practices and hooks patterns
- Use TailwindCSS for styling consistency
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Y M Amin**

- GitHub: [@y-m-amin](https://github.com/y-m-amin)
- LinkedIn: [Connect with me](https://linkedin.com/in/y-m-amin)

---

## 🙏 Acknowledgments

- Thanks to the React and Firebase communities for excellent documentation
- Special appreciation to all contributors and testers
- Inspired by the need to connect agricultural communities digitally

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/y-m-amin/krishiLink-client/issues) page
2. Create a new issue with detailed information
3. Contact the maintainer through GitHub

---

**Made with ❤️ for the agricultural community**
