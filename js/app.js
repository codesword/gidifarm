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
                templateUrl: "tabs.html"
            })
            .state('home', {
                url: "/home",
                        templateUrl: "home.html",
                        controller: 'HomeCtrl'

            })

            .state('account', {
                url: "/account",
                        templateUrl: "account-menu.html",
                        controller: ''
            })

            .state('account.dashboard', {
                url: "/dashboard",
                views: {
                    'accountContent': {
                        templateUrl: "dashboard.html",
                        controller: 'DashboardCtrl'
                    }
                }
            })

            .state('account.myproduce', {
                url: "/my-produce",
                views: {
                    'accountContent': {
                        templateUrl: "my-produce.html",
                        controller: 'CultivatedProductCtrl'
                    }
                }
            })

            .state('account.produce', {
                url: "/produce-posted",
                views: {
                    'accountContent': {
                        templateUrl: "produce-posted.html",
                        controller: 'PostedProduceCtrl'
                    }
                }
            })

            .state('account.newproduce', {
                url: "/new-produce",
                views: {
                    'accountContent': {
                        templateUrl: "new-produce.html",
                        controller: 'CamCtrl'
                    }
                }
            })

            .state('account.orders', {
                url: "/orders",
                views: {
                    'accountContent': {
                        templateUrl: "orders.html",
                        controller: 'OrdersCtrl'
                    }
                }
            })

            .state('account.orderdetail', {
                url: "/order-details",
                views: {
                    'accountContent': {
                        templateUrl: "order-details.html",
                        controller: 'OrderDetailsCtrl'
                    }
                }
            })

            .state('account.carts', {
                url: "/carts",
                views: {
                    'accountContent': {
                        templateUrl: "cart.html",
                        controller: ''
                    }
                }
            })

            .state('account.profile', {
                url: "/profile",
                views: {
                    'accountContent': {
                        templateUrl: "profile.html",
                        controller: ''
                    }
                }
            })


            .state('marketmenu', {
                url: "/market",
                        templateUrl: "market-menu.html",
                        controller: 'MarketMenuCtrl'
            })

            .state('marketmenu.home', {
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
            .state('product', {
                url: "/product",
                        templateUrl : 'product.html',
                        controller  : 'ProductCtrl'
            })

            .state('download', {
                url: "/download",
                        templateUrl : 'download-data.html',
                        controller  : ''
            })

            .state('news-list', {
                url: "/news-list",
                        templateUrl : 'news-list.html',
                        controller  : 'NewsCtrl'
            })

            .state('news', {
                url: "/news",
                        templateUrl : 'news.html',
                        controller  : 'NewsDetailCtrl'
            })

            .state('mperf', {
                url: "/market-perf",
                        templateUrl: "market-perf.html",
                        controller: 'MPerfCtrl'
            })

            .state('pricemenu', {
                url: "/price",
                        templateUrl : 'price-menu.html'
            })

            .state('pricemenu.home', {
                url: "/home",
                views: {
                    'menuContent' :{
                        templateUrl : 'price.html',
                        controller  : 'PriceCtrl'
                    }
                }
            })

            .state('pricemenu.download', {
                url: "/download",
                views: {
                    'menuContent' :{
                        templateUrl : 'download-price.html',
                        controller  : 'PriceCtrl'
                    }
                }
            })

            .state('pricemenu.request', {
                url: "/request",
                views: {
                    'menuContent' :{
                        templateUrl : 'request.html',
                        controller  : 'PriceCtrl'
                    }
                }
            })

            .state('marketindex', {
                url: "/marketindex",
                views: {
                    'home-tab': {
                        templateUrl : 'partials/marketIndex.html'
                    }
                }
            })



            .state('about', {
                url: "/about",
                        templateUrl: "about.html",
                        controller: "AboutCtrl"
            })



        $urlRouterProvider.otherwise("/sign-in");

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

    .controller('SignInCtrl', function($scope, $state) {

        $scope.signIn = function(user) {
            console.log('Sign-In', user);
            $state.go('home');
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

    .controller('HomeCtrl', function($scope, $rootScope, Data, Auth, $ionicPopup, $timeout, $state) {
     if(Data.currentUser == null){
         $scope.loggedIn = false;
     }else $scope.loggedIn = true;
        $rootScope.$on('logged-in',function(event, status){
           $scope.loggedIn = status;
            console.log(status);
        });
        $scope.showPopup = function() {
            $scope.data = {}

            $ionicPopup.show({
                content: 'Hi There.<br> Would you like to Log in',
                title: 'Login Required',
                subTitle: 'create account or login',
                scope: $scope,
                buttons: [
                    { text: 'No', onTap: function(e) { return true; } },
                    {
                        text: '<b>YES</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            $state.go('signin');
                            return true;
                        }
                    },
                ]
            }).then(function(res) {
                    console.log('Tapped!', res);
                }, function(err) {
                    console.log('Err:', err);
                }, function(msg) {
                    console.log('message:', msg);
                });


        };

        $scope.showConfirm = function() {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Consume Ice Cream',
                content: 'Are you sure you want to eat this ice cream?'
            });
            confirmPopup.then(function(res) {
                if(res) {
                    console.log('You are sure');
                } else {
                    console.log('You are not sure');
                }
            });
        };

        $scope.goAccount = function(){
            if($scope.loggedIn)
            $state.go('account.dashboard');
            else $scope.showPopup();
        }

        $scope.showlogOut = function() {
            var alertPopup = $ionicPopup.alert({
                title: 'Sign Out Successful!',
                content: 'You Have Successfully Signed Out'
            });
            alertPopup.then(function(res) {
                console.log('Thank you for not eating my delicious ice cream cone');
            });
        };
        $scope.signOut = function(){
            console.log('Logged Out');
            $scope.loggedIn = false;
            Auth.logout(Data.currentUser);
            window.plugins.toast.showLongTop('Logout successfull');
            //$scope.showlogOut();
            Data.currentUser = null
        }
    })

    .factory('Loader', function($rootScope, $ionicLoading) {

        // Trigger the loading indicator
        return {
            show : function() { //code from the ionic framework doc
                console.log('called');
                // Show the loading overlay and text
                $rootScope.loading = $ionicLoading.show({
                    // The text to display in the loading indicator
                    content: '<i class="icon ion-loading-c" style="font-size: 3em"></i>',
                    animation: 'fade-in',
                    showBackdrop: true
                });
            },
            hide : function(){
                $rootScope.loading.hide();
            }
        }
    })

    .factory('Notification', function ($q, $window, PhoneGap) {
        return {
            alert: function (message, alertCallback, title, buttonName) {
                PhoneGap.ready().then(function () {
                    $window.navigator.notification.alert(message, alertCallback, title, buttonName);
                });
            },
            confirm: function (message, confirmCallback, title, buttonLabels) {
                PhoneGap.ready().then(function () {
                    $window.navigator.notification.confirm(message, confirmCallback, title, buttonLabels);
                });
            },
            prompt: function (message, promptCallback, title, buttonLabels, defaultText) {
                PhoneGap.ready().then(function () {
                    $window.navigator.notification.prompt(message, promptCallback, title, buttonLabels, defaultText);
                });
            },
            beep: function (times) {
                PhoneGap.ready().then(function () {
                    $window.navigator.notification.beep(times);
                });
            },
            vibrate: function (milliseconds) {
                PhoneGap.ready().then(function () {
                    $window.navigator.notification.vibrate(milliseconds);
                });
            }
        };
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
                    $state.go('home');
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
            mperf                       : null,
            getMPerf            : function(){
                return $http.get(baseUrl + 'marketperf');},
            getStates            : function(){
                return $http.get(baseUrl + 'states');},
            getNewsTemplate      : function(id){
                return $http.get(baseUrl + 'news/' + id + '/template');},
            getCommoditiesByState       : function(id){
                return $http.get(baseUrl + 'states/' + id + '/commodities');},
            getCommodities              : function(){
                return $http.get(baseUrl + 'commodities');
            },
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
            deleteProduct               : function(id){
                return $http.delete(baseUrl + 'sproducts/' + id );
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
                    var value = currencyFilter(amount, "â‚¦");
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
    .controller('AccountTabCtrl', ['$scope', 'Data', function($scope, Data){

    }])

    .controller('PriceCtrl', ['$scope', 'Data','Loader', function($scope, Data, Loader){
        $scope.noProduceDisplay = false;
        $scope.values = {};
        //$scope.commId = 0;
        if(Data.states == null){
            Loader.show();
            Data.getStates().success(function(data){
                Data.states = data;
                $scope.states  = data;
                Loader.hide();
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
                Loader.show();
                Data.getCommoditiesByState($scope.state.Id).success(function(data){
                    //console.log(data);
                    Data.commodities = data;
                    $scope.commodities = data;
                    Data.selectedState = $scope.state;
                    newState = true;
                    Loader.hide();
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
                Loader.show();
                Data.getProducts(Data.selectedState, comm).success(function(data){
                    Loader.hide();
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
            Loader.show();
            Data.getCommoditiesByState($scope.values.stateId).success(function(data){
                Loader.hide();
                Data.commodities = data;
                $scope.commodities = data;
            });
        });

        $scope.closeAlert = function(){
            $scope.alerts = [];
        }

        $scope.$watch('values.commId', function () {
            Loader.show();
            console.log($scope.values);
            Data.getProducts($scope.values.stateId, $scope.values.commId).success(function (data) {
                Loader.hide();
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

    .controller('NewsCtrl',['$scope', 'Data', '$state', 'Loader', function($scope, Data, $state,Loader){
        if(Data.news == null){
            Loader.show();
            Data.getNews().success(function(data){
                Loader.hide();
                $scope.allNews = data;
                Data.news = data;
            });
        }
        else {
            $scope.allNews = Data.news;
        }

        $scope.getNews = function(news){
            Data.selectedNews = news;
            $state.go('news');

        }

    }])

    .controller('MPerfCtrl', ['$scope', 'Data','$ionicSlideBoxDelegate','Loader', function($scope, Data, $ionicSlideBoxDelegate,Loader){
        if(Data.mperf == null){
            Loader.show();
            Data.getMPerf().success(function(data){
                Loader.hide();
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

    .controller('RegisterCtrl',['$scope', 'Data', '$location','Loader', function($scope, Data, $location, Loader){
        $scope.save = function(cust){
            Loader.show();
            console.log(cust);
            if(cust.Password != cust.VerifyPassword)
                return;
            delete cust.VerifyPassword;
            var customer = angular.copy(cust, {});
            customer.Password = sha256_digest(customer.Password);
            console.log(customer);
            Data.register(customer).success(function(data){
                Loader.hide();
                console.log(data);
            });
        }
    }])

    .controller('NewsDetailCtrl',['$scope', 'Data',  '$sce', 'Loader','$timeout', function($scope, Data, $sce, Loader, $timeout){
        $scope.news = Data.selectedNews;
        $scope.template = null;
        Loader.show();
       var checkTemplate = function() {
            if($scope.template != null)
                Loader.hide();
            else
                $timeout(checkTemplate(), 500);
        }
        $scope.template = $sce.trustAsHtml('http://gidifarm-admin.azurewebsites.net//gidifarm-api/newsTemplate/' + Data.selectedNews.Id + '.html');
        $timeout(checkTemplate());
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
            $scope.cart.addItem($scope.product.Id, $scope.product.Name, $scope.product.Price, $scope.quantity);
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

    .controller('MarketCtrl', ['$scope', 'Data', '$rootScope', '$state','Loader', function($scope, Data, $rootScope, $state, Loader){

        (function(){
            if(Data.marketProducts == null){
                Loader.show();
                Data.getAllMProduct().success(function (data) {
                    var products;
                    Loader.hide();
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
            Loader.show();
            var state = angular.isUndefined(params.state) ? 'all' : params.state;
            var cat = angular.isUndefined(params.category) ? 'all' : params.category;
            var comm = angular.isUndefined(params.commodity) ? '' : params.commodity;
            Data.getMProducts(state, cat.trim(), comm).success(function(data){
                data == "" ? $scope.products = null : $scope.products = data;
                Loader.hide();
                console.log(data);
            });

        };

        $rootScope.$on('getProducts', function(event, params){
            getProducts(params);
        })

        $scope.details = function(prod){
            Data.selectedMProduct = prod;
            $state.go('product');
        };

    }])

    .controller('LoginCtrl',['Auth','$scope', '$window', '$state','$rootScope','Data','Loader','$http',
        function(Auth, $scope, $window, $state, $rootScope, Data, Loader, $http){
            if(Data.currentUser == null){
                $scope.loggedIn = false;
                $scope.user = Data.currentUser;
            }
            else $scope.loggedIn = true;
            $scope.login = function(me){
                var user = angular.copy(me,{});
                user.Password =  sha256_digest(user.Password);
                Loader.show();
                Auth.login(user).success(function(data){
                    console.log(data);
                    Loader.hide();
                    $scope.loggedIn = true;
                    if(angular.isObject(data)){
                        $scope.user = (Data.currentUser = data);
                        $http.defaults.headers.common['Auth-Token'] = data.token;
                        $http.defaults.headers.common['User-Id'] = data.Id;
                        data = angular.toJson(data);
                        $window['localStorage'].setItem('customer', data);
                        $rootScope.$broadcast('logged-in', true);
                        $state.go('home');
                    }
                }).error(function(data){
                        console.log(data);
                    });
            };

            $scope.goAccount = function(){
                //if($scope.loggedIn) $state.go('account.dashboard');
                //else $state.go('signin');
                $state.go('account.dashboard');
            }

            $scope.logout = function(){
                $scope.user = {};
                $scope.loggedIn = false;
                Auth.logout();
                toast.showShortBottom('Logout successfull');
                $rootScope.$broadcast('logged-in', false);
            };
        }])

    .controller('DashboardCtrl', ['$scope', 'Data', 'shoppingCart',  function($scope, Data, shoppingCart){
        //console.log(Data.currentUser);
        if(Data.noOrders == null)
        {
            Data.getOrderNo().success(function(data){
                console.log(data);
                Data.noOrders = data[0].count;
                $scope.OrderNo = data[0].count;

            });
        }
        else{
            $scope.OrderNo = Data.noOrders;
        }

        if(Data.noCultivated == null)
        {
            Data.getCultivatedNo().success(function(data){
                console.log(data);
                Data.noCultivated = data[0].count;
                $scope.CultivatedNo = data[0].count;

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

    .controller('PostedProduceCtrl', ['$scope', 'Data', 'shoppingCart','Loader','$state', function($scope, Data, shoppingCart, Loader, $state){
        if (Data.postedProducts != null) {
            $scope.products = Data.postedProducts;
        } else {
            Loader.show();
            Data.getPostedProducts().success(function (data) {
                console.log(data);
                Loader.hide();
                if(data == "null") return;
                $scope.products = data;
                Data.postedProducts = data;
            });
        }

        $scope.remove = function(id){
            Loader.show();
            Data.deleteProduct(id).success(function(data){
                buffer = [ ];
                angular.forEach( $scope.products,  function(prod, key) {
                    if ( prod.Id != id )
                    {
                        buffer.push( prod );
                    }
                });

                $scope.products = (Data.postedProducts = buffer);
                Loader.hide();
            })
        };

        $scope.edit = function(prod){
            Data.editingProduct = prod;
            $state.go('account.newproduce');
        }
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

    .controller('OrdersCtrl', ['$scope','$ionicActionSheet','$ionicModal','Loader','Data','Notification', function($scope,$ionicActionSheet, $ionicModal, Loader, Data, Notification){
         if (Data.orders != null) {
         $scope.orders = Data.orders;
         } else {
             Loader.show();
             Data.getOrders().success(function (data) {
                 Loader.hide();
                 console.log(data);
                 $scope.orders = data;
                 Data.orders = data;
                 Notification.alert('successfully loaded orders', function(){return true},'Orders Loaded', 'OK');
             });
         }

        $ionicModal.fromTemplateUrl('order-details.html', function (modal) {
            $scope.modal = modal;
        }, {
            scope : $scope,
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
                    Data.selectedOrder = order;
                    $scope.order = order;
                    console.log(Data.selectedOrder);
                    $scope.modal.show();
                    Loader.show();
                    Data.getOrderDetails($scope.order.Id).success(function(data){
                        Loader.hide();
                        data == "null" ? $scope.details = null : $scope.details = data;
                        console.log($scope.details);
                    });
                    return true;
                },
                destructiveButtonClicked: function () {
                    $scope.order = order;
                   $scope.delete();
                   return true;
                }
            });
        };



        $scope.delete = function(){
            Loader.show();
            Data.deleteOrder($scope.order.Id).success(function(data, status){
                Loader.hide();
                if(status == 200) {console.log('DELETED')
                    $scope.modal.hide();
                    $scope.orders = $scope.orders.filter(function(item){
                        return item !== $scope.order;
                    });
                }
            })
        }

    }])

    .controller('OrderDetailsCtrl', ['$scope', 'Data','Loader',  function($scope, Data, Loader){
        /* $scope.order = {};
         console.log(order);
         Data.getOrderDetails(order.Id).success(function(data){
         // console.log(data);
         data == "null" ? $scope.details = null : $scope.details = data;
         });
         */
        console.log(Data.selectedOrder);
        Loader.show();
       // $scope.order = Data.selectedOrder;
        console.log($scope.order);
        Data.getOrderDetails($scope.order.Id).success(function(data){
            // console.log(data);
            Loader.hide();
            data == "null" ? $scope.details = null : $scope.details = data;
        });

        $scope.delete = function(){
            Loader.show();
            Data.deleteOrder($scope.order.Id).success(function(data, status){
                Loader.hide();
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

        if($location.path() == '/location'){
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

        $scope.cancel = function(){
            Data.postedProducts = null;
            $location.path('/');
        };
    }])

    .controller('CultivatedProductCtrl', ['$scope', 'Data','Loader', function($scope, Data, Loader){

        if(Data.commodities == null){
            Loader.show();
            Data.getCommodities().success(function(data){
                Loader.hide();
                $scope.products = data;
                Data.commodities = data;
                console.log(data);
            });

        }else{
            $scope.products = Data.commodities;
        }
        if(Data.cultivatedProducts == null){
            Loader.show();
            Data.getCultivatedProducts().success(function(data){
                Loader.hide();
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
            Loader.show();
            angular.forEach($scope.cultivatedProducts, function(p){
                if(p.Comm == crop.Name) {
                    found = true;
                    return;
                }
            });
            if(found) {
                Loader.hide();
                return;
            }
            crop.Comm = crop.Name;
            delete crop.Id;
            Data.addCultivatedProds(crop).success(function(data){
                Loader.hide();
                console.log(data);
                if(data != "null"){
                    crop.Id = data;
                    $scope.cultivatedProducts.push(crop);
                }
            });
        }

        $scope.removeCrop = function(crop, index){
            Loader.show();
            Data.removeCultivatedProds(crop.Id).success(function(data){
                Loader.hide();
                console.log(data);
                if(data == "true"){
                    $scope.cultivatedProducts.splice(index, 1);
                }
            })
        }


    }])

    .controller('NewProduceCtrl', [ '$scope', '$http', '$timeout', '$upload', '$state','Data','Loader',  function($scope, $http, $timeout, $upload, $state, Data, Loader) {
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
            $state.go('account.produce-posted')
        };


        $scope.fileReaderSupported = window.FileReader != null;
        $scope.uploadRightAway = false;

        $scope.hasUploader = function(index) {
            return $scope.upload[index] != null;
        };
        $scope.cancel = function(){
            $state.go('account.produce-posted')
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
                url : 'http://www.gidifarm.com/gidifarm-api/sproducts',
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
                    $scope.product = response.data ;
                    $scope.product.PostedDate = new Date();
                    Data.postedProducts.push($scope.product);
                    $state.go('account.produce-posted')
                }, null, function(evt) {
                    $scope.progress[0] = parseInt(100.0 * evt.loaded / evt.total);
                });
        }
    } ])

.controller('CameraCtrl', function ($scope, $cordovaCamera, Data, $state) {
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
        }

        $scope.cancel = function(){
            Data.postedProducts = null;
            $state.go('account.produce-posted')
        };

        $scope.takePicture = function() {
            $cordovaCamera.getPicture({
                quality: 100,
                destinationType: 1, //0 = Data_Url, 1 = File_Url, 2 = Native_Url
                sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
                encodingType: 0     // 0=JPG 1=PNG
            }).then(function(imageData) {
                 $scope.image = imageData;
                    console.log(imageData);
                }, function(err) {
                    // An error occured. Show a message to the user
                   console.log(err);
                });
        }

        $scope.getPicture = function() {
            $cordovaCamera.getPicture({
                quality: 100,
                destinationType: 1, //0 = Data_Url, 1 = File_Url, 2 = Native_Url
                sourceType: 0,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
                encodingType: 0     // 0=JPG 1=PNG
            }).then(function(imageData) {
                    $scope.image = imageData;
                    console.log(imageData);
                }, function(err) {
                    // An error occured. Show a message to the user
                    console.log(err);
                });
        }
    $scope.send = function() {
        var prod = angular.copy($scope.product, {});
        prod.CustId = Data.currentUser.Id;
        console.log(prod);
        var myImg = $scope.image;
        var options = new FileUploadOptions();
        options.fileKey="myFile";
        options.chunkedMode = false;
        options.params = prod;
        var ft = new FileTransfer();
        ft.upload(myImg, encodeURI('http://www.gidifarm.com/gidifarm-api/sproducts'), function(data){
            Data.success = true;
            $scope.product = data ;
            Data.postedProducts.push($scope.product);
        }, function(err){
            console.log(err);
        }, options);
    }
})

    .controller('CamCtrl', ['$scope', '$location',
        function($scope, $location) {

            // init variables
            $scope.data = {};
            $scope.obj;
            var pictureSource;   // picture source
            var destinationType; // sets the format of returned value
            var url;

            // on DeviceReady check if already logged in (in our case CODE saved)
            ionic.Platform.ready(function() {
                //console.log("ready get camera types");
                if (!navigator.camera)
                {
                    // error handling
                    return;
                }
                getPictureSource=navigator.camera.PictureSourceType.PHOTOLIBRARY;
                pictureSource=navigator.camera.PictureSourceType.CAMERA;
                destinationType=navigator.camera.DestinationType.FILE_URI;
            });


            // take picture
            $scope.takePicture = function() {
                console.log("got camera button click");
                var options =   {
                    quality: 50,
                    destinationType: destinationType,
                    sourceType: pictureSource,
                    encodingType: 0
                };
                if (!navigator.camera)
                {
                    // error handling
                    return;
                }
                navigator.camera.getPicture(
                    function (imageURI) {
                        //console.log("got camera success ", imageURI);
                        $scope.mypicture = imageURI;
                    },
                    function (err) {
                        //console.log("got camera error ", err);
                        // error handling camera plugin
                    },
                    options);
            };
            $scope.getPicture = function() {
                console.log("got file button click");
                var options =   {
                    quality: 50,
                    destinationType: destinationType,
                    sourceType: getPictureSource,
                    encodingType: 0
                };
                if (!navigator.camera)
                {
                    // error handling
                    return;
                }
                navigator.camera.getPicture(
                    function (imageURI) {
                        //console.log("got camera success ", imageURI);
                        $scope.mypicture = imageURI;
                    },
                    function (err) {
                        //console.log("got camera error ", err);
                        // error handling camera plugin
                    },
                    options);
            };

            // do POST on upload url form by http / html form
            $scope.save = function(obj) {
                if (!$scope.mypicture)
                {
                    // error handling no picture given
                    return;
                }
                var options = new FileUploadOptions();
                var prod = angular.copy($scope.product, {});
                prod.CustId = Data.currentUser.Id;
                console.log(prod);
                options.fileKey="myFile";
                options.fileName=$scope.mypicture.substr($scope.mypicture.lastIndexOf('/')+1);
                options.mimeType="image/jpeg";
                options.params = prod;

                //console.log("new imp: prepare upload now");
                var ft = new FileTransfer();
                ft.upload($scope.mypicture, encodeURI('http://www.gidifarm.com/gidifarm-api/sproducts'), uploadSuccess, uploadError, options);
                function uploadSuccess(r) {
                    // handle success like a message to the user
                }
                function uploadError(error) {
                    //console.log("upload error source " + error.source);
                    //console.log("upload error target " + error.target);
                }
            };
        }]);

