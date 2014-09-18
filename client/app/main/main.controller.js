'use strict';

angular.module('projectApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.videoResults = [];

    $http.get('/dashboard').success(function(videoResults) {
      $scope.videoResults = videoResults;
    });

  });
