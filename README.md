# ⚡ LexiFlow — Minimalist & High-Performance Language Learning App

**LexiFlow** is an Awwwards-inspired, ultra-sleek, minimalist language learning web application designed with a **"Lazy Student" UX Philosophy**.

---

## 🚀 Tech Stack

### **Backend**
* **Framework:** .NET 8 / 9 Web API
* **Database:** Entity Framework Core with SQLite (`lexiflow.db`)
* **Features:** RESTful Endpoints, Automatic Db Seeding (5 Languages x CEFR Levels), CORS Policy, Swagger API Documentation.

### **Frontend**
* **Framework:** React 18 + Vite
* **Styling:** Tailwind CSS + Glassmorphism + Custom CSS 3D Transforms
* **Animations:** Fluid 3D Flashcard Flip & Micro-interactions
* **Audio:** Web Speech API (`speechSynthesis`) for real-time native pronunciation
* **Icons:** Lucide React

---

## 🌟 Key Features & UX Flow ("Tembel Öğrenci" Mode)

1. **Direct Stream Flow:** Language Selection -> Level Selection -> Immediate Flashcard Deck. No complex menus or clutter.
2. **5 Supported Languages:** English (`en`), German (`de`), French (`fr`), Spanish (`es`), Portuguese (`pt`).
3. **CEFR Levels:** A1, A2, B1, B2 flexible entity structure supporting 600+ words/level.
4. **Interactive 3D Flashcard:**
   * **Front:** Target Word, Phonetics, Audio Pronunciation Trigger button.
   * **Back:** Meaning/Translation (Turkish), Example Sentence with Translation.
5. **Fluid Action Controls:**
   * **Tekrar Et (Review):** Re-queues the current word at the end of the active deck.
   * **Öğrendim (Learned):** Marks word as learned and updates API state & progress bar.

---

## 🛠️ How to Run the Project

### **1. Backend (.NET Web API)**
```bash
cd LexiFlow.Api
dotnet restore
dotnet run
```
* API runs at: `http://localhost:5000` or `https://localhost:5001`
* Swagger UI: `http://localhost:5000/swagger`

### **2. Frontend (React + Vite)**
```bash
cd LexiFlow.Client
npm install
npm run dev
```
* Client app opens at: `http://localhost:3000`

---

## 📂 Project Architecture

```
LexiFlow/
├── LexiFlow.Api/               # .NET 8/9 Web API
│   ├── Controllers/            # WordsController.cs
│   ├── Data/                   # AppDbContext.cs, DbInitializer.cs
│   ├── Dtos/                   # WordDto.cs
│   ├── Models/                 # Word.cs
│   └── Program.cs              # API Setup & Middleware
└── LexiFlow.Client/            # React 18 Frontend
    ├── src/
    │   ├── components/         # Flashcard.jsx, Header.jsx, LanguageSelector.jsx, LevelSelector.jsx, ProgressBar.jsx
    │   ├── services/           # api.js
    │   ├── App.jsx             # Main Application Logic
    │   └── index.css           # Glassmorphism & 3D CSS Utilities
    ├── index.html
    └── tailwind.config.js
```
