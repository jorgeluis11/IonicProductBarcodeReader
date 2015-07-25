// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}).controller("wineController", ["$scope", "$cordovaBarcodeScanner", "$http",'$ionicLoading', function($scope,  $cordovaBarcodeScanner, $http, $ionicLoading) {
    $scope.product = undefined;
    $scope.found = false;
    $scope.wine = {
          name:"Ferreira Porto Tawny",
          barcode:"739949025033",
    };
 
    $scope.scanBarcode = function() {
      imageData = undefined;
      $cordovaBarcodeScanner.scan().then(function(imageData) {
        $scope.product = undefined;
        
        var barcode = imageData.text;

            $ionicLoading.show({
            templateUrl: 'templates/loading.html'
          });
          $http.get("https://tpinterview.herokuapp.com/getWine/",
            {
              params:{
              barcode:barcode
            }
          }).success(function(data){
            if (data.barcode) 
              {
              $scope.found = true;
              $scope.product = {text: data.barcode,
                           name: data.name
                };
              }
            else
              {
                $scope.found = false;
                $scope.product = {text: barcode,
                           name: data.name
                          };
              }
            
            imageData = undefined
            $ionicLoading.hide();
          }).error(function(){
              $scope.found = false;
              $ionicLoading.hide();
          });
        }, function(error) {
              $scope.found = false;
              $ionicLoading.hide();
        });
    };
   
 
}]);
