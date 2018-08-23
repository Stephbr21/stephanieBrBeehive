/**
* @name NetManager
* @extends
* @file netManager.js
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/
class NetManager {
	constructor(dataManager, navManager) {
		this.dataManager = dataManager;
		this.navManager = navManager;
		this.url = 'http://localhost:3000/';
	}

	init() {
		this.requestUsers();
	}

	requestUsers() {
		var request = new XMLHttpRequest();
		request.open('GET', this.url + 'users', true);
		request.onreadystatechange = this.requestUsersCallback.bind(this);
		request.send();
	}

	requestUsersCallback(e) {
		var request = e.target;
		if (request.readyState == XMLHttpRequest.DONE) {
			if (request.status == 200) {
				//console.log(this);
				var bees = JSON.parse(request.responseText);
				for (const id in bees) {
					this.dataManager.bees.push(bees[id]);
				}
				this.requestPosts();
				this.requestTodos();
				this.navManager.showBees();
			} else {
				console.log('Error on request');
			}
		}
	}

	requestPosts() {
		var request = new XMLHttpRequest();
		request.open('GET', this.url + 'posts', true);
		request.onreadystatechange = this.requestPostCallback.bind(this);
		request.send();
	}

	requestPostCallback(e) {
		var request = e.target;
		if (request.readyState == XMLHttpRequest.DONE) {
			if (request.status == 200) {
				var posts = JSON.parse(request.responseText);
				for (const id in posts) {
					this.dataManager.addPostToBee(posts[id]);
				}
				this.requestComments();
			} else {
				console.log('Error on request');
			}
		}
	}

	requestComments() {
		var request = new XMLHttpRequest();
		request.open('GET', this.url + 'comments', true);
		request.onreadystatechange = this.requestCommentsCallback.bind(this);
		request.send();
	}

	requestCommentsCallback(e) {
		var request = e.target;
		if (request.readyState == XMLHttpRequest.DONE) {
			if (request.status == 200) {
				var comments = JSON.parse(request.responseText);
				for (const id in comments) {
					this.dataManager.addCommentToPost(comments[id]);
				}

				//HACK
				this.dataManager.user = this.dataManager.bees[0];
				this.dataManager.selectedBee = this.dataManager.bees[1];
				this.navManager.showBeePosts();

			} else {
				console.log('Error on request');
			}
		}
	}

	requestTodos() {
		var request = new XMLHttpRequest();
		request.open('GET', this.url + 'todos', true);
		request.onreadystatechange = this.requestTodosCallback.bind(this);
		request.send();
	}

	requestTodosCallback(e) {
		var request = e.target;
		if (request.readyState == XMLHttpRequest.DONE) {
			if (request.status == 200) {
				var todos = JSON.parse(request.responseText);
				for (const id in todos) {
					this.dataManager.addTodosToBee(todos[id]);
				}
			} else {
				console.log('Error on request');
			}
		}
	}

	sendTodo(todo) {		
		var request = new XMLHttpRequest();
		request.open('POST', this.url + 'todos', true);
		request.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
		request.onreadystatechange = this.sendTodoCallback.bind(this, todo);
		request.send(JSON.stringify(todo));
	}

	sendTodoCallback(todo, e) {
		var request = e.target;
		if (request.readyState == XMLHttpRequest.DONE) {
			if (request.status == 200) {
				this.dataManager.navManager.showTodosComponent(todo);
			}
			else {
				console.log('Error on request');
			}
		}
	}

	sendComment(comment) {		
		var request = new XMLHttpRequest();
		request.open('POST', this.url + 'comments', true);
		request.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
		request.onreadystatechange = this.sendCommentCallback.bind(this, comment);
		request.send(JSON.stringify(comment));
	}

	sendCommentCallback(comment, e) {
		var request = e.target;
		if (request.readyState == XMLHttpRequest.DONE) {
			if (request.status == 200) {
				this.dataManager.navManager.showPostsComponent(comment);
			}
			else {
				console.log('Error on request');
			}
		}
	}

	sendPost(post) {		
		var request = new XMLHttpRequest();
		request.open('POST', this.url + 'posts', true);
		request.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
		request.onreadystatechange = this.sendTodoCallback.bind(this, post);
		request.send(JSON.stringify(post));
	}

	sendTodoCallback(post, e) {
		var request = e.target;
		if (request.readyState == XMLHttpRequest.DONE) {
			if (request.status == 200) {
				this.dataManager.navManager.showPostsComponent(post);
			}
			else {
				console.log('Error on request');
			}
		}
	}

	patchTodo(todo) {
		var request = new XMLHttpRequest();
		request.open('PATCH', this.url + 'todos', true);
		request.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
		request.onreadystatechange = this.patchTodoCallback.bind(this, todo);
		request.send(JSON.stringify(todo));
		console.log(JSON.stringify(todo));
		
	}

	patchTodoCallback(todo, e) {
		var request = e.target;
		if (request.readyState == XMLHttpRequest.DONE) {
			if (request.status == 200) {
				this.dataManager.navManager.showTodosComponent(todo);
			}
			else {
				console.log('Error on request');
			}
		}
	}

	// deletePost(post) {
	// 	var request = new XMLHttpRequest();
	// 	request.open('DELETE', (this.url + 'posts/?query=' + id), true);
	// 	request.onreadystatechange = this.deletePostCallback.bind(this);
	// 	request.send();
	// }

	// deletePostCallback(e) {
	// 	var request = e.target;
	// 	if (request.readyState == XMLHttpRequest.DONE) {
	// 		if (request.status == 200) {
	// 			this.dataManager.navManager.showPostsComponent();
	// 		}
	// 		else {
	// 			console.log('Error on request');
	// 		}
	// 	}
	// }
}