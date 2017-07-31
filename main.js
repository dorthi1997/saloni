/*$('#user-email').on('keypress',function() {
        var email = $('#user-email').val()
        var message = 'Welcome Back, ' + email;
        $('.welcome-message').text(message);
    });*/

	var foodieApp = angular.module('foodieApp',['ngRoute']);

	foodieApp.config(function ($routeProvider) {
		$routeProvider
		.when('/',{
			templateUrl: 'pages/login.html',
			controller: 'loginController'
		})
		.when('/home',{                               //rounting k liye so tht ki jo url likha hai wo page khul jae
			templateUrl: 'pages/home.html',
			controller: 'mainController'
		})
		.when('/restaurant/:id', {
			templateUrl: 'pages/restaurant.html',
			controller: 'restaurantController'
		})
	})

	foodieApp.controller('loginController',function($scope,$location) {
	$scope.goToHome= function(){
		// console.log('Do Something')        //controller login ka
		$location.url('home')
	}
	})
	foodieApp.controller('restaurantController',function($scope,$routeParams,$http) { // controller restraunt ka
		//Empty
		//console.log($routeParams.id);
		$scope.restaurantId = $routeParams.id;     // restraunt ki list k liye array
		var restaurants = [{
		name: 'Farzi Cafe',
		address: '38/39, Level 1, Block E , Inner Circle, Connaught Place',
		location: 'Connaught Place',
		category: 'Casual Dining, Bar',
		vote: '4.2',
		cuisines: 'Modern Indian',
		cost: '2200',
		hours: '12 Noon to 1 AM (Mon-Sun)',
		id:1,
		image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/dabd30bd0b000ea859ada9a08a0132fc.jpg'
		},
		{
		name: 'Dominos',
		address: '12/24, Level 1, Block A , Big Bazzar, Baddi',
		location: 'Baddi',
		category: 'Pizza',
		vote: '4.7',
		cuisines: 'Italian',
		cost: '500',
		hours: '12 Noon to 12 AM (Mon-Sun)',
		id :2,
		bestDish: {      //object of object bh ho skta hai
		name: 'Corn Pizza',
		image: 'http://noblepig.com/images/2016/06/Avocado-and-Three-Bean-Salad-is-perfect-for-a-summertime-barbecue-side-dish.JPG'
						 },
		image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt_2XFEpZvUI_wAMAqEnnWoVr61jAej6k4VgzwRr-yONk2Es-h'
		},
		{
		name: 'Saffron',
		address: 'Near Sidhant Hospital Basantibagh Baddi 173205 ',
		location: 'Baddi',
		category: 'Family Restaurant',
		vote: '3.9',
		cuisines: 'Indian',
		cost: '1000',
		hours: '8 AM to 11 PM (Mon-Sun)',
		id:3,
		image: 'http://lovethiscitytv.com/wp-content/uploads/2015/06/Top-25-New-Restaurants-in-Toronto2.jpeg'
		},
		{
		name: 'Deeps',
		address: 'Baddi By-pass',
		location: 'Baddi',
		category: 'Casual Dining',
		vote: '4.3',
		cuisines: 'Indian',
		cost: '400',
		hours: '10 AM to 12 AM (Mon-Sun)',
		id :4,
		image: 'http://restaurant.business.brookes.ac.uk/images/slideshow/restaurant.jpg'
		},
		{
		name: 'Pizza Nation',
		address: ' Shop No. 25 A, City Center Complex, Panchkula, sec-10',
		location: 'Panchkula',
		category: 'Pizza',
		vote: '4.4',
		cuisines: 'Italian',
		cost: '2200',
		hours: '11 AM to 11 PM (Mon-Sun)',
		id :5,
		bestDish: {
		name: 'Corn Pizza',
		image: 'http://noblepig.com/images/2016/06/Avocado-and-Three-Bean-Salad-is-perfect-for-a-summertime-barbecue-side-dish.JPG'
						},
		image: 'https://media.timeout.com/images/101564675/630/472/image.jpg'
	}];

	$scope.restaurant = restaurants[$routeParams.id - 1];

		$scope.getIngredients = function(url) {
		// Do something
		var data = '{"inputs":[{"data":{"image":{"url":"' + url + '"}}}]}'
		    $http({
		        'method': 'POST',
		        'url': 'https://api.clarifai.com/v2/models/bd367be194cf45149e75f01d59f77ba7/outputs', // claafai ko bheji gyi reqst
		        'headers': {
		            'Authorization': 'Key dac3adfc29b14c77a008b3d7addc6166',
		            'Content-Type': 'application/json'
		        },
		        'data': data
		       /* success: function (response) {
		           // console.log(response.outputs[0]);
					var ingredients = response.outputs[0].data.concepts;
		            var list = '';
		            for (var i =0;i < ingredients.length;i++) {
		                list += '<div class="ingredient">' + ingredients[i].name + '</div>'
		            }
		           // $('.ingredients').html(list);
		        },
		        error: function (xhr) {
		           // console.log(xhr);
		        } */
		    }).then(function (response) {
									var ingredients = response.data.outputs[0].data.concepts;
							for (var i =0;i <ingredients.length;i++) {
							$scope.ingredients.push(ingredients[i].name);
							}
	    		// $('.ingredients').html(list);
	    		//console.log(list);
	        }, function (xhr) {
	        	console.log(xhr);
	        })
		}

		//todo list

		$scope.ingredients = [];


		$scope.toDoList = function(){


			 var todoarray = angular.copy($scope.ingredients);

				$scope.todoList = [];
				for(var i = 0 ; i<todoarray.length; i++){
				  $scope.todoList.push({todoText:todoarray[i], done:false});
				}

			   $scope.remove = function() {
			       var oldList = $scope.todoList;
			       $scope.todoList = [];
			       angular.forEach(oldList, function(x) {
			           if (!x.done) $scope.todoList.push(x);
			       });
			   };

			   $scope.done = function() {

			   		console.log("hhhh");
			   	//	donee=!donee;
			   		//$.text-decoration: overline;
			   }
			 }

});





	//controller bnaya h....
	foodieApp.controller('mainController',function($scope) {
		//what it will do.....
		$scope.restaurants = [{
		name: 'Farzi Cafe',
		address: '38/39, Level 1, Block E , Inner Circle, Connaught Place',
		location: 'Connaught Place',
		category: 'Casual Dining, Bar',
		vote: '4.2',
		cuisines: 'Modern Indian',
		cost: '2200',
		hours: '12 Noon to 1 AM (Mon-Sun)',
	 id:1,
		image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/dabd30bd0b000ea859ada9a08a0132fc.jpg'
	},
	{
		name: 'Dominos',
		address: '12/24, Level 1, Block A , Big Bazzar, Baddi',
		location: 'Baddi',
		category: 'Pizza',
		vote: '4.7',
		cuisines: 'Italian',
		cost: '500',
		hours: '12 Noon to 12 AM (Mon-Sun)',
	 id :2,
		image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt_2XFEpZvUI_wAMAqEnnWoVr61jAej6k4VgzwRr-yONk2Es-h'
	},
	{
		name: 'Saffron',
		address: 'Near Sidhant Hospital Basantibagh Baddi 173205 ',
		location: 'Baddi',
		category: 'Family Restaurant',
		vote: '3.9',
		cuisines: 'Indian',
		cost: '1000',
		hours: '8 AM to 11 PM (Mon-Sun)',
	 id:3,
		image: 'http://lovethiscitytv.com/wp-content/uploads/2015/06/Top-25-New-Restaurants-in-Toronto2.jpeg'
	},
	{
		name: 'Deeps',
		address: 'Baddi By-pass',
		location: 'Baddi',
		category: 'Casual Dining',
		vote: '4.3',
		cuisines: 'Indian',
		cost: '400',
		hours: '10 AM to 12 AM (Mon-Sun)',
	 id :4,
		image: 'http://restaurant.business.brookes.ac.uk/images/slideshow/restaurant.jpg'
	},
	{
		name: 'Pizza Nation',
		address: ' Shop No. 25 A, City Center Complex, Panchkula, sec-10',
		location: 'Panchkula',
		category: 'Pizza',
		vote: '4.4',
		cuisines: 'Italian',
		cost: '2200',
		hours: '11 AM to 11 PM (Mon-Sun)',
	 id :5,
		image: 'https://media.timeout.com/images/101564675/630/472/image.jpg'
	}
]

});
	
