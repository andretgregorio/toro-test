# Toro Test Frontend
Here you will find more details about the frontend application.

## Technologies
This app is built with NextJS.

To handle the authentication, I'm storing the JWT in the session storage of the browser and retrieving it whenever I need to make an API Requested to a protected resource. If the protected route rejects my request due to authentication reasons, I'll delete the JWT from the session storage and redirect the user to the home page. This is what I could achieve in the timebox provided.

## Design Decisions
The app implements a modularized approach, where each module is independent from the others. The `auth` module implements the features related to auth, such as account creations, login and logout. The `wallet` module is just a tiny one, created only to display one authenticated page.

Inside **src** you will find the following modules:
* auth: holds all functionalities related to authentication.
* pages: this is nextjs requirement. Each page represents a route for the app.
* shared: some code that can be shared across modules.
* styles: the global style.
* wallet: the functionalities for the wallet features.

Inside a module package (such as auth and wallet) you will find the following structure:
* domain: holds basic data models for the rest of this module to use. BusinessErrors and interfaces are all declared here. I believe this makes easier to model our domain and help to make our code more expressive.
* infra: this has infrastructure setup, such as HTTP requests and access to browser storage.
* services: provide the app functionality, orchestrating different infrastructure accesses and providing a clear data model for the views to work with.
* views: the components and the state management for the components.

## Testing Strategy
The app implements mostly unit tests (although in some tests more than one view components interacts with each other). I usually like to do the unit tests as I develop, in a TDD style, and use the pages to make an integrated tests. For integrated tests I usually use MSW to stub HTTP requests instead of mocking axios, fetch, or the lib I'm using to make the API calls. However, given the time constraints, I've opted to skip integration tests.

Because of time constraints, the tests are mostly implemented in the `login` functionality. This was the first frontend functionality I have created, and it was done with unit testing. For the account creation and the authenticated route I ended up no creating tests. This is bad and it's something I don't do in a production environment. 

I also didn't add E2E tests because of time constraint. Cypress would be really handy to test the whole application (frontend, backend and database) working together.
