# 📊 Product Dashboard

A modern, responsive product dashboard built with **React Router v7**, **TanStack Query**, **shadcn/ui**, and **TailwindCSS**.

The application fetches and displays product data from the [DummyJSON API](https://dummyjson.com/) with realistic loading states (200-1200ms delay) to simulate real-world network conditions.

## 🚀 Live Demo

**[View Live Application](https://product-dashboard-coral.vercel.app/)**

## ✨ Features

- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- ⚡ **Fast Loading** - Optimized with React Router v7 and TanStack Query
- 🎨 **Modern UI** - Built with shadcn/ui components and TailwindCSS
- 🔄 **Smart Caching** - Efficient data fetching and caching with TanStack Query
- 💀 **Loading States** - Skeleton loaders for better UX
- ❌ **Error Handling** - Graceful error states and user feedback
- 🐳 **Docker Ready** - Containerized for easy deployment

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 + React Router v7
- **Styling**: TailwindCSS v4 + shadcn/ui
- **State Management**: TanStack Query v5
- **Language**: TypeScript
- **Build Tool**: Vite
- **Linting**: ESLint + Prettier
- **Icons**: Lucide React

## 📁 Project Structure

```
├── app/
│ ├── api/ # API layer
│ │   ├── api.types.ts # Generic API types
│ │   ├── products.ts # Product API calls
│ │   └── products.types.ts # Product-specific types
│ ├── components/ # React components
│ │   ├── ui/ # shadcn/ui core components
│ │   └── custom/ # Custom application components
│ │       ├── ErrorMessage.tsx # Error display component
│ │       ├── TableSkeleton.tsx # Loading skeleton
│ │       ├── AppSidebar.tsx # Sidebar and header
│ │       ├── SearchBar.tsx # Searching components
│ │       └── Products # Products related components
│ │           ├── Table.tsx # Product data table
│ │           └── List.tsx # Product data virtualized list
│ ├── hooks/ # Custom React hooks
│ │   ├── useListProducts.ts # Product fetching hook
│ │   ├── useFilter.tsx # Filtering context
│ │   └── use-mobile.ts # Shadcn hook to check screen size
│ ├── lib/ # Utility functions
│ │   └── utils.ts # shadcn/ui utilities
│ └── home/ # Pages
│     └── home.tsx # Main dashboard page
├── public/ # Static assets
├── Dockerfile # Docker configuration
└── package.json # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/allbdev/product_dashboard.git
   cd product-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

### Development

Start the development server with hot module replacement:

```bash
npm run dev
```

Your application will be available at **http://localhost:5173**

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Create production build
npm run start        # Start production server
npm run typecheck    # Run TypeScript type checking
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues automatically
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

## 🏗️ Building for Production

Create an optimized production build:

```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.

## 🐳 Docker Deployment

### Build and Run with Docker

```bash
# Build the Docker image
docker build -t product-dashboard .

# Run the container
docker run -p 3000:3000 product-dashboard
```

### Supported Deployment Platforms

The containerized application can be deployed to:

- **☁️ Cloud Platforms**
  - AWS ECS
  - Google Cloud Run
  - Azure Container Apps
- **🚀 Platform-as-a-Service**
  - Vercel
  - Netlify
  - Railway
  - Fly.io
- **🌊 Container Platforms**
  - Digital Ocean App Platform
  - Heroku Container Registry

---

**Built with ❤️ using modern React ecosystem**
