/**
* @name NewPostComponent
* @extends
* @file newPostComponent.js
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/
class NewPostComponent extends Component {
	constructor(model, parent, dataManager) {
		super(model, parent, dataManager);
		this.container.className = 'newPostComponent';

		this.form = document.createElement('form');
		this.titleForm = document.createElement('h2');
		this.title = document.createElement('input');
		this.title.placeholder = 'Title Post';
		this.body = document.createElement('input');
		this.body.placeholder = 'Write here!';
		this.okBtn = document.createElement('button');
		this.cancelBtn = document.createElement('button');

		this.form.className = 'formCss';
		this.titleForm.className = 'titleFormCss';
		this.title.className = 'titleCss';
		this.body.className = 'bodyCss';
		this.okBtn.className = 'btnOkCss';
		this.cancelBtn.className = 'btnCancelCss';

		this.container.appendChild(this.form);
		this.form.appendChild(this.titleForm);
		this.form.appendChild(this.title);
		this.form.appendChild(this.body);
		this.form.appendChild(this.okBtn);
		this.form.appendChild(this.cancelBtn);
		this.hide();

		this.titleForm.innerHTML = '✎ NEW POST:';
		this.okBtn.innerHTML = 'OK';
		this.cancelBtn.innerHTML = 'X';

		this.okBtn.onclick = this.okBtnClick.bind(this);
		this.cancelBtn.onclick = this.cancelBtnClick.bind(this);

		this.postsCounter = 100;
	}

	okBtnClick(e) {
			this.postsCounter++;

			var post = {
				userId: this.dataManager.selectedBee.id,
				id: this.postsCounter,
				title: this.title.value,
				body: this.body.value,
				comments: []
			}

			if (this.title.value != '' & this.body.value != ''){
				//POST REQUEST
				if (this.dataManager.selectedBee.posts) {
					this.dataManager.selectedBee.posts.unshift(post);
				} else {
					this.dataManager.selectedBee.posts = [];
					this.dataManager.selectedBee.posts.unshift(post);
				}
				//POST REQUEST CALLBACK
				this.dataManager.sendPost(post);
				e.preventDefault();
				this.form.reset();
			}else{
				this.error = document.createElement('p');
				this.form.appendChild(this.error);
				this.error.innerHTML = 'Write something!';
				this.error.style.color = 'red';
			}

		
	}

	cancelBtnClick(e) {
		e.preventDefault();
		this.form.reset();
		this.dataManager.navManager.showPostsComponent();
	}
}