// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ionic.service.core','ionic.service.push','ngCordova','ionic.service.analytics', 'starter.controllers','ionic.contrib.ui.cards'])

.run(function($ionicPlatform, $ionicAnalytics) {
  $ionicPlatform.ready(function()   {

      $ionicAnalytics.register();

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

 .config(['$ionicAppProvider', function($ionicAppProvider) {
        // Identify app
        $ionicAppProvider.identify({
            // The App ID (from apps.ionic.io) for the server
            app_id: '36c7181f',
            // The public API key all services will use for this app
            api_key: 'c8dc2667a6cd4d8e064d29b220b87545ea599544fc7ae468',
            // Set the app to use development pushes
            dev_push: false
        });
   }])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.landing', {
    url: "/landing",
    views: {
      'menuContent': {
        templateUrl: "templates/landing.html"
      }
    }
  })

  .state('app.trending', {
    url: "/trending",
    views: {
      'menuContent': {
        templateUrl: "templates/trending.html",
          controller: 'CardsCtrl'
      }
    }
  })
    .state('app.Categories', {
      url: "/Categories",
      views: {
        'menuContent': {
          templateUrl: "templates/Categories.html",
          controller: 'CategoryCtrl'
        }
      }
    })

  .state('app.prodList', {
    url: "/prodList/:Id/:title",
    views: {
      'menuContent': {
        templateUrl: "templates/prodList.html",
        controller: 'BrwCtrl'
      }
    }
  })
      .state('app.prod', {
          url: "/prod/:prod_id",
          views: {
              'menuContent': {
                  templateUrl: "templates/prod.html",
                  controller: 'ProdCtrl'
              }
          }
      })

//      .state('app.prodImage', {
//          url: "/prodImage/:ImagePath",
//          views: {
//              'menuContent': {
//                  templateUrl: "templates/prodImage.html",
//                  controller:'ProdImageCtrl'
//
//              }
//          }
//      })


      .state('app.enquiry', {
          url: "/enquiry/:prod_id",
          views: {
              'menuContent': {
                  templateUrl: "templates/enquiry.html",
                  controller: 'AppCtrl'
              }
          }
      })


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/landing');
});
