// intiallize our localStorage
// intiallize our form
// getItem
// setItem

todos = JSON.parse(localStorage.getItem('todos')) || []
var form = document.getElementById('form')

form.addEventListener('submit', function(e){
    e.preventDefault()

    const todo = {
        content: e.target.elements.content.value,
        datecreated: new Date().getDate(),
        yearcreated: new Date().getFullYear()
    }
    if(todo.content == ''){
        alert('Input An Activity')
    }else{
        todos.push(todo)
    }
    localStorage.setItem('todos', JSON.stringify(todos))

    e.target.reset()
    showTodo()
})

showTodo()

function showTodo(){

    var tasks = document.getElementById('tasks')
    tasks.innerHTML = ''

    todos.forEach(todo => {
        var task = document.createElement('div')
        task.classList.add('task')

        var content = document.createElement('div')
        content.classList.add('content')

        var input = document.createElement('input')
        input.classList.add('taskOutput')
        input.type = 'text'
        input.value = `${todo.content}`
        input.setAttribute('readonly', 'readonly')


        content.appendChild(input)
        task.appendChild(content)
        
        var actions = document.createElement('div')
        actions.classList.add('actions')

        var edit = document.createElement('span')
        edit.classList.add('edit')
        edit.classList.add('fa-edit')

        var deletebtn = document.createElement('span')
        deletebtn.classList.add('delete')
        deletebtn.classList.add('fa-trash')

        actions.appendChild(edit)
        actions.appendChild(deletebtn)
        task.appendChild(actions)
        tasks.appendChild(task)

        edit.addEventListener('click', function(){
            const input = content.querySelector('input')
            input.removeAttribute('readonly')
            input.focus()
            input.addEventListener('blur', function(e){
                input.setAttribute('readonly', true)
                todo.content = e.target.value
                localStorage.setItem('todos', JSON.stringify(todos))
                showTodo()
            })
        })

        deletebtn.addEventListener('click', function(){
            todos = todos.filter(e => e != todo)
            localStorage.setItem('todos', JSON.stringify(todos))
            showTodo()
        })

    });
    
}