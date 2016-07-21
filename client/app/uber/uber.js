angular.module("sqrtl.uber", [])
  .controller("UberController", function($scope, Adventures){

    var destination = { latitude: '0', longitude: '0'};
    var current = { latitude: '0', longitude: '0'};


    $scope.geo = navigator.geolocation;

    $scope.geoFindMe = function(callback){
      $scope.geo.getCurrentPosition(function(success){
        callback(success);
      });
    };


   $scope.getPrice = function(){

    Adventures.uberPrice()
    .then(function(result){
      console.log('price ', result);
    });

   };

    $scope.geoFindMe(function(success){
      $scope.$apply(function(){
        $scope.current = {latitude: success.coords.latitude, longitude: success.coords.longitude};
        $scope.destination = {latitude: window.localStorage.getItem('latitude'), longitude: window.localStorage.getItem('longitude')};
        console.log($scope.current);
        console.log($scope.destination);
      });
    });
  });
