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
  //aumentar cantidad
  /*var btnMas = document.getElementsByClassName('btn-mas')
  for(var i = 0; i < btnMas.length; i++){
    let btnAuuu = btnMas[i]
    btnAuuu.addEventListener('click',  sumarYrestar)
  }*/
  // Buy button work
  document.getElementsByClassName('finish-shop')[0].addEventListener('click', buyButtonClick)
}

//Buy button
function buyButtonClick(){
  localStoragePag.cartElement = 0
  alert('Your Orde is placed')
  var cartContent = document.getElementsByClassName('cart-no-empty')[0]
  while( cartContent.hasChildNodes()){
      cartContent.removeChild(cartContent.firstChild)
  }
  updateTotal()
}

//Remove items from cart
function removeCartItems(event){
  localStoragePag.cartElement--
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
          <button id="btn-menos">-</button>
          <span><span class="cart-quantity">${productsInfo[data].cantidad}</span> unidad</span>
          <!--<input type="number" value="1" class="cart-quantity">-->
          <button data-option="${data}" class="btn-mas">+</button>
        </div>
      </div>
      <i class='bx bx-trash-alt cart-remove'></i>
    <!--</div>-->
  `
  localStoragePag.cartElement++
  cartShopBox.innerHTML = cartBoxContent
  cartItems.append(cartShopBox)
  cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItems)
  cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged)
  /*cartShopBox.getElementsByClassName('btn-mas')[0].addEventListener('click', sumarYrestar)*/
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
      var quantity = quantityElement.innerText
      total = total + (price * quantity)
  }
  //if price Contain some Cents value
  total = Math.round(total * 100) / 100
  document.getElementsByClassName('total-price')[0].innerText = '$' + total
  updateItems()
}

//update items
function updateItems(){
  var cartContent = document.getElementsByClassName('cart-no-empty')[0]
  var cartBoxes = cartContent.getElementsByClassName('cart-element-select')
  var total = 0
  for(var i = 0; i < cartBoxes.length; i++){
      var cartBox = cartBoxes[i]
      var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0]
      var quantity = parseInt(quantityElement.innerText)
      total = total + quantity
  }
  //if price Contain some Cents value
  total = Math.round(total * 100) / 100
  document.getElementsByClassName('total-items')[0].innerText = total + ' items'
}

//Mas y menos
/*
function sumarYrestar(){
    productsInfo.Product1.cantidad++
}*/