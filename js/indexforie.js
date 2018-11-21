"use strict";

var firestore = firebase.firestore();
var donationTotal = 0;
var settings = { timestampsInSnapshots: true };
firestore.settings(settings);

var safari = false;
var donationSummary = {
  "Turkey": 0,
  "Ham": 0,
  "Chicken": 0,
  "Rice": 0,
  "Beans": 0,
  "Milk": 0,
  "Onions": 0,
  "Potatoes": 0,
  "Veggies": 0,
  "Corn": 0,
  "Tomatoes": 0,
  "PB": 0
};

function updateCartList() {
  var cartList = document.getElementById('cartItems');
  var cartTotal = document.getElementById('cartTotal');
  var cartItems = "";
  var emptySpace = "";
  var id = 0;

  var rclicktype = 'onclick';
  var md = new MobileDetect(window.navigator.userAgent);
  if (md.is('iPhone') && md.userAgent() === 'Safari' || md.is('iPhone') && md.userAgent() === 'Chrome') {
    rclicktype = 'ontouchstart';console.log('iPhone browser');
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = itemList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      if (item.quantity === 1) {
        cartItems += "<div id=\"quantity\">\n            <input id=\"quantity-" + id + "\" class=\"qlength\" onchange=\"updateQuantityFromTextBox(" + id + ")\" type=\"number\" min=\"0\" max=\"9\" size=\"2\" value=\"" + item.quantity + "\" />\n            </div>";
        cartItems += "<div id=\"unit\">" + item.unitsReceipt + "</div>";
        cartItems += "<div id=\"itemTitle\">" + item.nameReceipt + "</div>";
        cartItems += "<div id=\"subtotal\">$" + item.quantity * item.ourPrice + "</div>";
        cartItems += "<div><a " + rclicktype + "=\"removeFromCart(" + id + ")\"><i class=\"material-icons icon\">close</i></a></div>";
        donationSummary[item.nameReceipt] = item.quantity;
      } else if (item.quantity > 1) {
        //Add an s to the end of the units if >1
        cartItems += "<div id=\"quantity\">\n            <input id=\"quantity-" + id + "\" class=\"qlength\" onchange=\"updateQuantityFromTextBox(" + id + ")\" type=\"number\" min=\"0\" max=\"9\" size=\"2\" value=\"" + item.quantity + "\" />\n            </div>";
        cartItems += "<div id=\"unit\">" + item.unitsReceipt + "s</div>";
        cartItems += "<div id=\"itemTitle\">" + item.nameReceipt + "</div>";
        cartItems += "<div id=\"subtotal\">$" + item.quantity * item.ourPrice + "</div>";
        cartItems += "<div><a " + rclicktype + "=\"removeFromCart(" + id + ")\"><i class=\"material-icons icon\">close</i></a></div>";
        donationSummary[item.nameReceipt] = item.quantity;
      }
      id++;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  cartList.innerHTML = emptySpace + " <div class=\"singleline\">" + cartItems + "</div>";
  cartTotal.innerHTML = "Total: $" + donationTotal;
}

function makeDonateButton() {
  var donatebuttonclick = document.getElementById('donatebuttonclick');

  var dclicktype = 'onclick';
  var md = new MobileDetect(window.navigator.userAgent);
  if (md.is('iPhone') && md.userAgent() === 'Safari' || md.is('iPhone') && md.userAgent() === 'Chrome') {
    dclicktype = 'ontouchstart';console.log('iPhone browser');
  }

  donatebuttonclick.innerHTML = "<input type=\"submit\" name=\"submit\" value=\"DONATE NOW\" alt=\"Donate\" class=\"donatebutton2\" " + dclicktype + "=\"dbSubmit()\">";
  console.log('makedonatbuttn');
}

function removeFromCart(id) {
  donationTotal -= itemList[id].ourPrice * itemList[id].quantity;
  itemList[id].quantity = 0;
  donationSummary[itemList[id].nameReceipt] = itemList[id].quantity;
  updateCartList();
}

function updateQuantityFromTextBox(id) {
  var quantityBox = document.getElementById("quantity-" + id);
  var newQuantity = parseInt(quantityBox.value);
  var item = itemList[id];
  donationTotal -= item.quantity * item.ourPrice;
  itemList[id].quantity = newQuantity;
  donationTotal += item.quantity * item.ourPrice;
  donationSummary[itemList[id].nameReceipt] = newQuantity;
  updateCartList();
  updateDonateButton();
}

function addToCart(id) {
  // Type casting is necessary here due to javascript quirks! Without, it would read quantity as a string, and if you added 1 to 10 it would become 101!
  itemList[id].quantity = parseInt(itemList[id].quantity) + 1;
  var itemPrice = Number(itemList[id].ourPrice);
  donationTotal += itemPrice;
  updateCartList();
  updateDonateButton();
}

function updateDonateButton() {
  // Uses the DOM to modify the PayPal donate button with the total amount
  // paypalDescription collects all item's names + quantities and puts it into item_name field

  var paypalDescription = '';
  itemList.forEach(function (item) {
    if (item.quantity > 0) {
      paypalDescription += item.quantity + "x " + item.nameReceipt + " ";
    }
  });

  var totalAmount = document.getElementById('donateTotal');
  var combinedNames = document.getElementById('donateName');
  totalAmount.value = donationTotal;
  combinedNames.value = paypalDescription;
}

// Method for submitting item to db - this is a running item total
function dbSubmit() {
  var _loop = function _loop(item) {
    if (donationSummary[item] > 0) {
      var itemDoc = firestore.collection('donationSummary').doc(item);
      var getItemDoc = itemDoc.get().then(function (doc) {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          var currentAmount = doc.data();
          var newAmount = currentAmount['quantity'] + donationSummary[item];
          var donationItems = firestore.collection("donationSummary").doc(item).update({ 'quantity': newAmount });
        }
      }).catch(function (err) {
        console.log('Error getting document', err);
      });
    }
  };

  for (var item in donationSummary) {
    _loop(item);
  }
}

window.onload = function () {
  updateCartList();
  loadItems();
  console.log('hello world');
  makeDonateButton();
};
//
function loadItems() {
  var groceryList = document.getElementById('groceryList');
  var groceryItems = "<div class="col col-xs-12 col-md-6 col-lg-4 item"><div class='img-container'>";
  var id = 0;
  //   let clickType = safari ? "ontouchstart" : "onclick";


  // checking mobile for safari
  var clicktype = 'onclick';
  var md = new MobileDetect(window.navigator.userAgent);
  if (md.is('iPhone') && md.userAgent() === 'Safari' || md.is('iPhone') && md.userAgent() === 'Chrome') {
    clicktype = 'ontouchstart';console.log('iPhone browser');
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = itemList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var item = _step2.value;
      groceryItems += "<div class =img-container>";
      groceryItems += "<img src ='" + item.image + "'></div>";
      groceryItems += "<h2 class=\"Item-Name\">" + item.itemName + "</h2>";
      groceryItems += "<p class=\"Item-Units\">" + item.servingUnits + "</p>";
      groceryItems += "<p class=\"Our-Price\"><font color =\"black\">OUR PRICE:</font> $" + item.ourPrice + "</p>";
      groceryItems += "<p class=\"Item-Retail\">retail: $" + item.retailPrice + "</p>";
      groceryItems += "<a " + clicktype + "=\"addToCart(" + id + ");\" class=\"addbutton\">add to cart</a>";

      groceryItems += "</div>";
      id++;
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  groceryList.innerHTML = "" + groceryItems;
}

// snackbar function
//
// function snackBar() {
//
//     let x = document.getElementById("snackbar");
//     x.className = "show";
//     setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
// }
