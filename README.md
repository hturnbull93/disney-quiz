# Disney Quiz

This app is a quiz about Disney characters and which films they appear in.

## Quick Start

Install and run with:

```
make
```

## Discussion

Technologies used:

Frontend
- React
  - framework for rendering and controlling the UI based on user input and API responses
- Chakra
  - A quick and easy and fairly nice looking component library
- Axios
  - A simple and commonly used HTTP client to make requests to the server

Backend
- Express
  - very commonly used node HTTP server, extended with express-session for session storage and cors to allow
- Axios
  - A simple and commonly used HTTP client to make requests to the Disney character API

Proposed testing strategy:
- Add unit tests for the individual components/views in the React app.
- Add integration tests for the React app, mocking axios responses.
- Add unit tests for the utils, generateQuestionAndAnswer module, mocking the api module.
- Add integration tests for the server with supertest, mocking the axios responses.
- Add a full e2e test, using both client and server, mocking the axios response to the Disney API, using Cypress.
