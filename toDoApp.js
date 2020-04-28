"use strict"

let todos= getSavedTodo()
let filters = {
    searchText:"",
    hideCompleted:false
}

// items left todo summary
let summary = document.querySelector(".summary")

let body = document.querySelector("body")
let actualListDiv = document.querySelector("#actualList")

// buttons
let addTask = document.querySelector("#addTask")
let deleteAllTasks = document.querySelector("#deleteAllTasks")

// event liteners
    let input = document.querySelector(".input").addEventListener("input", e => { filters.searchText=e.target.value })

        let nameForm = document.querySelector("#form-name").addEventListener("submit", e => {
            e.preventDefault()

            const text = e.target.elements.taskTitle.value.trim()

            if ( text.length>0 ) {
                todos.push({
                    id:uuidv4(),
                    text:text,
                    completed:false
                })
        
                saveLocalStorage(todos)
                renderToDo(todos,filters)
                e.target.elements.taskTitle.value=" "
            } 
        
        
        })
// hideCompleted to do 
     hideCompletedFilter(todos,filters)

//call render the todos
     renderToDo(todos, filters)


console.log(todos)