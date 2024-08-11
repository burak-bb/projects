### Conceptual Exercise

Answer the following questions below:

- What is the purpose of the React Router?

  React Router manages navigation and routing in React applications.

- What is a single page application?

  A single-page application (SPA) loads a single HTML page and updates content dynamically without full page reloads.

- What are some differences between client side and server side routing?

  Client-side routing updates views within the browser without reloading the page, while server-side routing requests new pages from the server for each route.

- What are two ways of handling redirects with React Router? When would you use each?

  Use the `Navigate` component for automatic redirects and the `useNavigate` hook for redirects based on user actions.

- What are two different ways to handle page-not-found user experiences using React Router?

  Use a `Route` with `path="*"` to render a 404 page or use the `useRouteError` hook to handle errors and show a custom error page.

- How do you grab URL parameters from within a component using React Router?

  Use the `useParams` hook.

- What is context in React? When would you use it?

  Context shares state across components without passing props manually, useful for global data like themes or user settings.

- Describe some differences between class-based components and function components in React.

  Class components use state and lifecycle methods, while function components use hooks like `useState` and `useEffect`.

- What are some of the problems that hooks were designed to solve?

  Hooks simplify state management, side effects, and code reuse in function components.
