### Conceptual Exercise

Answer the following questions below:

- What is a JWT?
  A JSON Web Token (JWT) is a compact, URL-safe token used for securely transmitting information as a JSON object.

- What is the signature portion of the JWT? What does it do?
  The signature ensures the token's integrity and authenticity by validating it hasn't been altered.

- If a JWT is intercepted, can the attacker see what's inside the payload?
  Yes, the payload can be decoded, but it cannot be tampered with without invalidating the signature.

- How can you implement authentication with a JWT? Describe how it works at a high level.
  A user logs in to receive a JWT, which is sent with each request to verify identity.

- Compare and contrast unit, integration, and end-to-end tests.
  Unit tests verify individual components, integration tests check component interactions, and end-to-end tests validate entire workflows.

- What is a mock? What are some things you would mock?
  A mock simulates the behavior of real objects, such as APIs or databases, in tests.

- What is continuous integration?
  Continuous Integration (CI) involves frequently integrating code into a shared repository, with each integration automatically tested.

- What is an environment variable and what are they used for?
  An environment variable configures settings for applications, such as database connections and API keys.

- What is TDD? What are some benefits and drawbacks?
  Test-Driven Development (TDD) involves writing tests before code, leading to better design and fewer bugs but requiring more initial time.

- What is the value of using JSONSchema for validation?
  JSONSchema ensures the structure and content of JSON data are correct and consistent.

- What are some ways to decide which code to test?
  Focus on critical functionality, complex logic, and areas prone to bugs.

- What does `RETURNING` do in SQL? When would you use it?
  `RETURNING` retrieves specified columns from modified rows after `INSERT`, `UPDATE`, or `DELETE`.

- What are some differences between Web Sockets and HTTP?
  Web Sockets allow full-duplex communication with a persistent connection, while HTTP uses a stateless request-response model