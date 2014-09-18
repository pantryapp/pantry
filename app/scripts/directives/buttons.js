directives.directive('buttonBuy', function(){
	return{
		restrict: 'A',
		replace:true,
		templateUrl: 'views/buttons/button-buy.html'
	}
});

directives.directive('buttonSave', function(){
	return{
		restrict: 'A',
		replace:true,
		templateUrl: 'views/buttons/button-save.html'
	}
});

directives.directive('buttonClose', function(){
	return{
		restrict: 'A',
		replace:true,
		templateUrl: 'views/buttons/button-close.html'
	}
});

directives.directive('buttonDelete', function(){
	return{
		restrict: 'A',
		replace:true,
		templateUrl: 'views/buttons/button-delete.html'
	}
});

directives.directive('buttonEdit', function(){
	return{
		restrict: 'A',
		replace:true,
		templateUrl: 'views/buttons/button-edit.html'
	}
});

directives.directive('buttonOutofstock', function(){
	return{
		restrict: 'A',
		replace:true,
		templateUrl: 'views/buttons/button-outofstock.html'
	}
});