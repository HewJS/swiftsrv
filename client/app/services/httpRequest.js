angular.module('sqrtl.httpRequest', [])
  .factory('Adventures', function($http){
    //requests venues that meet location and category criteria
    //TODO: add user parameters and such
    var data = [];

    var requestAdventures = function(location, category){


      var url = '/api/getYelp';
      //actual url is '/api/getYelp'
      return $http({
        method: 'POST',
        url: url,
        data: JSON.stringify({
          term: category,
          location: location
        })
      }).then(function(resp){
        // data.push(resp);
        // resp = JSON.parse(resp);
        data = resp.data.businesses.map(function(datum){
          return {
            name: datum.name,
            image: datum.image_url.replace(/ms.jpg/i, 'o.jpg'),
            isClosed: datum.is_closed,
            rating: datum.rating,
            ratingImg: datum.rating_img_url,
            reviewCount: datum.review_count,
            snippet: datum.snippet,
            location: datum.location
          };
        });
        return data;
      })
      .catch(function(err){
        console.error(err);
      });
    };

    var dataShift = function(){
      return data.shift();
    };


    return {
      requestAdventures: requestAdventures,
      dataShift: dataShift
    };

  });
  // .factory('UserResponses', function($http){
  //   //tells the database if a user accepted suggestions
  //   var initialReaction = function(userName, restauranArray){
  //     return $http({
  //       method: 'POST',
  //       url: '/adventure',
  //       data: JSON
  //     }).then(functon(){
  //       //should do something.
  //     })
  //   }

  // });