### Conceptual Exercise

Answer the following questions below:

- What is React? When and why would you use it?

  React is a JavaScript library for building user interfaces, often used for creating single-page applications due to its efficiency in managing UI state and rendering.

- What is Babel?

  Babel is a JavaScript compiler that converts modern JavaScript (ES6+) code into a version that is compatible with older browsers.

- What is JSX?

  JSX is a syntax extension for JavaScript that looks similar to HTML and is used with React to describe what the UI should look like.

- How is a Component created in React?

  A component in React can be created as a function that returns JSX or as a class that extends `React.Component` and implements a `render` method.

- What are some differences between state and props?

  State is managed within a component and can change over time, while props are passed to a component from its parent and are read-only.

- What does "downward data flow" refer to in React?

  Downward data flow means that data in React apps is passed from parent components to child components via props.

- What is a controlled component?

  A controlled component is a form element whose value is controlled by React state, making React the source of truth for the input.

- What is an uncontrolled component?

  An uncontrolled component is a form element that maintains its own state internally, without relying on React for its current value.

- What is the purpose of the `key` prop when rendering a list of components?

  The `key` prop helps React identify which items in a list have changed, been added, or removed, optimizing the re-render process.

- Why is using an array index a poor choice for a `key` prop when rendering a list of components?

  Using an array index as a key can lead to inefficient re-renders and issues with component state when items are reordered or removed.

- Describe `useEffect`. What use cases is it used for in React components?

  `useEffect` is a hook for performing side effects in React components, such as data fetching, subscriptions, or manually changing the DOM.

- What does `useRef` do? Does a change to a ref value cause a rerender of a component?

  `useRef` creates a mutable object that persists across renders without causing a re-render when its value changes.

- When would you use a ref? When wouldn't you use one?

  Use a ref for accessing or manipulating DOM elements directly or storing mutable values that don't trigger re-renders; avoid using refs for controlling the flow of your application logic or state.

- What is a custom hook in React? When would you want to write one?

  A custom hook is a reusable function that encapsulates and shares logic across components, often created when you have repeated stateful logic in multiple components.
