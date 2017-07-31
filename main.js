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
	name: 'Uncle JacKs',
	address: 'Booth 11, Sector 8, Chandigarh',
	location: 'Sec 8,Chandigarh',
	category: 'American, Beverages',
	vote: '4.5',
	cuisines: 'American, Beverages, Desserts',
	cost: '800',
	hours: ' 10 AM to 11 PM (Mon-Sun)',
	image: 'https://scontent.cdninstagram.com/t51.2885-15/s480x480/e35/13658408_490009667863501_565993311_n.jpg?ig_cache_key=MTI5ODMzMTYyMjY4ODQ2MTUzMg%3D%3D.2',
                                id:5,
},
		{
		name: 'Pizza Junction',
		address: 'Sector 26,Chandigarh',
		location: 'Chandigarh',
		category: 'Pizza',
		vote: '4.7',
		cuisines: 'Italian',
		cost: '900',
		hours: '12 Noon to 12 AM (Mon-Sun)',
		id :2,
		bestDish: {      //object of object bh ho skta hai
		name: 'Corn Pizza',
		image: 'http://noblepig.com/images/2016/06/Avocado-and-Three-Bean-Salad-is-perfect-for-a-summertime-barbecue-side-dish.JPG'
						 },
		image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt_2XFEpZvUI_wAMAqEnnWoVr61jAej6k4VgzwRr-yONk2Es-h'
		},
		{
	name: 'Urban Cafe',
	address: 'Hyatt Regency,178,Chandigarh Industrial Area',
	location: 'Sec 28,Chandigarh',
	category: 'Fine Dinning',
	vote: '4.5',
	cuisines: 'Chinese, Fast Food, Mexican',
	cost: '900',
	hours: ' 11 AM to 10:30 PM (Mon-Sun)',
	image: 'http://drop.ndtv.com/albums/COOKS/pasta-vegetarian/pastaveg_640x480.jpg',
             id:8,
},
		{
	name: 'Food@u',
	address: 'Sector 21, Chandigarh',
	location: 'Sec 21,Chandigarh',
	category: 'Continental,North Indian',
	vote: '4.1',
	cuisines: 'Pizza, Fast Food',
	cost: '700',
	hours: ' 11 AM to 10:30 PM (Mon-Sun)',
	image: 'https://s-media-cache-ak0.pinimg.com/736x/ec/60/5a/ec605a2c4d9a830650f8c4fbf1c36935--bengali-food-roll-recipe.jpg',
    id:9,
},
		{
	name: 'Dibbavala',
	address: 'Phase 5,Mohali',
	location: 'Phase 5,Mohali',
	category: 'Indian, Fast Food',
	vote: '4.2',
	cuisines: 'Pizza, Fast Food',
	cost: '900',
	hours: ' 11 AM to 10:30 PM (Mon-Sun)',
	image: 'http://i.ndtvimg.com/i/2016-05/aloo_625x350_51464600645.jpg',
    id:10,
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
	name: 'Uncle JacKs',
	address: 'Booth 11, Sector 8, Chandigarh',
	location: 'Sec 8,Chandigarh',
	category: 'American, Beverages',
	vote: '4.5',
	cuisines: 'American, Beverages, Desserts',
	cost: '800',
	hours: ' 10 AM to 11 PM (Mon-Sun)',
	image: 'https://scontent.cdninstagram.com/t51.2885-15/s480x480/e35/13658408_490009667863501_565993311_n.jpg?ig_cache_key=MTI5ODMzMTYyMjY4ODQ2MTUzMg%3D%3D.2',
                                id:5,
},
		{
		name: 'Pizza Junction',
		address: 'Sector 26,Chandigarh',
		location: 'Chandigarh',
		category: 'Pizza',
		vote: '4.7',
		cuisines: 'Italian',
		cost: '900',
		hours: '12 Noon to 12 AM (Mon-Sun)',
		id :2,
		image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt_2XFEpZvUI_wAMAqEnnWoVr61jAej6k4VgzwRr-yONk2Es-h'
		},
		{
	name: 'Urban Cafe',
	address: 'Hyatt Regency,178,Chandigarh Industrial Area',
	location: 'Sec 28,Chandigarh',
	category: 'Fine Dinning',
	vote: '4.5',
	cuisines: 'Chinese, Fast Food, Mexican',
	cost: '900',
	hours: ' 11 AM to 10:30 PM (Mon-Sun)',
	image: 'http://drop.ndtv.com/albums/COOKS/pasta-vegetarian/pastaveg_640x480.jpg',
             id:8,
},
		{
	name: 'Food@u',
	address: 'Sector 21, Chandigarh',
	location: 'Sec 21,Chandigarh',
	category: 'Continental,North Indian',
	vote: '4.1',
	cuisines: 'Pizza, Fast Food',
	cost: '700',
	hours: ' 11 AM to 10:30 PM (Mon-Sun)',
	image: 'https://s-media-cache-ak0.pinimg.com/736x/ec/60/5a/ec605a2c4d9a830650f8c4fbf1c36935--bengali-food-roll-recipe.jpg',
    id:9,
},
		{
	name: 'Dibbavala',
	address: 'Phase 5,Mohali',
	location: 'Phase 5,Mohali',
	category: 'Indian, Fast Food',
	vote: '4.2',
	cuisines: 'Pizza, Fast Food',
	cost: '900',
	hours: ' 11 AM to 10:30 PM (Mon-Sun)',
	image: 'http://i.ndtvimg.com/i/2016-05/aloo_625x350_51464600645.jpg',
    id:10,
}
]

});
