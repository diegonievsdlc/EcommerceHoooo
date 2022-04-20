let localStoragePag = {
  theme: false,
  cartElement: 0,
  totalItem: 0,
  totalPrice: 0.01
}

//loader
const loader = document.querySelector('#loader');

setTimeout(()=>{
  loader.style.opacity = "0";
  loader.style.transition = "all 1s ease-in-out";
  body.style.overflow = "visible";
}, 3000);
setTimeout(() => {loader.style.display = "none";},4000);

//mode dark
const btnDark = document.getElementById("theme");
const body = document.getElementById("body");
const logo = document.getElementById('logo')

btnDark.addEventListener("click", () => {
  if(localStoragePag.theme){
    body.classList.remove("darkTheme")
    logo.src = "./assets/logo.png"
    btnDark.className = "bx bx-moon"
    body.style.transition = "all 0.3s ease-in-out";
    localStoragePag.theme = false
  }else{
    body.classList.add("darkTheme")
    logo.src = "./assets/logo2.png"
    btnDark.className = "bx bx-sun"
    logo.style.marginRight = "10px"
    body.style.transition = "all 0.3s ease-in-out";
    localStoragePag.theme = true
  }
});

//open/close menu links
const btnOpenMenu = document.getElementById("open-menu-links");
const btnCloseMenu = document.getElementById("close-menu-links");
const menuLinks = document.querySelector(".menu-links");

function openAndCloseNav(elementMenu,margin){
  elementMenu.style.right = margin;
  elementMenu.style.transition = "all 0.3s ease-in-out";
};

btnOpenMenu.addEventListener("click", () => {openAndCloseNav(menuLinks, "0")});
btnCloseMenu.addEventListener("click", () => {openAndCloseNav(menuLinks, "-100%")});

//menu links resalt
const btnNavLink = document.getElementsByClassName('btn-nav')

for(let i = 0; i < btnNavLink.length; i++){
  btnNavLink[i].addEventListener('click', function(){
    var seleccionado = document.getElementsByClassName('active')
    seleccionado[0].className = seleccionado[0].className.replace(" active")
    this.className += " active"
  })
}

//open/close menu cart
const btnOpenCart = document.getElementById("open-cart");
const btnCloseCart = document.getElementById("close-menu-cart");
const menuCart = document.querySelector(".menu-cart");
const cartEmpty = document.getElementsByClassName("cart-empty")[0]
const cartNoEmpty = document.getElementsByClassName("cart-no-empty")[0]

btnOpenCart.addEventListener("click", () => {
  if(localStoragePag.cartElement === 0){
    cartEmpty.style.display = "flex"
    cartNoEmpty.style.display = "none"
  }else{
    cartEmpty.style.display = "none"
    cartNoEmpty.style.display = "flex"
  }
  dibujar()
  openAndCloseNav(menuCart, "0")
});
btnCloseCart.addEventListener("click", () => {openAndCloseNav(menuCart, "-100%")});

//menu background
const nav = document.querySelector("#nav");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 150) {
    nav.className = "nav-scroll";
    nav.style.transition = "all 0.3s ease-in-out";
  } else {
    nav.classList.remove("nav-scroll");
    nav.style.transition = "all 0.3s ease-in-out";
  };
});

//filtro productos
const btnAllProducts = document.getElementById("all-products");
const btnProduct1 = document.getElementById("clothing");
const btnProduct2 = document.getElementById("accessories");
const btnProduct3 = document.getElementById("objects");
let ropa = document.querySelectorAll("#Clothing");
let accesorios = document.querySelectorAll("#Accessories");
let objetos = document.querySelectorAll("#Objects");

function filterProduct(prdt1, prdt2, prdt3){
  ropa.forEach((e) => {
    e.style.display = prdt1;
  });
  accesorios.forEach((e) => {
    e.style.display = prdt2;
  });
  objetos.forEach((e) => {
    e.style.display = prdt3;
  });
}

btnAllProducts.addEventListener("click", () => {filterProduct("block","block","block")});
btnProduct1.addEventListener("click", () => {filterProduct("block","none","none")});
btnProduct2.addEventListener("click", () => {filterProduct("none","block","none")});
btnProduct3.addEventListener("click", () => {filterProduct("none", "none", "block")});

//filter links resalt
const btnFilterLink = document.getElementsByClassName('btn-filter-products')

for(let i = 0; i < btnFilterLink.length; i++){
  btnFilterLink[i].addEventListener('click', function(){
    var seleccionado = document.getElementsByClassName('active2')
    seleccionado[0].className = seleccionado[0].className.replace(" active2")
    this.className += " active2"
  })
}

//const uwu = document.getElementById('uwu')
let prroducts = ``

function pushCart(numProduct){
  prroducts += `
    <div class="cart-element-select">
      <div class="cart-element-img">
        <img src=${productsInfo[numProduct].src} alt="Producto">
      </div>
      <div class="cart-element-info">
        <h2>${productsInfo[numProduct].name}</h2>
        <p>Stock: ${productsInfo[numProduct].stock} <span>$${productsInfo[numProduct].priceU}</span></p>
        <span>Subtotal: $${productsInfo[numProduct].priceU}</span>
        <div class="cart-element-buttons">
          <button id="btn-menos">-</button>
          <span>${productsInfo[numProduct].cantidad} unidad</span>
          <button id="btn-mas">+</button>
          <i class='bx bx-trash-alt'></i>
        </div>
      </div>
    </div>`
  localStoragePag.totalPrice += productsInfo[numProduct].priceU
}

let btnAddCart = document.querySelectorAll("#add-cart")

for(let i = 0; i < btnAddCart.length; i++){
  btnAddCart[i].addEventListener('click', () => {
    localStoragePag.cartElement = 1
    localStoragePag.totalItem++
    let dataProduct = btnAddCart[i].dataset.option
    pushCart(dataProduct)
  })
}

const totalItems = document.getElementById('total-items')
const totalPrice = document.getElementById('total-price')

function dibujar(){
  cartNoEmpty.innerHTML = prroducts
  totalItems.innerText = `${localStoragePag.totalItem} items`
  totalPrice.innerText = `$${localStoragePag.totalPrice}`
}



//total a pagar


//checkout
const checkout = document.getElementById('finish-shop')

checkout.addEventListener('click', () => {
  alert("Compra realizada, se cobrara un extra el 30% del pago total para ser donardo a mi bolsillo")
})



















































/*
let btnAddCart = document.querySelectorAll("#add-cart")
//detect click button add-cart
/*

for(let i = 0; i < btnAddCart.length; i++){
  btnAddCart[i].addEventListener('click', () => {
    localStoragePag.cartElement = 1
    let dataProduct = btnAddCart[i].dataset.option
    pushCart(dataProduct)
  })
}
*/

/*




function mostrarPokemones() {  
  for(let i = 0; i < btnAddCart.length; i++){
    btnAddCart[i].addEventListener('click', () => {
      localStoragePag.cartElement = 1
      let dataProduct = btnAddCart[i].dataset.option
      pushCart(dataProduct)
    })
  }
    cartMenu.innerHTML = prroducts
    console.log(prroducts)
}





btnAddCart.addEventListener('click', () => {
  mostrarPokemones()
})
*/


















/*
//aumentar unidad del producto 
  const btnUnidadMas = document.getElementById('btn-mas')
  const btnUnidadMenos = document.getElementById('btn-menos')

  /*
  btnUnidadMas.addEventListener('click', () => {
    productsInfo.cantidad += 1
  })
  

//push cart element select
const cartMenu = document.getElementsByClassName('cart-no-empty')[0]

function pushCart(numProduct){
  cartMenu.innerHTML = `
    <div class="cart-element-select">
      <div class="cart-element-img">
        <img src=${productsInfo[numProduct].src} alt="Producto">
      </div>
      <div class="cart-element-info">
        <h2>${productsInfo[numProduct].name}</h2>
        <p>Stock: ${productsInfo[numProduct].stock} <span>$${productsInfo[numProduct].priceU}</span></p>
        <span>Subtotal: $${productsInfo[numProduct].priceU}</span>
        <div class="cart-element-buttons">
          <button id="btn-menos">-</button>
          <span>${productsInfo[numProduct].cantidad} unidad</span>
          <button id="btn-mas">+</button>
          <i class='bx bx-trash-alt'></i>
        </div>
      </div>
    </div>`
}


//detect click button add-cart
let btnAddCart = document.querySelectorAll("#add-cart")

for(let i = 0; i < btnAddCart.length; i++){
  btnAddCart[i].addEventListener('click', () => {
    localStoragePag.cartElement = 1
    let dataProduct = btnAddCart[i].dataset.option
    pushCart(dataProduct)
  })
} */