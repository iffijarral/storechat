StoreChat Dashboard
The Intelligent Command Center for WooCommerce Autopilot.

StoreChat Dashboard is a high-performance Next.js 15 application designed to give store owners real-time insights and AI-powered customer engagement tools. Built with a focus on speed, type-safety, and a premium user experience.

🛠 Tech Stack
Framework: Next.js 15 (App Router)

Language: TypeScript

Styling: Tailwind CSS

UI Components: Radix UI + Shadcn UI

State Management: Zustand (Client State) & TanStack Query v5 (Server State)

Forms: React Hook Form + Zod

Icons: Lucide React

Charts: Recharts

🏗 Key Features
Unified Auth Flow: Secure registration and login with JWT persistence.

Adaptive Layout: Responsive Sidebar and Topbar navigation with mobile support.

Route Grouping: Organized internal architecture using (auth) and (dashboard) groups.

Real-time Analytics: Visualized store performance and AI chat interactions.

Decoupled Architecture: Built to connect seamlessly with the StoreChat FastAPI backend via environment variables.

🚦 Getting Started
1. Prerequisites
Ensure you have Node.js 20+ and pnpm (recommended) or npm installed.

2. Installation
Bash
# Clone the repository
git clone https://github.com/iffijarral/storechat.git

# Navigate to the folder
cd storechat

# Install dependencies
pnpm install
3. Environment Variables
Create a .env.local file in the root directory:

Code snippet
NEXT_PUBLIC_API_URL
NEXT_PUBLIC_SKIP_AUTH=false
4. Development
Bash
pnpm dev
Open http://localhost:3000 to view the application.

📂 Project Structure
Plaintext
src/
├── app/                  # Next.js App Router (File-based routing)
│   ├── (auth)/           # Authentication pages (Login/Register)
│   ├── (dashboard)/      # Protected internal pages
│   └── layout.tsx        # Root HTML wrapper
├── components/           # UI Components
│   ├── dashboard/        # Dashboard-specific blocks (Sidebar, Charts)
│   └── ui/               # Reusable Shadcn base components
├── hooks/                # Custom React hooks (useAuth, etc.)
├── services/             # API client (Axios configuration)
├── store/                # Zustand global state stores
└── types/                # TypeScript interfaces & Zod schemas
