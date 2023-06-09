function handleAdd(event) {
	const card = event.target.closest('.card')
	card.classList.add('add-active')
}

function plusLess(event, type) {
	const card = event.target.closest('.card')
	const input = card.querySelector('input')
	let oldVal = Number(input.value)
	if (type == 'less') {
		if (oldVal == 1) {
			card.classList.remove('add-active')
			return
		}
		input.value = oldVal -= 1
	} else {
		input.value = oldVal += 1
	}
}

const cards = document.querySelectorAll(".card")
cards.forEach(el  => {
	const image = el.childNodes[3]
	const img = image.childNodes[1].currentSrc
	const text = el.childNodes[5]
	const name = text.childNodes[1].innerText
	const price  = el.childNodes[7].innerText
	const button = el.childNodes[13]
	const pic = button.childNodes[3]
	const pice = pic.childNodes[3].value
	const btn = button.childNodes[1]
	btn.addEventListener("click", () => {
		const storage = localStorage.getItem("cart") || "[]"
		const cart = JSON.parse(storage)
		const card ={ name, img, price}
		localStorage.setItem("cart", JSON.stringify([...cart, card]))
	})
	
})