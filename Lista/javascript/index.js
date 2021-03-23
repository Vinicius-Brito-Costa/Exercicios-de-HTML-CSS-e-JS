let log = console.log;
if(localStorage.getItem('lists')){
    LoadList(JSON.parse(localStorage.getItem('lists')).tasks);
}
else{
    
    let data = {
        tasks: [
            {
                title: 'Adicionar mais tarefas.'
            }
        ],
        complete: []
    }
    localStorage.setItem('lists', JSON.stringify(data));
    let json = JSON.parse(localStorage.getItem('lists')).tasks;
    log(json);
    LoadList(json);
}

function LoadList(list, toDo = true){
    let container = document.getElementsByClassName("list-container")[0];
    container.innerHTML = '';
    let id = 0;
    if(!toDo){
        document.getElementById('addTask').style.display = 'none';

        document.getElementsByClassName('list-container')[0].style = 'border-bottom-left-radius: var(--radius); border-bottom-right-radius: var(--radius);'
        
                

        document.getElementById('tasks').disabled = false;
        document.getElementById('complete').disabled = true;
    }
    else{
        document.getElementsByClassName('list-container')[0].style = 'border-bottom-left-radius: 0; border-bottom-right-radius: 0;'


        document.getElementById('addTask').style.display = 'block';
        document.getElementById('tasks').disabled = true;
        document.getElementById('complete').disabled = false;
    }
    if(list.length > 0){
        for(let item of list){
            let actualId = id;
            
            let listItem = document.createElement('li');
            listItem.classList.add('list-item');
    
            let index = document.createElement('h2');
            let indexText = document.createTextNode(String(id + 1).padStart(2, '0'));
            index.appendChild(indexText);
            listItem.appendChild(index);
    
            let title = document.createElement('span');
            let titleText = document.createTextNode(item.title);
            title.appendChild(titleText);
            listItem.appendChild(title);

            let button = document.createElement('button');
            let buttonImage = document.createElement('img');
            buttonImage.src = toDo ? './image/check.svg' : './image/close.svg';
            button.appendChild(buttonImage);
            button.onclick = toDo ? () => CompleteTask(actualId) : () => DeleteTask(actualId);
            button.classList.add(toDo ? 'list-item-complete' : "list-item-delete");
            listItem.appendChild(button);

            if(!toDo){
                let readdButton = document.createElement('button');
                let readdImg = document.createElement('img');
                readdImg.src = './image/add.svg';
                readdButton.classList.add('list-item-readd');
                readdButton.appendChild(readdImg);
                readdButton.onclick = () => ReAddTask(actualId);
                listItem.appendChild(readdButton);
            }
            
            container.appendChild(listItem);
            log('Item: ' + item.title + ' id: ' + id);
            id++;
        }
    }
    log(id);
}
function AddTask(){
    let task = document.getElementById('item').value;
    let data = JSON.parse(localStorage.getItem('lists'));
    let add = {
        title: task
    }
    data.tasks.push(add);
    localStorage.setItem('lists', JSON.stringify(data));
    LoadList(data.tasks);
    document.getElementById('item').value = '';
}
function CompleteTask(index){
    let data = JSON.parse(localStorage.getItem('lists'));
    let complete = data.tasks.splice(index, 1);
    data.complete.push(complete[0]);
    localStorage.setItem('lists', JSON.stringify(data));
    LoadList(data.tasks);
}
function DeleteTask(index){
    let data = JSON.parse(localStorage.getItem('lists'));
    data.complete.splice(index, 1);
    localStorage.setItem('lists', JSON.stringify(data));
    LoadList(data.complete, false);
}
function ReAddTask(index){
    log('Index removido: ' + index);
    let data = JSON.parse(localStorage.getItem('lists'));
    log(data.complete)
    let task = data.complete.splice(index, 1);
    log(task)
    data.tasks.push(task[0]);
    localStorage.setItem('lists', JSON.stringify(data));
    LoadList(data.complete, false);
}