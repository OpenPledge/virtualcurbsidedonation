var donationTotal = 0;
var cart = [];

function updateCartList(){
    let cartList = document.getElementById('cartItems');
    let cartItems = "";
    let id = 0;
    for(let item of itemList){
        if(item.quantity > 0) {
            cartItems += `<li> ${item.quantity} ${item.unitsReceipt} ${item.nameReceipt} `;
            cartItems += ` <a onclick="removeFromCart(${id})" href="#" class="removebutton">x</a> </li>`;
        }
        id++;
    }
    cartList.innerHTML = `<ul> ${cartItems} </ul>`;
    cartList.innerHTML += `<br> Total: $${donationTotal}`;

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
    cart.push(id);
    itemList[id].quantity += 1;
    let itemPrice = Number(itemList[id].ourPrice);
    donationTotal += itemPrice;
    updateCartList();
    updateDonateButton();
}



function updateDonateButton(){
    // Uses the DOM to modify the PayPal donate button with the cart contents

    // Variable for collecting the whole cart details in one string (unused)
    let paypalDescription = ``;

    let donateForm = document.getElementById('donateForm');
    let id = 1;
    itemList.forEach(item => {
        if(item.quantity > 0){
            // Setting up paypal form input elements
            let item_name = document.createElement('input'),
              item_number = document.createElement('input'),
              quantity = document.createElement('input'),
              amount = document.createElement('input');
            item_name.type = "hidden";
            item_name.name = "item_name_" + id;
            item_number.type = "hidden";
            item_number.name = "item_number_" + id;
            quantity.type = "hidden";
            quantity.name = "quantity_" + id;
            amount.type = "hidden";
            amount.name = "amount_" + id;
            // Adding cart info
            item_name.value = item.itemsNeeded + `(${item.servingUnits})`;
            quantity.value = item.quantity;
            amount.value = item.ourPrice;
            // Add input elements into the donate button form
            donateForm.innerHTML += item_name.outerHTML + item_number.outerHTML + quantity.outerHTML + amount.outerHTML;

            //paypalDescription += `${item.quantity}x ${item.itemsNeeded} (${item.servingUnits}) - $${item.quantity * item.ourPrice} \n`;

            id++;
        }
    });

}

console.log(donationTotal)


teaminfo = [
 {
   "name": "Shane",
   "image": "img/team/shane.jpeg",
   "altname": "Shane LeBlanc",
   "link": "https://www.shaneleblanc.net"
 },
 {
   "name": "Maddy",
   "image": "img/team/maddy.jpeg",
   "altname": "Maddy Ford",
   "link": "https://www.linkedin.com/in/maddy-ford/"
 },
 {
   "name": "Tucker",
   "image": "img/team/tucker.jpeg",
   "altname": "Matthew Tucker",
   "link": "https://www.linkedin.com/in/mtucker-18/"
 },
 {
   "name": "Liam",
   "image": "img/team/Liam.jpeg",
   "altname": "Liam Patten",
   "link": ""
 },
 {
   "name": "Cindy",
   "image": "img/team/cindy.jpeg",
   "altname": "Cindy Dovinh",
   "link": "https://www.linkedin.com/in/cdovinh/"
 },
 {
   "name": "Kickstart Coding",
   "image": "img/team/kickstart.png",
   "altname": "Kickstart Coding",
   "link": "https://www.kickstartcoding.com"
 }
]
