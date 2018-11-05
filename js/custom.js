$(document).ready(function () {

  // variables

  var ItemsStorage = localStorage.getItem("Items");
  var ItemsContentStorage = localStorage.getItem("Itemscontent");
  var WishListStorage = localStorage.getItem("WishList");
  var CopmareListStorage = localStorage.getItem("CopmareList");
    var vv = 'welcome';
    console.log(vv);

  $(".i-color").on("click", function () {
    window.location.href = "cart.html";
  });

  // get file name 

  var url = window.location.pathname;
  url = url.substr(url.length - 10);


  if (ItemsStorage === null) {
    var arr = [];
  } else {
    arr = JSON.parse(localStorage.getItem("Items"));
  }

  if (ItemsContentStorage === null) {
    arr3 = [];
  } else {
    arr3 = JSON.parse(localStorage.getItem("Itemscontent"));
  }

  if (WishListStorage === null) {
    WishListArr = [];
  } else {
    WishListArr = JSON.parse(localStorage.getItem("WishList"));
  }

  if (CopmareListStorage === null) {
    CopmareListArr = [];
  } else {
    CopmareListArr = JSON.parse(localStorage.getItem("CopmareList"));
  }

  // wishlist & CopmareList 
  if (CopmareListStorage !== null) {
    var WishListStorage = JSON.parse(localStorage.getItem("WishList"));
    $(".wishlist-num").text(WishListStorage.length);

    var CopmareListStorage = JSON.parse(localStorage.getItem("CopmareList"));
    $(".compare-num").text(CopmareListStorage.length);
  }


  // set cart total price

  (function () {
    if (ItemsStorage !== null && url != "/cart.html") {
      var CartNum = ItemNum();
      $(".My-Cart-result").text(CartNum);
    }
  })();

  if (url == "/cart.html") {
    var CartSum = sumtotal();
    if (WishListStorage !== null) {
      var WishListStorage = JSON.parse(localStorage.getItem("WishList"));
      $(".wishlist-num").text(WishListStorage.length);
      var CopmareListStorage = JSON.parse(localStorage.getItem("CopmareList"));
      $(".compare-num").text(CopmareListStorage.length);
    }

    $(".My-Cart-result").text(CartSum);
    $(".subtotal-val").text(CartSum + ' EGP');
    $(".tottal_cart h1").text(CartSum + ' EGP');
    var DeliveryCost = $(".delivery-val").text().replace(/\D/g, '');
    var DiscountCost = $(".discount-val").text().replace(/\D/g, '');

    // increse product function 
    $(document).on('click', '.increment-btn', function () {
      var itemAmount = $(this).parents(".all_boder").find(".item-amount").text();
      itemAmount++;
      $(this).parents(".all_boder").find(".item-amount").text(itemAmount);
      var ItemPrice = $(this).parents(".all_boder").find(".price_detail span").text().slice(0, -3);
      var last_price = $(this).parents(".all_boder").find(".last_price").text(Number(itemAmount) * Number(ItemPrice) + ' EGP');
      TotalCart = $(".tottal_cart h1").text().slice(0, -3);
      TotalCart = Number(TotalCart);
      TotalCart += Number(ItemPrice);
      $(".tottal_cart h1").text(TotalCart + ' EGP');
      $(".My-Cart-result").text(TotalCart);
      $(".subtotal-val").text(TotalCart + ' EGP');
      var checkoutTotal = CheckOut(TotalCart, DeliveryCost, DiscountCost);
      $(".checkout-total").text(checkoutTotal + ' EGP');
    });

    // decrease product function

    $(document).on('click', '.decrement-btn', function () {
      var itemAmount = $(this).parents(".all_boder").find(".item-amount").text();
      if (itemAmount != 1) {
        itemAmount--;
        $(this).parents(".all_boder").find(".item-amount").text(itemAmount);
        var ItemPrice = $(this).parents(".all_boder").find(".price_detail span").text().slice(0, -3);
        $(this).parents(".all_boder").find(".last_price").text(Number(itemAmount) * Number(ItemPrice) + ' EGP');
        TotalCart = $(".tottal_cart h1").text().slice(0, -3);
        TotalCart = Number(TotalCart);
        TotalCart -= Number(ItemPrice);
        $(".My-Cart-result").text(TotalCart);
        $(".tottal_cart h1").text(TotalCart + ' EGP');
        $(".subtotal-val").text(TotalCart + ' EGP');
        var checkoutTotal = CheckOut(TotalCart, DeliveryCost, DiscountCost);
        $(".checkout-total").text(checkoutTotal + ' EGP');
      }
    });

    //  delete product function

    $(document).on('click', '.close-product', function () {
      var DeleteItmePrice = $(this).parents(".all_boder").find(".last_price").text();
      DeleteItmePrice = DeleteItmePrice.slice(0, -3);
      $(this).parents(".all_boder").fadeOut(1000);
      var TotalCart = $(".tottal_cart h1").text().slice(0, -3);
      var TotalCartAfterDelet = Number(TotalCart) - Number(DeleteItmePrice);
      $(".tottal_cart h1").text(TotalCartAfterDelet + ' EGP');
      $(".My-Cart-result").text(TotalCartAfterDelet);
      $(".subtotal-val").text(TotalCartAfterDelet + ' EGP');
      var checkoutTotal = CheckOut(TotalCartAfterDelet, DeliveryCost, DiscountCost);
      $(".checkout-total").text(checkoutTotal + ' EGP');
    });


    // check out function

    function CheckOut(subtotal, delivery, discount) {
      return Number(subtotal) + Number(delivery) - Number(discount);
    }
    var checkoutTotal = CheckOut(CartSum, DeliveryCost, DiscountCost);
    $(".checkout-total").text(checkoutTotal + ' EGP');
    var storedItemsContent = JSON.parse(localStorage.getItem("Itemscontent"));
    for (let index = 0; index < storedItemsContent.length; index++) {
      var Products = storedItemsContent[index];
      var ProductImg = $(Products).find('img').attr('src');
      var ProductTitle = $(Products).find('.card-title').text();
      var ProductPrice = $(Products).find('.price').text();
      var incrementvalue = 1;
      $(".append-holderr").append(`
      <div class="row all_boder mb-5">
      <div class="col-sm-12 col-md-7">
          <!--start left col-->
          <div class="row">
              <div class="col-6 p-0">
                  <div class="cart_img">
                      <img src="${ProductImg}">
                  </div>
              </div>
              <div class="col-6 p-0 border_rad" style="background: #fff;">
                  <div class="cart_img_detail">
                      <div>${ProductTitle}</div>
                      <div class="price_detail"><span>${ProductPrice}</span></div>
                  </div>
              </div>
          </div>
      </div>
      <div class="col-sm-12 col-md-5  cart_val_holder">
          <!--start right col-->
          <div class="cart_val">
              <div class="row">
                  <div class="col-4 p-md-0">
                      <div class="cart-bord">
                      <span class="i-color decrement-btn">-</span>
                      <span class="item-amount">${incrementvalue}</span>
                      <p class="i-color increment-btn">+</i></p>
                      </div>
                  </div>
                  <div class="col-4 d-flex align-items-center">
                      <span class="last_price">${ProductPrice}</span>
                  </div>
                  <div class="col-4 d-flex justify-content-center">
                      <div class="close-product plus_bg">x</div>
                  </div>
              </div>
          </div>
      </div>
  </div>
      `);
    }
  }

  var h = $(window).innerHeight();
  $("body").height("200px");
  var flag = 1;
  var aa = [];
  g = true;

  // localStorage.clear();

  // add cart btn action

  $(".add-cart").on("click", function () {
    ItemPrice = $(this).parents(".card-wrapper").find(".d").text();
    ItemId = $(this).parents(".card-wrapper").children(0).attr("id");
    console.log(ItemId);
    $.trim(ItemPrice);
    arr.push(ItemPrice);
    var ItemCntent = $(this).parents(".card-wrapper").html();
    arr3.push(ItemCntent);
    localStorage.setItem("Items", JSON.stringify(arr));
    localStorage.setItem("Itemscontent", JSON.stringify(arr3));
    localStorage.setItem("ItemsId", JSON.stringify(aa));
    var storedItemsId = JSON.parse(localStorage.getItem("ItemsId"));

    // if item added before

    // if (storedItemsId.length >= 1) {
    //   for (let index = 0; index < storedItemsId.length; index++) {
    //     var t = storedItemsId[index];
    //     if (ItemId == t) {
    //       g = false;
    //       flag++;
    //       storedItemsId.pop();
    //       // storedItemsId.slice(-1,-1);
    //     } else {
    //       // console.log(flag);
    //       // aa.push(ItemId);
    //       // localStorage.setItem("ItemsId", JSON.stringify(aa));
    //       // var storedItemsId = JSON.parse(localStorage.getItem("ItemsId"));
    //       // console.log(storedItemsId);
    //       // console.log(aa);
    //     }
    //     console.log("itmes greater than 11111111111111111");
    //   }
    //   if (g) {
    //     console.log(flag);
    //     aa.push(ItemId);
    //     localStorage.setItem("ItemsId", JSON.stringify(aa));
    //     var storedItemsId = JSON.parse(localStorage.getItem("ItemsId"));
    //     console.log(storedItemsId);
    //     console.log(aa);
    //     g = true;
    //   }
    // } else {
    //   console.log("itmes less than 1");
    //   console.log(flag);
    //   aa.push(ItemId);
    //   localStorage.setItem("ItemsId", JSON.stringify(aa));
    //   var storedItemsId = JSON.parse(localStorage.getItem("ItemsId"));
    //   console.log(storedItemsId);
    //   console.log(aa);
    // }

    // var CartSum = sumtotal();
    // $(".My-Cart-result").text(CartSum);
    // console.log($(".My-Cart-result").text(CartSum));
    var CartNum = ItemNum();
    $(".My-Cart-result").text(CartNum);
  });


  function sumtotal() {
    var storedItems = JSON.parse(localStorage.getItem("Items"));
    var CartSum = 0;
    for (let index = 0; index < storedItems.length; index++) {
      const Item = Number(storedItems[index]);
      console.log(Item);
      CartSum = CartSum + Item;
    }
    return CartSum;
  }

  function ItemNum() {
    var storedItems = JSON.parse(localStorage.getItem("Items"));
    return storedItems.length;
  }

  // wishlist count 

  $(".text-heart").click(function () {
    if (!$(this).hasClass("bg-love")) {
      $(this).addClass("bg-love");
      ItemId = $(this).parents(".card-wrapper").children(0).attr("id");
      // console.log(ItemId);
      WishListArr.push(ItemId);
      localStorage.setItem("WishList", JSON.stringify(WishListArr));
      var WishListStorage = JSON.parse(localStorage.getItem("WishList"));
      $(".wishlist-num").text(WishListStorage.length);
    } else {
      $(this).removeClass("bg-love");
      var WishListStorage = JSON.parse(localStorage.getItem("WishList"));
      WishListArr = WishListStorage;
      WishListArr.pop(ItemId);
      localStorage.setItem("WishList", JSON.stringify(WishListArr));
      $(".wishlist-num").text(WishListStorage.length);
    }
  });

  // compare count 

  $(".text-compare").click(function () {
    if (!$(this).hasClass("bg-compare")) {
      $(this).addClass("bg-compare");
      ItemId = $(this).parents(".card-wrapper").children(0).attr("id");
      CopmareListArr.push(ItemId);
      localStorage.setItem("CopmareList", JSON.stringify(CopmareListArr));
      var CopmareListStorage = JSON.parse(localStorage.getItem("CopmareList"));
      $(".compare-num").text(CopmareListStorage.length);
    } else {
      $(this).removeClass("bg-compare");
      var CopmareListStorage = JSON.parse(localStorage.getItem("CopmareList"));
      CopmareListArr = CopmareListStorage;
      CopmareListArr.pop(ItemId);
      localStorage.setItem("CopmareList", JSON.stringify(CopmareListArr));
      $(".compare-num").text(CopmareListStorage.length);
    }
  });
  $(".add-cart").click(function () {
    $(".cart-popup").fadeIn();
    $(".cart-popup").delay(1000).fadeOut();
  });
  $(".checkout-btn").click(function () {
    $(".check-popup").fadeIn();
  });

  $(".btn-confirm").click(function () {
    $(".check-popup").fadeOut();
  });

  $(".conf-btn").click(function () {
    localStorage.clear();
    window.location.href = "cart.html";
  });

  // end zob3a code

  // start slick slider
  $(".slider").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: ".prev",
    nextArrow: ".next",
    //  autoplay: true,
    //  autoplaySpeed: 2000,
    responsive: [{
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }

    ]

  });

  //dropdown menu in navbar
  var h = $(".nav").height();
  $(".dropdown").click(function () {
    $("#dropdown-menu").css('margin-top', h + 24);
  });





});
var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = x.length
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }

}

var h_hright = $(window).innerHeight();
console.log(h_hright);

function myFunction(x) {
  if (x.matches) { // If media query matches
    $(".top_header").css("height", h_hright / 2);
    $(".carousel_height ").css("height", h_hright / 2);
    $(".home").css("overflow-x", "hidden");
  } else {

  }
}


var x = window.matchMedia("(max-width: 576px)")
myFunction(x) // Call listener function at run time
x.addListener(myFunction) // Attach listener function on state changes

$(window).resize(function () {

  var h_hright = $(window).innerHeight();
  console.log(h_hright);

  function myFunction(x) {
    if (x.matches) { // If media query matches
      $(".top_header").css("height", h_hright / 2);
      $(".carousel_height ").css("height", h_hright / 2);
      $(".home").css("overflow-x", "hidden");
    } else {

    }
  }


  var x = window.matchMedia("(max-width: 576px)")
  myFunction(x) // Call listener function at run time
  x.addListener(myFunction) // Attach listener function on state changes
});

//end slick slider

//append text for choose categories
$('#my-div a').click(function (e) {
  var txt = $(e.target).text();
  $(".choose").html(txt);
});