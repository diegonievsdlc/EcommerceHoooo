//cart working JS
if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', ready)
}else{
  ready()
}

//Making function
function ready(){
  //Remove items from cart
  var removeCartButtons = document.getElementsByClassName('cart-remove')
  for(var i = 0; i < removeCartButtons.length; i++){
      var button = removeCartButtons[i]
      button.addEventListener('click', removeCartItems)
  } 
  //Quantity Changes
  var quantityImputs = document.getElementsByClassName('cart-quantity')
  for(var i = 0; i < quantityImputs.length; i++){
      var input = quantityImputs[i]
      input.addEventListener('change', quantityChanged)
  }
  //Add to cart
  var addCart = document.querySelectorAll('#add-cart')
  for(var i = 0; i < addCart.length; i++){
    var button = addCart[i]
    button.addEventListener('click', addCartClicked)
  }
  // Buy button work
  document.getElementsByClassName('finish-shop')[0].addEventListener('click', buyButtonClick)
}

//Buy button
function buyButtonClick(){
  alert('Your Orde is placed')
  var cartContent = document.getElementsByClassName('cart-no-empty')[0]
  while( cartContent.hasChildNodes()){
      cartContent.removeChild(cartContent.firstChild)
  }
  updateTotal()
}

//Remove items from cart
function removeCartItems(event){
  var buttonCliked = event.target
  buttonCliked.parentElement.remove()
  updateTotal()
}

//Quantity Changes
function quantityChanged(event){
  var input = event.target
  if(isNaN(input.value) || input.value <= 0){
      input.value = 1
  }
  updateTotal()
}

//Add To Cart
function addCartClicked(event){
  var button = event.target
  var dataButton = event.target.dataset.option
  var shopProducts = button.parentElement
  var title = shopProducts.getElementsByClassName('product-title2')[0].innerText
  addProductToCart(dataButton, title)
  updateTotal()
}

function addProductToCart(data, title){
  var cartShopBox = document.createElement('div')
  cartShopBox.classList.add('cart-element-select')
  var cartItems = document.getElementsByClassName('cart-no-empty')[0]
  var cartItemsNames = cartItems.getElementsByClassName('cart-product-title')
  for(var i = 0; i < cartItemsNames.length; i++){
      if(cartItemsNames[i].innerText === title){
          return
      }
  }
  var cartBoxContent = `
    <!--<div class="cart-element-select">-->
      <div class="cart-element-img">
        <img src=${productsInfo[data].src} alt="Producto">
      </div>
      <div class="cart-element-info">
        <h2 class="cart-product-title">${productsInfo[data].name}</h2>
        <p>Stock: ${productsInfo[data].stock} <span class="cart-price">$${productsInfo[data].priceU}</span></p>
        <span>Subtotal: $${productsInfo[data].priceU}</span>
        <div class="cart-element-buttons">
          <!--<button id="btn-menos">-</button>
          <span class="cart-quantity">${productsInfo[data].cantidad} unidad</span>-->
          <input type="number" value="1" class="cart-quantity">
          <!--<button id="btn-mas">+</button>-->
        </div>
      </div>
      <i class='bx bx-trash-alt cart-remove'></i>
    <!--</div>-->
  `
  cartShopBox.innerHTML = cartBoxContent
  cartItems.append(cartShopBox)
  cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItems)
  cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged)
}

//Update total
function updateTotal(){
  var cartContent = document.getElementsByClassName('cart-no-empty')[0]
  var cartBoxes = cartContent.getElementsByClassName('cart-element-select')
  var total = 0
  for(var i = 0; i < cartBoxes.length; i++){
      var cartBox = cartBoxes[i]
      var priceElement = cartBox.getElementsByClassName('cart-price')[0]
      var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0]
      var price = parseFloat(priceElement.innerText.replace("$", ""))
      var quantity = quantityElement.value
      /*parseFloat(quantityElement.innerText.replace("unidad",""))*/
      total = total + (price * quantity)
  }
  //if price Contain some Cents value
  total = Math.round(total * 100) / 100
  document.getElementsByClassName('total-price')[0].innerText = '$' + total
}




  
  
  

  /*
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
  
  //mas y menos cart
  
  
  const btnMas = document.getElementById('btn-mas')
  
  
  
  */