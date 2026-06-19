let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "all"){

    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if(filter === "active"){
        filteredTasks = tasks.filter(task => !task.completed);
    }

    if(filter === "completed"){
        filteredTasks = tasks.filter(task => task.completed);
    }

    filteredTasks.forEach((task,index)=>{

        const li = document.createElement("li");

        const taskText = document.createElement("span");
        taskText.textContent = task.text;

        if(task.completed){
            taskText.classList.add("completed");
        }

        const btnGroup = document.createElement("div");
        btnGroup.classList.add("task-buttons");

        const completeBtn = document.createElement("button");
        completeBtn.textContent = "✓";
        completeBtn.classList.add("complete");

        completeBtn.onclick = ()=>{
            task.completed = !task.completed;
            saveTasks();
            renderTasks(filter);
        };

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit");

        editBtn.onclick = ()=>{
            const newText = prompt("Edit Task", task.text);

            if(newText){
                task.text = newText;
                saveTasks();
                renderTasks(filter);
            }
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete");

        deleteBtn.onclick = ()=>{
            tasks.splice(tasks.indexOf(task),1);
            saveTasks();
            renderTasks(filter);
        };

        btnGroup.appendChild(completeBtn);
        btnGroup.appendChild(editBtn);
        btnGroup.appendChild(deleteBtn);

        li.appendChild(taskText);
        li.appendChild(btnGroup);

        taskList.appendChild(li);
    });
}

function addTask(){

    const input = document.getElementById("taskInput");

    if(input.value.trim() === ""){
        alert("Enter a task");
        return;
    }

    tasks.push({
        text:input.value,
        completed:false
    });

    input.value = "";

    saveTasks();
    renderTasks();
}

function filterTasks(type){
    renderTasks(type);
}

renderTasks();