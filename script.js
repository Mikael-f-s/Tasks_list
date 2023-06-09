const taskList = document.querySelector('#taskList')
const addTaskButton = document.querySelector('#submitNewTask')

addTaskButton.addEventListener('click', function(event){
    event.preventDefault()
    let nameTask = document.querySelector('#newTask')
    let dataTask = document.querySelector('#dataLimite')

    if(nameTask.value != '' && dataTask.value != null){
        addNewTask(nameTask.value, dataTask.value)
        attTasksList()
        nameTask.value = ''
        dataTask.value = ''
    }
})
let taskID = 0
let tasks = []

function addNewTask(title, limitDate){
    let newTask = {id: taskID, titulo: title, urgencia: '', dataLimite: limitDate}
    taskID ++
    let data = new Date()
    let dataTask = new Date(limitDate)
    let dataUrgencia = dataTask - data
    if(dataUrgencia > 172800000){
        newTask.urgencia = 'Normal'
    }else if(dataUrgencia > 86400000){
        newTask.urgencia = 'Prioritário'
    }else {
        newTask.urgencia = 'Urgente'
    }
    if(dataUrgencia > 0){
        tasks.push(newTask)
    }
}

function attTasksList(){
    taskList.innerHTML = ''
    let tasksType = ['URGENTE', 'PRIORITÁRIO', 'NORMAL']
    for(let i = 0; i < tasksType.length; i++){
        for(let j = 0; j < tasks.length; j++){
            if(tasks[j].urgencia.toUpperCase() == tasksType[i]){
                createTaskListItem(tasks[j])
            }
        }
    }
    document.querySelectorAll('.removeTask').forEach(span => span.addEventListener('click', event => removeTask(event.target.parentElement.getAttribute('data-id'))))
}

function createTaskListItem(task){
    let type = ''
    if(task.urgencia.toUpperCase() == 'URGENTE'){
        type = 'taskUrgent'
    }else if(task.urgencia.toUpperCase() == 'PRIORITÁRIO'){
        type = 'taskPriority'
    }else {
        type = 'taskNormal'
    }
    let div1 = document.createElement('div')
    let div2 = document.createElement('div')
    let span1 = document.createElement('span')
    let p1 = document.createElement('p')
    let p2 = document.createElement('p')
    let span2 = document.createElement('span')
    p2.innerText = `Data limite: ${task.dataLimite.slice(8,10)}/${task.dataLimite.slice(5,7)}/${task.dataLimite.slice(0,4)}`
    div1.setAttribute('class', 'taskListItem')
    div1.setAttribute('data-id', task.id)
    span1.setAttribute('class', type)
    span2.setAttribute('class', 'removeTask')
    p1.innerText = task.titulo
    span2.innerText = 'descartar'
    div2.appendChild(span1)
    div2.appendChild(p1)
    div2.appendChild(p2)
    div1.appendChild(div2)
    div1.appendChild(span2)
    taskList.appendChild(div1)
}

function removeTask(taskRemove){
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].id == taskRemove){
            tasks.splice(i, 1)
        }
    }
    attTasksList()
}

attTasksList()

