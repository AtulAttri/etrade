

angular.module('starter', ['ionic', 'starter.controllers'])
  .service('catService', function CatService() {

        this.get_prod_by_cat = function ($http, $q){
            //var apiPath = 'http://localhost:8181/store/prod_list_by_cat_short?cat_id=' + cat_id + '&json=true';
            //console.log(max) ;
         //   var apiPath = cat_service_url + '/store/prod_list_by_cat_short?cat_id=' + cat_id + '&min=' + min + '&max=' + max + '&json=true';
            //console.log(apiPath);
            var cat_id= '14.1.0';
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

    });
