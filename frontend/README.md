# sv

Proyecto para llevar las finanzas personales hecho con Svlete

Estructura

```
src/
├── domains/
│   ├── auth/                  # Authentication domain
│   │   ├── api/               # Auth-related API calls
│   │   ├── components/        # Auth-related UI components
│   │   ├── stores/            # Auth-related stores
│   │   └── types/             # Auth-related types/interfaces
│   ├── accounts/              # Accounts domain
│   │   ├── api/               # Account-related API calls
│   │   ├── components/        # Account-related UI components
│   │   ├── stores/            # Account-related stores
│   │   └── types/             # Account-related types/interfaces
│   ├── transactions/          # Transactions domain
│   │   ├── api/               # Transaction-related API calls
│   │   ├── components/        # Transaction-related UI components
│   │   ├── stores/            # Transaction-related stores
│   │   └── types/             # Transaction-related types/interfaces
│   ├── categories/            # Categories domain
│   │   ├── api/               # Category-related API calls
│   │   ├── components/        # Category-related UI components
│   │   ├── stores/            # Category-related stores
│   │   └── types/             # Category-related types/interfaces
│   ├── budgets/               # Budgets domain
│   │   ├── api/               # Budget-related API calls
│   │   ├── components/        # Budget-related UI components
│   │   ├── stores/            # Budget-related stores
│   │   └── types/             # Budget-related types/interfaces
│   └── goals/                 # Goals domain
│       ├── api/               # Goal-related API calls
│       ├── components/        # Goal-related UI components
│       ├── stores/            # Goal-related stores
│       └── types/             # Goal-related types/interfaces
├── lib/
│   ├── shared/                # Shared utilities and components
│   │   ├── api/               # Shared API utilities
│   │   ├── components/        # Shared UI components
│   │   ├── stores/            # Shared stores
│   │   └── utils/             # Shared utility functions
│   └── types/                 # Global types/interfaces
├── routes/
│   ├── +layout.svelte         # Global layout
│   ├── +page.svelte           # Home page
│   ├── accounts/
│   │   ├── +page.svelte       # Accounts overview
│   │   └── [id]/              # Dynamic route for account details
│   │       └── +page.svelte
│   ├── transactions/
│   │   ├── +page.svelte       # Transactions overview
│   │   └── [id]/              # Dynamic route for transaction details
│   │       └── +page.svelte
│   ├── budgets/
│   │   └── +page.svelte       # Budgets overview
│   ├── goals/
│   │   └── +page.svelte       # Goals overview
│   ├── categories/
│   │   └── +page.svelte       # Categories management
│   └── auth/
│       ├── login/
│       │   └── +page.svelte   # Login page
│       └── register/
│           └── +page.svelte   # Registration page
├── app.html                   # Main HTML template
└── hooks.server.js            # Server hooks (e.g., authentication)
```
