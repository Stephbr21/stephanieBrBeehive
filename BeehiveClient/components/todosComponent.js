/**
* @name TodosComponent
* @extends
* @file TodosComponent.js
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/
class TodosComponent extends Component {
	constructor(model, parent, dataManager) {
		super(model, parent, dataManager);
		this.container.className = 'todosComponent';

		this.newTodoBtn = document.createElement('button');
		this.todosContainer = document.createElement('div');

		this.container.appendChild(this.newTodoBtn);
		this.container.appendChild(this.todosContainer);

		this.newTodoBtn.innerHTML = '✚ NEW TODO';
		this.newTodoBtn.className = 'btnNewTodo';

		this.newTodoBtn.onclick = this.newTodoBtnClick.bind(this);

		// this.hide();
	}

	showBeeTodos() {
		this.newTodoBtn.hidden = false;
		this.todosContainer.innerHTML = '';

		if (this.dataManager.selectedBee.todos) {
			this.dataManager.selectedBee.todos.forEach(todo => {
				var todoComponent = new TodoComponent(todo, this.todosContainer, this.dataManager);
			});
		}
	}

	newTodoBtnClick(e) {
		e.preventDefault();
		this.dataManager.navManager.showNewTodoComponent();
	}
}