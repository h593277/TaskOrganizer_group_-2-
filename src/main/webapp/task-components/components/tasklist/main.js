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
		
        bt.addEventListener('click', this.#newTask.bind(this));
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

  #addtaskCallback(callback) {
	
	const tasklist = document.querySelector("task-list");
	tasklist.enableaddtask();
	const newtask = {
    "id": 5,
    "title": "Do DAT152 home work",
    "status": "ACTIVE"
	}; 
	
	callback(newTask);
	
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

 #noTask() {
	
	const content = `
          <p>No tasks currently</p>
        `;
        const wrapper = document.createElement('div');
        wrapper.insertAdjacentHTML('afterbegin', content);
        this.#shadow.appendChild(wrapper);
        return wrapper;
    }

	

    #showTask(newTask) {
	const task = newTask;  
        const content = `
			<p>${task.id}</p>
			<p>${task.task}</p>
			<p>${task.status}</p>
            <button id="status + ${task.id}" type="button">Status</button>
    		<button id="remove + ${task.id}" type="button">Remove</button>
        `;
        const wrapper = document.getElementsByTagName('form')[0];
        wrapper.insertAdjacentHTML('beforeend', content);
        this.#shadow.appendChild(wrapper);
        return wrapper;
    }


    #updateTask(id, newStatus) {
	const tasklist = document.querySelector("task-list");
	const status = {
    "id": 1,
    "status": "ACTIVE"
	};
	const taskUpdate = document.getElementById(id);
	tasklist.updateTask(status);
	
    }

    #removeTask(id) {
	const tasklist = document.querySelector("task-list");
	tasklist.removeTask(id);
    }

  #enabledTask() {
      const bt = this.#shadow.querySelector('button[type=button]')[0].disabled=false;
        return bt;
    }

}
