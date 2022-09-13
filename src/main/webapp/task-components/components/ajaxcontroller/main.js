/**
 * 
 */
 import taskList from '../components/tasklist/main.js';
 import taskBox from '../components/taskbox/main.js';

export default class AjaxController
{
	#shadow;
	
	 constructor() {
        
        this.#shadow = this.attachShadow({ mode: 'closed' });
    }

#addtaskCallback(callback, newTask) {
	
	callback.#newTask(newTask);
	return tasklist;
	
    }

 #changestatusCallback(callback, status, id) {
	
	if(window.confirm("Do you want to change status?") == true)
	{
		const tasklist = document.querySelector("task-list");
		callback.#updateTask(status, id);
	}

    }

 #deletetaskCallback(callback, id) {
	
	if(window.confirm("Do you want to delete task?") == true)
	{
		callback.#deleteTask(id);
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