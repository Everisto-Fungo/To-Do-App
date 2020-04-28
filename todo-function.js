"use strict"


// gettin todo from local storage 

let getSavedTodo = ()=> {
    let todosJSON=localStorage.getItem("todos")
    
    try {
        return  todosJSON !== null ? JSON.parse(todosJSON) :[]
    } catch (e) {
        return []
    }

    }
    
// save todos to local storage
let saveLocalStorage = todos => {
    localStorage.setItem("todos", JSON.stringify(todos))
}


// render the todos
let renderToDo = (todos, filters) =>{
        
    let searchFilteredtodos = todos.filter( (todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed
           
        return searchTextMatch && hideCompletedMatch
    })        
    actualListDiv.innerHTML=""


    //print todo summary 
    if (searchFilteredtodos.length == 0) {
        summary.textContent=`No to-dos to show`
    } else if (searchFilteredtodos.length == 1) {
        summary.textContent=`you have ${generateSummary(searchFilteredtodos).length} uncompleted task`
    }else  {
        summary.textContent=`you have ${generateSummary(searchFilteredtodos).length} uncompleted tasks`
    }

    // print all to-do tasks
searchFilteredtodos.forEach(todo => {
    actualListDiv.appendChild(generateDom(todo))
    });
// searchedFilters(searchFilteredtodos)
}


// check the todo 
const toggleTodo = id => {
    const todoIndex= todos.findIndex(todo => {
          return todo.id === id
      })
  
 
      if (todos[todoIndex].completed) {
        todos[todoIndex].completed=false
      } else {
        todos[todoIndex].completed=true
      }

  }


// remove todo 
const removeTodo = id => {
    const todoIndex = todos.findIndex(todo => {
          return todo.id === id
      })
  
      if (todoIndex > -1) {
          todos.splice(todoIndex,1)
      }
  
  }



  
// generate the dom
let generateDom=todo => {
    let todoDiv = document.createElement("label")
    let container= document.createElement("div")
    let deletebtn = document.createElement("button")
    let todoText = document.createElement("span")
    let todoCheck = document.createElement("input")

        // setup todo checkbox
    todoCheck.setAttribute("type", "checkbox")
    todoCheck.checked=todo.completed

    todoDiv.id=todo.id
    container.appendChild(todoCheck)
    todoText.textContent=todo.text
    container.appendChild(todoText)

    todoDiv.classList.add("list-item")
    container.classList.add("list-item__container")
    todoDiv.appendChild(container)


    deletebtn.textContent="remove"
    deletebtn.classList.add("button", "button--text")
    todoDiv.appendChild(deletebtn)


   
    todoCheck.addEventListener("click", e => {
    toggleTodo(todo.id)
    renderToDo(todos, filters)
    saveLocalStorage(todos)
})
    deletebtn.addEventListener("click",  ()=> {
        removeTodo(todo.id)
        renderToDo(todos, filters)
        saveLocalStorage(todos)

    })


    
    return todoDiv
}

// generate the summary dom
let generateSummary = searchFilteredtodos => {
return searchFilteredtodos.filter(todo => {
        return !todo.completed
    })
}

// print the summary on dom
// filters 
// hideCompleted
let hideCompletedFilter =  (todos, filters) => {
    document.querySelector("#hideCompleted").addEventListener("change", e => {
        filters.hideCompleted=e.target.checked
        renderToDo(todos, filters)
        })
}


// localStorage.clear()