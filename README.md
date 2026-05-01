# 🏢 Ladorm - Modern Student Dormitory Management System

<p align="center">
  <img src="public/images/Ladorm Logo - Color 1.webp" alt="Ladorm Logo" width="250" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
</p>

---

**Ladorm** is a sophisticated, all-in-one management platform designed for student dormitories. It bridges the gap between administrators and residents by providing a centralized hub for room management, billing, registration, and community engagement. Built with a focus on speed, security, and exceptional user experience.

## ✨ Key Features

### 🔐 Administrator Suite
*   **Intelligent Dashboard**: Real-time visualization of occupancy rates, revenue streams, and urgent tasks.
*   **Advanced Tenant Management**: Comprehensive profiles, document storage, and historical stay tracking.
*   **Dynamic Room Inventory**: Automated room assignments, availability tracking, and maintenance logs.
*   **Financial Hub**: Integrated billing system, payment verification, and financial reporting.
*   **Streamlined Admissions**: Digital workflow for reviewing and approving new resident applications.

### 🏠 Resident Portal
*   **Personal Command Center**: View stay status, download payment receipts, and manage profile details.
*   **Community Directory**: An interactive "Who's Who" to foster connections within the dormitory.
*   **Simplified Support**: Direct contact channels to management and maintenance teams.

### 🌐 Public Showcase
*   **Modern Landing Page**: High-impact visual storytelling of the dormitory's facilities and culture.
*   **Interactive Galleries**: Immersive photos of rooms, common areas, and community events.
*   **Insights & Blog**: Keep residents and prospective tenants informed with the latest updates and tips.

## 🛠️ Technology Stack

| Category | Tools |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router), React 18 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS, Framer Motion, Swiper.js |
| **Backend/API** | Next.js Route Handlers, JWT (Jose), Bcrypt.js |
| **Database** | PostgreSQL (Neon), Prisma ORM |
| **State Management** | Zustand |
| **Forms** | React Hook Form, Yup |
| **Notifications** | React Hot Toast |

## 🚀 Getting Started

### Prerequisites
- Node.js (Latest LTS)
- A PostgreSQL database (Local or [Neon.tech](https://neon.tech))

### Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/renaldimohamad/ladorm.git
    cd ladorm
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Configuration**
    Create a `.env` file in the root directory:
    ```env
    DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"
    JWT_SECRET="your_high_entropy_secret_key"
    ```

4.  **Database Synchronization**
    ```bash
    npx prisma generate
    npx prisma db push
    ```

5.  **Launch the Platform**
    ```bash
    npm run dev
    ```
    Access the app at `http://localhost:3000`.

## 📁 Project Structure

```text
ladorm/
├── prisma/             # Prisma Schema & Database Configuration
├── public/             # Optimized Media & Brand Assets
├── src/
│   ├── app/            # Next.js App Router (Routes, API, Layouts)
│   │   ├── admin/      # Management Dashboard Logic
│   │   ├── residents/  # Resident Portal Experience
│   │   └── api/        # Serverless API Handlers
│   ├── components/     # High-Performance UI Components
│   ├── stores/         # Global State (Zustand)
│   ├── types/          # Centralized TypeScript Definitions
│   └── utils/          # Business Logic & Utility Helpers
└── tailwind.config.ts  # Design System Tokens
```

## 📄 License

This project is for private use. All rights reserved.

---

<p align="center">
  Developed with excellence by <a href="https://github.com/renaldimohamad">Renaldi Mohamad</a>
</p>
