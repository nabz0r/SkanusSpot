# ✨ SkanusSpot 
### Experience Baltic Dining, Authentically

[![Stars](https://img.shields.io/github/stars/nabz0r/SkanusSpot?label=Baltic%20Love&style=social)](https://github.com/nabz0r/SkanusSpot/stargazers)
[![TypeScript](https://img.shields.io/badge/Crafted_with-TypeScript-007ACC)](#)
[![React](https://img.shields.io/badge/Powered_by-React-61DAFB)](#)
[![PWA](https://img.shields.io/badge/Available_on-Mobile-5A0FC8)](#)

> 🌍 **Baltic's First Certified Food Platform**

Find and book authentic dining spots across the Baltics - from traditional Halal ☪️ and Kosher ✡️ to modern Vegan 🌱 and Vegetarian 🥬 cuisines.

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-nabz0r-yellow?style=for-the-badge&logo=buymeacoffee&logoColor=white)](https://buymeacoffee.com/nabz0r)

**Features in Your Language:**
- 🇱🇹 Lithuanian | 🇱🇻 Latvian | 🇪🇪 Estonian | 🇬🇧 English | 🇫🇷 French

**SkanusSpot Vs ( HappyCow Vs Uber Vs Wolt )**

- SkanusSpot: Baltic Specialist with Local Certifications
- SkanusSpot: Verified Certifications (Official Halal/Kosher)

  Vs
  
- Others: Global, General
- Others: Self-declared

SkanusSpot Unique Features

- Multi-alphabet interface (Latin/Cyrillic)
- QR code translated menus
- Crypto/local payment
- Baltic student discounts

SkanusSpot Local Integration

- University partnerships
- Cultural events
- Local community support

  
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
