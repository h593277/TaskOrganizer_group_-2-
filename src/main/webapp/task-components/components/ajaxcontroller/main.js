export default class AjaxController
{
	#taskBox;
	#taskList;
	config = "../../TaskServices/api/services"
	constructor() {
    	
    	//this.#taskList = document.getElementsByTagName("task-list");
    	//this.#taskBox = document.getElementsByTagName("task-box");
    	
    	taskBox = document.querySelectorAll("task-box");
    	taskList = document.querySelectorAll("task-list");
    	
    	this.#taskList.enableAddTask();
    	this.#taskList.addTaskCallback()
    }
	
	
	addtaskCallback() {
        
		taskBox.show();
		this.addtaskCallback();
		
	 }
	 
	async changestatusCallback(callback, status, id) {
		
		try {
			await fetch(`${config}/task/${id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json; charset=utf-8" },
				body: JSON.stringify({"status": status})
			})
		} catch (error) {
			console.log(error);
		}
		
	 }
	
	#deletetaskCallback(callback, id) {
		
	}
	
	async #newTaskCallback(callback, newTask) {
		try	{
			await fetch(`${config}/task`, {
				method: "POST",
				headers: { "Content-Type": "application/json; charset=utf-8" },
				body: JSON.stringify({"title": newTask.title, "status": newTask.status})
			});
			
		} catch (error) {
			console.log(error);
		}
		
	}
}

async function allStatus() {
    const url = `${config}/allstatuses`

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