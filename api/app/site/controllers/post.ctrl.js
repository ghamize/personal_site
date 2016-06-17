//posts controller

(function(){
	angular
	.module('siteApp')
	.controller('PostCtrl',PostCtrl);

	function PostCtrl($stateParams,$state,api,postSrv){
		var postVm = this;

		//categories for posts

		postVm.categories = [
			{label:'All',value:''},
			{label:'General Health',value:'general health'};
			{label:'Fitness',value:'fitness'};
			{label:'Eating Habits',value:'eating habits'};
			{label:'Diseases',value:'diseases'};
			{label:'Healthcare System',value:'healthcare system'};
			{label:'Miscellaneous',value:'miscellaneous'};
		];

		postVm.post = {};
		postVm.post_update_btn = 'Update Post';
		postVm.post_delete_btn = 'Remove Post';

		//to show post

		if($stateParams.postId != undefined){
			postSrv.getPost($stateParams.postId)
			.then(function(res){
				postVm.post = res.data.post;

				for(var index in postVm.categories){
					if(postVm.post.category == postVm.categories[index].value){
						postVm.set_category = postVm.categories[index].value;
					}
				}

			})
		}

		//public functions
		postVm.updatePost = updatePost;
		postVm.deletePost = deletePost;

		//to add post

		postVm.addPost = function(){
			var post = {name: postVm.name,
				image: postVm.image,
				date: postVm.date,
				description: postVm.description,
				category: postVm.category,
				status:true
			}
			postSrv.addPost(post);
		}

		//to update posts

		function updatePost(){
			postSrv.updatePost(postVm.post, postVm.post.id)

		}

		//to delete posts

		function deletePost(){
			postSrv.deletePost(postVm.post.id);
		}

//closing tags

	}


})();