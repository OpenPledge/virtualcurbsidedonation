let donationTotal = 0;

function updateCartList(){
    let cartList = document.getElementById('cartItems');
    let cartTotal = document.getElementById('cartTotal');
    let cartItems = "";
    let id = 0;
    for(let item of itemList){
        if(item.quantity === 1) {
            cartItems += `<div>${item.quantity}</div>`;
            cartItems += `<div>${item.unitsReceipt}</div>`;
            cartItems += `<div>${item.nameReceipt}</div>`;
            cartItems += `<div><a onclick="removeFromCart(${id})" href="#"><i class="material-icons icon">close</i></a></div>`;
        } else if (item.quantity > 1) { //Add an s to the end of the units if >1
            cartItems += `<div>${item.quantity}</div>`;
            cartItems += `<div>${item.unitsReceipt}s</div>`;
            cartItems += `<div>${item.nameReceipt}</div>`;
            cartItems += `<div><a onclick="removeFromCart(${id})" href="#"><i class="material-icons icon">close</i></a></div>`;
        }
        id++;
    }
    cartList.innerHTML = `<div class="cartRow">${cartItems}</div>`;
    cartTotal.innerHTML = `Total: $${donationTotal}`;

}

function removeFromCart(id){
    donationTotal -= itemList[id].ourPrice * itemList[id].quantity;
    itemList[id].quantity = 0;
    updateCartList();
}

function updateQuantity(item, newQuantity){
    itemList[item].quantity = newQuantity;
}
function addToCart(id){
    itemList[id].quantity += 1;
    let itemPrice = Number(itemList[id].ourPrice);
    donationTotal += itemPrice;
    updateCartList();
    updateDonateButton();
}



function updateDonateButton(){
    // Uses the DOM to modify the PayPal donate button with the total amount
    // paypalDescription collects all item's names + quantities and puts it into item_name field

    let paypalDescription = '';
    itemList.forEach(item => {
        if (item.quantity > 0) {
            paypalDescription += `${item.quantity}x ${item.nameReceipt} `;
        }
    });

    let totalAmount = document.getElementById('donateTotal');
    let combinedNames = document.getElementById('donateName');
    totalAmount.value = donationTotal;
    combinedNames.value = paypalDescription;
}

function updateDonateButton(){
    // Uses the DOM to modify the PayPal donate button with the total amount
    // paypalDescription collects all item's names + quantities and puts it into item_name field

    let paypalDescription = '';
    itemList.forEach(item => {
        if (item.quantity > 0) {
            paypalDescription += `${item.quantity}x ${item.nameReceipt} `;
        }
    });

    let totalAmount = document.getElementById('donateTotal');
    let combinedNames = document.getElementById('donateName');
    totalAmount.value = donationTotal;
    combinedNames.value = paypalDescription;
}