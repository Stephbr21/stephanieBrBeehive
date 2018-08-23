/**
* @name NavManager
* @extends
* @file navManager.js
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/
class NavManager {
	/**
	* @param {data type} name - description.
	*/
	constructor(dataManager) {
		this.dataManager = dataManager;
		this.beesComponent = document.getElementById('beesComponent');
		this.beeActivityComponent = document.getElementById('beeActivityComponent');
		this.postsComponent = new PostsComponent(this.dataManager.selectedBee, this.beeActivityComponent, this.dataManager);
		this.todosComponent = new TodosComponent(this.dataManager.selectedBee, this.beeActivityComponent, this.dataManager);
		this.newPostComponent = new NewPostComponent(null, this.beeActivityComponent, this.dataManager);
		this.newCommentComponent = new NewCommentComponent(null, this.beeActivityComponent, this.dataManager);
		this.newTodoComponent = new NewTodoComponent(null, this.beeActivityComponent, this.dataManager);
		this.todosComponent.hide();
	}

	showBees() {
		this.dataManager.bees.forEach(bee => {
			var beeComponent = new BeeComponent(bee, this.beesComponent, this.dataManager);
		});
	}

	showBeePosts() {
		this.todosComponent.hide();
		this.postsComponent.showBeePosts();
		this.dataManager.navManager.showPostsComponent();
		this.newTodoComponent.hide()
	}

	showBeeTodos() {
		this.todosComponent.show();
		this.dataManager.navManager.showTodosComponent();
		this.newCommentComponent.hide();
		this.newPostComponent.hide();
		this.postsComponent.hide();
		this.newTodoComponent.hide();
	}

	showNewPostComponent() {
		this.todosComponent.hide();
		this.postsComponent.hide();
		this.newPostComponent.show();
		this.newCommentComponent.hide();
		this.newTodoComponent.hide();
	}

	showNewCommentComponent(post) {
		this.newCommentComponent.model = post;
		this.todosComponent.hide();
		this.postsComponent.hide();
		this.newPostComponent.hide();
		this.newCommentComponent.show();
		this.newTodoComponent.hide();
	}

	showPostsComponent() {
		this.todosComponent.hide();
		this.postsComponent.show();
		this.postsComponent.showBeePosts();
		this.newPostComponent.hide();
		this.newCommentComponent.hide();
		this.newTodoComponent.hide();
	}

	showTodosComponent(){
		this.todosComponent.show();
		this.todosComponent.showBeeTodos();
		this.postsComponent.hide();
		this.newPostComponent.hide();
		this.newCommentComponent.hide();
		this.newTodoComponent.hide();	
	}

	showNewTodoComponent() {
		this.todosComponent.hide();
		this.postsComponent.hide();
		this.newPostComponent.hide();
		this.newCommentComponent.hide();
		this.newTodoComponent.show();
	}
}