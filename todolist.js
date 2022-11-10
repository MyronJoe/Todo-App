function timer(){

    let d = new Date()
    let hour = d.getHours()
    let min = d.getMinutes()
    let sec = d.getSeconds()


    //working for Hour
    if(hour == 00){
        hour = 12
    }
    if(hour < 12){
        document.getElementById('daynight').innerHTML = "Am"
    }else{
        document.getElementById('daynight').innerHTML = "Pm"
    }
    if(hour > 12){
        hour =  hour - 12
    }
    
    if(hour < 10){
        hour = '0' + hour
    }

    //working for mins
    if(min < 10){
        min = '0' + min
    }

    //working for sec
    if(sec < 10){
        sec = '0' + sec
    }


    let hour_output = document.getElementById('hour'); 
    let min_output = document.getElementById('min'); 
    let sec_output = document.getElementById('sec');

    hour_output.innerHTML = hour
    min_output.innerHTML = min
    sec_output.innerHTML = sec
}
setInterval(timer, 1000)



todos = JSON.parse(localStorage.getItem('todos')) || []

let form = document.getElementById('form')

form.addEventListener('submit', function(e){
    e.preventDefault()
    
    const todo = {
        content: e.target.elements.content.value,
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        date: new Date().getDate()
    }

    if (todo.content == '') {
        alert('Input an activity')
    } else {
        todos.unshift(todo)
    }

    localStorage.setItem('todos', JSON.stringify(todos))

    e.target.reset()
    displayTodo()
})

displayTodo()

function displayTodo() {
    let tasks = document.getElementById('tasks')
    tasks.innerHTML = ''

    todos.forEach(todo => {
        let timer = document.createElement('div')
        timer.classList.add('timer')

        let desc = document.createElement('span')
        desc.appendChild(document.createTextNode('Date Posted :'))

        let year = document.createElement('span')
        year.appendChild(document.createTextNode(`${todo.year}`))

        let sp1 = document.createElement('span')
        sp1.appendChild(document.createTextNode(`:`))

        let month = document.createElement('span')
        month.appendChild(document.createTextNode(`${todo.month}`))

        let sp2 = document.createElement('span')
        sp2.appendChild(document.createTextNode(`:`))

        let date = document.createElement('span')
        date.appendChild(document.createTextNode(`${todo.date}`))
        
        timer.appendChild(desc)
        timer.appendChild(year)
        timer.appendChild(sp1)
        timer.appendChild(month)
        timer.appendChild(sp2)
        timer.appendChild(date)
        tasks.appendChild(timer)

        let task = document.createElement('div')
        task.classList.add('task')

        let content = document.createElement('div')
        content.classList.add('content')

        let input = document.createElement('input')
        input.type = 'text'
        input.classList.add('taskOutput')
        input.value = `${todo.content}`
        input.setAttribute('readonly', 'readonly')

        content.appendChild(input)
        task.appendChild(content)


        let actions = document.createElement('div')
        actions.classList.add('actions')

        let edit = document.createElement('span')
        edit.classList.add('edit')
        edit.innerHTML = '<span class="fa fa-edit"></span>'

        let delbtn = document.createElement('span')
        delbtn.classList.add('delete')
        delbtn.innerHTML = '<span class="fa fa-trash"></span>'
        
        actions.append(edit)
        actions.appendChild(delbtn)
        task.appendChild(actions)
        tasks.appendChild(task)

        edit.addEventListener('click', function(e){
            let input = content.querySelector('input')
            input.removeAttribute('readonly')
            input.focus()
            input.addEventListener('blur', function(e){
                input.setAttribute('readonly', true)
                todo.content = e.target.value
                localStorage.setItem('todos', JSON.stringify(todos))
                displayTodo()
            })
        })

        delbtn.addEventListener('click', function(e){
            todos = todos.filter(q => q != todo)
            localStorage.setItem('todos', JSON.stringify(todos))
            displayTodo()
        })


    });

    
}