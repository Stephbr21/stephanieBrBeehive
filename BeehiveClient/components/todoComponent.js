/**
* @name TodoComponent
* @extends
* @file TodoComponent.js
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/
class TodoComponent extends Component {

	constructor(model, parent, dataManager) {
		super(model, parent, dataManager);
		this.container.className = 'todoComponent';

		//Create html elements
		this.title = document.createElement('h4');
		this.title.className = 'titleTodo';
		this.todoCompleted = document.createElement('input');
		// this.deleteBtn = document.createElement('button');

		// this.deleteBtn.disabled = true;

		//Add html elements
		this.container.appendChild(this.title);
		this.container.appendChild(this.todoCompleted);
		// this.container.appendChild(this.deleteBtn);

		//Add data to html elements
		this.title.innerHTML = '<img src="https://image.flaticon.com/icons/svg/656/656348.svg" width=25 height=25>         ' + this.model.title;
		this.todoCompleted.type = 'checkbox';
		this.todoCompleted.className = 'checkbox';
		// this.deleteBtn.innerHTML = 'DELETE';

		if (this.model.completed) {
			this.todoCompleted.checked = true;
			this.todoCompleted.disabled = true;
			// this.deleteBtn.disabled = false;
			// this.deleteBtn.onchange = this.todoDeleteBtn.bind(this);
			// this.deleteBtn.onclick = this.todoDeleteBtn.bind(this);
		} else {
			this.todoCompleted.onchange = this.todoCompletedOnCheck.bind(this);
		}
	}

	todoCompletedOnCheck() {
		this.model.completed = true;
		this.todoCompleted.checked = true;
		this.todoCompleted.disabled = true;
		this.dataManager.patchTodo(this.model);
	}

	// todoDeleteBtn(){
	// 	this.deleteBtn.disabled = false;
	// 	this.dataManager.deleteTodo(this.model);
	// }
}