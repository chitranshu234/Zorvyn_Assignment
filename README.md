# FinDash — Finance Dashboard

A clean, interactive finance dashboard built with **React 19**, **Tailwind CSS v3**, and **Vite**.

---

## Quick Start

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`

---

## Tech Stack

- **React 19** — UI framework
- **Tailwind CSS v3** — Styling
- **Vite** — Build tool
- **Recharts** — Charts (area, bar)
- **React Router** — Page routing
- **Lucide React** — Icons

---

## Features

### Dashboard
- Total Balance card with animated counter
- Monthly spending bar chart
- Income vs Expenses area chart
- Recent transactions list
- Credit card display
- Financial health gauge (SVG)

### Transactions
- Full table with date, amount, category, type
- Search across descriptions and categories
- Filter by category, type, and date range
- Sort by date, amount, or category
- Add / Edit / Delete (Admin only)
- CSV export with injection protection
- Empty state handling

### Insights
- 6 insight cards (highest/lowest spending, monthly change, savings rate, daily avg, income ratio)
- Top spending categories chart
- Monthly income vs expense comparison chart

### Role-Based UI (RBAC)
Switch between **Admin** and **Viewer** via the header dropdown:

| Action | Viewer | Admin |
|---|:---:|:---:|
| View all data, charts, insights | ✓ | ✓ |
| Search, filter, sort, export | ✓ | ✓ |
| Add / Edit / Delete transactions | ✗ | ✓ |

### State Management
All state managed via **React Context + useReducer**:
- Transactions (CRUD)
- Role selection
- Dark mode toggle
- Filter state
- Persisted to `localStorage`

### Optional Enhancements
- ✅ Dark mode (toggle in header, persisted)
- ✅ localStorage persistence
- ✅ Animations (staggered entrances, counters, hover effects)
- ✅ CSV export
- ✅ Advanced filtering (combined filters + reset)

---

## Security & Validation

- **Input sanitization** — strips `<>{}` from user input
- **CSV injection protection** — escapes fields starting with `= + - @`
- **Transaction validation** — every transaction validated before accepting
- **Role whitelisting** — only `admin` / `viewer` accepted
- **localStorage validation** — corrupt data falls back to defaults
- **Input limits** — description max 100 chars, amount max $999,999.99, no future dates
- **ID collision prevention** — `txn_{timestamp}_{random}` pattern

---

## Accessibility

- `aria-label` on all icon-only buttons
- `role="dialog"` + `aria-modal` on modals
- `role="navigation"` on sidebar
- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<form>`, `<label>`)
- `aria-hidden` on decorative overlays

---

## Project Structure

```
src/
├── components/
│   ├── dashboard/        — SummaryCards, SpendingBreakdown, BalanceTrend,
│   │                       RecentTransactions, MyCards, FinancialHealth, InfoCard
│   ├── transactions/     — TransactionList, TransactionFilters, AddTransactionModal
│   ├── insights/         — InsightCards, TopCategories, MonthlyComparison
│   ├── layout/           — Sidebar, Header, Layout
│   └── ui/               — Card, Badge, Button, Modal, EmptyState
├── pages/                — Dashboard, Transactions, Insights
├── context/              — AppContext (global state)
├── data/                 — mockData (55+ transactions, helper functions)
└── index.css             — Tailwind config + custom styles
```

---

## Mock Data

55+ transactions across **15 categories** spanning Nov 2025 – Apr 2026.

Responsive across mobile, tablet, and desktop breakpoints.
