angular.module('ionicApp', ['ionic'])

    .config(function($stateProvider, $urlRouterProvider, $sceProvider, $httpProvider) {
        $sceProvider.enabled(false);
        $stateProvider
            .state('signin', {
                url: "/sign-in",
                templateUrl: "sign-in.html",
                controller: 'LoginCtrl'
            })
            .state('forgotpassword', {
                url: "/forgot-password",
                templateUrl: "forgot-password.html"
            })

            .state('register', {
                url: "/register",
                templateUrl: "register.html"
            })

            .state('tabs', {
                url: "/tab",
                abstract: true,
                templateUrl: "tabs.html",
                controller: 'LoginCtrl'
            })
            .state('tabs.home', {
                url: "/home",
                views: {
                    'home-tab': {
                        templateUrl: "home.html"
                    }
                }
            })

            .state('tabs.account', {
                url: "/account",
                views: {
                    'account-tab': {
                        templateUrl: "account-menu.html"
                    }
                }
            })

            .state('tabs.account.dashboard', {
                url: "/dashboard",
                views: {
                    'accountContent': {
                        templateUrl: "dashboard.html",
                        controller: ''
                    }
                }
            })

            .state('tabs.account.myproduce', {
                url: "/my-produce",
                views: {
                    'accountContent': {
                        templateUrl: "my-produce.html",
                        controller: ''
                    }
                }
            })

            .state('tabs.account.produce', {
                url: "/produce-posted",
                views: {
                    'accountContent': {
                        templateUrl: "produce-posted.html",
                        controller: ''
                    }
                }
            })

            .state('tabs.account.newproduce', {
                url: "/new-produce",
                views: {
                    'accountContent': {
                        templateUrl: "new-produce.html",
                        controller: ''
                    }
                }
            })

            .state('tabs.account.orders', {
                url: "/orders",
                views: {
                    'accountContent': {
                        templateUrl: "orders.html",
                        controller: ''
                    }
                }
            })

            .state('tabs.account.orderdetail', {
                url: "/order-details",
                views: {
                    'accountContent': {
                        templateUrl: "order-details.html",
                        controller: ''
                    }
                }
            })

            .state('tabs.account.carts', {
                url: "/carts",
                views: {
                    'accountContent': {
                        templateUrl: "cart.html",
                        controller: ''
                    }
                }
            })

            .state('tabs.account.profile', {
                url: "/profile",
                views: {
                    'accountContent': {
                        templateUrl: "profile.html",
                        controller: ''
                    }
                }
            })


            .state('tabs.marketmenu', {
                url: "/market",
                views: {
                    'home-tab': {
                        templateUrl: "market-menu.html",
                        controller: 'MarketMenuCtrl'
                    }
                }
            })
            .state('tabs.mperf', {
                url: "/market-perf",
                views: {
                    'home-tab': {
                        templateUrl: "market-perf.html",
                        controller: 'MPerfCtrl'
                    }
                }
            })
            .state('tabs.marketmenu.home', {
                url: "/home",
                views: {
                    'marketContent': {
                        templateUrl: "market.html",
                        controller: 'MarketCtrl'
                    }
                }
            })
            .state('market', {
                url: "/market",
                        templateUrl : 'agromarket.html',
                        controller  : 'MarketCtrl'
            })
            .state('tabs.product', {
                url: "/product",
                views: {
                    'home-tab' :{
                        templateUrl : 'product.html',
                        controller  : 'ProductCtrl'
                    }
                }
            })

            .state('tabs.download', {
                url: "/download",
                views: {
                    'home-tab' :{
                        templateUrl : 'download-data.html',
                        controller  : ''
                    }
                }
            })

            .state('tabs.news-list', {
                url: "/news-list",
                views: {
                    'home-tab' :{
                        templateUrl : 'news-list.html',
                        controller  : 'NewsCtrl'
                    }
                }
            })

            .state('tabs.news', {
                url: "/news",
                views: {
                    'home-tab' :{
                        templateUrl : 'news.html',
                        controller  : 'NewsDetailCtrl'
                    }
                }
            })

            .state('tabs.pricemenu', {
                url: "/price",
                views: {
                    'home-tab' :{
                        templateUrl : 'price-menu.html'
                    }
                }
            })

            .state('tabs.pricemenu.home', {
                url: "/home",
                views: {
                    'menuContent' :{
                        templateUrl : 'price.html',
                        controller  : 'PriceCtrl'
                    }
                }
            })

            .state('tabs.pricemenu.download', {
                url: "/download",
                views: {
                    'menuContent' :{
                        templateUrl : 'download-price.html',
                        controller  : 'PriceCtrl'
                    }
                }
            })

            .state('tabs.pricemenu.request', {
                url: "/request",
                views: {
                    'menuContent' :{
                        templateUrl : 'request.html',
                        controller  : 'PriceCtrl'
                    }
                }
            })

            .state('tabs.marketindex', {
                url: "/marketindex",
                views: {
                    'home-tab': {
                        templateUrl : 'partials/marketIndex.html'
                    }
                }
            })



            .state('tabs.about', {
                url: "/about",
                views: {
                    'home-tab': {
                        templateUrl: "about.html",
                        controller: "AboutCtrl"
                    }
                }
            })

        $urlRouterProvider.otherwise("/tab/home");

      /*  var interceptor = ['$location', '$q', '$rootScope', function($location, $q, $rootScope) {
            function success(response) {
                return response;
            }

            function error(response) {

                if(response.status === 401) {
                    $rootScope.$broadcast('loggedOut', true);
                    $location.path('/login');
                    return $q.reject(response);
                }
                else {
                    return $q.reject(response);
                }
            }

            return function(promise) {
                return promise.then(success, error);
            }
        }];

        $httpProvider.responseInterceptors.push(interceptor);
        */

        var httpRequestInterceptor = function () {
            return {
                request: function (config) {
                    config.headers['Accept'] = 'application/json';
                    config.headers['Content-Type'] = 'application/json';
                    return config;
                }
            };
        };
            $httpProvider.interceptors.push(httpRequestInterceptor);

    })

.factory('Auth', function($http, $rootScope, $window, $state, Data){
    var baseUrl = 'http://www.gidifarm.com/gidifarm-api/';
    return {
        login: function(user) {
            return $http.post(baseUrl + 'customers/login', user);
        },


        logout: function(user) {
            $http.post(baseUrl + 'customers/' + user.Id + '/logout').success(function(data){
                $window['localStorage'].removeItem('customer');
                $state.go('tabs.home');
            });
        }
    };
})


.factory('Data', ['$http', function($http){
    var state = null;
    var baseUrl = 'http://www.gidifarm.com/gidifarm-api/';
    return {
        states               : null,
        selectedState        : null,
        selectedMState       : null,
        commodities          : null,
        mperf                : null,
        mCommodities         : null,
        marketCommodities    : null,
        selectedCommodity    : null,
        selectedMCommodity   : null,
        news                 : null,
        selectedNews         : null,
        products             : null,
        marketProducts       : null,
        selectedMProduct     : null,

        currentUser                 : null,
        noOrders                    : null,
        selectedOrder               : null,
        orders                      : null,
        noCultivated                : null,
        cultivatedProducts          : null,
        commodities                 : null,
        noPosted                    : null,
        postedProducts              : null,
        postingProduct              : null,
        profile                     : null,
        location                    : null,
        trends                      : null,
        help                        : null,
        settings                    : null,
        plantList                   : null,
        plant                       : null,
        getQueryString      :function(obj, prefix){
            var str = [];
            for (var p in obj) {
                var k = prefix ? prefix + "[" + p + "]" : p,
                    v = obj[k];
                str.push(angular.isObject(v) ? this.getQueryString(v, k) : (k) + "=" + encodeURIComponent(v));
            }
            return str.join("&");
        },
        getMPerf            : function(){
            return $http.get(baseUrl + 'marketperf');},
        getStates            : function(){
            return $http.get(baseUrl + 'states');},
        getNewsTemplate      : function(id){
            return $http.get(baseUrl + 'news/' + id + '/template');},
        getCommodities       : function(id){
            return $http.get(baseUrl + 'states/' + id + '/commodities');},
        getMCommodities      : function(){
            return $http.get(baseUrl + 'commodities'); },
        getNews              : function(){
            return $http.get(baseUrl + 'news'); },
        getNewsById              : function(id){
            return $http.get(baseUrl + 'news/' + id ); },
        getProducts          : function(state, comm){
            return $http.get(baseUrl + 'states/' + state + '/' + comm + '/products');},
        getMProduct          : function(id){
            return $http.get(baseUrl + 'sproducts/' + id );},
        getAllMProduct          : function(){
            return $http.get(baseUrl + 'sproducts');},
        getMProducts         : function(st, cat, comm){
            return $http.get(baseUrl + 'states/' + st + '/sproducts?category= ' + cat + '&commodity= ' + comm );},
        getCategories        : function(){
            return $http.get(baseUrl + 'commodities/categories'); },
        contact              : function(data){
            return $http.post(baseUrl + 'customers/contact', data);},
        register             : function(user) {
            return $http.post(baseUrl + 'customers/register', user);
        },

        getOrderNo                  : function(){
            var id = this.currentUser.Id;
            return $http.get(baseUrl + 'customers/' + id + '/ordersNumber');
        },
        getOrders                   : function(){
            var id = this.currentUser.Id;
            return $http.get(baseUrl + 'customers/' + id + '/orders');
        },
        getOrderDetails             : function(id){
            return $http.get(baseUrl + 'orders/' + id + '/details')
        },
        getCultivatedNo             : function(){
            var id = this.currentUser.Id;
            return $http.get(baseUrl + 'customers/' + id + '/cultivatedProductsNumber');
        },
        getCultivatedProducts       : function(){
            var id = this.currentUser.Id;
            return $http.get(baseUrl + 'customers/' + id + '/cultivatedProducts');
        },
        getAllCommodities              : function(){
            return $http.get(baseUrl + 'commodities');
        },
        getMCommodities      : function(cat){
            return $http.get(baseUrl + 'commodities?category=' + cat); },
        getPostedNo                 : function(){
            var id = this.currentUser.Id;
            return $http.get(baseUrl + 'customers/' + id + '/postedProductsNumber');
        },
        getPostedProducts           : function(){
            var id = this.currentUser.Id;
            return $http.get(baseUrl + 'customers/' + id + '/postedProducts');
        },
        getProfile                  : function(){
            return $http.get(baseUrl + 'customers/' + this.currentUser.Id );
        },
        getLocation                 : function(){
            return $http.get('');
        },
        getTrends                   : function(){
            return $http.get('');
        },
        getSettings                 : function(){
            return $http.get('');
        },
        getPlantList                : function(){
            return $http.get('');
        },
        getPlant                    : function(){
            return $http.get('');
        },
        getStates                   : function(){
            return $http.get(baseUrl + 'states');
        },
        saveProduct                 : function(p){
            p.CustId = this.currentUser.Id;
            return $http.post(baseUrl + 'sproducts', p);
        },
        placeOrder                  : function(o){
            o.CustId = this.currentUser.Id;
            return $http.post(baseUrl + 'orders',o)
        },
        deleteOrder                 : function(id){
            return $http.delete(baseUrl + 'orders/' + id );
        },
        addCultivatedProds          : function(crop){
            crop.CustId = this.currentUser.Id;
            return $http.post(baseUrl + 'cproducts', crop );
        },
        removeCultivatedProds       : function(id){
            return $http.delete(baseUrl + 'cproducts/' + id );
        },
        updateProfile               : function(profile){
            return $http.put(baseUrl + 'customers', profile);
        }
    }
}])

.filter('nairacurrency',
    [ '$filter', '$locale',
        function(filter, locale) {
            var currencyFilter = filter('currency');
            var formats = locale.NUMBER_FORMATS;
            return function(amount, currencySymbol) {
                var value = currencyFilter(amount, "₦");
                var sep = value.indexOf(formats.DECIMAL_SEP);
                if(amount >= 0) {
                    return value.substring(0, sep);
                }
                return value.substring(0, sep) + '';
            };
        } ])


.factory('shoppingCart', shoppingCart)

    .controller('ToggleCtrl', function($scope, $ionicSideMenuDelegate) {

        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };
    })
    .controller('AboutCtrl', function($scope, $state, $ionicSlideBoxDelegate) {
        $scope.next = function() {
            $ionicSlideBoxDelegate.next();
        };
        $scope.previous = function() {
            $ionicSlideBoxDelegate.previous();
        };

        // Called each time the slide changes
        $scope.slideChanged = function(index) {
            $scope.slideIndex = index;
        };
    })


    .controller('MPerfCtrl', ['$scope', 'Data','$ionicSlideBoxDelegate', function($scope, Data, $ionicSlideBoxDelegate){
        if(Data.mperf == null){
            Data.getMPerf().success(function(data){
                Data.mperf = data;
                $scope.mperf  = data
            })
        }
        else {
            $scope.mperf  = Data.mperf;
        }
        $scope.next = function() {
            $ionicSlideBoxDelegate.next();
        };
        $scope.previous = function() {
            $ionicSlideBoxDelegate.previous();
        };

        // Called each time the slide changes
        $scope.slideChanged = function(index) {
            $scope.slideIndex = index;
        };
        $scope.gainers = function(){
            $scope.mperf  = Data.mperf.Gainers;
        }

        $scope.Losers = function(){
            $scope.mperf  = Data.mperf.Losers;
        }

    }])

    .controller('PriceCtrl', ['$scope', 'Data', function($scope, Data){
    $scope.noProduceDisplay = false;
        $scope.values = {};
        //$scope.commId = 0;
    if(Data.states == null){
        Data.getStates().success(function(data){
            Data.states = data;
            $scope.states  = data;
        })
    }
    else {
        $scope.states = Data.states;
    }
        $scope.state = {};
       // $scope.stateId = null;

        var newState = false;

        $scope.getCommodities = function(){
            console.log($scope.state);
            if(Data.selectedState != $scope.state.Name){
                Data.getCommodities($scope.state.Id).success(function(data){
                    //console.log(data);
                    Data.commodities = data;
                    $scope.commodities = data;
                    Data.selectedState = $scope.state;
                    newState = true;
                });
            }
            else{
                $scope.commodities = Data.commodities;
                newState = false;
            }
        };

        $scope.getProducts = function(comm){
            if(Data.selectedCommodity != comm || newState){
                if(Data.selectedState == null) return;
                Data.getProducts(Data.selectedState, comm).success(function(data){
                    if(data == "null" || !angular.isArray(data)) {
                        $scope.products = null;

                        $scope.noProduceDisplay = true;
                        return;
                    }
                    $scope.noProduceDisplay = false;
                    Data.products = data;
                    // console.log(data);
                    $scope.products = data;
                    Data.selectedCommodity = comm;
                });
            }
            else {
                $scope.products = Data.products;
            }
        };

        $scope.$watch('values.stateId', function () {
            $scope.loading = true;
           // if($scope.stateId == null) return;
            Data.getCommodities($scope.values.stateId).success(function(data){
                //console.log(data);
                $scope.loading = false;
                Data.commodities = data;
                $scope.commodities = data;
            });
        });

        $scope.closeAlert = function(){
            $scope.alerts = [];
        }

        $scope.$watch('values.commId', function () {
            $scope.loading = true;
            console.log($scope.values);
            Data.getProducts($scope.values.stateId, $scope.values.commId).success(function (data) {
                $scope.loading = false;
                if(data == "null" || !angular.isArray(data)) {
                    $scope.products = null;
                    $scope.alerts = [];
                    $scope.alerts[0] = {type : 'danger', msg : 'No Price Available For the Selected Commodity In The Selected State.'};

                    return;
                }
                Data.products = data;
                // console.log(data);
                $scope.products = data;
            });
        })

    }])

.controller('NewsCtrl',['$scope', 'Data', '$state','$ionicModal','$ionicActionSheet', function($scope, Data, $state, $ionicModal,$ionicActionSheet){
    if(Data.news == null){
        Data.getNews().success(function(data){
            $scope.allNews = data;
            Data.news = data;
        });
    }
    else {
        $scope.allNews = Data.news;
    }

    $scope.getNews = function(news){
        Data.selectedNews = news;
        $state.go('tabs.news');

    }

}])

.controller('RegisterCtrl',['$scope', 'Data', '$location', function($scope, Data, $location){
    $scope.save = function(cust){
        console.log(cust);
        if(cust.Password != cust.VerifyPassword)
            return;
        delete cust.VerifyPassword;
        var customer = angular.copy(cust, {});
        customer.Password = sha256_digest(customer.Password);
        console.log(customer);
        Data.register(customer).success(function(data){
            console.log(data);
        });
    }
}])

.controller('NewsDetailCtrl',['$scope', 'Data',  '$sce', function($scope, Data, $sce){

            $scope.news = Data.selectedNews;
            $scope.template = $sce.trustAsHtml('http://gidifarm-admin.azurewebsites.net//gidifarm-api/newsTemplate/' + Data.selectedNews.Id + '.html');
}])

.controller('ContactCtrl',['$scope', 'Data' , function($scope, Data){
    $scope.summit = function(enq){
        Data.contact(enq).success(function(data){
            console.log(data);
        });
    }
}])

.controller('ProductCtrl',['$scope', 'Data', 'shoppingCart' , function($scope, Data, shoppingCart){

    $scope.product = {};

    $scope.product = Data.selectedMProduct;
        console.log($scope.product);


    $scope.cart = shoppingCart;

    $scope.addCart = function(){
        $scope.cart.addItem($scope.product.Id, $scope.product.Product, $scope.product.Price, $scope.quantity);
        window.location = 'dashboard/#/carts';
    }
    $scope.summit = function(enq){
    }
}])

    .controller('MarketMenuCtrl', ['$scope', 'Data', '$rootScope', '$location', function($scope, Data, $rootScope, $location){
        $scope.closeAlert = function() {
            $scope.alerts = ($scope.cart.alerts = []);
        };
        $scope.menu = {};
        Data.selectedMState = {};
        Data.selectedMCommodity = {};

        (function(){
            if(Data.states == null){
                Data.getStates().success(function(data){
                    Data.states = data;
                    $scope.states  = data;
                    // console.log(data);
                });
            }
            else {
                $scope.states = Data.states;
            }
        })();

        (function(){
            if(Data.categories == null){
                Data.getCategories().success(function(data){
                    Data.categories = data;
                    $scope.categories = data;
                    // console.log(data);
                });
            }
            else{
                $scope.categories = Data.categories;
            }
        })();

        var getMarketCommodities = function(category){
            Data.getMCommodities(category).success(function(data){
                Data.marketCommodities = data;
                $scope.commodities = data;
                //console.log(data);
            });

        };

        $scope.$watch('menu.category', function(val, old){
            if(angular.isUndefined(val)) return;

            getMarketCommodities(val.trim());
        })

        $scope.search = function(){
            console.log($scope.menu);
            $rootScope.$broadcast('getProducts', $scope.menu);
        }

        var toNumber = function (value) {
            value = value * 1;
            return isNaN(value) ? 0 : value;
        };

        $scope.selectComm = function(comm){
            $scope.selectedComm = comm;
            Data.selectedMCommodity = comm;
        };

        $scope.selectState = function(state){
            $scope.selectedState = state;
            Data.selectedMState = state;
        };


    }])

.controller('MarketCtrl', ['$scope', 'Data', '$rootScope', '$state', function($scope, Data, $rootScope, $state){

        (function(){
            if(Data.marketProducts == null){
                Data.getAllMProduct().success(function (data) {
                    var products;
                    data == "null" ? $scope.products = null : $scope.products = data;
                    $scope.alerts = [];
                })
            }else{
                $scope.products = Data.marketProducts;
            }
        })();

    $scope.toggle = function(){
        $scope.hideSidebar = !$scope.hideSidebar;
    };
        var getProducts = function (params){
            console.log(params);
            var state = angular.isUndefined(params.state) ? 'all' : params.state;
            var cat = angular.isUndefined(params.category) ? 'all' : params.category;
            var comm = angular.isUndefined(params.commodity) ? '' : params.commodity;
            Data.getMProducts(state, cat.trim(), comm).success(function(data){
                data == "" ? $scope.products = null : $scope.products = data;
                console.log(data);
            });

        };

        $rootScope.$on('getProducts', function(event, params){
            getProducts(params);
        })

    $scope.details = function(prod){
        Data.selectedMProduct = prod;
        $state.go('tabs.product');
    };

}])

.controller('LoginCtrl',['Auth','$scope', '$window', '$state','$rootScope','Data',
    function(Auth, $scope, $window, $state, $rootScope, Data){
        if(Data.currentUser == null){
            $scope.loggedIn = false;
            $scope.user = Data.currentUser;
        }
        else $scope.loggedIn = true;

        $scope.login = function(me){
            var user = angular.copy(me,{});
            user.Password =  sha256_digest(user.Password);
            var query = "";
            query = Data.getQueryString(user);
            console.log(query);
            Auth.login(user).success(function(data){
                console.log(data);
                $scope.loggedIn = true;
                if(angular.isObject(data)){
                    data = angular.toJson(data);
                    $scope.user = (Data.currentUser = data);
                    $window['localStorage'].setItem('customer', data);
                    $state.go('tabs.home');
                }
            }).error(function(data){
                    console.log(data);
                });
        };

        $scope.goAccount = function(){
            //if($scope.loggedIn) $state.go('tabs.account.dashboard');
            //else $state.go('signin');
            $state.go('tabs.account.dashboard');
        }

        $scope.logout = function(){
            $scope.user = {};
            $scope.loggedIn = false;
            Auth.logout();
        };
    }])

    .controller('DashboardCtrl', ['$scope', 'Data', 'shoppingCart',  function($scope, Data, shoppingCart){
        if(Data.noOrders == null)
        {
            Data.getOrderNo().success(function(data){
                Data.noOrders = data[0].count;
                $scope.OrderNo = data[0].count;
                // console.log(data);
            });
        }
        else{
            $scope.OrderNo = Data.noOrders;
        }

        if(Data.noCultivated == null)
        {
            Data.getCultivatedNo().success(function(data){
                Data.noCultivated = data[0].count;
                $scope.CultivatedNo = data[0].count;
                // console.log(data);
            })
        }
        else { $scope.CultivatedNo = Data.noCultivated;}

        if(Data.noPosted == null)
        {
            Data.getPostedNo().success(function(data){
                Data.noPosted = data[0].count;
                $scope.PostedNo = data[0].count;
            })
        }
        else { $scope.PostedNo = Data.noPosted;}

        $scope.CartNo = shoppingCart.getTotalCount();
    }])

    .controller('PostedProduceCtrl', ['$scope', 'Data', 'shoppingCart', function($scope, Data, shoppingCart){
        if (Data.postedProducts != null) {
            $scope.products = Data.postedProducts;
        } else {
            Data.getPostedProducts().success(function (data) {
                console.log(data);
                if(data == "null") return;
                $scope.products = data;
                Data.postedProducts = data;
            });
        }
    }])

    .controller('PostingProduceCtrl', ['$scope', 'Data', '$location', function($scope, Data, $location){
        if (Data.postingProduct != null) {
            $scope.products = Data.postingProduct;
        }else{
            $scope.product = {};
        }

        if(Data.commodities == null){
            Data.getCommodities().success(function(data){
                $scope.commodities = data;
                Data.commodities = data;
                console.log(data);
            })

        }else{
            $scope.commodities = Data.commodities;
            //console.log(data);
        }

        $scope.save = function(){
            Data.postedProducts = null;
            var prod = angular.copy($scope.product, {});
            console.log(prod);
            Data.saveProduct(prod).success(function(data){
                console.log(data);
                Data.success = true;
                $location.path('/produce-posted');
            });
        };

        $scope.cancel = function(){
            Data.postedProducts = null;
            $location.path('/produce-posted')
        };
    }])

    .controller('CartCtrl', ['$scope', 'Data', 'shoppingCart', function($scope, Data, shoppingCart){
        $scope.cart = shoppingCart;
        $scope.closeAlert = function(){
            $scope.cart.alerts = [];
        }
        $scope.checkout = function(){
            var o = {};
            o.TotalPrice = $scope.cart.getTotalPrice();
            o.TotalQuantity = $scope.cart.getTotalCount();
            o.TransactionStatus = 'initiated';
            o.Details = [];
            angular.forEach($scope.cart.items, function(item)
            {
                o.Details.push({SellProduct : item.name, Price : item.price, Quantity : item.quantity});
            });
            console.log(o.Details);
            // o.Details = $scope.items;
            Data.placeOrder(o).success(function(data, status){
                console.log(status);
                if(status == 200){
                    $scope.cart.clearItems();
                    $scope.cart.alerts[0] = {type : 'success', msg : 'Order Made Successfully'};
                }
            })
        };
    }])

    .controller('OrdersCtrl', ['$scope','$ionicActionSheet','$ionicModal','Data', function($scope,$ionicActionSheet, $ionicModal, Data){
        if (Data.orders != null) {
            $scope.orders = Data.orders;
        } else Data.getOrders().success(function (data) {
            console.log(data);
            $scope.orders = data;
            Data.orders = data;
        });

        $ionicModal.fromTemplateUrl('order-details.html', function (modal) {
            $scope.modal = modal;
        }, {
            animation: 'slide-in-up',
            focusFirstInput: true
        });

        $scope.show = function (order) {
            console.log('yes');
            $ionicActionSheet.show({
                titleText: 'Order Options',
                buttons: [
                    {
                        text: 'Show Details'
                    }

                ],
                destructiveText: 'Delete',
                cancelText: 'Cancel',
                cancel: function () {
                    return true;
                },
                buttonClicked: function (index) {
                    console.log('BUTTON CLICKED', index);
                    Data.selectedOrder = order;
                    $scope.modal.show();
                    return true;
                },
                destructiveButtonClicked: function () {
                    Data.deleteOrder(order.Id).success(function(data, status){
                        if(status == 200)console.log('DELETED');
                        return true;
                    })

                }
            });
        };



    }])

    .controller('OrderDetailsCtrl', ['$scope', 'Data',  function($scope, Data){
        $scope.order = Data.selectedOrder;
        console.log(order);
        Data.getOrderDetails($scope.order.Id).success(function(data){
            // console.log(data);
            data == "null" ? $scope.details = null : $scope.details = data;
        });

        $scope.delete = function(){
            Data.deleteOrder($scope.order.Id).success(function(data, status){
                if(status == 200) {console.log('DELETED')
                    $scope.modal.hide();
                }
            })
        }
    }])


    .controller('ProfileCtrl', ['$scope', 'Data', '$location', function($scope, Data, $location){
        if(Data.profile == null){
            Data.getProfile().success(function(data){
                $scope.cust = data[0];
                Data.profile = data[0];
                console.log(data);
            });

        }else{
            $scope.cust = Data.profile;
        }
        if(Data.states == null){
            Data.getStates().success(function(data){
                Data.states = data;
                $scope.states = data;
                console.log(data);
            });
        }
        else{
            $scope.states = Data.states;
        }

        $scope.save = function(){
            var profile = angular.copy($scope.cust, {});
            console.log(profile);
            Data.updateProfile(profile).success(function(data){
                console.log(data);
                // Data.profile = profile;
                //$location.path('/produce-posted');
            });
        };

        /*$scope.cancel = function(){
         Data.postedProducts = null;
         $state.go('tabs.');
         };
         */
    }])

    .controller('CultivatedProductCtrl', ['$scope', 'Data', function($scope, Data){
        //  $scope.order = order;
        // console.log(order);
        //  Data.getOrderDetails(order.Id).success(function(data){
        // console.log(data);
        //     data == "null" ? $scope.details = null : $scope.details = data;
        // })
        if(Data.commodities == null){
            Data.getCommodities().success(function(data){
                $scope.products = data;
                Data.commodities = data;
                console.log(data);
            });

        }else{
            $scope.products = Data.commodities;
        }
        if(Data.cultivatedProducts == null){
            Data.getCultivatedProducts().success(function(data){
                console.log(data);
                if(data == "null") return;
                $scope.cultivatedProducts = data;
                Data.cultivatedProducts = data;
            });

        }else{
            $scope.cultivatedProducts = Data.cultivatedProducts;
        }

        $scope.addCrop = function(prod){
            var crop = angular.copy(prod, {});
            var found = false;
            angular.forEach($scope.cultivatedProducts, function(p){
                if(p.Comm == crop.Name) {
                    found = true;
                    return;
                }
            });
            if(found) return;
            crop.Comm = crop.Name;
            delete crop.Id;
            Data.addCultivatedProds(crop).success(function(data){
                console.log(data);
                if(data != "null"){
                    crop.Id = data;
                    $scope.cultivatedProducts.push(crop);
                }
            });
        }

        $scope.removeCrop = function(crop, index){
            Data.removeCultivatedProds(crop.Id).success(function(data){
                console.log(data);
                if(data == "true"){
                    $scope.cultivatedProducts.splice(index, 1);
                }
            })
        }


    }])

    .controller('NewProduceCtrl', [ '$scope', '$http', '$timeout', '$upload', '$location','Data',  function($scope, $http, $timeout, $upload, $location, Data) {
        if (Data.postingProduct != null) {
            $scope.products = Data.postingProduct;
        }else{
            $scope.product = {};
        }

        if(Data.commodities == null){
            Data.getCommodities().success(function(data){
                $scope.commodities = data;
                Data.commodities = data;
                console.log(data);
            })

        }else{
            $scope.commodities = Data.commodities;
            //console.log(data);
        }

        /* $scope.save = function(){
         Data.postedProducts = null;
         var prod = angular.copy($scope.product, {});
         console.log(prod);
         Data.saveProduct(prod).success(function(data){
         console.log(data);
         Data.success = true;
         $location.path('/produce-posted');
         });
         };
         */

        $scope.cancel = function(){
            Data.postedProducts = null;
            $location.path('/produce-posted')
        };


        $scope.fileReaderSupported = window.FileReader != null;
        $scope.uploadRightAway = false;

        $scope.hasUploader = function(index) {
            return $scope.upload[index] != null;
        };
        $scope.cancel = function(l){
            $location.path('/' + l);
        }
        $scope.abort = function(index) {
            $scope.upload[index].abort();
            $scope.upload[index] = null;
        };
        $scope.onFileSelect = function($files) {
            $scope.selectedFiles = [];
            $scope.progress = [];
            if ($scope.upload && $scope.upload.length > 0) {
                for (var i = 0; i < $scope.upload.length; i++) {
                    if ($scope.upload[i] != null) {
                        $scope.upload[i].abort();
                    }
                }
            }
            $scope.upload = [];
            $scope.uploadResult = [];
            $scope.selectedFiles = $files;
            $scope.dataUrls = [];
            for ( var i = 0; i < $files.length; i++) {
                var $file = $files[i];
                if (window.FileReader && $file.type.indexOf('image') > -1) {
                    var fileReader = new FileReader();
                    fileReader.readAsDataURL($files[i]);
                    function setPreview(fileReader, index) {
                        fileReader.onload = function(e) {
                            $timeout(function() {
                                $scope.dataUrls[index] = e.target.result;
                            });
                        }
                    }
                    setPreview(fileReader, i);
                }
                $scope.progress[i] = -1;
                if ($scope.uploadRightAway) {
                    $scope.start(i);
                }
            }
        }

        $scope.save = function() {
            $scope.progress[0] = 0;
            var prod = angular.copy($scope.product, {});
            prod.CustId = Data.currentUser.Id;
            console.log(prod);
            $scope.upload[0] = $upload.upload({
                url : 'http://www.gidifarm.com/gidifarm-api/gidifarm-api/sproducts',
                method: 'POST',
                headers: {'myHeaderKey': 'myHeaderVal'},
                data : prod,
                file: $scope.selectedFiles[0],
                fileFormDataName: 'myFile'
            }).then(function(response) {
                    $scope.uploadResult.push(response.data);
                    console.log(response);
                    console.log(response.data);
                    Data.success = true;
                    $location.path('/produce-posted');
                }, null, function(evt) {
                    $scope.progress[0] = parseInt(100.0 * evt.loaded / evt.total);
                });
        }
    } ]);




