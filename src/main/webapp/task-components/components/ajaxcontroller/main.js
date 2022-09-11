/**
 * 
 */

export default class AjaxController
{
	#shadow;
	
	 constructor() {
        
    }

#addtaskCallback(callback) {
	
	const tasklist = document.querySelector("task-list");
	//tasklist.enabledTask();
	const newTask = {
    "id": 5,
    "title": "Do DAT152 home work",
    "status": "ACTIVE"
	}; 
	
	//callback(newTask);
	this.#showTask(newTask)
	return tasklist;
    }

 #changestatusCallback(callback) {
	
	if(window.confirm("Do you want to change status?") == true)
	{
		const tasklist = document.querySelector("task-list");
		callback(tasklist);
	}

    }

 #deletetaskCallback(callback) {
	
	if(window.confirm("Do you want to delete task?") == true)
	{
		const tasklist = document.querySelector("task-list");
		callback(tasklist);
	}
}






}

async function allStatus() {
    const url = `${config.servicesPath}/allstatuses`

    document.querySelector("span").textContent = url;
    const pre = document.querySelector("pre");

    try {
        const response = await fetch(url, { method: "GET" })
        try {
            const result = await response.json()
            pre.textContent = JSON.stringify(result, null, 4);
        } catch (error) {
            pre.textContent = error;
        }
    } catch (error) {
        pre.textContent = error;
    }
}