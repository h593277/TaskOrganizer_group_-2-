
export default class TaskList extends HTMLElement {

	#shadow;
	#addTaskCallback;
	#changeStatusCallback;
	#deleteTaskCallback;
	#callbackAddTask = null;
	constructor() {

		super();

		// Entry point to the shadow DOM
		// If open, property "shadowRoot" will be an outside entrance to the shadow DOM
		this.#shadow = this.attachShadow({ mode: 'closed' });
		this.#createStyle();
		this.#createHTML();
	}

	#createStyle() {
		const style = `
            div {
                border: 2px solid red;
                padding: 5px;
                margin: 10px 0;
            }

            p {
                color: blue;
        }`;
		const styleElement = document.createElement('style');
		styleElement.insertAdjacentHTML('beforeend', style);
		this.#shadow.appendChild(styleElement);
		return styleElement;
	}


	#createHTML() {
		const content = `
            <button id="modalbtn" disabled type="button">New Task</button>
			<h2>----------------------</h2>
			<table id="table">
			    <tr id="tablehead">
			        <td><h2>Task</h2></td>
			        <td><h2>Status</h2></td>
			    </tr>
                
			</table>
        `;
		const wrapper = document.createElement('div');
		wrapper.insertAdjacentHTML('beforeend', content);

		this.#shadow.appendChild(wrapper);

		const btStatus = this.#shadow.getElementById(`modalbtn`);
		btStatus.addEventListener('click', this.#OpenModal.bind(this));
		return wrapper;
	}

	#OpenModal(event) {
	    // Hvis #callbackAddTsk ikke er null
	    //this.#callbackAddTask();
        if(this.#callbackAddTask !== null){
            this.#callbackAddTask(event);
        }
	}
	#noTask() {
	console.log("No task ran");
		const content = `
          <p>No tasks currently</p>
        `;

		let table = this.#shadow.getElementById("table");
		table.insertAdjacentHTML("beforebegin", content);

	}

	//Show modal dialog of taskbox
	showTask(newTask) {

		const content = `
			<tr id="Task${newTask.id}">
        		<td>${newTask.title}</td>
        		<td>${newTask.status}</td>        
				<td><button id="${newTask.id}m">&lt;Modify&gt;</button></td>
        		<td><button id="${newTask.id}r">Remove</button></td>
    		</tr>
    		<br>
        `;
        
		let table = this.#shadow.getElementById("table");
		table.insertAdjacentHTML("beforeend", content);
		
      	const btStatus = this.#shadow.getElementById(`${newTask.id}m`);

		btStatus.addEventListener('click', this.#updateTask.bind(this));

		const btRemove = this.#shadow.getElementById(`${newTask.id}r`);
		btRemove.addEventListener('click', () =>{
            this.#removeTask(newTask.id);
        });
    }

	#updateTask(id, newStatus) {

		const tasklist = document.querySelector("task-list");
		const status = {
			"id": id,
			"status": newStatus
		};
		const taskUpdate = document.getElementById(id);
		
		tasklist.updateTask(status);
		
		changestatusCallback(status);
	
    }

    #removeTask(id) {
	console.log(id);
	console.log(this.#shadow.getElementById("table"));
		//const tasklist = this.#shadow.getElementById("table");
        const el = this.#shadow.getElementById(`Task${id}`);  
		el.remove();
		const table = this.#shadow.getElementById("table");
		if(table.querySelectorAll("tr").length == 1)
		{
			this.#noTask();
		}
		this.#deleteTaskCallback(id);
    }

  	enableAddTask() {
      const bt = this.#shadow.getElementById('modalbtn').disabled=false;
      console.log(bt);
        return bt;
    }
    
    addTaskCallback(callback) {
		this.#callbackAddTask = callback;
	}

	changeStatusCallback(callback) {
		this.#changeStatusCallback = callback
	}

	deleteTaskCallback(id, callback) {
		this.#deleteTaskCallback = callback;
	}
}
