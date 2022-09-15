import { AjaxController } from "../ajaxcontroller/main.js"

export default class extends HTMLElement {
	
    #shadow;
	
	 constructor() {
        
        super();
		
        // Entry point to the shadow DOM
        // If open, property "shadowRoot" will be an outside entrance to the shadow DOM
        this.#shadow = this.attachShadow({ mode: 'closed' });
        this.#createStyle();
        this.#createHTML();
		this.#enabledTask();
		
		const openModalbt = this.#shadow.getElementById('modalbtn');
        openModalbt.addEventListener("click", () => {this.addTaskCallback()})
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
            <button id="modalbtn" type="button">New Task</button>
			<h1>Task	Status</h1>
			<h2>----------------------</h2>
			<table id="table">
			    <th id="tablehead">
			        <td>Task</td>
			        <td>Status</td>
			    </th>
			    <div id=tablebody>
			    	
			    </div>
			    
			</table>
        `;
        const wrapper = document.createElement('div');
        wrapper.insertAdjacentHTML('beforeend', content);
        this.#shadow.appendChild(wrapper);
        return wrapper;
    }
  

 #noTask() {
	
	const content = `
          <p>No tasks currently</p>
        `;
        const wrapper = document.createElement('div');
        wrapper.insertAdjacentHTML('afterbegin', content);
        this.#shadow.appendChild(wrapper);
        return wrapper;
    }
	
//Show modal dialog of taskbox
    showTask(newTask) {
		
		const content = `
			<tr id="Tasks">
        		<td>${task.title}</td>
        		<td>${task.status}</td>        
				<td><button id="${task.id}m">&lt;Modify&gt;</button></td>
        		<td><button id="${task.id}r">Remove</button></td>
    		</tr>
        `;
        
		let table = this.#shadow.getElementById("tablebody");
		table.insertAdjacentHTML("afterbegin", content);
		
      	const btStatus = this.#shadow.getElementById(`${task.id}m`);
		btStatus.addEventListener('click', this.#updateTask.bind(this));
		
		const btRemove = this.#shadow.getElementById(`${task.id}r`);
		btRemove.addEventListener('click', this.#removeTask.bind(this));
    }


    #updateTask(id, newStatus) {
	
		const tasklist = document.querySelector("task-list");
		const status = {
	    "id": id,
	    "status": newStatus
		};
		const taskUpdate = document.getElementById(id);
		
		tasklist.updateTask(status);
		
		ajaxController.changestatusCallback(status);
	
    }

    #removeTask(id) {
		const tasklist = document.querySelector("task-list");
		tasklist.removeTask(id);
    }

  	#enabledTask() {
      const bt = this.#shadow.querySelector('button[type=button]').disabled=false;
        return bt;
    }
    
    addTaskCallback() {
		const a = new AjaxController()
		console.log(a)
		a.addTaskCallback()
	}
	
	changeStatusCallback(id, newStatus) {
		
	}
	
	deleteTaskCallback(id) {
		
	}
}
