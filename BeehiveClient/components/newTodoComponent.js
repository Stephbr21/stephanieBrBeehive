/**
* @name NewTodoComponent
* @extends
* @file NewTodoComponent.js
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/
class NewTodoComponent extends Component {
	constructor(model, parent, dataManager) {
		super(model, parent, dataManager);

		this.container.className = 'newTodoComponent';

		this.form = document.createElement('form');
		this.titleTodoForm = document.createElement('h2');
		this.title = document.createElement('input')
		this.title.placeholder = 'Title Todo';
		this.completed = document.createElement('p');

		this.okBtn = document.createElement('button');
		this.cancelBtn = document.createElement('button');

		this.title.className = 'titleTodoCss';
		this.titleTodoForm.className = 'titleFormTodo';
		this.okBtn.className = 'btnOkTodoCss';
		this.cancelBtn.className = 'btnTodoCancelCss';

		this.container.appendChild(this.form);
		this.form.appendChild(this.titleTodoForm);
		this.form.appendChild(this.title);
		this.form.appendChild(this.okBtn);
		this.form.appendChild(this.cancelBtn);

		this.hide();

		this.titleTodoForm.innerHTML = '❤ NEW TODO:';
		this.okBtn.innerHTML = 'OK';
		this.cancelBtn.innerHTML = 'X';

		this.okBtn.onclick = this.okBtnClick.bind(this);
		this.cancelBtn.onclick = this.cancelBtnClick.bind(this);

		this.todosCounter = 100000;
	}

	okBtnClick(e) {

		this.todosCounter++;

		var todo = {
			userId: this.dataManager.selectedBee.id,
			id: this.todosCounter,
			title: this.title.value,
			completed: false
		}

		if (this.dataManager.selectedBee.todos) {
			this.dataManager.selectedBee.todos.unshift(todo);
		} else {
			this.dataManager.selectedBee.todos = [];
			this.dataManager.selectedBee.todos.unshift(todo);
		}

		//POST REQUEST CALLBACK
		this.dataManager.sendTodo(todo);

		e.preventDefault();
		this.form.reset();
	}

	cancelBtnClick(e) {
		e.preventDefault();
		this.form.reset();
		this.dataManager.navManager.showTodosComponent();
	}
}