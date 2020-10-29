# Todo App Assignment (w/ MongoDB & ExpressJS)
##### MAIN URL: https://todo-app-dgm3760.herokuapp.com/
*This server will return todos & categories.*
--------------------------------------------------------------
This app implements a frontend with HTML, CSS, and JS. From the main.js
file the user may interact with the app which then send requests to
and from the server built with ExpressJS in Node. The following endpoints
use mongoose model schema methods to create, update, delete, and get todos.
The two models used are: 
1. Todo Model 
2. Category Model
Both models are relational by category so, the todos and categories can be
correlated and be easily filtered by category.

You can run this app locally by running the following command: *node server.js*

## GET
##### URL: https://todo-app-dgm3760.herokuapp.com/api
*Hitting this endpoint will get all todos in the app.*

##### URL: https://todo-app-dgm3760.herokuapp.com/api
*Hitting this endpoint will get all categories in the app.*

##### URL: https://todo-app-dgm3760.herokuapp.com/api/todosByCat/:name
*Hitting this endpoint will get all categories in the app.*

##### URL: https://todo-app-dgm3760.herokuapp.com/api/showHide
*Hitting this endpoint will show/hide completed all todos based off of value within the database.*

## POST
##### URL: https://todo-app-dgm3760.herokuapp.com/api/addTodo
*Hitting this endpoint will add a new todo app to the database with the given input.*

## DELETE
##### URL: https://todo-app-dgm3760.herokuapp.com/api/:id
*Hitting this endpoint and will delete a particular todo by ID from the database and update app.*

## PUT (UPDATE)
##### URL: https://todo-app-dgm3760.herokuapp.com/api/:id
*Hitting this endpoint will change a todo from completed and vice versa. And updates app in the database. 

