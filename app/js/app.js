
/* App module */
var contactListApp = angular.module('contactListApp', ['ui.sortable']);

/* App controller */
contactListApp.controller('contactListCtrl', function($scope, $http) {

	$scope.list = {
	    "contacts": [
	        {
	            "first_name": "Джон",
	            "last_name": "Кокрофт",
	            "email": "cockcroft@example.com"
	        },
	        {
	            "first_name": "Гульельмо",
	            "last_name": "Маркони",
	            "email": "marconi@example.com"
	        },
	        {
	            "first_name": "Роберт",
	            "last_name": "Милликен",
	            "email": "millikan@example.com"
	        },
	        {
	            "first_name": "Луи",
	            "last_name": "де Бройль",
	            "email": "de-broglie@example.com"
	        },
	        {
	            "first_name": "Виталий",
	            "last_name": "Гинзбург",
	            "email": "ginzburg@example.com"
	        }
	    ]
	};


	$scope.sendData = function() {
		$http.post('/url', angular.toJson($scope.list)).
		success(function(data, status, headers, config) {
			$scope.statusSend = 'ОК';
			console.log("OK: data send!");
		}).
		error(function(data, status, headers, config) {
			$scope.statusSend = 'ERROR';
		   	console.log('ERROR: response status: ' + status);
		});
		setTimeout(function() {
			$scope.statusSend = '';
			$scope.$apply();
		}, 1000);
	}


	$scope.setFlagAdd = function(vol) {
		if(vol) {
		 	$scope.flagDisabled = false;
		 	$scope.flagBlock = true;
		 	$scope.first_name = $scope.last_name = $scope.email = "";
		}
		else {
			$scope.flagDisabled = true;
			$scope.flagBlock = false;
		}
		$scope.flagAdd = vol;
	}


	$scope.setFlagEdit = function(vol) {
		$scope.flagEdit = vol;
		if(vol == -1) {
			$scope.flagDisabled = false;
			$scope.flagBlock = false;
		}
		else {
			$scope.flagDisabled = true;
			$scope.flagBlock = true;
		}
	}


	$scope.addNewContact = function(first_name, last_name, email) {
		$scope.list.contacts.push({
				               	    'first_name': $scope.first_name,
				               	    'last_name': $scope.last_name,
				               	    'email' : $scope.email
			                     });
		$scope.setFlagAdd(true);
		$scope.first_name = $scope.last_name = $scope.email = "";
	}


	$scope.deleteContact = function() {
		$scope.list.contacts.splice($scope.flagEdit, 1);
		$scope.flagEdit = -1;
		$scope.flagDisabled = false;
		$scope.flagBlock = true;
	}


	$scope.changeData = function(first, last, eml) {
		if(first != "" && last != "" && eml != "") {
			$scope.flagBlock = true;
		}
		else {
			$scope.flagBlock = false;
		}
	}
	  
});
