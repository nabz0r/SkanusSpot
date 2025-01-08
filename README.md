# 🌟 SkanusSpot

> Elevate Your Dining Experience Across The Baltics

[![Stars](https://img.shields.io/github/stars/nabz0r/SkanusSpot?style=for-the-badge&logo=github)](https://github.com/nabz0r/SkanusSpot/stargazers)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)](#)
[![Tailwind](https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](#)

Discover authentic dining spots across the Baltics with trusted Halal ☪️, Kosher ✡️, Vegan 🌱 & Vegetarian 🥬 certifications.

Real-time bookings, seamless mobile ordering, and verified local establishments from Vilnius to Tallinn.

## 🌟 Specs

### 🔐 Authentication (#7) ✅
- JWT Login/Registration
- OAuth Google
- User Profiles
- Role Management

### 🔍 Advanced Search (#9) ✅
- Full-text Search
- Multi-criteria Filters
- Géolocalisation
- Autocomplete

### 📱 Booking & Orders (#10) ✅
- Table Reservations
- Online Ordering
- Delivery Tracking
- Integrated Payment

### 🥗 Dietary Options
- Halal ☪️
- Casher ✡️
- Végan 🌱
- Végétarien 🥬

## 📙 Important Links
- 📈 [Business Model](docs/BUSINESS_MODEL.md)
- 📝 [Documentation API](docs/API.md)
- 🛠️ [Guide Installation](docs/INSTALL.md)
- 📗 [Roadmap](ROADMAP.md)

## 🔧 Stack Technique

### Backend (implémenté)
```mermaid
mindmap
  root((Backend))
    Node.js + Express
      TypeScript
    MongoDB
      Mongoose
      Géospatial
    Auth
      JWT
      OAuth
```

### Frontend (à venir)
```mermaid
mindmap
  root((Frontend))
    React 18
      TypeScript
    Redux Toolkit
    TailwindCSS
```

## 📊 Database Schema

### Collections
```mermaid
erDiagram
    Users ||--o{ Restaurants : own
    Users ||--o{ Bookings : make
    Restaurants ||--o{ MenuItems : have
    Restaurants ||--o{ Orders : receive
```

## 📝 Todo
- [x] Auth JWT + OAuth (✅ Issue #7)
- [x] Recherche avancée (✅ Issue #9)
- [x] Réservation en ligne (✅ Issue #10)
- [x] Support Végan/Végétarien
- [ ] Frontend React
- [ ] PWA Integration
- [ ] Analytics

## 🤝 Contribution

We welcome :
- 💻 Network Engineers
- 👀 Research Scientists  
- 🌎 Cloud Architects
- 🤖 AI/ML Specialists

## 📱 Contact

- 📧 Email: nabz0r@gmail.com
- 🐙 GitHub: [@nabz0r](https://github.com/nabz0r)

## 📄 Licence

MIT License - Innovation without Boundaries

---

<div align="center">

**🚀 Made with 🇫🇷 ❤️ in Zvejotgala, Lithuania**

</div>
