angular.module('starter.controllers', ['ionic.contrib.ui.cards'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$ionicPopup,loginService,$http, $q,contactusService,$ionicLoading,$stateParams,$state) {
  // Form data for the login modal
 // $scope.loginData = {};
        $scope.loginData = {"email_id": "", "password": "", "logindate": new Date(), "company": "bulkgrass" };
        $scope.enquire = {"name": "", "mobile_no": "", "create_ts": new Date(), "email": "", "enquire_from": "bulkgrass","created_by": "","product_code":"","additional_remarks":"Enquiry From Mobile APP"}


  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

        $scope.placeorder = function() {
            var alertPopup = $ionicPopup.alert({
                title: 'Enquiry Status',
                template: 'Thank You! Your Enquiry has been sent. Our team will get in touch with you soon'
            });
            alertPopup.then(function(res) {
                console.log('Your Enquiry has been sent');
            });
        };


  $scope.doLogin = function() {
    //  loginData

      loginService.IsValidUser($http, $q, $scope.loginData).then(function (data) {
              //Update UI using data or use the data to call another service
              //$scope.message = data;
              alert(data[0].message);

              if (data[0].message == "Log In Successfully") {

              }
              else {
                  $scope.show_loader=false;
                  //$scope.message = data.value;
                  $scope.message = data[0].message;
                  $scope.signin_text = "Sign In"

              }


          },
          function () {

              $scope.error = error;
          });
      console.log('Doing login', $scope.loginData);

      $timeout(function() {
          $scope.closeLogin();
      }, 1000);
  }

        $scope.sendEnquiry= function(){

           $scope.enquire.product_code = $stateParams.prod_id;
            $scope.enquire.created_by= $scope.enquire.name;


            $scope.loading = $ionicLoading.show({
                content: '<i class="icon ion-loading-c"></i>',
                animation: 'fade-in',
                showBackdrop: false,
                maxWidth: 50,
                showDelay: 0
            });

            contactusService.insertenquireinfo($http, $q, $scope.enquire ,$ionicLoading).then(function (data) {

                    $ionicLoading.hide();


                    $scope.placeorder();

                    $state.go('app.landing');

                },
                function () {

                    $scope.error = error;
                });
        }
 })




.controller('CategoryCtrl', function($scope,MenuService,$http, $q,$ionicLoading) {
  $scope.cat = [
    { title: 't shirts', id: '14.0' },
    { title: 'shirt', id:'15.0'},
    { title: 'accessories', id: '4.0' },
    { title: 'Accessories', id: '13.0' },
    { title: 'New', id: 5 },
    { title: 'Offers', id: 6 }
  ];

        init();
        var menu;
        function init() {
            $scope.loading = $ionicLoading.show({
                content: '<i class="icon ion-loading-c"></i>',
                animation: 'fade-in',
                showBackdrop: false,
                maxWidth: 50,
                showDelay: 0
            });
            get_all_menu();

            $scope.toggleGroup = function(menu) {
                if ($scope.isGroupShown(menu)) {
                    $scope.shownGroup = null;
                } else {
                    $scope.shownGroup = menu;
                }
            };
            $scope.isGroupShown = function(menu) {
                return $scope.shownGroup === menu;
            };


        }
        this.isLevel2 = function(val){
            if (val == 2) {
                return true;
            }
            else{
                return false;
            }
        }
        $scope.get_menu = function(name, level){

            MenuService.get_menu(name,level);
        }

        $scope.open_level1_page = function(name){

        }


        function get_all_menu(){

                var company  =   'bulkgrass' ;
                MenuService.get_all_menu($http, $q,company).then(function(data){
                        menu = data;

                        $scope.menus= menu;
                      //  $ionicLoading.hide();
                       $ionicLoading.hide();

                        if (get_ts_menu().length !=0) {
                            $scope.ts_link = _.filter(menu,function(m){ return m.name === "t shirts"})[0].id;
                            $scope.l2_ts_menu = get_level2_ts_menu();
                            $scope.l3_ts_menu = get_level3_ts_menu();
                        }
                        if (get_shirt_menu().length !=0) {
                            $scope.shirt_link = _.filter(menu,function(m){ return m.name === "shirt"})[0].id;
                            $scope.l2_shirt_menu = get_level2_shirt_menu();
                            $scope.l3_shirt_menu = get_level3_shirt_menu();
                        }
                        if (get_jack_menu().length !=0) {
                            $scope.jack_link = _.filter(menu,function(m){ return m.name === "jackets"})[0].id;
                            $scope.l2_jack_menu = get_level2_jack_menu();
                            $scope.l3_jack_menu = get_level3_jack_menu();
                        }

                        if (get_sweat_menu().length !=0) {
                            $scope.sweat_link = _.filter(menu,function(m){ return m.name === "sweat shirts"})[0].id;
                            $scope.l2_sweat_menu = get_level2_sweat_menu();
                            $scope.l3_sweat_menu = get_level3_sweat_menu();
                        }
                        if (get_caps_menu().length !=0) {
                            $scope.caps_link = _.filter(menu,function(m){ return m.name === "accessories"})[0].id;
                            $scope.l2_caps_menu = get_level2_caps_menu();
                            $scope.l3_caps_menu = get_level3_caps_menu();
                        }





                    },
                    function(){
                        //Display an error message
                        $scope.error= error;
                    });
            }



        function get_ts_menu(){

            var tmp = _.filter(menu,function(m){ return m.name === "t shirts"});
            if (tmp.length > 0){
                return _.filter(menu,function(m){ return m.name === "t shirts"});
            }
            else{
                return [];
            }
        }
        function get_shirt_menu(){
            var tmp = _.filter(menu,function(m){ return m.name === "shirt"});
            if (tmp.length > 0){
                return _.filter(menu,function(m){ return m.name === "shirt"});
            }
            else{
                return [];
            }


        }
        function get_jack_menu(){
            var tmp = _.filter(menu,function(m){ return m.name === "jackets"});
            if (tmp.length > 0){
                return _.filter(menu,function(m){ return m.name === "jackets"});
            }
            else{
                return [];
            }
        }

        function get_sweat_menu(){
            var tmp = _.filter(menu,function(m){ return m.name === "sweat shirts"});
            if (tmp.length > 0){
                return _.filter(menu,function(m){ return m.name === "sweat shirts"});
            }
            else{
                return [];
            }
        }

        function get_caps_menu(){
            var tmp = _.filter(menu,function(m){ return m.name === "accessories"});
            if (tmp.length > 0){
                return _.filter(menu,function(m){ return m.name === "accessories"});
            }
            else{
                return [];
            }
        }






        function  get_level2_ts_menu (){
            return _.where( get_ts_menu()[0].menu_items,  {level:2});
        }
        function get_level3_ts_menu (){
            return _.where( get_ts_menu()[0].menu_items,  {level:3});
        }
        function  get_level2_shirt_menu (){
            return _.where( get_shirt_menu()[0].menu_items,  {level:2});
        }
        function get_level3_shirt_menu (){
            return _.where( get_shirt_menu()[0].menu_items,  {level:3});
        }
        function  get_level2_jack_menu (){
            return _.where( get_jack_menu()[0].menu_items,  {level:2});
        }
        function get_level3_jack_menu (){
            return _.where( get_jack_menu()[0].menu_items,  {level:3});
        }
        function  get_level2_sweat_menu (){
            return _.where( get_sweat_menu()[0].menu_items,  {level:2});
        }
        function get_level3_sweat_menu (){
            return _.where( get_sweat_menu()[0].menu_items,  {level:3});
        }

        function  get_level2_caps_menu (){

            return _.where( get_caps_menu()[0].menu_items,  {level:2});
        }


        function get_level3_caps_menu (){
            return _.where( get_caps_menu()[0].menu_items,  {level:3});
        }





})

    .controller('CardsCtrl', function($scope, $ionicSwipeCardDelegate) {
        var cardTypes = [{ title: 'Do You Like This ?', image: 'http://cdn-new-annectos.s3.amazonaws.com/images/grass/z/GJ002_zoom.jpg',code:'GJ002'},
            { title: 'Do You Like This ?', image: 'http://cdn-new-annectos.s3.amazonaws.com/images/grass/n/GP033.jpg',code:'GP033' },
            { title: 'Do You Like This ?', image: 'http://cdn-new-annectos.s3.amazonaws.com/images/grass/n/GT003.jpg',code:'GT003' },
            { title: 'Do You Like This ?', image: 'http://cdn-new-annectos.s3.amazonaws.com/images/grass/n/GT052.jpg',code:'GT052' },
            { title: 'Do You Like This ?', image: 'http://cdn-new-annectos.s3.amazonaws.com/images/grass/n/GP031.jpg',code:'GP031' },
            { title: 'Do You Like This ?', image: 'http://cdn-new-annectos.s3.amazonaws.com/images/grass/n/GT012.jpg',code:'GT012' },
            { title: 'Do You Like This ?', image: 'http://cdn-new-annectos.s3.amazonaws.com/images/grass/n/GT046.jpg',code:'GT046' },
            { title: 'Do You Like This ?', image: 'http://cdn-new-annectos.s3.amazonaws.com/images/grass/n/GT053.jpg',code:'GT053' },
            { title: 'Do You Like This ?', image: 'http://cdn-new-annectos.s3.amazonaws.com/images/grass/n/GT021.jpg',code:'GT021' }];

        $scope.cards = Array.prototype.slice.call(cardTypes, 0, 0);

        $scope.cardSwiped = function(index) {
            $scope.addCard();
        };

        $scope.cardDestroyed = function(index) {
            $scope.cards.splice(index, 1);
        };

        $scope.addCard = function() {
            var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
            newCard.id = Math.random();
            $scope.cards.push(angular.extend({}, newCard));
        }

        $scope.closeLogin = function() {
            $scope.modal.hide();
        };
    })

    .controller('CardCtrl', function($scope, $ionicSwipeCardDelegate) {
        $scope.goAway = function() {
            var card = $ionicSwipeCardDelegate.getSwipeableCard($scope);
            card.swipe();
        };
        $scope.closeLogin = function() {
            $scope.modal.hide();
        };

    })

    .controller('BrwCtrl', function ( $scope, $state,
                                      $http,$q,
                                      catService,$ionicLoading,$stateParams,
                                      $ionicSlideBoxDelegate,$ionicScrollDelegate,$ionicUser,$ionicPush,$rootScope

        )
    {
        var user = $ionicUser.get();
        if(!user.user_id) {
            // Set your user_id here, or generate a random one.
            user.user_id = $ionicUser.generateGUID();
        };

        // Metadata
        angular.extend(user, {
            name: 'User',
            app: 'Grass'
        });

        $ionicUser.identify(user).then(function(){
            $scope.identified = true;
            console.log('Identified user ' + user.name + '\n ID ' + user.user_id);
            $ionicPush.register({
                    canShowAlert: true, //Should new pushes show an alert on your screen?
                    canSetBadge: true, //Should new pushes be allowed to update app icon badges?
                    canPlaySound: true, //Should notifications be allowed to play a sound?
                    canRunActionsOnWake: true, // Whether to run auto actions outside the app,
                    onNotification: function (notification) {
                        console.log('onNotification', JSON.stringify(notification));
                        // Called for each notification for custom handling
                        $scope.lastNotification = JSON.stringify(notification);
                        return true;
                    }
                }

                // Some metadata to send through the webhook for your own
                // linking of device token and user
//            {
//                "user_id": "ionic101202",
//                "email": "tester@example.com"
//          }
            ).then(function (deviceToken) {
                    console.log("deviceToken", deviceToken);
                    $scope.token = deviceToken;


                });
            return true;
        })


        $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
            //   alert("Successfully registered token " + data.token);
            console.log('Ionic Push: Got token ', data.token, data.platform);
            $scope.token = data.token;
        });

//        $ionicPush.register({
//                canShowAlert: true, //Should new pushes show an alert on your screen?
//                canSetBadge: true, //Should new pushes be allowed to update app icon badges?
//                canPlaySound: true, //Should notifications be allowed to play a sound?
//                canRunActionsOnWake: true, // Whether to run auto actions outside the app,
//                onNotification: function (notification) {
//                    console.log('onNotification', JSON.stringify(notification));
//                    // Called for each notification for custom handling
//                    $scope.lastNotification = JSON.stringify(notification);
//                }
//            }
//
//            // Some metadata to send through the webhook for your own
//            // linking of device token and user
////            {
////                "user_id": "ionic101202",
////                "email": "tester@example.com"
////          }
//        ).then(function (deviceToken) {
//                console.log("deviceToken", deviceToken);
//                $scope.token = deviceToken;
//
//
//            });


       var cat_id = $stateParams.Id;
       $scope.product_title=$stateParams.title;

        var user_info;
        init();
        function init() {

            $scope.loading = $ionicLoading.show({
                content: '<i class="icon ion-loading-c"></i>',
                animation: 'fade-in',
                showBackdrop: false,
                maxWidth: 50,
                showDelay: 0
            });


            $scope.route= function(){

                $state.href('')
            }

            var prod_list=[];
            var  productList=[];
            var each_prod_image=[];



            catService.get_prod_by_cat($http, $q,cat_id).then(function (data){


                    var prod_list=[];
                    $ionicLoading.hide();
                    prod_list = data;
                    for (var i = 0; i < prod_list.length; i++) {
                        productList.push(JSON.parse(prod_list[i].toString()));

                    }
                    $scope.product_lists=productList;


                    var x=[];
                    x =  prod_list[0].Name;


                },


                function () {

                    $ionicLoading.hide();
                    $scope.error = error;
                });

        }


    })

    .controller('LandingCtrl', function ( $scope, $state,
                                      $http,$q,
                                      catService,$ionicLoading,$stateParams,
                                      $ionicSlideBoxDelegate,$ionicScrollDelegate

        )
    {



        var cat_id = "1.3.0" ;
        $scope.product_title="T Shirts" ;
        var user_info;
        init();
        function init() {

            $scope.loading = $ionicLoading.show({
                content: '<i class="icon ion-loading-c"></i>',
                animation: 'fade-in',
                showBackdrop: false,
                maxWidth: 50,
                showDelay: 0
            });



            var prod_list=[];
            var  productList=[];
            var each_prod_image=[];



            catService.get_prod_by_cat($http, $q,cat_id).then(function (data){

                    //Update UI using data or use the data to call another service
                    var prod_list=[];
                    $ionicLoading.hide();
                    prod_list = data;
                    for (var i = 0; i < prod_list.length; i++) {
                        productList.push(JSON.parse(prod_list[i].toString()));

                    }
                    $scope.product_lists=productList;


                    var x=[];
                    x =  prod_list[0].Name;


                },


                function () {

                    $ionicLoading.hide();
                    $scope.error = error;
                });

        }


    })

    .controller('LandingCtrl2', function ( $scope, $state,
                                          $http,$q,
                                          catService,$ionicLoading,$stateParams,
                                          $ionicSlideBoxDelegate,$ionicScrollDelegate

        )
    {

        var cat_id = "1.4.0" ;
        $scope.product_title="T Shirts" ;
        var user_info;
        init();
        function init() {

            $scope.loading = $ionicLoading.show({
                content: '<i class="icon ion-loading-c"></i>',
                animation: 'fade-in',
                showBackdrop: false,
                maxWidth: 50,
                showDelay: 0
            });

            var prod_list=[];
            var  productList=[];
            var each_prod_image=[];



            catService.get_prod_by_cat($http, $q,cat_id).then(function (data){


                    var prod_list=[];
                    $ionicLoading.hide();
                    prod_list = data;
                    for (var i = 0; i < prod_list.length; i++) {
                        productList.push(JSON.parse(prod_list[i].toString()));

                    }
                    $scope.product_lists=productList;


                    var x=[];
                    x =  prod_list[0].Name;


                },


                function () {

                    $ionicLoading.hide();
                    $scope.error = error;
                });

        }


    })


    .controller('ProdCtrl', function ( $scope, $state,
                                      $http,$q,
                                      catService,$ionicLoading,$stateParams,
                                      $ionicSlideBoxDelegate,$location

        )
    {

        $scope.go = function ( path ) {
            $location.path( path );
        };
        var product_id =  $stateParams.prod_id;
        $scope.product_id = product_id.toUpperCase();
        var user_info;
        init();
        function init() {
            $scope.loading = $ionicLoading.show({
                content: '<i class="icon ion-loading-c"></i>',
                animation: 'fade-in',
                showBackdrop: false,
                maxWidth: 50,
                showDelay: 0
            });

            var product_details, parent_product, child_product;
            child_product = [];
            catService.get_productDetailsById($http, $q, product_id).then(function (data) {
                    product_details = data;
                    $ionicLoading.hide();
                    $scope.prod_details=product_details;

                    parent_product = product_details[0];
                    var myImages=[];
                    for(var q=0; q<3; q++)
                    {

                    var Image = JSON.parse(parent_product).image_urls[q].link ;
                    myImages.push(Image);

                    }
                    $scope.allImages= myImages;
                    $scope.parent_prod_details = parent_product;
                    $scope.prod_name = JSON.parse(parent_product).Name;
                    $scope.prod_id = JSON.parse(parent_product).id;
                    $scope.prod_brand = JSON.parse(parent_product).brand.toUpperCase();

                    $scope.selected_image = JSON.parse(parent_product).image_urls[0].link;
                    $scope.selected_image_zoom = JSON.parse(parent_product).image_urls[0].zoom_link;
                    $scope.description= JSON.parse(parent_product).description;

                    var process_price_logic = function (parent_product) {


                        var arr_cat, arr_sku, special_price;
                        $scope.productDetails = parent_product;
                        $scope.productDetails.mrp = parent_product.price[0].mrp;

                        var prod_price_array=parent_product.price;
                        var array_prod_price=[];
                        angular.forEach(prod_price_array, function(item) {
                            if(item.list!="" && item.list!=null)
                            {

                                if(item.max_qty<=500){
                                    item.final_offer=item.list.toFixed(0);
                                    array_prod_price.push(item);
                                }
                            }
                        });

                        $scope.product_price = array_prod_price;


                    }

                    process_price_logic(JSON.parse(parent_product));


                    if (product_details.length > 1) {
                        $scope.size_ind = true;

                        for (i = 1; i < product_details.length; i++) {

                            var child_prod_block = 0;
                            var child_prod_detail=[];
                            var child_prod_stock=[];
                            child_prod_detail=JSON.parse(product_details[i]);
                            child_prod_block =  child_prod_detail.block_number;

                            child_prod_stock=JSON.parse(JSON.parse(product_details[i]).stock);
                            if(child_prod_stock.length>0){
                                var total_stock = 0;

                                angular.forEach(child_prod_stock, function(item) {
                                    total_stock += item.stock;

                                });

                                if(child_prod_block) {

                                    total_stock = (total_stock - child_prod_block);
                                }

                                if (total_stock > 0) {
                                    $scope.out_of_stock = 0;

                                    if(total_stock < 100){
                                        $scope.stock_msg = "* Only "+total_stock+" left";
                                        child_prod_detail.stock_msg= "* Only "+total_stock+" left";
                                    }
                                    else{
                                        $scope.stock_msg = "In stock";
                                        child_prod_detail.stock_msg= "In stock";
                                    }
                                    child_prod_detail.current_stock=total_stock;

                                }
                                else {
                                    $scope.out_of_stock = 1;
                                    $scope.stock_msg = "Out of stock";
                                    child_prod_detail.current_stock=total_stock;
                                    child_prod_detail.stock_msg="Out of stock";
                                }


                            }

                            child_prod_detail.stock=child_prod_stock;
                            child_prod_detail.ord_qty="";

                            child_product.push(child_prod_detail);

                        }

                        if (child_product.length > 0) {
                            $scope.out_of_stock = 0;
                            $scope.stock_msg = "In stock";
                        }
                        else {
                            $scope.out_of_stock = 1;
                            $scope.stock_msg = "Out of stock";
                        }

                    }
                    else {
                        $scope.size_ind = false;
                        var stock = JSON.parse(parent_product).stock;

                        if (stock <= 0) {
                            $scope.out_of_stock = 1;
                            $scope.stock_msg = "Out of stock";
                        }
                        else {
                            if ((stock <= 10) && (stock > 0)) {
                                $scope.out_of_stock = 0;
                                $scope.stock_msg = "Only " + stock.toString() + " left";
                            }
                            else {
                                $scope.out_of_stock = 0;
                                $scope.stock_msg = "In stock";
                            }
                        }
                    }
                    $scope.sizes = [];



                    $scope.child_product=child_product;



                },
                function () {

                    $scope.error = "Product Data not found";
                });
            $scope.$watch('myModel', function (v) {

                $scope.selected_prod = v;

            });


        }


    })
    .filter('unsafe', function($sce) {

        return function(val) {

            return $sce.trustAsHtml(val);

        };

    })
    .service('catService', function CatService() {

        this.get_prod_by_cat = function ($http, $q,id)
        {

            var cat_id= id;
            var apiPath = 'http://app.annectos.net/ecomm.bulk.grass.api' + '/store/prod_list_by_cat_short?cat_id=' + cat_id+ '&json=true' ;
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: apiPath,
                //data: data,
                type: JSON
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject("An error occured while validating User");
            })

            return deferred.promise;
        };

        this.get_productDetailsById = function ($http, $q, product_id) {
            var apiPath = 'http://app.annectos.net/ecomm.bulk.grass.api' +  '/store/prod_details?prod_id=' + product_id + '&json=true';

            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: apiPath,
                //data: data,
                type: JSON
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject("An error occured while validating User");
            })

            return deferred.promise;
        };

    })


    .service('MenuService', function MenuService() {
        this.getMenuItems = function () {
            return  menuItems;
        };
        this.get_all_menu = function ($http, $q, company){

            var apiPath = 'http://app.annectos.net/ecomm.bulk.grass.api' +  '/store/menu/' + company + '?json=true';

            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: apiPath,
                //data: data,
                type: JSON
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject("An error occured while validating User");
            })

            return deferred.promise;
        };
        this.get_level1_menu = function ($http, $q){
            var apiPath = 'http://app.annectos.net/ecomm.bulk.grass.api' +  '/store/level1menu?json=true';

            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: apiPath,
                //data: data,
                type: JSON
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject("An error occured while validating User");
            })

            return deferred.promise;
        };
        this.get_menu_expiry = function ($http, $q, last_download_date){
            var apiPath = 'http://app.annectos.net/ecomm.bulk.grass.api' +  '/store/menu/expired?last_download_date=' +last_download_date +'&json=true';
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: apiPath,
                type: JSON
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject("An error occured while validating User");
            })

            return deferred.promise;
        };
        this.getAds = function (cat_id) {
            return  menuItems[0].ad_urls;
        };

        this.insertMenuItems = function (id, name, parentId, description) {
            var topID = menuItems.length + 1;
            menuItems.push({
                id: "ABCDEF" + topID,
                Name: name,
                ParentId: parentId,
                description: description
            });
        };

        this.deleteMenuItems = function (id) {
            for (var i = menuItems.length - 1; i >= 0; i--) {
                if (menuItems[i].id === id) {
                    menuItems.splice(i, 1);
                    break;
                }
            }
        };

        this.getMenuItem = function (id) {
            for (var i = 0; i < menuItems.length; i++) {
                if (menuItems[i].id === id) {
                    return menuItems[i];
                }
            }
            return null;
        };





    })

.service('loginService', function Login() {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.IsValidUser = function ($http, $q, dataobj) {
        var apiPath = 'http://app.annectos.net/ecomm.bulk.grass.api' + '/user/registration/user_login/';
        var deferred = $q.defer();

        $http({
            method: 'POST',
            url: apiPath,
            data: dataobj,
            type: JSON
        }).success(function (data) {
            deferred.resolve(data);
          //  localStorageService.add('user_info', data[0]);
        }).error(function (data) {
            deferred.reject("An error occured while validating User");
        })
        return deferred.promise;
    };

    this.get_cart_by_email = function ($http, $q, email_id) {
        var apiPath = 'http://app.annectos.net/ecomm.bulk.grass.api' + "/store/cart?email_id=" + email_id + "&json=true";
        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: apiPath,
            type: JSON
        }).success(function (data) {
            deferred.resolve(data);
        }).error(function (data) {
            deferred.reject("An error occured while validating User");
        })
        return deferred.promise;
    };

    this.get_wishlist_by_email = function ($http, $q, email_id) {

        var apiPath = 'http://app.annectos.net/ecomm.bulk.grass.api' + "/store/wishlist?email_id=" + email_id + "&json=true";
        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: apiPath,
            type: JSON

        }).success(function (data) {
            deferred.resolve(data);
        }).error(function (data) {
            deferred.reject("An error occured while validating User");
        })
        return deferred.promise;
    };

    this.get_bulk_cart_by_email = function ($http, $q, email_id) {

        var apiPath = 'http://app.annectos.net/ecomm.bulk.grass.api' + "/store/bulk_cart?email_id=" + email_id + "&json=true";

        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: apiPath,
            type: JSON
        }).success(function (data) {
            deferred.resolve(data);
        }).error(function (data) {
            deferred.reject("An error occured while validating User");
        })
        return deferred.promise;
    };

})

    .controller('login_loginCtrl', function (
        $scope,$state, $http, $q, $window, $location, $rootScope,
        loginService, cartService, utilService
        )

    {
        function init() {
            $scope.userlogin = {"email_id": "", "password": "", "logindate": new Date(), "company": "bulkgrass" }

        }
        init();
        $scope.opts = {
            backdropFade: true,
            dialogFade: true
        };

        $scope.validateUserService = function () {
            $scope.show_loader=true;

            var returnval = '';
            loginService.IsValidUser($http, $q, $scope.userlogin).then(function (data) {

                    alert(data[0].message);

                    if (data[0].message == "Log In Successfully") {

                    }
                    else {
                        $scope.show_loader=false;

                        $scope.message = data[0].message;
                        $scope.signin_text = "Sign In"

                    }



                },
                function () {
                    //Display an error message
                    $scope.error = error;
                });


        };

    }

)

    .service('contactusService', function () {



        this.insertenquireinfo = function ($http, $q, dataobj) {
            var apiPath = 'http://app.annectos.net/ecomm.bulk.grass.api' + '/user/registration/insert_enquire_info/';
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: apiPath,
                data: dataobj,
                type: JSON
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject("An error occured while validating User");
            })
            return deferred.promise;
        };




    })












