const calcScreen = document.querySelector('.calc__screen p') //main screen

const ac = document.querySelector('.ac') //all clear

const plusMinus = document.querySelector('.plus-minus') // +/- switcher

const percent = document.querySelector('.percent') // %

const division = document.querySelector('.division') // /
const myltiply = document.querySelector('.myltiply') // *
const minus = document.querySelector('.minus') // -
const plus = document.querySelector('.plus') // +

const equal = document.querySelector('.equal') // =

let a = ''
let b = ''
let sign = ''
let res = false

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']

const clearAll = () => {
	a = ''
	b = ''
	sign = ''
	res = false

	calcScreen.textContent = '0'

	highlightedRemove()
}

ac.addEventListener('click', clearAll)

const highlightedRemove = () => {
	document
		.querySelectorAll('.btn')
		.forEach(btn => btn.classList.remove('highlighted'))
}

const highlighted = element => {
	if (a !== '') {
		highlightedRemove()
		element.classList.add('highlighted')
	}
}

division.addEventListener('click', () => {
	sign = '/'
	highlighted(division)
})

myltiply.addEventListener('click', () => {
	sign = '*'
	highlighted(myltiply)
})

minus.addEventListener('click', () => {
	sign = '-'
	highlighted(minus)
})

plus.addEventListener('click', () => {
	sign = '+'
	highlighted(plus)
})

percent.addEventListener('click', () => {
	if (a !== '') {
		a = a / 100
		calcScreen.textContent = a
	}
})

plusMinus.addEventListener('click', () => {
	if (a !== '') {
		a = -a
		calcScreen.textContent = a
	}
})

document.querySelector('.btns').addEventListener('click', event => {
	if (!event.target.classList.contains('btn')) return
	if (event.target === ac) return

	calcScreen.textContent = '0'

	const key = event.target.textContent

	if (digit.includes(key)) {
		if (b === '' && sign === '') {
			a += key
			calcScreen.textContent = a
		} else if (a !== '' && b !== '' && res) {
			b = key
			res = false
			calcScreen.textContent = b
		} else {
			b += key
			calcScreen.textContent = b
		}
		return
	}

	if (event.target === equal) {
		if (b === '') b = a
		switch (sign) {
			case '+':
				a = (+a + +b).toFixed(1)
				break
			case '-':
				a = (a - b).toFixed(1)
				break
			case '*':
				a = (a * b).toFixed(1)
				break
			case '/':
				if (b === '0') {
					calcScreen.textContent = 'Error'
					a = ''
					b = ''
					sign = ''
					highlightedRemove()
					return
				}
				a = (a / b).toFixed(1)
				break
		}

		if (Number.isInteger(+a)) {
			a = +a
		}

		res = true
		calcScreen.textContent = a
		highlightedRemove()
	} else {
		calcScreen.textContent = a
	}
})
