/**
* @name NewCommentComponent
* @extends
* @file newPostComponent.js
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/
class NewCommentComponent extends Component {
	constructor(model, parent, dataManager) {
		super(model, parent, dataManager);

		this.container.className = 'newCommentComponent';

		this.form = document.createElement('form');
		this.titleFormCommentForm = document.createElement('h4');
		this.title = document.createElement('input');
		this.title.placeholder = 'Title Comment';
		this.body = document.createElement('input');
		this.body.placeholder = 'Write your comment!';
		this.okBtn = document.createElement('button');
		this.cancelBtn = document.createElement('button');

		this.title.className = 'titleCommentCss';
		this.titleFormCommentForm.className = 'titleFormCommentForm';
		this.body.className = 'bodyCommentCss';
		this.okBtn.className = 'btnOkCommentCss';
		this.cancelBtn.className = 'btnCommentCancelCss';

		this.container.appendChild(this.form);
		this.form.appendChild(this.titleFormCommentForm);
		this.form.appendChild(this.title);
		this.form.appendChild(this.body);
		this.form.appendChild(this.okBtn);
		this.form.appendChild(this.cancelBtn);

		this.hide();

		this.titleFormCommentForm.innerHTML = '◐ NEW COMMENT:';
		this.okBtn.innerHTML = 'OK';
		this.cancelBtn.innerHTML = 'X';

		this.okBtn.onclick = this.okBtnClick.bind(this);
		this.cancelBtn.onclick = this.cancelBtnClick.bind(this);

		this.commentsCounter = 100000;
	}

	okBtnClick(e) {

		this.commentsCounter++;

		var comment = {
			postId: this.model.id,
			id: this.commentsCounter,
			name: this.title.value,
			email: this.dataManager.user.email,
			body: this.body.value
		}

		//POST REQUEST
		if (this.model.comments) {
			this.model.comments.unshift(comment);
		} else {
			this.model.comments = [];
			this.model.comments.unshift(comment);
		}

		//POST REQUEST CALLBACK
		this.dataManager.sendComment(comment);

		e.preventDefault();
		this.form.reset();
	}

	cancelBtnClick(e) {
		e.preventDefault();
		this.form.reset();
		this.dataManager.navManager.showPostsComponent();
	}
}

