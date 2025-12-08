# Hotel Management App - AI Coding Agent Instructions

## Project Overview
A React-based hotel management dashboard built with Vite, featuring cabin management, guest bookings, check-in/out operations, and analytics. The app uses Supabase as the backend database and file storage.

**Tech Stack:** React 18, React Router v6, React Query v4, styled-components, Supabase, react-hook-form, date-fns

## Architecture & Data Flow

### Layer Structure
- **Pages** (`src/pages/`): Route-level components (Dashboard, Bookings, Cabins, etc.)
- **Features** (`src/features/`): Feature-specific components organized by domain (cabins, bookings, authentication, dashboard)
- **UI** (`src/ui/`): Reusable styled components (Button, Form, Modal, Table, etc.)
- **Services** (`src/services/`): Supabase API calls (apiCabins.js, apiBookings.js, apiSettings.js)
- **Hooks** (`src/hooks/`): Custom React hooks (useLocalStorageState, useMoveBack)
- **Utils** (`src/utils/`): Helper functions for dates and formatting

### Data Management Pattern
1. **API Services**: Async functions in `src/services/api*.js` that call Supabase directly
2. **React Query**: All data fetching uses `useQuery` with cache invalidation on mutations
3. **Query Keys**: Stored as arrays in queryFn (e.g., `["cabins"]`, `["bookings"]`)
4. **Mutations**: Use `useMutation` with `onSuccess` hooks to invalidate related queries
5. **Toast Notifications**: Use `react-hot-toast` for user feedback (success/error messages)

**Example pattern** (see `src/features/cabins/CreateCabinForm.jsx`):
```jsx
const queryClient = useQueryClient();
const { mutate, isLoading } = useMutation({
  mutationFn: createEditCabin,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["cabins"] });
    toast.success("Cabin created successfully");
  },
  onError: (err) => toast.error(err.message),
});
```

## Critical Patterns

### Supabase Integration
- **Client setup**: `/src/services/supabase.js` exports a pre-configured client
- **Image uploads**: Cabins use Supabase Storage (`cabin-images` bucket); create cabin record first, then upload image, then delete record if upload fails
- **Queries with relations**: Use dot notation in select: `select("*, cabins(*), guests(*)"`
- **Error handling**: Always wrap API calls in try-catch; throw descriptive errors

### Form Handling (react-hook-form)
- Use `useForm` with optional `defaultValues` for edit forms
- Destructure: `{ register, handleSubmit, reset, getValues, formState }`
- Access validation errors via `formState.errors`
- File inputs: Access via `data.image[0]` (FileList first element)
- Reset form after submission: `reset()`

### Styled Components Convention
- Define size/variation objects as CSS templates before component: `sizes`, `variations`
- Apply via interpolation in styled elements
- Global CSS variables for colors: `var(--color-brand-600)`, `var(--color-grey-50)`, etc.
- Breakpoints and color scheme defined in `src/styles/GlobalStyles.js`

### Date Handling (date-fns)
- Supabase dates are ISO strings; parse with `parseISO(dateStr)`
- Helper functions in `src/utils/helpers.js`: `formatDistanceFromNow()`, `getToday()`, `formatCurrency()`
- `getToday()` has special logic: `getToday()` for start of day, `getToday({end: true})` for end of day (needed for date range queries)

## Development Workflow

### Commands
- **Dev server**: `npm run dev` (Vite hot reload)
- **Build**: `npm run build` (production build)
- **Lint**: `npm lint` (ESLint with strict warnings policy)
- **Preview**: `npm run preview` (test production build locally)

### Debugging
- React Query DevTools enabled in App.jsx: Opens at bottom left during dev
- Supabase queries logged to console in api service functions
- Toast notifications provide user-facing error feedback

## Common Modification Points

### Adding a New API Endpoint
1. Create async function in appropriate service file (`src/services/api*.js`)
2. Include error handling with descriptive messages
3. Use in component via `useQuery` or `useMutation` with toast notifications

### Creating New Feature Components
1. Create feature folder in `src/features/[feature-name]/`
2. Use styled-components for styling
3. Import UI components from `src/ui/` for consistency
4. Integrate with React Query for data management

### Adding Form Fields
- Import `Input`, `Textarea`, or `FileInput` from `src/ui/`
- Wrap in `FormRow` for consistent layout
- Register field with react-hook-form's `register()` function
- Add validation in form submission if needed

## Key Files Reference
- **App.jsx**: Router setup, QueryClient configuration, providers
- **apiCabins.js**: Cabin CRUD operations with image upload logic
- **apiBookings.js**: Booking queries with relation fetches
- **GlobalStyles.js**: CSS variables, typography, responsive utilities
- **Button.jsx**: Component template for styled-component pattern (sizes/variations)
- **helpers.js**: Utility functions for date/currency formatting

## Naming & Conventions
- **Component files**: PascalCase (CabinRow.jsx, BookingDetail.jsx)
- **Service files**: camelCase (apiCabins.js, apiBookings.js)
- **Styled components**: Prefix with `Styled` (StyledModal, TableHeader)
- **Query keys**: Lowercase array strings (["cabins"], ["bookings"])
- **Error messages**: User-friendly, match toast.error() calls
