console.log("Hello world");

var itemList = [
	{
		"quantity": 0,
		"image": "img/turkey.png",
		"itemsNeeded": "Whole Turkey",
		"servingUnits": "case of (6) – 16lbs ea",
		"ourPrice": "85",
		"retailPrice": "120",
		"unitsReceipt": "case(s)",
		"nameReceipt": "Turkey"
	},
	{
		"quantity": 0,
		"image": "img/ham.png",
		"itemsNeeded": "Whole Ham",
		"servingUnits": "case of (6) – 10lbs ea",
		"ourPrice": "60",
		"retailPrice": "85",
		"unitsReceipt": "case(s)",
		"nameReceipt": "Ham"
	},
	{
		"quantity": 0,
		"image": "img/chicken.png",
		"itemsNeeded": "Chicken",
		"servingUnits": "12lbs tray",
		"ourPrice": "20",
		"retailPrice": "30",
		"unitsReceipt": "tray(s)",
		"nameReceipt": "Chicken"
	},
	{
		"quantity": 0,
		"image": "img/rice.png",
		"itemsNeeded": "Rice",
		"servingUnits": "40lb bag",
		"ourPrice": "50",
		"retailPrice": "75",
		"unitsReceipt": "bag(s)",
		"nameReceipt": "Rice"
	},
	{
		"quantity": 0,
		"image": "img/beans.png",
		"itemsNeeded": "Beans",
		"servingUnits": "40lb bag",
		"ourPrice": "70",
		"retailPrice": "100",
		"unitsReceipt": "bag(s)",
		"nameReceipt": "Beans"
	},
	{
		"quantity": 0,
		"image": "img/milk.png",
		"itemsNeeded": "Milk",
		"servingUnits": "case of (24) – 1gal",
		"ourPrice": "80",
		"retailPrice": "118",
		"unitsReceipt": "case(s)",
		"nameReceipt": "Milk"
	},
	{
		"quantity": 0,
		"image": "img/onions.png",
		"itemsNeeded": "Onions",
		"servingUnits": "30lb bag",
		"ourPrice": "30",
		"retailPrice": "45",
		"unitsReceipt": "bag(s)",
		"nameReceipt": "Onions"
	},
	{
		"quantity": 0,
		"image": "img/potato.png",
		"itemsNeeded": "Potatoes",
		"servingUnits": "40lb bag",
		"ourPrice": "65",
		"retailPrice": "90",
		"unitsReceipt": "bag(s)",
		"nameReceipt": "Potatoes"
	},
	{
		"quantity": 0,
		"image": "img/veggies.png",
		"itemsNeeded": "Canned Vegetables",
		"servingUnits": "case of (24) – 15oz ea",
		"ourPrice": "25",
		"retailPrice": "38",
		"unitsReceipt": "case(s)",
		"nameReceipt": "Veggies"
	},
	{
		"quantity": 0,
		"image": "img/tomato.png",
		"itemsNeeded": "Canned Tomatoes",
		"servingUnits": "case of (24) – 28oz ea",
		"ourPrice": "35",
		"retailPrice": "55",
		"unitsReceipt": "case(s)",
		"nameReceipt": "Tomatoes"
	},
]

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
    console.log(donationTotal);
}

function donateTotal(){
    console.log("Donating total " + donationTotal);
    let paypalDescription = ``
    itemList.forEach(item => {
        if(item.quantity > 0){
            paypalDescription += `${item.quantity}x ${item.itemsNeeded} (${item.servingUnits}) - ${item.quantity * item.ourPrice} \n`;
        }
    });

    // Send donationTotal, description to paypal

}
console.log(donationTotal)
