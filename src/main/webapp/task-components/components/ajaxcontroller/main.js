export default class AjaxController extends HTMLElement {
    #taskBox = null;
    #taskList = null;
    #callbackAddTask;
    config = "../../TaskServices/api/services"
    constructor() {

		super();
        //this.#taskList = document.getElementsByTagName("task-list");
        //this.#taskBox = document.getElementsByTagName("task-box");
        this.#taskBox = document.querySelector("task-box");
        this.#taskList = document.querySelector("task-list");
		console.log(this.#taskBox);
		console.log(this.#taskList);
        this.#taskBox.newTaskCallback(this.#newTask.bind(this));
        this.#taskList.addTaskCallback(this.#addTask.bind(this));
        this.#taskList.changeStatusCallback(this.changestatus.bind(this));
        this.#taskList.deleteTaskCallback(this.#deletetask.bind(this));
        // this.addTask(this.#add.bind(this));
        this.#getTasks();
        
        this.allStatuses();
        
    }


    addtaskCallback(callback) {
        this.#callbackAddTask = callback;

        //taskBox.show();
        //this.addtaskCallback();

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
            await fetch(`${config}/task`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json; charset=utf-8" },
                body: JSON.stringify({ "id": id })
            });

        } catch (error) {
            console.log(error);
        }
    }

    async #newTask(newTask) {
		console.log(newTask)
        try {
            await fetch(`${this.config}/task`, {
                method: "POST",
                headers: { "Content-Type": "application/json; charset=utf-8" },
                body: JSON.stringify({ "title": newTask.title, "status": newTask.status })
            });

        } catch (error) {
            console.log(error);
        }
        this.#taskList.showTask(newTask);
    }

    async #getTasks() {
        const url = `../../TaskServices/api/services/tasklist`;
        try {
            
            const response = await fetch(url, { method: "GET" });
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