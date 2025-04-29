# 🛍️ Next.js E-commerce App

A full-featured e-commerce web application built with **Next.js (App Router)** and **Firebase Authentication**.

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Firebase
Create a Firebase project and enable Authentication (with email/password or your preferred method).

Then, create a `.env.local` file and add your Firebase credentials:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Run the Development Server
```bash
npm run dev
```

---

## Features Implemented

- 🔒 **Firebase Authentication** (Email/Password or other providers)
- 🛒 **Persistent Cart** (Still have some bugs)
- ❤️ **Persistent Wishlist** (Still have some bugs)
- 🌓 **Dark/Light Mode Toggle**
- 🖼️ **Responsive Product Cards** with image, title, and price
- 🔄 **Add/Remove Items from Cart/Wishlist**
- 🔧 Modular and Context-based State Management
- ✅ Client-side and Server-safe rendering with `use client` directive

---

## 🧠 Technical Decisions & Architecture

- **App Router**: Used for file-based routing and layout management in Next.js 13+.
- **Context API**: Implemented for managing cart and wishlist state globally across the app.
- **Firebase Auth**: Provides seamless login/logout and user state monitoring.
- **Tailwind CSS**: Used for rapid, responsive UI development.
- **Image Optimization**: Leveraged `next/image` for auto-optimized images across devices.

---

## ⚔️ Challenges Faced

### 1. **Persisting State Across Sessions**

### 2. **User-Specific Data Handling**

### 3. **Sync Between Firestore and Local State**

---

---

## ✅ To Do

- [ ] Solving the buggy cart and wishlist feature.
- [ ] Search & Filter Functionality
- [ ] Admin Dashboard for Managing Products

---

## 📜 License

This project is open-source and available under the MIT License.
