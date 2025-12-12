# CookingBook -  React 19 Testing Playground

Experimental full-stack app for exploring React 19 capabilities and advanced patterns.

## Tech Stack

**Frontend:**
- React 19 + JS
- Vite (build tool)
- Module CSS

**Backend:**
- Node.js
- Express 
- MongoDB + Mongoose

## Getting Started

**Backend:**
```bash
cd server
npm install
npm run start
```

**Frontend:**
```bash
cd client
npm install
npm run dev
```

## Custom Hooks
- `useAuthContext` - Authentication context
- `usePersistedState` - Persistent state hook
- `useConfigToken` - Token configuration
- `useFetch` - HTTP GET requests
- `useAction` - HTTP requests (POST/PUT/DELETE)
- `useForm` - Form state management
- `useDynamicInputs` - Dynamic form fields
- `useTop` - Scroll to top utility

## React 19 Features
- **Form Actions** - Native form handling
- **useFormStatus** - Pending state management
- **useOptimistic** - Optimistic UI updates

## Performance Optimization
- `useMemo` - Memoized values
- `useCallback` - Memoized callbacks
- `React.memo` - Component memoization
- `React.lazy` - Code splitting

## Routing
- Guarded routes
- Nested routes
- Index routes
- Prefix routes
- Layout routes
- Active links
- `useParams`, `useQueryParams`

## Forms & Authentication
- Controlled forms with validation
- File uploads (multer)
- Dynamic fields
- JWT authentication
- Password hashing (bcrypt)

## Other Features
- Context API (`useContext`)
- `AbortController` for request cancellation
- `useRef`,  `useReducer`

---

**Note:** This is an experimental playground, not production code.
