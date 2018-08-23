/**
* @name PostComponent
* @extends
* @file postComponent.js
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/
class PostComponent extends Component {

	constructor(model, parent, dataManager) {
		super(model, parent, dataManager);
		this.container.className = 'postComponent';

		//Create html elements
		this.id = document.createElement('h3');
		this.title = document.createElement('h3');
		this.title.className = 'titlePost';
		this.body = document.createElement('p');
		this.body.className = 'bodyPost';
		this.addCommentBtn = document.createElement('button');
		this.addCommentBtn.className = 'btnComment';
		// this.deletePostBtn = document.createElement('button');
		// this.deletePostBtn.className = 'deletePostBtn';

		//Add html elements
		this.container.appendChild(this.id);
		this.container.appendChild(this.title);
		this.container.appendChild(this.body);
		this.container.appendChild(this.addCommentBtn);
		// this.container.appendChild(this.deletePostBtn);

		//Add data to html elements
		this.title.innerHTML = this.model.id + ' - '+ this.model.title;
		this.body.innerHTML = this.model.body;
		this.addCommentBtn.innerHTML = '✚ ADD COMMENT';
		// this.deletePostBtn.innerHTML = 'X DELETE POST';


		// if (this.dataManager.user.id != this.dataManager.selectedBee.id) {
		// 	this.deletePostBtn.hidden = true;
		// } else {
		// 	this.deletePostBtn.hidden = false;
		// }


		//Add event to html elements
		this.addCommentBtn.onclick = this.addCommentBtnClick.bind(this);
		// this.deletePostBtn.onclick = this.deletePostBtnClick.bind(this);

		this.addComments();

	}

	addComments() {
		this.model.comments.forEach(comment => {
			var commentComponent = new CommentComponent(comment, this.container, this.dataManager);
		});
	}

	addCommentBtnClick() {
		this.dataManager.navManager.showNewCommentComponent(this.model);
	}

	// deletePostBtnClick(){
	// 	this.dataManager.deletePost(this.model);
	// }
}