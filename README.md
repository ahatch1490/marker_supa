# 🪚 Maker Woodworking Project Showcase

A Vue.js 3 application for woodworking makers to showcase their projects with authentication, image uploads, and search functionality.

## 🚀 Features

- **Project Management**: Create, edit, delete woodworking projects
- **Image Upload**: Multi-image upload with automatic EXIF metadata removal
- **Search & Filter**: Search projects by title and tags
- **Authentication**: Secure login/signup with Supabase Auth
- **Project Spotlight**: Random featured project on homepage
- **Responsive Design**: Tailwind CSS for mobile-first design
- **Privacy Controls**: Publish/unpublish projects for public visibility

## 🛠 Tech Stack

- **Frontend**: Vue.js 3 with TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Build Tool**: Vite
- **State Management**: Pinia
- **Routing**: Vue Router

## 📋 Prerequisites

- Node.js 18+ (project uses v18.20.5)
- A Supabase account and project

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

Update `.env.local` with your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 3. Supabase Database Setup

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Run the SQL script from `supabase-schema.sql` to create tables and set up Row Level Security policies

### 4. Storage Bucket Setup

The SQL script will create a `project-images` storage bucket. Ensure it's configured correctly:

1. Go to Storage in your Supabase dashboard
2. Verify the `project-images` bucket exists and is public
3. Check that the RLS policies are applied

### 5. Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to see the application.

## 🏗 Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable Vue components
│   ├── ProjectCard.vue     # Project display card
│   ├── ProjectForm.vue     # Create/edit project form
│   ├── ProjectSpotlight.vue # Featured project component
│   ├── SearchBar.vue       # Search functionality
│   └── TagInput.vue        # Tag management component
├── lib/                 # Utility libraries
│   ├── supabase.ts         # Supabase client configuration
│   └── imageUtils.ts       # Image processing utilities
├── views/               # Page components
│   ├── HomeView.vue        # Homepage with project listing
│   ├── DashboardView.vue   # User project management
│   ├── LoginView.vue       # Authentication
│   └── ProjectDetailView.vue # Individual project view
├── router/              # Vue Router configuration
└── assets/              # Static assets and styles
```

## 🔒 Security Features

- **Row Level Security**: Projects are protected by RLS policies
- **EXIF Stripping**: Location metadata removed from uploaded images
- **Authentication Guards**: Protected routes require login
- **User Isolation**: Users can only manage their own projects

## 🎨 Key Components

### ProjectForm
Handles project creation/editing with:
- Multi-image upload with preview
- EXIF metadata removal
- Tag management
- Publish/draft controls

### SearchBar
Real-time search functionality:
- Searches project titles and tags
- Case-insensitive matching
- Instant results

### ProjectSpotlight
Featured project display:
- Randomly selects from published projects
- Gradient background design
- Quick access to full project view

## 🗄 Database Schema

### Projects Table
| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Foreign key to auth.users |
| title | TEXT | Project title |
| description | TEXT | Project description |
| difficulty | ENUM | Easy, Medium, Hard |
| images | JSONB | Array of image URLs |
| tags | TEXT[] | User-defined tags |
| published | BOOLEAN | Public visibility |
| created_at | TIMESTAMP | Creation time |
| updated_at | TIMESTAMP | Last update time |

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run format` - Format code with Prettier
- `npm run lint` - Lint code with ESLint
- `npm run type-check` - TypeScript type checking
