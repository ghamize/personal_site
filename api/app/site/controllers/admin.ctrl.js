//admin controller
(function(){
	'use strict';

	angular
		.module('siteApp')
		.controller('AdminCtrl',AdminCtrl);

	function AdmiNCtrl($scope,$state,postSrv){
		var adminVm = this;
		adminVm.postSrv = postSrv;

		//checking if logged in
		if(localStorage.authToken == undefined || localStorage.authToken == null){
			$state.go('admin.dash');
		}

		adminVm.posts = postSrv.posts;
		if(adminVm.posts.length > 0){
			adminVm.is_posts = true;
		}

		//watch for updates to posts object
		$scope.$watch(function(){
			return postSrv.posts;
		}, function(newValue){
			if(postSrv.posts.length > 0){
				adminVm.posts = postSrv.posts;
				adminVm.is_posts = true;
			}

		});

		//public functions
		adminVm.editPost = editPost;
		adminVm.logout = logout;

		function editPost(post){
			$state.go('admin.edit_post', {postId:post.id});
		}

		function logout(){
			localStorage.removeItem('authToken');
			$state.go('auth');
		}
	}

	//closing tags
})();