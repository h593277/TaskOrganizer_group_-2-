export default class AjaxController extends HTMLElement {
    #taskBox = null;
    #taskList = null;
    #callbackAddTask;
    config = "../../TaskServices/api/services"
    constructor() {

		super();
		
        this.#taskBox = document.querySelector("task-box");
        this.#taskList = document.querySelector("task-list");
        this.#taskBox.newTaskCallback(this.#newTask.bind(this));
        this.#taskList.addTaskCallback(this.#addTask.bind(this));
        this.#taskList.changeStatusCallback(this.changestatus.bind(this));
        this.#taskList.deleteTaskCallback(this.#deletetask.bind(this));
        
        this.#getTasks();
        this.allStatuses();
    }


    addtaskCallback(callback) {
        this.#callbackAddTask = callback;
    }

    async changestatus(status, id) {

        try {
            await fetch(`${this.config}/task/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json; charset=utf-8" },
                body: JSON.stringify({ "status": status })
            })
        } catch (error) {
            console.log(error);
        }
    }

    #addTask() {
        this.#taskBox.show();
    }

    async #deletetask(id) {
        try {
            await fetch(`${this.config}/task/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json; charset=utf-8" },
                body: JSON.stringify({ "id": id })
            });

        } catch (error) {
            console.log(error);
        }
    }

    async #newTask(newTask) {
		let response = "";
        try {
            response = await fetch(`${this.config}/task`, {
                method: "POST",
                headers: { "Content-Type": "application/json; charset=utf-8" },
                body: JSON.stringify({ "title": newTask.title, "status": newTask.status })
            });
        } catch (error) {
            console.log(error);
        }
        const result = await response.json();
        this.#taskList.showTask(result.task);
    }

    async #getTasks() {
        try {
            const response = await fetch(`${this.config}/tasklist`, { method: "GET" });
            this.#taskList.enableAddTask();
            try {
                const result = await response.json();
				result.tasks.forEach(t => {
					this.#taskList.showTask(t);
				})					
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
    }
    async allStatuses() {
        const url = `${this.config}/allstatuses`

        try {
            const response = await fetch(url, { method: "GET" });
            try {
                const result = await response.json()
                console.log(result);
                this.#taskBox.setStatusesList(result) 
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
    }
}