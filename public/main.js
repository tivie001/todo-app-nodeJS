let initialTodos = [];
let initialCats = [];

const form = document.querySelector('#todoForm');
const showHide = document.querySelector('#showHideBtn');
const url = 'https://todo-app-dgm3760.herokuapp.com'

// ******* ASYNC ONLOAD FUNCTIONS *******
async function fetchTodos() {
    const response = await fetch(`${url}/api`);
    const todos = await response.json();
    return todos;
}

async function fetchCategories() {
    const response = await fetch(`${url}/api/categories`);
    const categories = await response.json();
    return categories;
}

fetchCategories().then(cats => {
    initialCats.push(cats);
    getCategories(initialCats[0]);
});

fetchTodos().then(todos => {
    initialTodos.push(todos);
    document.getElementById("todosList").innerHTML = getTodos(initialTodos[0]);
});

// ******* ADD TODO (POST) *******
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const cat = document.querySelector('#category[type="text"]').value.toLowerCase();
    const todoName = document.querySelector('#todoName[type="text"]').value;
    const bodyData = { cat, todoName };
    if (cat && todoName) {
        async function addTodo() {
            const response = await fetch(`${url}/api/addTodo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyData)
            });
            const todos = await response.json();
            return todos;
        }
        addTodo().then((todos) => {
            document.getElementById("todosList").innerHTML = getTodos(todos);
        })
    }

});

// ******* (GET) CATEGORIES *******
function getCategories(arr){
    let catList = [];
    arr.forEach((category) => {
        if (category) {
            catList += `<h3 class="category-heading" id=${category.name} style="text-align: justify" 
                        onclick="filterByCategory(this.id)">
                        ${category.name.charAt(0).toUpperCase() + category.name.slice(1)}</h3>`
        }
    });
    document.getElementById("categoryList").innerHTML =  catList ? catList : '';
}

// ******* (GET) TODOS *******
function getTodos(arr){
    return arr.map(function(item) {
        let newTodo = `<div class="todo-item">`
        if (item.completed) {
            newTodo += `<label class="checkbox-container strike-through" id=${item._id} onclick="completeTodoItem(this.id, event)">${item.name}`
            newTodo += `<input type="checkbox" checked>`
        } else {
            newTodo += `<label class="checkbox-container" id=${item._id} onclick="completeTodoItem(this.id, event)">${item.name}`
            newTodo += `<input type="checkbox">`
        }

        newTodo += `<span class="checkmark"></span></label>`
        newTodo += `<img class="trash-icon" id=${item._id} src="assets/trash.svg" onclick="deleteTodo(this.id)"/></div>`
        return newTodo;
    }).join(' ');
}

// ******* (PUT) COMPLETE TODO *******
function completeTodoItem(id, event) {
    event.preventDefault();
    fetch(`${url}/api/${id}`, {method: 'PUT'})
        .then(function(response) {
        return response.json();
    }).then(function(parsedJson) {
        let editedTodo = parsedJson.find(todo => todo._id === id);
        let element = document.getElementById(editedTodo._id);
        element.classList.toggle("strike-through");
        element.getElementsByTagName("input")[0].checked = ! element.getElementsByTagName("input")[0].checked;
    })
}

// ******* (DELETE) TODOS *******
function deleteTodo(id) {
    fetch(`${url}/api/${id}`, {method: 'DELETE'})
        .then(function(response) {
            return response.json();
        }).then(function(parsedJson) {
            document.getElementById("todosList").innerHTML = getTodos(parsedJson);
    })
}

// ******* (UPDATE) FILTER TODOS *******
function filterByCategory(name) {
    fetch(`${url}/api/todosByCat/${name}`)
        .then(function(response) {
            return response.json();
        }).then(function(parsedJson) {

        let element = document.getElementById(name);
        let activeCats = document.querySelectorAll(".active");
        activeCats.forEach((el) => {
            el.classList.remove("active");
        });

        element.classList.add("active");
        const filteredArray = parsedJson.filter(todos => todos.cat.toLowerCase() === name);
        document.getElementById("todosList").innerHTML = name === 'All' ? getTodos(parsedJson) : getTodos(filteredArray);
        document.getElementById("showHide").innerHTML = "Show Completed";
    })
}

// ******* (UPDATE) SHOW/HIDE TODOS *******
showHide.addEventListener('click', () => {
    let buttonText = document.getElementById("showHideBtn").innerHTML;
    if (buttonText === 'Hide Completed') {
        fetch(`${url}/api/showHide`)
            .then(function(response) {
                return response.json();
            }).then(function(parsedJson) {
            let activeCats = document.querySelectorAll(".active");
            activeCats.forEach((el) => {
                el.classList.remove("active");
            });
            if (buttonText === "Hide Completed") {
                document.getElementById("showHideBtn").innerHTML = 'Show Completed';
                let filteredArray = parsedJson.filter((todo => !todo.complete));
                document.getElementById("todosList").innerHTML = getTodos(filteredArray);
            } else {
                document.getElementById("showHideBtn").innerHTML = 'Hide Completed';
                document.getElementById("todosList").innerHTML = getTodos(parsedJson);
            }
        })
    } else {
        document.getElementById("todosList").innerHTML = getTodos(initialTodos[0]);
        document.getElementById("showHideBtn").innerHTML = 'Hide Completed';
    }
})







