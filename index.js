const cart = document.querySelectorAll('.row .btn');
const pizza = [
    {
        name: 'top-classicPizza',
        type: 'classic',
        price: 13.95,
        inCart: 0
    },
    {
        name: 'top-pestoPizza',
        type: 'pesto',
        price: 17.95,
        inCart: 0
    },
    {
        name: 'top-margheritaPizza',
        type: 'margherita',
        price: 15.95,
        inCart: 0    // tracing cart
    },
    {
        name: 'menu-pestoPizza',
        type: 'pesto',
        price: 17.95,
        inCart: 0
    },
    {
        name: 'menu-margheritaPizza',
        price: 15.95,
        type: 'margherita',
        inCart: 0
    },
    {
        name: 'menu-classicPizza',
        price: 13.95,
        type: 'classic',
        inCart: 0    // tracing cart
    }
];

for (let i = 0; i < cart.length; i++) {
    cart[i].addEventListener('click', () => {
        cartItems(pizza[i]);
        totalCost(pizza[i]);
    })
}

function onLoadCartNum() {
    let pizzaNums = localStorage.getItem('cartItems');

    if (pizzaNums) {                         //tracing cart items and not losing it after refresh

        document.querySelector('.total-items-badge').textContent = pizzaNums;
      }
    }

function onLoadTotal(){
    let totalPizza = localStorage.getItem('total');

    if(totalPizza)
    {
         document.querySelector('.cart-total-amount .ms-1').textContent = totalPizza;
    }
}

function cartItems(pizza) {

    let pizzaNums = localStorage.getItem('cartItems'); // get the value first time clicking add to cart

    pizzaNums = parseInt(pizzaNums); // convert the string to a number

    if (pizzaNums) {
        localStorage.setItem('cartItems', pizzaNums + 1); /* when add to cart is clicked value will be +1
                                                           if it's in local storage*/

        document.querySelector('.total-items-badge').textContent = pizzaNums + 1; // increase counter on cart
    } else {
        localStorage.setItem('cartItems', 1);
        document.querySelector('.total-items-badge').textContent = 1; // set counter 1 to be first item
    }
    setItems(pizza);
}

function setItems(pizza) {
    let cartItems = localStorage.getItem('pizzaInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        if (cartItems[pizza.type] == undefined) {
            cartItems = {
                ...cartItems,
                [pizza.type]: pizza
            }

        }
        cartItems[pizza.type].inCart += 1;

    } else {
        pizza.inCart = 1;
        cartItems = {
            [pizza.type]: pizza
        }
    }
    localStorage.setItem("pizzaInCart", JSON.stringify(cartItems));
}

function totalCost(pizza) {
    let cart = localStorage.getItem('total');

    if (cart != null) {
        cart = parseFloat(cart);
        localStorage.setItem("total", (cart + pizza.price).toFixed(2));
           document.querySelector('.cart-total-amount .ms-1').textContent = (cart+pizza.price).toFixed(2);

    } else {
        localStorage.setItem("total", pizza.price);
        document.querySelector('.cart-total-amount .ms-1').textContent = cart+pizza.price;
    }
}
onLoadTotal();
onLoadCartNum();



