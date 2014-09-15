(function(){

'use strict';

var pantryOptions = angular.module('pantryAppOptions', []);

pantryOptions.provider('_options', function(){

	this.$get = [function(){
		var self   = this,
			params = {
				'autoFocus':{
					key:'autoFocus',
					name:"Auto focus",
					description:"Focus automatiquement le formulaire d'ajout",
					value:false
				},
				'showForm':{
					key:'showForm',
					name:"Formulaire d'ajout",
					description:"Toggle les formulaires",
					value:true
				}
			};

		var getAnOption = function(key){
			return params[key];
		};

		var setAnOption = function(key, value){
			params[key].value = value;
		};

		var getOptions = function(){
			return params;
		};

		return{
			get:getAnOption,
			set:setAnOption,
			getAll:getOptions
		};
	}];

});

pantryOptions.directive('options', function(){
	return{
		restrict: 'E',
		templateUrl:'partials/options/options.html',
		controller:'OptionsController'
	}
});

pantryOptions.directive('option', function(){
	return{
		restrict: 'E',
		templateUrl:'partials/options/option.html',
		controller:'OptionController',
		link:function(scope,element,attributes){

		}
	}
});

pantryOptions.controller('OptionsController', [
	'$scope',
	'_options', 
	function($scope, _options){
		$scope.options = _options.getAll();
	}]);

pantryOptions.controller('OptionController', [
	'$scope',
	'_options', 
	function($scope, _options){
		$scope.toggle = function(key, value){
			_options.set(key, !value);
		}
	}]);


}).call(this);