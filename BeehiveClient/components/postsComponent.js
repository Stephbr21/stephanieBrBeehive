/**
* @name PostsComponent
* @extends
* @file newPostComponent.js
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/
class PostsComponent extends Component {
	constructor(model, parent, dataManager) {
		super(model, parent, dataManager);
		this.container.className = 'postsComponent';

		this.newPostBtn = document.createElement('button');
		this.postsContainer = document.createElement('div');

		this.container.appendChild(this.newPostBtn);
		this.container.appendChild(this.postsContainer);

		this.newPostBtn.innerHTML = '✚ NEW POST';
		this.newPostBtn.className = 'btnNewPost';

		this.newPostBtn.onclick = this.newPostBtnClick.bind(this);

		// this.hide();
	}

	showBeePosts() {

		if (this.dataManager.user.id != this.dataManager.selectedBee.id) {
			this.newPostBtn.hidden = true;
		} else {
			this.newPostBtn.hidden = false;
		}

		this.postsContainer.innerHTML = '';

		if (this.dataManager.selectedBee.posts) {
			this.dataManager.selectedBee.posts.forEach(post => {
				var postComponent = new PostComponent(post, this.postsContainer, this.dataManager);
			});
		}
	}

	newPostBtnClick(e) {
		e.preventDefault();
		this.dataManager.navManager.showNewPostComponent();
	}
}