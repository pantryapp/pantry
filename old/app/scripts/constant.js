(function() {

  'use strict';

  angular
    .module('pantryApp')
    .constant('apiEndPoint', {
      dev: 'http://0.0.0.0:3000',
      prod: 'http://pantryapp-api.herokuapp.com'
    });

})();
