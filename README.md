# Node-Mongo-Boilerplate

## 1. Project Structure
3 layer architechture
![enter image description here](https://softwareontheroad.com/static/cb9704cd54930d69a9617ce7d4b060ef/4fde8/server_layers.jpg)

 ### Controller: (routes folder)
 Parse and pass the request to service layer and return response to client
 Request and response object must be kept inside this layer.
 ### Service layer (library folder)
 Layer where business logic must be implimented. and data must be sent to data access layer.
 ### Data access layer (data folder)
 Layer where DB is accessed. must have the exclusive rights to accesss the database a n make changes to DB

## 2. Coding Standards
- learn difference between devDependencies and dependencies and use them accordingly

- Use any linter to enfore coede standards and improve code quality

## 3. common Conventions

 - Use **lowerCamelCase** for variables
 
 - Use **uppercase** from string constants and enum keys
 
 - Need to prefix _ for unused, but unavoidable variables
 `function (_param1, param2)`
 
 - Avoid unnecessary variable declaration. Use **const** when read-only
 
 - Avoid **var** declarations
 
 - Use **single qoutes** rather than double quotes

 - Prefer **templates** in strings (especially in multi-line strings)
 
 - Use promise/async-await
 
 - Write modular code

 - Use Arrow functions
 - Use **===** rather than **==**
- Write synchronous code with extra care
- Write reusable codes as modules

## Articles I ripped off :grin:

 1. [bulletproof nodejs architecture ](https://softwareontheroad.com/ideal-nodejs-project-structure/?utm_source=github&utm_medium=readme)
 
 2. [12 factor app](https://12factor.net/)

 3. [list of articles and examples about node  best practices](https://github.com/goldbergyoni/nodebestpractices)
 
# Thank You!!
