/**
* @name DataManager
* @extends
* @file dataManager.js
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/
class DataManager {
	/**
	* @param {data type} name - description.
	*/
	constructor() {
		this.bees = [];
		this.selectedBee = null;
		// this.user = null;
		this.navManager = null;
		this.netManager = new NetManager(this, this.navManager);
	}

	addPostToBee(post) {
		this.bees.forEach(bee => {
			if (bee.id == post.userId) {
				if (bee.posts) {
					bee.posts.push(post);
					return;
				} else {
					bee.posts = [];
					bee.posts.push(post);
					return;
				}
			}
		});
	}

	addCommentToPost(comment) {
		this.bees.forEach(bee => {
			if (bee.posts) {
				bee.posts.forEach(post => {
					if (post.id == comment.postId) {
						if (post.comments) {
							post.comments.push(comment);
						} else {
							post.comments = [];
							post.comments.push(comment);
						}
					}
				});
			}
		});
	}

	addTodosToBee(todo) {
		this.bees.forEach(bee => {
			if (bee.id == todo.userId) {
				if (bee.todos) {
					bee.todos.push(todo);
					return;
				} else {
					bee.todos = [];
					bee.todos.push(todo);
					return;
				}
			}
		});
	}

	showSelectedBeePosts(bee) {
		this.selectedBee = bee;
		this.navManager.showBeePosts();
	}

	showSelectedBeeTodos(bee) {
		this.selectedBee = bee;
		this.navManager.showBeeTodos();
	}

	sendTodo(todo) {
		this.netManager.sendTodo(todo);
	}

	sendComment(comment) {
		this.netManager.sendComment(comment);
	}

	sendPost(post){
		this.netManager.sendPost(post);
	}

	patchTodo(todo) {
		this.netManager.patchTodo(todo);
	}

	// deletePost(post){
	// 	this.netManager.deletePost(post);
	// }
}