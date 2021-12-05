const cart = document.querySelectorAll('.row .btn');
const pizza = [
    {
        name: 'top-classicPizza',
        type: 'margherita',
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
    })
}

function onLoadCartNum() {
    let pizzaNums = localStorage.getItem('cartItems');

    if (pizzaNums) {                         //tracing cart items and not losing it after refresh

        document.querySelector('.total-items-badge').textContent = pizzaNums;
    }
}

function cartItems(pizza) {

    let pizzaNums = localStorage.getItem('cartItems'); // get the value first time clicking add to cart

    pizzaNums = parseInt(pizzaNums); // convert the string to a number

    if (pizzaNums) {
        localStorage.setItem('cartItems', pizzaNums + 1); /* when add to cart is clicked value will be +1
                                                           if it's in local storage*/

        document.querySelector('.total-items-badge').textContent = pizzaNums + 1;
    } else {
        localStorage.setItem('cartItems', 1);
        document.querySelector('.total-items-badge').textContent = 1;
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

onLoadCartNum();
