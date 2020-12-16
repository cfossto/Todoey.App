async function addToDatabase(obj){

    let task = {
        task: obj.task,
        state: obj.state
    }

    let sender = await fetch("/rest/add",{
        method: "POST",
        body: JSON.stringify(task)
    })
}


async function deleteFromDB(id){

    let sender = await fetch("/rest/delete/"+id,{

        method: "DELETE",

    })
}

async function updateTaskDB(obj){

    let send = await fetch("/rest/update",{
        method: "POST",
        body: JSON.stringify(obj)

    })
}


getTasksFromDB();