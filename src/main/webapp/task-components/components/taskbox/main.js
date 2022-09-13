'use strict';
var servicesPath = '../TaskServices/api/services'

//need this bool because style isnt visable to the DOM or shadowDOM
const bool = true;

export default class TaskBox extends HTMLElement {
	
	#shadow;

	constructor() {
		super();
		
		this.#shadow = this.attachShadow({mode: 'closed'});
        const style = this.#getStyle();
        this.#shadow.appendChild(style);
        const html = this.#getHTML();
        this.#shadow.appendChild(html);
        
        this.setStatusesList();
        
        const closebutton = this.#shadow.getElementById("close");
        this.#addEventListeners(closebutton);
	}	
	
	async setStatusesList() {
		const response = await this.#getStatuses();
		let statuses = response.allstatuses;

		let statusbox = this.#shadow.getElementById('status');
		for (let i = 0; i<statuses.length; i++){
		    let opt = document.createElement('option');
		    opt.value = statuses[i];
		    opt.innerHTML = statuses[i];
		    statusbox.appendChild(opt);
		}
	}
	
	newTaskCallback(callback) {
		const title = this.#shadow.getElementById('title').innerText;
		const statusSelected = this.#shadow.getElementById('status').value;
		//Missing some logic here
	}
	
	show() {
		this.#shadow.getElementById('modal').style.display = 'block';
		bool = true;
	}
	
	close() {
		this.#shadow.getElementById('modal').style.display = 'none';
		bool = false;
	}
	
	async #getStatuses() {
		const url = `${servicesPath}/allstatuses`
		
	    try {
	        const response = await fetch(url, { method: "GET" })
        	try {
	          	return await response.json()
	        } catch (error) {
	            console.log(error)
	        }
	    } catch (error) {
	        console.log(error);
	    }
	    return null;
	}
	
	#addEventListeners(closebutton)	{
		closebutton.addEventListener("click", this.close);
		
        document.addEventListener("keydown", (e) => {
			if(e.key === 'Escape' && bool === true) {
				this.close();
			}
		});
	}
	
	#getHTML() {
        const html = `
		<h1>TaskBox Component</h1>
		<div class="modal" id="modal">
			<button id="close">&#10006;</button>
			<form>
				<div id="titlediv">
					<label>Title:</label>
					<input id="title" type="text" placeholder="Task title">
				</div>
				<div id="statusdiv">
					<label id="statuslabel">Status:</label>
					<select "name="status" id="status">
				</div>
				</select>
				
				<input id="submit" type="submit" value="Submit">
			</form>
			
		</div>
		`;
        const wrapper = document.createElement('div');
        wrapper.insertAdjacentHTML('beforeend', html);
        return wrapper;
    }

	#getStyle() {
        const style = `
            .modal {
				position: absolute;
				display: block;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				
				min-width: 20%;
				width: fit-content(2rem);
				margin: 20px;
				
				background: #fff;
				border-radius: 5px;
				text-align: center;
				padding: 30px, 30px 30px;
				color: #333;
			}
			
			#titlediv,
			#statusdiv,
			#submit {
				display: block;
				margin: auto;
				margin-top: 10px;
			}
			
			form {
				padding: 10px;
			}

			button {
				float: right;
				margin: 10px;
			}
			`;
        const styleElement = document.createElement('style');
        styleElement.insertAdjacentHTML('beforeend', style);
        return styleElement;
    }
    
}