let pizzas = [
    {
        name: 'Chicken & Mushroom',
        tag: 'Chicken & Mushroom',
        size:'Regular',
        price: 600,
        inCart: 0

    },
    {
        name: 'Roast Veg & Feta',
        tag: 'Roast Veg & Feta',
        size:'Medium',
        price: 800,
        inCart: 0
    },
    {
        name: 'Pizza Boerewors',
        tag: 'Pizza Boerewors',
        size:'Large',
        price: 1000,
        inCart: 0
    },
    {
        name: 'Pizza Veg Tikka',
        tag: 'Pizza Veg Tikka',
        size:'King Size',
        price: 1500,
        inCart: 0
    },
    {
        name: 'Meat Deluxe',
        tag: 'Meat Deluxe',
        size:'Medium - ON OFFER',
        price: 700,
        inCart: 0
    },
    {
        name: 'Peri-Peri Chicken',
        tag: 'Peri-Peri Chicken',
        size:'Speciality',
        price: 1500,
        inCart: 0
    },
    {
        name: 'Chicken & Beef Pepperoni',
        tag: 'Chicken & Beef Pepperoni',
        size:'PLUS SIZE',
        price: 1500,
        inCart: 0
    },{
        name: 'Chicken Hawaiian',
        tag: 'Chicken Hawaiian',
        size:'Supreme',
        price: 1600,
        inCart: 0
    }
];


let carts = document.querySelectorAll('.btn-brdr-primary');
for (let i=0; i < carts.length; i++){
carts[i].addEventListener('click',(e) => {
    e.preventDefault();
    cartItems(pizzas[i]);
    cartTotalCost(pizzas[i]);
})
}

function onLoadCartItems() {
    let productItems = localStorage.getItem('cartItems');
    if(productItems){
        document.querySelector('.item-total').textContent = productItems;
    }
}

function cartItems(pizzas){
    
    let productItems = localStorage.getItem('cartItems');
    
    productItems = parseInt(productItems);

    if(productItems){
        localStorage.setItem('cartItems',productItems + 1);
        document.querySelector('.item-total').textContent = productItems + 1;
    }
    else{
        localStorage.setItem('cartItems', 1);
        document.querySelector('.item-total').textContent = 1;
    }
    setItems(pizzas);
}
function setItems(pizzas){
    let inCartPizzas = localStorage.getItem('pizzasInCart');
    inCartPizzas = JSON.parse(inCartPizzas);
    if(inCartPizzas != null){
        if(inCartPizzas[pizzas.tag] == undefined){
            inCartPizzas = {
                ...inCartPizzas,
                [pizzas.tag]: pizzas
            }

        }
        inCartPizzas[pizzas.tag].inCart += 1; 

    }else{
        pizzas.inCart = 1;
        inCartPizzas ={
            [pizzas.tag]: pizzas
        }
    }

    localStorage.setItem("pizzasInCart", JSON.stringify(inCartPizzas));
}

function cartTotalCost(pizzas){
    let cartTotal = localStorage.getItem('cartTotalCost');
    // console.log("total", cartTotal);

    if(cartTotal != null){
        cartTotal = parseInt(cartTotal);
        localStorage.setItem("cartTotalCost", cartTotal + 
        pizzas.price);
    }else{
        localStorage.setItem("cartTotalCost", pizzas.price);
    }
}

function displayCart(){
    let cartPizzas = localStorage.getItem('pizzasInCart');
    cartPizzas = JSON.parse(cartPizzas);
    let itemContainer = document.querySelector('.items');
    let cartTotal = localStorage.getItem('cartTotalCost');
    // console.log(cartPizzas);
    if(cartPizzas && itemContainer){
        
        itemContainer.innerHTML = '';
        Object.values(cartPizzas).map(item => {
            itemContainer.innerHTML += `
            <div class="items-container">
            <i class="fas fa-times-circle"></i>
            <img src="../cart-items/${item.tag}.jpg"
            <span>${item.name}</span>
            </div>
            <div class="item-price">Kshs${item.price}.00</div>
            <div class="item-quantity">
            <i class="fas fa-plus-circle"></i>
            <span>${item.inCart}</span>
            <i class="fas fa-minus-circle"></i>
            <div class="item-total">
            Kshs${item.inCart * item.price}.00`
        });

        itemContainer.innerHTML += `
        <div class="CartTotalContainer">
        <h4 class="cartTotalTitle">
            Cart Total
        </h4>
        <h4 class="cartTotalAmount">
            Kshs${cartTotal}.00
        </h4>`
    }
}

onLoadCartItems()
displayCart();