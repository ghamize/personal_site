//posts service (where posts controller will get info from)

(function(){
	angular
		.module('siteApp')
		.service('postSrv',PostService);

	function PostService($state,api){
		var self = this;
		//public vars
		self.posts = [];

		//public functions
		self.getPost = getPost;
		self.getPosts = getPosts;
		self.addPost = addPost;
		self.updatePost = updatePost;
		self.updatePostList = updatePostList;
		self.removePost = removePost;
		self.deletePost = deletePost;

		function getPosts(){
			return api.request('/posts',{},'GET')
			.then(function(res){
				//success callback
				console.log(res);
				self.posts = res.data.posts;
				return res.data.posts;
			}, function(res){
				//error callback
				console.log(res);
				return;
			})
		}

		//adding posts

		function addPost(post){
			api.request('/posts',post,'POST')
			.then(function(res){
				console.log(res);
				if(res.status === 200){
					//post was added successfully
					self.posts.push(res.data.post);
					$state.go('admin.dash');
				}
			})
		}

		//update post

		function updatePost(post,postId){
			api.request('/posts/'+postId,post,'PUT')

			.then(function(res){
				console.log(res);
				if(res.status === 200){
					//post was updated successfully
					self.updatePostList(post,postId);
				}
			})
		}

		//delete post

		function deletePost(postId){
			api.request('/posts/'+postId,{},'DEL')
			.then(function(res){
				console.log(res);
				if(res.status === 200){
					//post was deleted successfully
					self.removePost(postId);
					$state.go('admin.dash');
				}
			})
		}

		//to get post

		function getPost(postId){
			return api.request('/posts/'+postId,{},'GET');
		}

		//to update post list

		function updatePostList(post,postId){
			for (var i=0; i<self.posts.length;i++){
				if(self.posts[i].id == postId){
					self.posts[i].name = post.name;
					self.posts[i].image = post.image;
					self.posts[i].date = post.date;
					self.posts[i].description = post.description;
					self.posts[i].category = post.category;
				}
				//post was updated successfully. this below makes you go back to admin dash page after updating
				$state.go('admin.dash');
			}
		}


	//closing tags	

	}
})();