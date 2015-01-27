(function (angular) {

  'use strict';

  function mainCtrl() {
    this.awesomePeople = [
        'JFK',
        'Tyrion Lannister',
        'R2D2'
      ];
  }

  angular.module('demoApp')
    .controller('MainCtrl', mainCtrl);

}(window.angular));
