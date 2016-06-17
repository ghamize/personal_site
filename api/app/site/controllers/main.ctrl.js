//main controller

(function(){
	angular
		.module('siteApp')
		.controller('MainCtrl',MainCtrl);

	function MainCtrl($scope,postSrv,$state,$stateParams,post){
		var mainVm = this;
		//capturing resolved posts for view
		mainVm.posts = postSrv.posts;

		mainVm.curPage = 0;
		mainVm.postsPerPage = 4;
		mainVm.numPages = Math.ceil(mainVm.posts.length/mainVm.postsPerPage);

		mainVm.categories = [
		{label:'All',value:''},
		{label:'General Health',value:'general health'},
		{label:'Fitness',value:'fitness'},
		{label:'Eating Habits',value:'eating habits'},
		{label:'Diseases',value:'diseases'},
		{label:'Healthcare System',value:'healthcare system'},
		{label:'Miscellaneous',value:'miscellaneous'},
		];

		//Viewing post

		mainVm.viewPost = function(post) {
			$state.go('main.view-post',{postId: post.id});
		};

		//watch for changes to model data
		$scope.$watch(function(){
			return postSrv.posts;
		}, function(newValue) {
			mainVm.posts = postSrv.posts;
		});


	}
	
})();