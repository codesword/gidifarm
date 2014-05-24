function shoppingCart($window){
    function shopCart(cartName) {
        this.cartName = cartName;
        this.clearCart = false;
        this.items = [];
        this.alerts = [];

        // load items from local storage when initializing
        this.loadItems();

        // save items to local storage when unloading
        var self = this;

        /*$(window).unload(function () {
            if (self.clearCart) {
                self.clearItems();
            }
            self.saveItems();
            self.clearCart = false;
        });
        */


    }

// load items from local storage
    shopCart.prototype.loadItems = function () {
        var items = $window['localStorage'] != null ? $window['localStorage'].getItem(this.cartName + "_items") : null;
        if (items != null) {
            try {
                var items = angular.fromJson(items);
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (item.id != null && item.name != null && item.price != null && item.quantity != null) {
                        item = new cartItem(item.id, item.name, item.price, item.quantity);
                        this.items.push(item);
                    }
                }
                this.alerts[0] = {type : 'success', msg : 'Successfully Loaded All Items in Your Shopping Cart'};
            }
            catch (err) {
                // ignore errors while loading...
            }
        }
    }

// save items to local storage
    shopCart.prototype.saveItems = function () {
        if ($window['localStorage'] != null) {
            $window['localStorage'].setItem(this.cartName + "_items", angular.toJson(this.items));
        }
    }

// adds an item to the cart
    shopCart.prototype.addItem = function (id, name, price, quantity) {
        quantity = this.toNumber(quantity);
        if (quantity != 0) {

            // update quantity for existing item
            var found = false;
            for (var i = 0; i < this.items.length && !found; i++) {
                var item = this.items[i];
                if (item.id == id) {
                    found = true;

                   var n = (function() {return quantity > 1 ? 'quantities' : 'quantity'; })();
                    this.alerts[0] = {type : 'success', msg :  item.name +' In Your Shopping Cart Increased By ' + quantity + ' ' + n};
                    item.quantity = this.toNumber(item.quantity + quantity);
                    if (item.quantity <= 0) {
                        this.items.splice(i, 1);
                        this.alerts[0] = {type : 'success', msg : name + 'In Your Shopping Cart Removed Successfully'};
                    }
                }
            }

            // new item, add now
            if (!found) {
                var item = new cartItem(id, name, price, quantity);
                this.alerts[0] = {type : 'success', msg : 'New Item Added To Your Shopping Cart'};
                this.items.push(item);
            }
 console.log(this.items);
            // save changes
            this.saveItems();

        }
    };

// get the total price for all items currently in the cart
    shopCart.prototype.getTotalPrice = function () {
        var total = 0;
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            //if (sku == null || item.id == sku) {
                total += this.toNumber(item.quantity * item.price);
            //}
        }
        return total;
    };

// get the total price for all items currently in the cart
    shopCart.prototype.getTotalCount = function () {
        var count = 0;
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
           // if (sku == null || item.id == sku) {
                count += this.toNumber(item.quantity);
           // }
        }
        return count;
    };

// clear the cart
    shopCart.prototype.clearItems = function () {
        this.items = [];
        this.saveItems();
        this.alerts[0] = {type : 'success', msg : 'Shopping Cart Successfully Cleared'};
    };

// define checkout parameters
// check out
    shopCart.prototype.checkout = function (serviceName, clearCart) {
    };

// check out using PayPal
// for details see:
// www.paypal.com/cgi-bin/webscr?cmd=p/pdn/howto_checkout-outside

    shopCart.prototype.toNumber = function (value) {
        value = value * 1;
        return isNaN(value) ? 0 : value;
    };


//----------------------------------------------------------------
// items in the cart
//
    function cartItem(id, name, price, quantity) {
        this.id = id;
        this.name = name;
        this.price = price * 1;
        this.quantity = quantity * 1;
    }
  
   return new shopCart('gidi');
}

shoppingCart.$inject = ['$window'];

