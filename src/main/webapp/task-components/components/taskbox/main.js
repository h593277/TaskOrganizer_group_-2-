'use strict';

//need this bool because style isnt visable to the DOM or shadowDOM
let bool = false; //let, og ikke const da den skal endres senere
const url = '../../TaskServices/api/services'

export default class TaskBox extends HTMLElement {
	
	#shadow;
	#callback;
	
	constructor() {
		super();
		
		this.#shadow = this.attachShadow({mode: 'closed'});
        const style = this.#getStyle();
        this.#shadow.appendChild(style);
        const html = this.#getHTML();
        this.#shadow.appendChild(html);
        
        const closebutton = this.#shadow.getElementById("close");
        this.#addEventListeners(closebutton);
        this.#shadow.getElementById("submit").addEventListener("click",this.#post.bind(this))
	}	
	
	#post(event) {
        // Samle status og title i objekt data
        const titleData = this.#shadow.getElementById("title").value;
        const statusData = this.#shadow.getElementById("status").selectedOptions[0].value;
        const data = {
			title: titleData,
			status: statusData
		}
        if(this.#callback !== null) {
			this.#callback(data);
		}
        
    }
	
	setStatusesList(statusList) {
		const statuses = statusList.allstatuses;
		
		let statusbox = this.#shadow.getElementById('status');
		for (let i = 0; i<statuses.length; i++){
		    let opt = document.createElement('option');
		    opt.value = statuses[i];
		    opt.innerHTML = statuses[i];
		    statusbox.appendChild(opt);
		}
	}
	
	newTaskCallback(callback) {
        this.#callback = callback;
	}
	
	show() {
		this.#shadow.getElementById('modal').style.display = 'block';
		bool = true;
	}
	
	close() {
		this.#shadow.getElementById('modal').style.display = 'none';
		bool = false;
	}
	
	#addEventListeners(closebutton)	{
		closebutton.addEventListener("click", this.close.bind(this));
		
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
				
				<input id="submit" type="button" value="Submit">
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
				display: none;
				
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