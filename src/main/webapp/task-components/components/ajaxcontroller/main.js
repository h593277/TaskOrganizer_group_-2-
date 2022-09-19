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
    }


    addtaskCallback(callback) {
        this.#callbackAddTask = callback;

        //taskBox.show();
        //this.addtaskCallback();

    }

    async changestatus(status, id) {

        try {
            await fetch(`${config}/task/${id}`, {
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
        try {
            await fetch(`${config}/task`, {
                method: "POST",
                headers: { "Content-Type": "application/json; charset=utf-8" },
                body: JSON.stringify({ "title": newTask.title, "status": newTask.status })
            });

        } catch (error) {
            console.log(error);
        }

    }

    async #getTasks() {
        const url = `../../TaskServices/api/services/tasklist`;
        try {
            
            const response = await fetch(url, { method: "GET" });
            console.log(response);
            this.#taskList.enableAddTask();
            try {
                const result = await response.json();
                pre.textContent = JSON.stringify(result, null, 4);
            } catch (error) {
                pre.textContent = error;
            }
        } catch (error) {
            pre.textContent = error;

        }
    }
    async allStatus() {
        const url = `${config}/allstatuses`

        document.querySelector("span").textContent = url;
        const pre = document.querySelector("pre");

        try {
            const response = await fetch(url, { method: "GET" });
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
}