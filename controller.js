var app=angular.module('nodeModule',[]);

app.controller('nodeusersController',function($scope,$http,$interval){
	//load_pictures();
	
	// $interval(function(){
	// 	load_pictures();
	// },300);
	
	$scope.getUsers = function(){
		$http.get('http://localhost:3000/records').success(function(data){
			console.log(data);
			$scope.users=data;
		});
	};
});