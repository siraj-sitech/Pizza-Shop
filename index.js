const addToCart = document.querySelectorAll('.row .btn');
const cart = document.querySelector('.cart-total');

const pizza = [
    {
        name: 'Classic Pizza',
        type: 'classic',
        price: 13.95,
        inCart: 0
    },
    {
        name: 'Pesto Pizza',
        type: 'pesto',
        price: 17.95,
        inCart: 0
    },
    {
        name: 'Margherita Pizza',
        type: 'margherita',
        price: 15.95,
        inCart: 0    // tracing cart
    },
    {
        name: 'Pesto Pizza',
        type: 'pesto',
        price: 17.95,
        inCart: 0
    },
    {
        name: 'MargheritaPizza',
        price: 15.95,
        type: 'margherita',
        inCart: 0
    },
    {
        name: 'Classic Pizza',
        price: 13.95,
        type: 'classic',
        inCart: 0    // tracing cart
    }
];


for (let i = 0; i < addToCart.length; i++) {
    addToCart[i].addEventListener('click', () => {
        cartItems(pizza[i]);
        totalCost(pizza[i]);
    })
}

cart.addEventListener('click', displayCart);

function onLoadCartNum() {
    let pizzaNums = localStorage.getItem('cartItems');

    if (pizzaNums) {                         //tracing cart items and not losing it after refresh

        document.querySelector('.total-items-badge').textContent = pizzaNums;
    }
} //doesnt lose items on refresh.

function onLoadTotal() {
    let totalPizza = localStorage.getItem('total');

    if (totalPizza) {
        document.querySelector('.cart-total-amount .ms-1').textContent = totalPizza;
    }
} // doesnt lose total on refresh.

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
} // counting how many items in cart.

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
} // checking for existing items in cart and no overwriting.

function totalCost(pizza) {
    let cart = localStorage.getItem('total');

    if (cart != null) {
        cart = parseFloat(cart);
        localStorage.setItem("total", (cart + pizza.price).toFixed(2));
        document.querySelector('.cart-total-amount .ms-1').textContent = (cart + pizza.price).toFixed(2);

    } else {
        localStorage.setItem("total", pizza.price);
        document.querySelector('.cart-total-amount .ms-1').textContent = cart + pizza.price;
    }
}


function displayCart() {
    let total = localStorage.getItem("total"); // get total from local storage
    let cart = localStorage.getItem('pizzaInCart'); // get items from local storage
    let container = document.querySelector('.cart-modal-items'); //selecting container to add new items
    let totalSpan = document.querySelector('.text-end span'); // for total amount


    cart = JSON.parse(cart); // parsing the objects bc it returns as a string

    if (cart) {
        container.innerHTML = '';
        Object.values(cart).map(item => { // Mapping through the objects in local cart
            container.innerHTML += `
            <div class="cart-modal-item d-flex align-items-center">
                  <span class="fw-bold">${item.name}</span>
                  <div class="ms-auto">
                    <button type="button" class="btn btn-light">+</button>
                    <input required value="${item.inCart}" placeholder="1" size="2" class="text-center border border-light">
                    <button type="button" class="btn btn-light">-</button>
                  </div>
                </div><br>
            `;
        });
        totalSpan.textContent = "$" + total;
    } else {
        container.innerHTML = '';
        totalSpan.textContent = "$" + 0;
    }
}

onLoadTotal();
onLoadCartNum();



