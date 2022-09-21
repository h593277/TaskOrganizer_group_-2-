
export default class TaskList extends HTMLElement {

	#shadow;
	#addTaskCallback;
	#changeStatusCallback;
	#deleteTaskCallback;
	#callbackAddTask = null;
	constructor() {

		super();

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

	refreshTable()
	{
		let table = this.#shadow.getElementById("table");
		while(table.firstChild)
		{
			table.removeChild(table.firstChild);
		}
		const content = `
			    <tr id="tablehead">
			        <td><h2>Task</h2></td>
			        <td><h2>Status</h2></td>
			    </tr>
        `;

		table.insertAdjacentHTML('afterbegin', content);
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

	showTask(newTask) {

		const content = `
			<tr id="Task${newTask.id}">
        		<td>${newTask.title}</td>
        		<td>${newTask.status}</td>        
				<td><select id="${newTask.id}m">&lt;Modify&gt;
				 <option value="ACTIVE">ACTIVE</option>
				    <option value="WAITING">WAITING</option>
				    <option value="DONE">DONE</option>
				</select></td>
        		<td><button id="${newTask.id}r">Remove</button></td>
    		</tr>
    		<br>
        `;
        
		let table = this.#shadow.getElementById("table");
		table.insertAdjacentHTML("beforeend", content);
		
      	const btStatus = this.#shadow.getElementById(`${newTask.id}m`);

		btStatus.addEventListener('change', () => {this.#updateTask(btStatus.value, newTask.id)});

		const btRemove = this.#shadow.getElementById(`${newTask.id}r`);
		btRemove.addEventListener('click', () =>{
            this.#removeTask(newTask.id);
        });
    }

	#updateTask(newStatus, id) {
		this.#changeStatusCallback(newStatus, id);
	
    }

    #removeTask(id) {
		const table = this.#shadow.getElementById("table");
		if(table.querySelectorAll("tr").length == 1)
		{
			this.#noTask();
		}
		this.#deleteTaskCallback(id);
    }

  	enableAddTask() {
      const bt = this.#shadow.getElementById('modalbtn').disabled=false;
      return bt;
    }
    
    addTaskCallback(callback) {
		this.#callbackAddTask = callback;
	}

	changeStatusCallback(callback) {
		this.#changeStatusCallback = callback
	}

	deleteTaskCallback(callback) {
		this.#deleteTaskCallback = callback;
	}
}
