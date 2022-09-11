import ajaxController from '../components/ajaxcontroller/main.js';

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

        const bt = this.#shadow.querySelector('button[type=button]');
		
        bt.addEventListener('click', this.#showTask.bind(this));
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
            <form>
            <button disabled type="button">New Task</button>
			<h1>Task	Status</h1>
			<h2>----------------------</h2>
			
            </form>

            
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
    #showTask(newTask) {
/*	const task = newTask;  
	
	ajaxController.addTaskCallback(newTask);
	
        const content = `
			<p>${task.id}</p>
			<p>${task.task}</p>
			<p>${task.status}</p>
            <button id="status${task.id}" type="button">Status</button>
    		<button id="remove${task.id}" type="button">Remove</button>
        `;

      	const btStatus = this.#shadow.querySelector('status' + task.id);
		btStatus.addEventListener('click', this.#updateTask.bind(this));
		
		const btRemove = this.#shadow.querySelector('status' + task.id);
		btRemove.addEventListener('click', this.#removeTask.bind(this));
	
        const wrapper = this.#shadow.querySelector('form');
        wrapper.insertAdjacentHTML('beforeend', content);
        this.#shadow.appendChild(wrapper);*/
        return wrapper;
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

}
