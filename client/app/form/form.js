angular.module("sqrtl.form", ['uiGmapgoogle-maps','ngTouch'])

.controller("FormController", function($scope, $state, Adventures, LocationFactory, $touch, $http){

  $touch.ngClickOverrideEnabled(true);

  $scope.geocoder = new google.maps.Geocoder();
  $scope.adventure = {};
  $scope.cll = undefined;
  $scope.cllYelp = undefined;
  $scope.calculating = false;
  $scope.location = undefined;
  $scope.emoji = false;
  $scope.brain = {
    emoticons: {
      happy: false,
      sad: false,
      crying: false,
      lazy: false,
      energetic: false,
      drunk: false,
      nervous: false,
      tired: false,
      angry: false,
      sick: false,
      smug: false
    }
  };

  $scope.getLocationAndCategory = function(location, category){
    Adventures.requestAdventures(location, category, $scope.cllYelp, $scope.brain)
      .then(function(data) {
        console.log(data);
        return true;
      })
      .then(function(){
        $scope.data = window.localStorage.getItem('data')[0];

      })
      .then(function(){
        $state.go('adventure');
      });
  };

  $scope.findMe = function(){
    $scope.calculating = true;
    Adventures.geoFindMe(function(success){
      $scope.$apply(function(){
        $scope.cll = {latitude: success.coords.latitude, longitude: success.coords.longitude};
        $scope.cllYelp = success.coords.latitude + "," + success.coords.longitude;
        LocationFactory.setCoordinates($scope.cll);
        console.log("cll", $scope.cll);
        $scope.reverseGeocode();
        $scope.calculating = false;
      });
    });
  };

  $scope.reverseGeocode = function(){

    var latlng = new google.maps.LatLng($scope.cll.latitude, $scope.cll.longitude);
    $scope.geocoder.geocode({'latLng': latlng}, function(results, status){
      if (status == google.maps.GeocoderStatus.OK) {
        $scope.$apply(function(){
          console.log("geocode results ", results[0].formatted_address);
          $scope.location = results[0].formatted_address;
        });
      } else {
        console.log("Geocoder failed due to: " + status);
      }
    });
  };

  $scope.askJamie = function() {
    $http({
      method: 'POST',
      url: '/api/brain',
      data: $scope.brain
    }).then(function(res) {
      $scope.category = res.data.type;
    });
  };

  $scope.showEmoji = function() {
    $scope.emoji = !$scope.emoji;
  }

  // $scope.addEmoji = function(value) {
  //   $scope.chosen.push(value);
  //   console.log($scope.chosen);
  // }

});
