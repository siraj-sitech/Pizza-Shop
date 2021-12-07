let cards = document.getElementsByClassName("card");
let btn = document.getElementsByClassName("card-modal-form");
let Number_element = document.getElementsByClassName("card");
let totalItem = document.querySelector(".total-items-badge");
let totalAmount = document.querySelector(".cart-total-amount");
var counter = 0;
var price = 0;
var processPrice = 0;
for(let i = 1 ; i <= Number_element.length; i++){
    document.getElementById(`card_btn_${i}`).onclick = function (){
        counter++;
        price = +document.getElementById(`MainPrice_${i}`).textContent;
        processPrice += price;
        totalItem.innerHTML = counter;
        totalAmount.innerHTML = processPrice.toFixed(2);
    };
}
