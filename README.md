# Balenciaga Reimagined

![License](https://img.shields.io/github/license/symon9/FUTURE_FS_03)
![Issues](https://img.shields.io/github/issues/symon9/FUTURE_FS_03)
![Stars](https://img.shields.io/github/stars/symon9/FUTURE_FS_03)
![Forks](https://img.shields.io/github/forks/symon9/FUTURE_FS_03)

![Balenciaga Demo](public/demo.gif)

> A high-fidelity, luxury fashion e-commerce experience inspired by Balenciaga's brutalist and minimalist aesthetic.

## ✧ About The Project

This project is a conceptual redesign of the Balenciaga e-commerce platform, focusing on a raw, industrial, and avant-garde user experience. It leverages modern web technologies to deliver smooth animations, interactive elements, and a seamless shopping journey that embodies the brand's identity.

The design philosophy centers on **brutalism** stripping away unnecessary ornamentation to reveal the raw structure of the content. Bold typography, stark contrasts, and unconventional layouts drive the visual narrative.

## ✦ Key Features

*   **Brutalist & Minimalist Design**: A stark, high-contrast UI that prioritizes imagery and typography.
*   **Interactive Category Wall**: A dynamic, hover-responsive navigation experience.
*   **Horizontal Scroll Gallery**: An editorial-style showcase for collections and campaigns.
*   **Staggered Product Grid**: A masonry-inspired layout for browsing products with fluid motion.
*   **Smooth Animations**: Powered by **GSAP** for high-performance, cinematic transitions.
*   **Responsive Architecture**: Flawless experience across desktop, tablet, and mobile devices.
*   **Real-time Data**: Integrated with **Firebase** for dynamic product management.

## 🛠 Built With

*   [![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
*   [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
*   [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
*   [![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/)
*   [![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

*   Node.js (v18 or higher)
*   npm

### Environment Setup

1.  Create a `.env.local` file in the root directory.
2.  Copy the contents of `.env.example` into `.env.local`.
3.  Fill in your Firebase credentials.

    ```env
    # Firebase Client SDK (Public)
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

    # Firebase Admin SDK (Private)
    FIREBASE_CLIENT_EMAIL=your_client_email
    FIREBASE_PRIVATE_KEY=your_private_key
    FIREBASE_PROJECT_ID=your_project_id
    ```

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/your_username/balenciaga-reimagined.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```
3.  Run the development server
    ```sh
    npm run dev
    ```

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

