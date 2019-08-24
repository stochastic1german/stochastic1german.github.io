var app = angular.module('myApp', ['ui.router']);  // the array is the list of dependencies
var fref = firebase.database().ref();
app.controller('MainCtrl', function($scope){
	
});

app.controller('DifficultyCtrl', function($scope) {
	var ad = 0, rd = 0, mt = 0, ot = 0, option = 0, audio, index = 0, endTime, startTime;
	$scope.word = words[index].word;
	$scope.page = 1;

	// Page 1
	$scope.setAD = function(value){
		ad = value;
		console.log(ad);
	}
	$scope.setRD = function(value){
		rd = value;
		console.log(rd);
	}
	$scope.next12 = function(){
		console.log("from Dpage");
		fref.child("user").child("ad").set(ad);
		fref.child("user").child("rd").set(rd);

		startTime = new Date();
		$scope.page = 2;
	}

	// Page 2
	$scope.next23 = function(){
		endTime = new Date();
		mt = endTime - startTime;
		$scope.page = 1;
		console.log(index, ad, rd, option, ot, mt);
		
		// Next Data
		index = index + 1;
		$scope.word = words[index].word;
		$scope.option = 0;
	}

	$scope.setOption = function(value){
		$scope.option = value;
		option = value;
		endTime = new Date();
		ot = endTime - startTime;
		startTime = endTime;
		option = value;
		console.log(option);
		if (option == 1)
		{
			$scope.url = words[index].img;
		}
	}

	$scope.playAudio = function() {
		audio = new Audio(words[index].audio);
		audio.play();
	}

	$scope.getImage = function() {
	}

});

app.config(function($stateProvider, $locationProvider) {
    $locationProvider.hashPrefix('');  //setting a blank string as the default hash prefix
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'index.html',
            controller: "MainCtrl"
        })
        .state('dpage', {
            url: '/dpage',
            templateUrl: 'dpage.html',
            controller: "DifficultyCtrl"
        })
        .state('mpage', {
            url: '/mpage',
            templateUrl: 'mpage.html',
            controller: "ModularCtrl"
        })
});