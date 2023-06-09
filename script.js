const taskList = document.querySelector('#taskList')
const addTaskButton = document.querySelector('#submitNewTask')

addTaskButton.addEventListener('click', function(event){
    event.preventDefault()
    let nameTask = document.querySelector('#newTask').value
    let prioriryTask = document.querySelector('#priority').value
    if(nameTask != '' && prioriryTask != ''){
        addNewTask(nameTask, prioriryTask)
        attTasksList()
        document.querySelector('#newTask').value = ''
        document.querySelector('#priority').value = ''
    }
})

let tasks = [
    {
      titulo: "Comprar comida para o gato",
      tipo: "Urgente"
    },
    {
      titulo: "Limpar o quarto",
      tipo: "Urgente"
    },  
    {
      titulo: "Consertar Computador",
      tipo: "Prioritário"
    },  
    {
      titulo: "Guardar dinheiro do lanche",
      tipo: "Urgente"
    },  
    {
      titulo: "Beber água",
      tipo: "Prioritário"
    }    
]

function addNewTask(title, type){
    let newTask = { titulo: title, tipo: type}
    if(title != '' && type != ''){
        tasks.push(newTask)
    }
}

function attTasksList(){
    taskList.innerHTML = ''
    let tasksType = ['URGENTE', 'PRIORITÁRIO', 'NORMAL']
    for(let i = 0; i < tasksType.length; i++){
        for(let j = 0; j < tasks.length; j++){
            if(tasks[j].tipo.toUpperCase() == tasksType[i]){
                createTaskListItem(tasks[j])
            }
        }
    }
    document.querySelectorAll('.removeTask').forEach(span => span.addEventListener('click', event => removeTask(event.target.parentElement.querySelector('div').querySelector('p').innerText)))
}

function createTaskListItem(task){
    let type = ''
    if(task.tipo.toUpperCase() == 'URGENTE'){
        type = 'taskUrgent'
    }else if(task.tipo.toUpperCase() == 'PRIORITÁRIO'){
        type = 'taskPriority'
    }else {
        type = 'taskNormal'
    }
    let div1 = document.createElement('div')
    let div2 = document.createElement('div')
    let span1 = document.createElement('span')
    let p = document.createElement('p')
    let span2 = document.createElement('span')
    div1.setAttribute('class', 'taskListItem')
    span1.setAttribute('class', type)
    span2.setAttribute('class', 'removeTask')
    p.innerText = task.titulo
    span2.innerText = 'descartar'
    div2.appendChild(span1)
    div2.appendChild(p)
    div1.appendChild(div2)
    div1.appendChild(span2)
    taskList.appendChild(div1)
}

function removeTask(taskRemove){
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].titulo == taskRemove){
            tasks.splice(i, 1)
        }
    }
    attTasksList()
}

attTasksList()
