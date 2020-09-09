# bulletproof-nodejs + typeorm

## Project Structure

```
src
│   app.js          # App entry point
└───api-routes      # Express route controllers for all the endpoints of the app
└───config          # Environment variables and configuration related stuff
└───loaders         # Split the startup process into modules
└───models          # Database models
└───services        # All the business logic is here
└───subscribers     # Event handlers for async task
└───types           # Type declaration files (d.ts) for Typescript
└───interfaces      # Interface declaration for Typescript
~~└───jobs            # Jobs definitions for agenda.js~~
```

Ref: https://github.com/santiq/bulletproof-nodejs
