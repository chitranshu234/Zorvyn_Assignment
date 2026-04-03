# FinDash — Finance Dashboard

A modern, interactive finance dashboard built with **React.js** and **Tailwind CSS v3**. Track income, expenses, and financial insights with a beautiful, responsive UI.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3-06B6D4?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)

---

## Setup Instructions

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd zorvyn

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

---

## Approach Overview

The dashboard was designed with a **component-driven architecture** using React.js. The goal was to create a clean, intuitive interface that presents financial data clearly while maintaining modularity and scalability.

**Key design decisions:**
- **React Context + useReducer** for state management — lightweight yet powerful, avoids over-engineering with external libraries for this scale
- **Component-based structure** — each feature area has its own folder with focused, reusable components
- **Pastel light theme** as default with dark mode support — inspired by modern fintech dashboard aesthetics
- **Recharts** for data visualization — lightweight, React-native charting with smooth animations
- **Mock data** with 55+ realistic transactions spanning 6 months — provides meaningful chart data and realistic patterns

---

## Requirement-to-Feature Mapping

### 1. Dashboard Overview (Core Requirement)

| Requirement | Implementation | Location |
|---|---|---|
| Summary cards (Total Balance, Income, Expenses) | Total Balance card with animated counter showing balance calculated from all transactions. Income/Expenses visible in charts and insights. Savings Rate derived from both. | `src/components/dashboard/SummaryCards.jsx` |
| Time-based visualization | **Expenses Area Chart** — shows Income vs Expenses trend over 6 months with interactive tooltips, gradient fills, and date-based X-axis | `src/components/dashboard/BalanceTrend.jsx` |
| Categorical visualization | **Spending Bar Chart** — monthly spending breakdown with highlighted highest month. **Top Categories bar chart** on Insights page shows category-wise expense distribution | `src/components/dashboard/SpendingBreakdown.jsx`, `src/components/insights/TopCategories.jsx` |

**Additional dashboard widgets:**
- **My Cards** — visual credit card display with add-card functionality
- **Recent Transactions** — quick list of 5 latest transactions with smart date formatting (Today, Yesterday, etc.)
- **Financial Health Gauge** — SVG-based gauge meter showing financial health score derived from savings rate
- **Info Card** — financial tips card for user engagement

---

### 2. Transactions Section (Core Requirement)

| Requirement | Implementation | Location |
|---|---|---|
| Transaction list with Date, Amount, Category, Type | Full transaction table displaying all 4 fields plus Description. Each row shows formatted date, color-coded amount (green for income, dark for expense), category badge with unique color, and type badge with icon | `src/components/transactions/TransactionList.jsx` |
| Simple filtering | Filter by **Category** (15 categories dropdown), **Type** (Income/Expense), and **Date range** (from/to date pickers) | `src/components/transactions/TransactionFilters.jsx` |
| Sorting or search | **Search** — real-time text search across description and category fields. **Sorting** — by Date (newest/oldest), Amount (highest/lowest), Category (A-Z) via dropdown | `src/components/transactions/TransactionFilters.jsx` |

**Additional transaction features:**
- **Add Transaction** — modal form with validation (Admin only)
- **Edit Transaction** — pre-filled modal for editing existing transactions (Admin only)
- **Delete Transaction** — double-click-to-confirm deletion pattern (Admin only)
- **CSV Export** — download filtered transactions as a CSV file
- **Empty State** — graceful message when no transactions match filters
- **Transaction Count** — footer showing number of visible transactions
- **Reset Filters** — one-click filter reset button

---

### 3. Role-Based UI (Core Requirement)

| Requirement | Implementation | Location |
|---|---|---|
| Viewer role — can only see data | When role is "Viewer": Add Transaction button is hidden, Edit/Delete action buttons are hidden on each row, all data remains fully visible and readable | `src/pages/Transactions.jsx`, `src/components/transactions/TransactionList.jsx` |
| Admin role — can add or edit | When role is "Admin": Add Transaction button appears, Edit and Delete icons appear on hover for each row, full CRUD operations enabled | Same files |
| Role switching via dropdown | Dropdown in the **Header** with Shield/Eye icons indicating current role. Role persists across page navigation and browser sessions (localStorage) | `src/components/layout/Header.jsx` |

**RBAC Feature Matrix:**

| Feature | Viewer | Admin |
|---|---|---|
| View dashboard, charts, insights | Yes | Yes |
| View all transactions | Yes | Yes |
| Search, filter, sort | Yes | Yes |
| Export CSV | Yes | Yes |
| Add new transaction | No | Yes |
| Edit existing transaction | No | Yes |
| Delete transaction | No | Yes |
| Switch roles | Yes | Yes |

---

### 4. Insights Section (Core Requirement)

| Requirement | Implementation | Location |
|---|---|---|
| Highest spending category | Insight card showing the category with the highest total expense amount | `src/components/insights/InsightCards.jsx` |
| Monthly comparison | **Grouped bar chart** comparing Income vs Expenses side-by-side for each month | `src/components/insights/MonthlyComparison.jsx` |
| Useful observations | 6 insight cards total: Highest Spending Category, Lowest Spending Category, Monthly Expense Change (% vs previous month), Savings Rate (% of income saved), Average Daily Spending, Income/Expense Ratio (financial health indicator) | `src/components/insights/InsightCards.jsx` |

**Additional insights:**
- **Top Spending Categories** — horizontal bar chart ranking the top 8 expense categories with category-specific colors

---

### 5. State Management (Core Requirement)

| Requirement | Implementation | Location |
|---|---|---|
| Transactions data | Managed via `useReducer` with actions: `ADD_TRANSACTION`, `UPDATE_TRANSACTION`, `DELETE_TRANSACTION`. Initial data loaded from localStorage or mock data | `src/context/AppContext.jsx` |
| Filters | Filter state (search, category, type, sortBy, sortOrder, dateFrom, dateTo) managed in the same reducer. `getFilteredTransactions()` computes derived filtered list using `useCallback` | `src/context/AppContext.jsx` |
| Selected role | `role` state with `SET_ROLE` action. Exposed as `isAdmin` boolean for components | `src/context/AppContext.jsx` |

**State architecture:**
```
AppContext (React Context + useReducer)
├── transactions[]     — Full transaction list (CRUD via dispatch)
├── role               — "admin" | "viewer"
├── darkMode           — boolean (toggle)
├── sidebarOpen        — boolean (toggle)
├── filters            — { search, category, type, sortBy, sortOrder, dateFrom, dateTo }
├── filteredTransactions — Computed (memoized with useCallback)
└── isAdmin            — Computed boolean
```

---

### 6. UI and UX Expectations (Core Requirement)

| Requirement | Implementation |
|---|---|
| Clean and readable design | Pastel color palette, Inter font (Google Fonts), consistent 4px spacing scale, clear visual hierarchy, white cards on soft blue background |
| Responsive design | Mobile-first approach. Sidebar collapses to hamburger menu on mobile. Dashboard grid stacks vertically. Transaction table adapts for mobile. All tested for mobile/tablet/desktop breakpoints |
| Handles empty/no data cases | `EmptyState` component displayed when no transactions match filters. Shows icon, title, and description with suggested action |

---

## Optional Enhancements Implemented

| Enhancement | Implementation | Location |
|---|---|---|
| Dark mode | Full dark mode with toggle in header. All components, charts, cards, and backgrounds adapt. Preference saved to localStorage | `src/context/AppContext.jsx`, all components |
| Data persistence (localStorage) | Transactions, role, and dark mode preference saved to `localStorage` on every change. Loaded on app start | `src/context/AppContext.jsx` |
| Animations and transitions | Staggered card entrance animations (slide-up with delay), animated number counters on balance, hover effects on cards/buttons, smooth page transitions, gauge needle animation | `tailwind.config.js`, `src/index.css`, `SummaryCards.jsx` |
| Export functionality (CSV) | Export button on Transactions page. Exports currently filtered transactions as CSV with headers (Date, Description, Category, Type, Amount) | `src/pages/Transactions.jsx` |
| Advanced filtering | Combined filtering by: text search + category dropdown + type dropdown + date range (from/to) + sort order. All filters work simultaneously. One-click reset | `TransactionFilters.jsx`, `AppContext.jsx` |

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI component framework |
| Tailwind CSS v3 | Utility-first CSS styling |
| Vite 8 | Build tool and dev server |
| Recharts | Charting library (area, bar, pie charts) |
| React Router DOM | Client-side routing (Dashboard, Transactions, Insights pages) |
| Lucide React | SVG icon library |

---

## Project Structure

```
src/
├── components/
│   ├── dashboard/           — Dashboard page widgets
│   │   ├── SummaryCards.jsx       — Total Balance card with animated counter
│   │   ├── SpendingBreakdown.jsx  — Monthly spending bar chart
│   │   ├── BalanceTrend.jsx       — Income vs Expenses area chart
│   │   ├── RecentTransactions.jsx — Latest 5 transactions list
│   │   ├── MyCards.jsx            — Credit card display
│   │   ├── FinancialHealth.jsx    — SVG gauge meter
│   │   └── InfoCard.jsx           — Financial tips card
│   ├── transactions/        — Transaction management
│   │   ├── TransactionList.jsx    — Full transaction table with RBAC
│   │   ├── TransactionFilters.jsx — Search, filter, sort controls
│   │   └── AddTransactionModal.jsx— Add/Edit transaction form modal
│   ├── insights/            — Analytics and insights
│   │   ├── InsightCards.jsx       — 6 smart insight metric cards
│   │   ├── TopCategories.jsx      — Category spending bar chart
│   │   └── MonthlyComparison.jsx  — Income vs Expense grouped bars
│   ├── layout/              — App shell
│   │   ├── Sidebar.jsx            — Collapsible sidebar navigation
│   │   ├── Header.jsx             — Top bar with role switch, dark mode
│   │   └── Layout.jsx             — Main layout wrapper
│   └── ui/                  — Reusable UI primitives
│       ├── Card.jsx               — Base card component
│       ├── Badge.jsx              — Category/type badges
│       ├── Button.jsx             — Button with variants
│       ├── Modal.jsx              — Overlay modal
│       └── EmptyState.jsx         — No-data placeholder
├── pages/
│   ├── Dashboard.jsx        — Dashboard page (grid layout)
│   ├── Transactions.jsx     — Transactions page (table + filters)
│   └── Insights.jsx         — Insights page (charts + cards)
├── context/
│   └── AppContext.jsx        — Global state (Context + useReducer)
├── data/
│   └── mockData.js          — 55+ mock transactions + helper functions
├── App.jsx                  — Router setup
├── main.jsx                 — Entry point
└── index.css                — Tailwind directives + custom styles
```

---

## Responsive Breakpoints

| Breakpoint | Behavior |
|---|---|
| Mobile (< 768px) | Single column layout, sidebar as slide-out drawer, stacked cards, compact transaction rows |
| Tablet (768–1024px) | 2-column grid, visible sidebar, side-by-side charts |
| Desktop (> 1024px) | Full 3-column dashboard grid, expanded sidebar, all widgets visible |

---

## Mock Data

The app includes **55+ realistic transactions** spanning November 2025 to April 2026 across **15 categories**:

**Expense categories:** Food & Dining, Shopping, Transport, Entertainment, Bills & Utilities, Healthcare, Education, Rent, Groceries, Subscriptions, Travel, Gifts

**Income categories:** Salary, Freelance, Investments

Each transaction includes: unique ID, date, description, amount, category, and type (income/expense).

---

## Security & Data Validation

Even though this is a frontend-only demo, the app follows secure coding practices:

| Measure | Details |
|---|---|
| Input sanitization | User input is stripped of `<`, `>`, `{`, `}` characters before being stored, preventing potential XSS in rendered content |
| CSV injection protection | Exported CSV fields starting with `=`, `+`, `-`, `@` are prefixed with a single quote to prevent formula injection when opened in Excel/Sheets |
| Transaction validation | Every transaction is validated (`isValidTransaction()`) before being accepted by the reducer — checks types, required fields, and amount >= 0 |
| Role whitelisting | Only `['admin', 'viewer']` values are accepted via `VALID_ROLES` constant. Invalid role values are silently rejected |
| localStorage validation | Saved data is fully shape-validated before loading. Corrupt or tampered data falls back to defaults gracefully |
| Input constraints | Description: max 100 characters. Amount: max $999,999.99. Date: cannot be set in the future. Category: must match predefined category list |
| Unique ID generation | New transactions use `txn_{timestamp}_{random}` pattern to avoid ID collisions |

---

## Accessibility

| Feature | Implementation |
|---|---|
| ARIA labels | All icon-only buttons have descriptive `aria-label` attributes (sidebar toggle, close, theme switch, notifications) |
| Dialog semantics | Modal uses `role="dialog"` and `aria-modal="true"` for proper screen reader announcement |
| Navigation landmark | Sidebar uses `role="navigation"` with `aria-label="Main navigation"` |
| Decorative overlays | Backdrop overlays are marked `aria-hidden="true"` so screen readers skip them |
| Semantic HTML | Proper `<header>`, `<aside>`, `<nav>`, `<main>`, `<form>`, `<label>` elements used throughout |
| Keyboard support | All interactive elements are focusable. Form inputs have associated labels. Buttons use proper `type` attributes |

---

## Notes

- All data is **mock/static** — no backend required
- Role switching is instant and persisted across sessions
- The Financial Health gauge score is dynamically calculated from the savings rate
- Dark mode preference persists across browser sessions via localStorage
- CSV export respects the currently active filters (exports only visible transactions)
- Input validation runs on both the form level and the reducer level (defense in depth)

