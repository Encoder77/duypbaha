const cart = document.querySelectorAll('.carde')
const storage = JSON.parse(localStorage.getItem("cart") || "[]")
			for( let i = 0; i < storage.length; i++ ) {
				for( let k = 0; k < cart.length; k++ ) {
				if( storage[i]["id"] == cart[k].childNodes[1].innerText ) {
					const input = cart[k].querySelector('input')
					input.value = storage[i]['oldVal']
					cart[k].classList.add('add-active')
				}
			 }
		}
function handleAdd(event) {
	const card = event.target.closest('.carde')
	const input = card.querySelector('input')
	let oldVal = Number(input.value)
	const ide = card.querySelector('.id')
	let id = Number(ide.innerHTML)
	const storage = localStorage.getItem("cart") || "[]"
	const cart = JSON.parse(storage)
	const cardd ={id, oldVal}
	localStorage.setItem("cart", JSON.stringify([...cart, cardd]))
	card.classList.add('add-active')
}

function plusLess(event, type) {
	const card = event.target.closest('.carde')
	const input = card.querySelector('input')
	let oldVal = Number(input.value)
	const ide = card.querySelector('.id')
	let id = Number(ide.innerHTML)
	if (type == 'less') {
		if (oldVal == 1) {
			const storage = JSON.parse(localStorage.getItem("cart") || "[]")
				if (storage.length) {
					storage.forEach((el) => {
					for( var i = 0; i <= storage.length; i++ ) {
						if( storage[i]['id'] == id ) {
							storage.splice( i, 1 );
							localStorage.setItem('cart', JSON.stringify(storage));
							card.classList.remove('add-active')
						}
					}
				});
				}
			return
		}
		input.value = oldVal -= 1
		const storage = JSON.parse(localStorage.getItem("cart") || "[]")
				if (storage.length) {
					storage.forEach((el) => {
					for( var i = 0; i <= storage.length; i++ ) {
						if( storage[i]['id'] == id ) {
							storage[i]['oldVal']-=1;
							localStorage.setItem('cart', JSON.stringify(storage));
						}
					}
				});
			}
	

	} else {
		input.value = oldVal += 1
		const storage = JSON.parse(localStorage.getItem('cart') || "[]")
		if (storage.length) {
			storage.forEach((el) => {
			for( var i = 0; i <= storage.length; i++ ) {
				if( storage[i]['id'] == id ) {
					storage[i]['oldVal']+=1;
					localStorage.setItem('cart', JSON.stringify(storage));
				}
			}
		});
		}
	}
}
