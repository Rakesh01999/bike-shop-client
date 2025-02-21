# 🏍️ Bike Shop - AutoVerse

## 🚀 Overview
AutoVerse is a **full-stack bike shop application** built with the **MERN Stack**. It offers a seamless experience for **browsing, purchasing, and managing bikes online** with secure payments via **Shurjopay**.

## 🌐 Live Demo
[Visit Bike Shop](https://bike-shop-client-ruby.vercel.app/)


## ⚙️ Server-Side Repo:
[bike-shop-server](https://github.com/Rakesh01999/bike-shop-server)


## 🔥 Tech Stack
### **Frontend:**
- React.js
- TypeScript
- Redux Toolkit
- Tailwind CSS
- Ant Design
- Authentication

### **Backend:**
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- Shurjopay Payment Gateway

## 📂 Folder Structure

### **Frontend (`/frontend` Directory)**
```
frontend/
│── src/
│   ├── assets/        # Images, icons, logos
│   ├── components/    # Reusable UI components
│   ├── pages/         # Page components
│   ├── redux/         # Redux store & slices
│   ├── utils/         # Helper functions
│   ├── App.tsx        # Main app entry
│   ├── index.tsx      # Root file
│   ├── routes.tsx     # Routing configuration
│   ├── .env.example   # Example environment variables
│── public/
│── package.json       # Frontend dependencies
│── README.md
```

## 🛠 Installation Guide
### 📌 Prerequisites
- Node.js installed
- MongoDB Atlas or Local MongoDB
- Create `.env` files in `backend/` and `frontend/`

### 🚀 Backend Setup
```sh
cd backend
npm install
npm start
```

### 🚀 Frontend Setup
```sh
cd frontend
npm install
npm run dev
```

## 📖 API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/api/v1/bikes` | Fetch all bikes |
| POST | `/api/v1/orders` | Place an order |
| POST | `/api/v1/auth/register` | User registration |

## 🚀 Deployment Guide
### **Frontend Deployment (Vercel)**
1. Install Vercel CLI: `npm install -g vercel`
2. Run `vercel` and follow setup prompts
3. Deploy using `vercel --prod`

### **Backend Deployment (Render/Heroku)**
1. Push code to GitHub
2. Connect Render/Heroku with GitHub repo
3. Set up environment variables
4. Deploy & monitor logs

## 🛠 Contributing
We welcome contributions! Check [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## 📜 License
MIT License - see the [LICENSE](LICENSE) file for details.



# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
