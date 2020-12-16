let task1 = [];

let flip = true


// Gets tasks from DB
async function getTasksFromDB(){
    
    // Query to DB
    let result = await fetch('/rest/tasks');
    // Adds results direcly to Array
    task1 = await result.json()
    renderTasks()
    
}


// Render tasks to list
function renderTasks(){

    // Selects all li elements
    lis = document.querySelector("#todoList");

    // Defaults elements
    lis.innerHTML = "";

    // Loop through all list elements
    for (let task of task1){ 
        let classValue = stateChecker(task.state);

    // Format list elements    
    let taskList = `
             <span><h1 id="${task.id}" class="${classValue}">${task.task}</h1><h2 class="updateBtn">U</h2><h2 class="remover">X</h2></span><br>`;

        // Add element to main array
        lis.innerHTML += taskList;
    }
    // Selection function
    changeState();
    deleteFromList();
    selectTask();
}


// Adds task to list - sends task to addToDatabase() method
function addToList(){

    let checker = checkIfEmpty();

    if (checker == true){

    // Selects value from textfield
    let value = document.querySelector("#inputs").value;

    
    // Create a new object from textfield value
    let newObj = {
        task: value,
        state: "true", // default value at creation
    }

    // Adds newObj to database
    addToDatabase(newObj);
 
    // Push to array
    task1.push(newObj);
    getTasksFromDB()
    clearTextField();
}}


// Checks inputfield if empty
function checkIfEmpty(){

    let theIn = document.querySelector("#inputs");
    if (theIn.value == ""){ 
        alert("Empty, add something.");
        return false;
    }else{
        return true
    }
}


// Check state of task and change class value
function stateChecker(taskState){
   
    let classValue = "";
      // Define class value of li element
      if (taskState == "false"){
        classValue ="checked"
    }else{
        classValue="lis"
    }
    return classValue;
}


// Clear out textfield
function clearTextField(){
    document.querySelector("#inputs").value = "";
}


// Delete by defining id in textfield
function deleteTasksById(){
    
    checkIfEmpty();
    let deleteVal = document.querySelector("#inputs").value;
    alert(deleteVal)
    deleteFromDB(deleteVal);
    getTasksFromDB();
    renderTasks;
    clearTextField();
}


// Select task in list and its id
function deleteFromList(){

    let btns = document.querySelectorAll(".remover");
    // Selects element, its id and adds eventlistener
    for (let btn of btns){
        btn.addEventListener("click", function(){


            id = btn.previousElementSibling.previousElementSibling.id
        
           deleteFromDB(id)
           getTasksFromDB()
           return true;
    })
    }
}


function updateTask(){

    console.log("fired")

    let editFieldValue = document.querySelector(".editField")
    // Value from editfield 
    let val = editFieldValue.value

    // Note-id connected to editfield
    postId = editFieldValue.previousElementSibling.firstElementChild.id

    // import list of tasks
    for (task of task1){
        // try id's
        if (task.id == postId){
            // create new object from all parameters
            newObj = {
                id: task.id,
                task: val,
                state: task.state
            }
            // update in DB
            updateTaskDB(newObj)
        }
    }
    editFieldValue.remove();
    let ub = document.querySelector("#ub");
    ub.remove();
    flip = true;
    getTasksFromDB()
}


function selectTask(){

    let bt = document.querySelectorAll(".updateBtn")

    for (let btn of bt){

        btn.addEventListener("click", function(){

            id = btn.previousElementSibling.id
            for (let task of task1){
                if (id == task.id){
                    let btnParent = btn.parentElement;
                    if (flip == true){
                    btnParent.insertAdjacentHTML("afterend",`<input type='text' value= ${task.task} class="editField">
                    </input><input type='button' value='Edit' id = "ub" onclick="updateTask()"></input>`)
                    flip = false;
                    }
                }
            }
        })
    }
}


function changeState(){

    let fields = document.querySelectorAll("h1");

    // Loop through fields
    for (let field of fields){

        // Field click
        field.addEventListener("click", function(){

            console.log(field.id)
            console.log(field)

            let fieldId = field.id;

            // Get tasks from list
            for (let task of task1){

                // Compare tasks and fields
                if (task.id == fieldId){

                    console.log("before:" +task.task + " "+ task.state)

                    // If task is true
                    if (task.state == "true"){

                        task.state = "false";
                        field.className="checked"

                        newNote = {

                            id: task.id,
                            task: task.task,
                            state: task.state
                        }

                        updateTaskDB(newNote)
                        

                        // If task i false
                    }else if (task.state == "false"){

                        task.state = "true"
                        field.className="lis"

                        newNote = {

                            id: task.id,
                            task: task.task,
                            state: task.state
                        }

                        updateTaskDB(newNote)
                    }

                    console.log(task.task + " "+ task.state)
                    getTasksFromDB()
                
                }


            }

        })

    }

}