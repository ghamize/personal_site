//app main directory

(function(){
	'use strict';

	angular
		.module('siteApp',['ui.router']);

	angular
		.module('siteApp')
		.config(function($stateProvider,$urlRouterProvider,$httpProvider){

				$urlRouterProvider.otherwise('/home');

				$stateProvider
				.state('home', {
					url: '/home',
					templateUrl: 'site/partials/main.html',
					controller: 'MainCtrl as ctrl',
					//resolve posts before main page loads
				/*	resolve:{
						posts:function(postSrv){
							return postSrv.getPosts();
						},
						post: function(){
							return undefined;
						}
					}*/
				})

				.state('about', {
					url:'/about_me',
					templateUrl:'site/partials/about_me.html',
					controller: 'MainCtrl as ctrl',
					//resolve posts
				/*	resolve:{
						post:function(postSrv,$stateParams){
							return postSrv.getPost($stateParams.postId);
						}
					}*/
				})

				.state('academic',{
					url:'/academic',
					templateUrl:'site/partials/academic_info.html',
					controller: 'MainCtrl as ctrl',
					//resolve posts
				/*	resolve:{
						post:function(postSrv,$stateParams){
							return postSrv.getPost($stateParams.postId);
						}
					}*/
				})

				.state('publications',{
					url:'/publications',
					templateUrl:'site/partials/publications.html',
					controller: 'MainCtrl as ctrl',
					//resolve posts
					/*resolve:{
						post:function(postSrv,$stateParams){
							return postSrv.getPost($stateParams.postId);
						}
					}*/
				})

				.state('journal', {
					url:'/journal',
					templateUrl:'site/partials/journal.html',
					controller: 'MainCtrl as ctrl',
					//resolve posts
					/*resolve:{
						post:function(postSrv,$stateParams){
							return postSrv.getPost($stateParams.postId);
						}
					}*/
				})

				.state('tumblr',{
					url:'/tumblr',
					templateUrl:'site/partials/tumblr.html',
					//controller:'MainCtrl as ctrl',
				})

				.state('contact', {
					url:'/contact',
					templateUrl:'site/partials/contact.html',
					controller: 'MainCtrl as ctrl',
					/*//resolve posts
					resolve:{
						post:function(postSrv,$stateParams){
							return postSrv.getPost($stateParams.postId);
						}
					}*/
				})

				.state('submitted', {
					url:'/submitted',
					templateUrl:'site/partials/submitted.html',
					controller: 'MainCtrl as ctrl',
				})

				//admin side

				.state('admin',{
					url:'/admin',
					templateUrl:'site/partials/admin.html',
					controller:'AdminCtrl as ctrl',
					//resolve posts before admin page loads
					/*resolve:{
						posts:function(postSrv){
							return postSrv.getPosts();
						}
					}*/
				})

				//dashboard admin

				.state('admin.dash',{
					url:'/dashboard',
					templateUrl:'site/partials/admin-dash.html',
					controller:'AdminCtrl as ctrl',
				})

				//dashboard add post

				.state('admin.add_post',{
					url:'/add_post',
					controller:'PostCtrl as ctrl',
					templateUrl:'site/partials/admin-add-post.html'
				})

				//dashboard edit post

				.state('admin.edit_post',{
					url:'/edit_post/:postId',
					controller:'PostCtrl as ctrl',
					templateUrl:'site/partials/admin-edit-post.html',
				})

				//auth

				.state('auth',{
					url:'/auth',
					templateUrl:'site/partials/auth-main.html',
					controller:'AuthCtrl as ctrl',
				});

			//http provider

			$httpProvider.interceptors.push(function(){
				return {
					request: function(config){
						return config;
					},
					response: function(response){
						var auth_token = response.headers('authentication');
						if(localStorage.authToken == undefined && auth_token != null){
							localStorage.authToken = auth_token;
						}
						return response;
					}
				}
			});


		});



})();