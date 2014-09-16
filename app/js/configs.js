(function(){

'use strict';

var pantryConfigs = angular.module('pantryAppConfigs', []);

pantryConfigs.provider('_configs', function(){


	this.$get = ['PantryStorage', function(PantryStorage){

		var self   = this,
			types = {
				'BOOLEAN': 'Boolean',
				'STRING' : 'String'
			},
			params = PantryStorage.getConfigs({
				'autoFocus':{
					key:'autoFocus',
					name:"Auto focus",
					description:"Focus automatiquement le formulaire d'ajout",
					type:types['BOOLEAN'],
					value:false
				},
				'showForm':{
					key:'showForm',
					name:"Formulaire d'ajout",
					description:"Toggle les formulaires",
					type:types['BOOLEAN'],
					value:true
				}
			});
	

		var getAConfig = function(key){
			return params[key];
		};

		var setAConfig = function(key, value){
			params[key].value = value;
		};

		var getConfigs = function(){
			return params;
		};

		var saveConfigs = function(configs){
			params = configs;
			PantryStorage.saveConfigs(params);
		}

		return{
			get:getAConfig,
			set:setAConfig,
			getAll:getConfigs,
			types:types,
			save:saveConfigs
		};
	}];

});

pantryConfigs.directive('configs', function(){
	return{
		restrict: 'E',
		templateUrl:'partials/configs/configs.html',
		controller:'ConfigsController'
	}
});

pantryConfigs.directive('config', function(){
	return{
		restrict: 'E',
		templateUrl:'partials/configs/config.html',
		controller:'ConfigController'
	}
});

pantryConfigs.controller('ConfigsController', [
	'$scope',
	'_configs', 
	function($scope, _configs){
		$scope.configs 		  = _configs.getAll();
		$scope.config_types   = _configs.types;
	}]);

pantryConfigs.controller('ConfigController', [
	'$scope',
	'_configs', 
	'PantryStorage',
	function($scope, _configs, PantryStorage){
		$scope.toggle = function(){
			_configs.set($scope.config.key, !$scope.config.value);
			_configs.save($scope.configs);
		}
	}]);


}).call(this);