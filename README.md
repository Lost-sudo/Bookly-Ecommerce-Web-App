# 📚 Bookly - Modern Bookstore Platform

A full-stack e-commerce bookstore application built with React and Django. Features a modern UI with dark theme, responsive design, and smooth animations.

![Bookly Logo](/images/bookly-logo.svg)

## 🔧 Tech Stack

### Frontend
- React 19.x
- Bootstrap 5.3
- React Bootstrap
- Framer Motion (animations)
- Axios (API client)
- React Icons
- JWT Authentication

### Backend
- Python 3.x
- Django 5.x
- Django REST Framework
- SQLite Database
- JWT Authentication

## 🏗️ Project Structure

```
bookstore/
├── client/                  # Frontend React application
│   ├── public/             # Static assets
│   │   ├── css/           # Component styles
│   │   └── images/        # Image assets
│   └── src/
│       ├── components/    # Reusable React components
│       ├── pages/        # Page components
│       ├── context/      # React context providers
│       ├── api/          # API service functions
│       └── App.jsx       # Root component
│
└── server/                 # Backend Django application
    └── ecommerce/
        ├── accounts/      # User authentication
        ├── products/      # Book and category models
        ├── cart/          # Shopping cart functionality
        └── orders/        # Order processing
```

## ✨ Key Features

### Frontend
- 🌙 Dark theme with glass morphism effects
- 📱 Fully responsive design
- 🔄 Smooth animations and transitions
- 🛒 Dynamic shopping cart
- 📚 Book details with cover images
- 🏷️ Genre and category filtering
- 🔍 Search functionality
- 🔐 JWT authentication

### Backend
- 👤 Custom user model
- 📚 Book management system
- 🛒 Cart and order processing
- 🔑 JWT authentication
- 🎯 Genre and category organization

## 🚀 Getting Started

### Frontend Setup
1. Navigate to client directory:
```bash
cd client/bookstore
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

### Backend Setup
1. Navigate to server directory:
```bash
cd server/ecommerce
```

2. Create virtual environment:
```bash
python -m venv env
source env/bin/activate  # Linux/Mac
# or
env\Scripts\activate  # Windows
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Apply migrations:
```bash
python manage.py migrate
```

5. Run development server:
```bash
python manage.py runserver
```

## 📱 Screenshots

[Add screenshots of key features here]

## 🛣️ Roadmap

- [ ] Payment gateway integration
- [ ] User reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced search filters
- [ ] Social sharing features
- [ ] Admin dashboard

## 👥 Contributors

- [Your Name] - Full Stack Developer

## 📄 License

This project is licensed under the MIT License.

---

> 🚧 Project Status: In active development