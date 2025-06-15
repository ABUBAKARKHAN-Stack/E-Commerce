## 📁 Front-end Folder Structure

```
frontend/
├── public/ # Static files (favicon, manifest, robots.txt)
│
├── node_modules/ # Installed dependencies
├── .env # Environment variables
├── .gitignore # Git ignored files list
├── index.html # HTML template
├── package.json # Project metadata & dependencies
├── tsconfig.json # TypeScript config
├── vite.config.ts # Vite config
│
├── README.md # Project documentation
│
└── src/ # Main application source
├── API/ # Axios client + API calls
│ ├── admin/
│ ├── user/
│ └── index.ts
│
├── assets/ # Images, icons, logos
│ ├── images/
│ ├── logos/
│ └── icons/
│
├── components/ # All UI and logic components
│ ├── layout/ # Layouts
│ │ ├── admin/
│ │ ├── user/
│ │ └── shared/
│ ├── main/ # Core page-level logic
│ │ ├── admin/
│ │ ├── user/
│ │ └── shared/
│ ├── reusable/ # Forms, buttons used in 2+ places
│ ├── sections/ # UI sections (hero, dashboards)
│ │ ├── admin/
│ │ ├── user/
│ │ └── shared/
│ └── ui/ # Shadcn/ui components (e.g. Button, Card)
│
├── constances/ # App constants (roles, status, tabs)
│ └── index.ts
│
├── context/ # Global providers (Theme, Auth)
│ └── AuthContext.tsx
│
├── hooks/ # Custom React hooks
│ ├── useAuth.ts
│ ├── useTheme.ts
│ └── useForm.ts
│
├── lib/ # Third-party config/utils
│ ├── axiosInstance.ts
│ ├── toast.ts
│ └── validator.ts
│
├── pages/ # Route-based pages
│ ├── admin/
│ ├── user/
│ └── shared/
│
├── schemas/ # Zod/Yup validation schemas
│ ├── signUpSchema.ts
│ └── productSchema.ts
│
├── types/ # Global types/interfaces
│ ├── user.d.ts
│ ├── product.d.ts
│ └── index.d.ts
│
├── utils/ # Helper functions
│ ├── formatDate.ts
│ ├── isEmail.ts
│ └── index.ts
│
├── index.css # Global styles
├── main.tsx # App entry point
└── vite-env.d.ts # Vite + TypeScript env types