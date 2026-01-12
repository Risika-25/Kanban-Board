let taskData = {}; 
const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done = document.querySelector('#done');
let draggedelement = null;
const coulumn=[todo,progress,done];

function addblocktask(title,desc,column){
    const div = document.createElement("div");
    div.classList.add("task");
    div.setAttribute("draggable","true");
    div.innerHTML=`
        <h2>${title}</h2>
        <p>${desc}</p>
        <button>Delete</button>
    `
    column.appendChild(div);
    div.addEventListener("drag",(e)=>{
                draggedelement=div;
            });
    const del = div.querySelector("button");
    del.addEventListener("click",()=>{
        div.remove();
        updatetaskcount();
    })
            return div;
}

function updatetaskcount(){
    coulumn.forEach(col=>{
        const taskcount = col.querySelectorAll(".task");
        const count = col.querySelector(".right");
        taskData[col.id] = Array.from(taskcount).map(t => {
            return{
                title: t.querySelector("h2").innerHTML,
                desc : t.querySelector("p").innerHTML,
            }
        })
        localStorage.setItem("tasks",JSON.stringify(taskData));
        count.innerText = taskcount.length;
    })
}


if(localStorage.getItem("tasks")){
    const data = JSON.parse(localStorage.getItem("tasks"));
    for(const col in data){
        const column=document.querySelector(`#${col}`);
        
        data[col].forEach(task=>{
            addblocktask(task.title,task.desc,column);
        });
    }
    updatetaskcount();
}
const tasks = document.querySelectorAll('.task');

tasks.forEach(task => {
    task.addEventListener("drag",(e)=>{
        console.log("dragging",e);
        draggedelement= task;
    })
})

function adddragevent(column){
    column.addEventListener("dragenter",(e)=>{
    e.preventDefault();
    column.classList.add("hover-over");
})
column.addEventListener("dragleave",(e)=>{
    e.preventDefault();
    column.classList.remove("hover-over");
})
column.addEventListener("dragover",(e)=>{
    e.preventDefault();
    
})
column.addEventListener("drop",(e)=>{
    e.preventDefault();
 
    column.appendChild(draggedelement);
    column.classList.remove("hover-over");
    updatetaskcount();
})
}
adddragevent(todo);
adddragevent(progress);
adddragevent(done);

const togglemodal = document.querySelector("#toggle-modal");
const modal = document.querySelector(".modal");
const modalbg = document.querySelector(".modal .bg");
const addnewtask = document.querySelector("#addnewtask");

togglemodal.addEventListener("click",(e)=>{
    modal.classList.toggle("active");
})

modalbg.addEventListener("click",(e)=>{
    modal.classList.remove("active");
})

addnewtask.addEventListener("click",(e)=>{
    const tasktitle= document.querySelector("#text-title").value;
    const description = document.querySelector("#desc").value;
    addblocktask(tasktitle,description,todo);
    updatetaskcount();  
    modal.classList.remove("active");
    document.querySelector("#text-title").value = "";
    document.querySelector("#desc").value = "";
})