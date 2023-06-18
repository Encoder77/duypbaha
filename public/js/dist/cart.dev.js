"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var cart = document.querySelectorAll('.carde');
var storage = JSON.parse(localStorage.getItem("cart") || "[]");

for (var i = 0; i < storage.length; i++) {
  for (var k = 0; k < cart.length; k++) {
    if (storage[i]["id"] == cart[k].childNodes[1].innerText) {
      var input = cart[k].querySelector('input');
      input.value = storage[i]['oldVal'];
      cart[k].classList.add('add-active');
    }
  }
}

function handleAdd(event) {
  var card = event.target.closest('.carde');
  var input = card.querySelector('input');
  var oldVal = Number(input.value);
  var ide = card.querySelector('.id');
  var id = Number(ide.innerHTML);
  var storage = localStorage.getItem("cart") || "[]";
  var cart = JSON.parse(storage);
  var cardd = {
    id: id,
    oldVal: oldVal
  };
  localStorage.setItem("cart", JSON.stringify([].concat(_toConsumableArray(cart), [cardd])));
  card.classList.add('add-active');
}

function plusLess(event, type) {
  var card = event.target.closest('.carde');
  var input = card.querySelector('input');
  var oldVal = Number(input.value);
  var ide = card.querySelector('.id');
  var id = Number(ide.innerHTML);

  if (type == 'less') {
    if (oldVal == 1) {
      var _storage2 = JSON.parse(localStorage.getItem("cart") || "[]");

      if (_storage2.length) {
        _storage2.forEach(function (el) {
          for (var i = 0; i <= _storage2.length; i++) {
            if (_storage2[i]['id'] == id) {
              _storage2.splice(i, 1);

              localStorage.setItem('cart', JSON.stringify(_storage2));
              card.classList.remove('add-active');
            }
          }
        });
      }

      return;
    }

    input.value = oldVal -= 1;

    var _storage = JSON.parse(localStorage.getItem("cart") || "[]");

    if (_storage.length) {
      _storage.forEach(function (el) {
        for (var i = 0; i <= _storage.length; i++) {
          if (_storage[i]['id'] == id) {
            _storage[i]['oldVal'] -= 1;
            localStorage.setItem('cart', JSON.stringify(_storage));
          }
        }
      });
    }
  } else {
    input.value = oldVal += 1;

    var _storage3 = JSON.parse(localStorage.getItem('cart') || "[]");

    if (_storage3.length) {
      _storage3.forEach(function (el) {
        for (var i = 0; i <= _storage3.length; i++) {
          if (_storage3[i]['id'] == id) {
            _storage3[i]['oldVal'] += 1;
            localStorage.setItem('cart', JSON.stringify(_storage3));
          }
        }
      });
    }
  }
}