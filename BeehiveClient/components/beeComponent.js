/**
* @name BeeComponent
* @extends
* @file beeComponent.js
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/
class BeeComponent extends Component {

	constructor(model, parent, dataManager) {
		super(model, parent, dataManager);
		this.container.className = 'beeComponent';

		//Create html elements
		this.name = document.createElement('h3');
		this.name.className = 'words';
		// this.imgUsername = document.createElement('img');
		// this.imgUsername.setAttribute("src", "/img/user.png");
		// this.imgUsername.className  = 'icon';
		this.username = document.createElement('p');
		this.email = document.createElement('p');
		this.phone = document.createElement('p');
		this.website = document.createElement('p');
		this.postBtn = document.createElement('button');
		this.todosBtn = document.createElement('button');

		//Add html elements
		this.container.appendChild(this.name);
		this.container.appendChild(this.username);
		// this.container.appendChild(this.imgUsername); 
		this.container.appendChild(this.email);
		this.container.appendChild(this.phone);
		this.container.appendChild(this.website);
		this.container.appendChild(this.postBtn);
		this.container.appendChild(this.todosBtn);

		//Add data to html elements
		this.name.innerHTML = '<img src="https://image.flaticon.com/icons/svg/656/656340.svg" width=24 height=24> ' + this.model.name;
		this.username.innerHTML = '✹ Username: ' + this.model.username;
		// this.imgUsername.innerHTML = this.imgUsername;
		this.email.innerHTML = '✉ Email: ' + this.model.email;
		this.phone.innerHTML = '☎ Phone: ' + this.model.phone;
		this.website.innerHTML = '❤ Website: ' + this.model.website;
		this.postBtn.innerHTML = 'Posts';
		this.postBtn.className = 'btnPost';
		this.todosBtn.innerHTML = 'Todos';
		this.todosBtn.className = 'btnPost';

		//Add event to html elements
		this.postBtn.onclick = this.postBtnClick.bind(this);
		this.todosBtn.onclick = this.todosBtnClick.bind(this);
	}

	postBtnClick(e) {
		this.dataManager.showSelectedBeePosts(this.model);
	}

	todosBtnClick(e) {
		this.dataManager.showSelectedBeeTodos(this.model);
	}
}