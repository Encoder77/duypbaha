const cartSide = document.querySelector(".cart")
const storage = JSON.parse(localStorage.getItem("cart") || "[]")
if (storage.length) {
	storage.forEach(el => {
		const {name, img, price} = el
		cartSide.appendChild(newCard)
		});
}

/* Set rates + misc */
var shippingRate = 15.00; 
var fadeTime = 300;
recalculateCart()

/* Assign actions */
$('.product-quantity input').change( function() {
  updateQuantity(this);
});

$('.product-removal button').click( function() {
  const storage = JSON.parse(localStorage.getItem("cart") || "[]")
  if (storage.length) {
	storage.forEach((el) => {
    
		const {name, img, price} = el
    for( var i = 0; i < storage.length; ++i ) {
						var item = storage[i];
						var product = item.name;
						if( product == this.id ) {
							storage.splice( i, 1 );
              localStorage.setItem('cart', JSON.stringify(storage));
						}
	}
  });
 }
  removeItem(this);
});


/* Recalculate cart */
function recalculateCart()
{
  var subtotal = 0;
  
  /* Sum up row totals */
  $('.product').each(function () {
    subtotal += parseFloat($(this).children('.product-line-price').text());
  });
  
  /* Calculate totals */
  var shipping = (subtotal > 0 ? shippingRate : 0);
  var total = subtotal + shipping;
  
  /* Update totals display */
  $('.totals-value').fadeOut(fadeTime, function() {
    $('#cart-subtotal').html(subtotal.toFixed(2));
    $('#cart-shipping').html(shipping.toFixed(2));
    $('#cart-total').html(total.toFixed(2));
    if(total == 0){
      $('.checkout').fadeOut(fadeTime);
    }else{
      $('.checkout').fadeIn(fadeTime);
    }
    $('.totals-value').fadeIn(fadeTime);
  });
}


/* Update quantity */
function updateQuantity(quantityInput)
{
  /* Calculate line price */
  var productRow = $(quantityInput).parent().parent();
  var price = parseFloat(productRow.children('.product-price').text());
  var quantity = $(quantityInput).val();
  var linePrice = price * quantity;
  
  /* Update line price display and recalc cart totals */
  productRow.children('.product-line-price').each(function () {
    $(this).fadeOut(fadeTime, function() {
      $(this).text(linePrice.toFixed(2));
      recalculateCart();
      $(this).fadeIn(fadeTime);
    });
  });  
}


/* Remove item from cart */
function removeItem(removeButton)
{
  /* Remove row from DOM and recalc cart total */
  var productRow = $(removeButton).parent().parent();
  productRow.slideUp(fadeTime, function() {
    productRow.remove();
    recalculateCart();
  });
}