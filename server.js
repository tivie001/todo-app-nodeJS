const express = require('express');
const bodyParser= require('body-parser');
const mongoose = require('mongoose');
const Todo = require('./models/todoModel');
const Categories = require('./models/categoryModel');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI,
    {useNewUrlParser: true, useUnifiedTopology: true});

app.listen(process.env.PORT || 3003, () => {
    console.log("Server running on port 3003");
})


// ******* TODO CRUD METHODS *******
app.get('/api/categories', (req, res) => {

    Categories.find((err, cats) => {
        if (err)
            console.log(handleError(err));
        console.log(cats);
        res.json(cats);
    })

})

app.get('/api', (req, res) => {

    Todo.find((err, todos) => {
        if (err)
            console.log(handleError(err));
        res.json(todos);
    })

})

app.post('/api/addTodo', (req, res) => {

    Categories.find((err, cats) => {
        if (err)
            console.log(handleError(err));
        let lowerCat = req.body.cat.toLowerCase();
        if (!cats.find(el => el.name === lowerCat)) {
            Categories.create({
                name: lowerCat,
            }, (err) => {
                if (err)
                    console.log(err);
            })
        }
    })
    Todo.create({
        cat: req.body.cat,
        name: req.body.todoName,
        completed: false,

    }, (err) => {
        if (err)
            console.log(err);
        Todo.find((err, todos) => {
            if (err)
                console.log(handleError(err));
            res.json(todos);
        })
    })
})

app.put('/api/:id', (req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        console.log(todo);
        if (err)
            console.log(handleError(err));
        console.log(todo)
        todo.update({completed: !todo.completed}, (err) => {
            if (err)
                console.log(err);
            Todo.find((err, todos) => {
                if (err)
                    console.log(handleError(err));
                res.json(todos);
            })
        })
    })
})
//
app.delete('/api/:id', (req, res) => {

    Todo.remove({
        _id: req.params.id
    }, (err) => {
        if (err)
            console.log(handleError(err));
        Todo.find((err, todos) => {
            if (err)
                console.log(handleError(err));
            res.json(todos);
        })
    })
})

app.get('/api/todosByCat/:name', (req, res) => {
    Todo.find((err, todos) => {
        if (err)
            console.log(handleError(err));
        const filteredTodos =  todos.filter(todo => todo.cat === req.params.name)
        res.json(filteredTodos);
    })
})
app.get('/api/showHide', (req, res) => {
    Todo.find((err, todos) => {
        if (err)
            console.log(handleEerror(err));
        const filteredTodos =  todos.filter(todo => todo.completed === false)
        res.json(filteredTodos);
    })
})


