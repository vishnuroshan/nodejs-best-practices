# Node-Mongo-Boilerplate

## 1. Project Structure

 Controller (routes folder) contains express routers. Service layer (library folder) is where the business logic is implemented and data access layer is where the data access is done.
![enter image description here](https://softwareontheroad.com/static/cb9704cd54930d69a9617ce7d4b060ef/4fde8/server_layers.jpg)

## 2. Coding Standards
Used ESLint as devDependency. with custom configuration see:  [eslintrc.js](https://github.com/vishnuroshan/node-mongo-boilerplate/blob/master/.eslintrc.js)
Doesn't have to follow strictly.
## 3. common Conventions

 - Used **lowerCamelCase** for variables
 - Used **uppercase** from string constants and enum keys
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

## Articles I ripped off ;)

 1. [bulletproof nodejs architecture ](https://softwareontheroad.com/ideal-nodejs-project-structure/?utm_source=github&utm_medium=readme)
 
 2. [12 factor app](https://12factor.net/)

 3. [list of articles and examples about node  best practices](https://github.com/goldbergyoni/nodebestpractices)
 
# Thank You!!
