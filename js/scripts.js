// navigation slide function

const navSlide = () => {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links li");
    // toggle Nav
    burger.addEventListener("click", () => {
        nav.classList.toggle("nav-active");

      //Animate links
        navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = "";
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${
            index / 7 + 0.5
            }s`;
        }
    });

      //toggle animation
        burger.classList.toggle("toggle");
    });
};
navSlide();


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
    console.log("total", cartTotal);

    if(cartTotal != null){
        cartTotal = parseInt(cartTotal);
        localStorage.setItem("cartTotalCost", cartTotal + 
        pizzas.price);
    }else{
        localStorage.setItem("cartTotalCost", pizzas.price);
    }
}

onLoadCartItems()
