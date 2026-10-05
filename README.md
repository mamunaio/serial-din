<div align="center">

# 🏥 Serial Din (সিরিয়াল দিন)
### *Next-Gen Smart Doctor Serial & Hospital OPD Queue Management System*

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://supabase.com/)

<p align="center">
  <b>Serial Din</b> transforms medical appointments by eliminating chaotic hospital queues. Patients get instant queue serial numbers, digital tokens, and printable medical slips with zero wait friction.
</p>

[✨ Live Demo](#) • [🚀 Quick Start](#-getting-started) • [🗄️ Database Schema](#-database-architecture) • [📄 Printable PDF Slip](#-features)

---

</div>

## 🌟 Key Features

- **⚡ Instant Real-Time Serial Generation**: Automatically calculates sequential queue tokens for any doctor on any date without collision.
- **💎 Modern Glassmorphism UI**: High-aesthetic dark mode interface with frosted glass backdrops, ambient gradient glows, and smooth transitions powered by Tailwind CSS.
- **🧑‍⚕️ Doctor Selection & Filter**: Interactive specialist directory with live filtering across Cardiology, Neurology, Pediatrics, Orthopedics, and Dermatology.
- **👤 Seamless Patient Onboarding**: Auto-detects and upserts patient records via unique phone numbers without requiring complex pre-registration hurdles.
- **🖨️ 1-Page A4 Medical Appointment Slip / PDF**: Official printable token slip with hospital branding, token barcode, fee breakdown, chamber routing, and patient guidelines formatted for single-sheet print.
- **☁️ Supabase PostgreSQL Cloud Sync**: Production-grade connection pooling with Prisma ORM for ultra-fast, serverless-ready database transactions.

---

## 🛠️ Technology Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [Next.js (App Router)](https://nextjs.org/) | Server Components, Server Actions & Turbopack |
| **Frontend** | [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/) | Type-safe UI components with `useTransition` |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Glassmorphism, CSS variables & print media optimization |
| **Database ORM** | [Prisma ORM](https://www.prisma.io/) | Schema management, type generation & migrations |
| **Database** | [PostgreSQL (Supabase)](https://supabase.com/) | Cloud database with connection pooling & session pooler |

---

## 🗄️ Database Architecture

```mermaid
erDiagram
    USER ||--o{ APPOINTMENT : books
    DOCTOR ||--o{ APPOINTMENT : receives

    USER {
        string id PK "UUID"
        string name "Patient Name"
        string phone UK "Unique Mobile"
        Role role "PATIENT | ADMIN | ASSISTANT"
        datetime createdAt
        datetime updatedAt
    }

    DOCTOR {
        string id PK "UUID"
        string name "Doctor Name"
        string specialization "Specialty Area"
        string phone "Chamber Contact"
        string chamberAddress "Chamber Location"
        float consultationFee "Fee Amount"
        datetime createdAt
        datetime updatedAt
    }

    APPOINTMENT {
        string id PK "UUID"
        datetime appointmentDate "Consultation Date"
        int serialNumber "Queue Token Number"
        AppointmentStatus status "PENDING | CONFIRMED | CANCELLED | COMPLETED"
        string userId FK "References User"
        string doctorId FK "References Doctor"
        datetime createdAt
        datetime updatedAt
    }
```

---

## 📁 Project Structure

```bash
serial-din/
├── app/
│   ├── actions/
│   │   └── booking.ts         # Server action for user upsert & serial reservation
│   ├── favicon.ico
│   ├── globals.css            # Tailwind theme & @media print A4 optimization
│   ├── layout.tsx             # Root app layout
│   └── page.tsx               # Main landing page & booking showcase
├── components/
│   ├── AppointmentSlip.tsx    # Official single-page printable PDF token slip
│   └── BookingForm.tsx        # Glassmorphism multi-step booking component
├── lib/
│   ├── doctors.ts             # Specialist doctor directory & interface
│   └── prisma.ts              # Global Prisma Client singleton
├── prisma/
│   └── schema.prisma          # PostgreSQL schema with User, Doctor, Appointment
├── public/                    # Static assets
├── .env.example               # Environment variable templates
└── package.json
```

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/mamunaio/serial-din.git
cd serial-din
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory:
```env
# Supabase Database URL (Session Pooler - Port 5432)
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres"

# Direct URL for Prisma migrations
DIRECT_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres"
```

### 4. Sync Database Schema
```bash
npx prisma db push
```

### 5. Launch Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to experience **Serial Din**.

---

## 🖨️ PDF Slip Preview & Printing

When an appointment is successfully reserved:
1. Click **"View & Print Official PDF Slip"**.
2. Click **"Print / Save as PDF"** or press `Ctrl + P`.
3. The layout automatically adapts to a single **A4 portrait page** with zero background ink waste and high-contrast typography.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/mamunaio/serial-din/issues).

---

## 📝 License

This project is licensed under the **MIT License**.

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/mamunaio">Mamun</a></sub>
</div>
