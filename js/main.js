// Object with exchange rates
let rates = {}


// Elements for displaying the course
const elementUSD = document.querySelector('[data-value="USD"]')
const elementEUR = document.querySelector('[data-value="EUR"]')
const elementGBP = document.querySelector('[data-value="GBP"]')


// Form elements, amount input, currency selection, result field
const input = document.querySelector('#input')
const result = document.querySelector('#result')
const select = document.querySelector('#select')
const inputOptions = document.querySelector('#exampleFormControlSelect1')
const triangleUSD = document.querySelector('.triangle-USD')
const triangleEUR = document.querySelector('.triangle-EUR')
const triangleGBP = document.querySelector('.triangle-GBP')


// Function of getting the exchange rate and displaying
async function getCurrencies() {
    const result = await fetch('https://www.cbr-xml-daily.ru/daily_json.js')
        .then(response => response.json())
    rates = {...result.Valute}
    console.log(rates)
    await addOptions(inputOptions)
    await addOptions(select)

    elementUSD.textContent = rates.USD.Value.toFixed(2)
    elementEUR.textContent = rates.EUR.Value.toFixed(2)
    elementGBP.textContent = rates.GBP.Value.toFixed(2)

    if (rates.USD.Value > rates.USD.Previous) {
        elementUSD.classList.add('bottom')
        triangleUSD.classList.add('bottom')
    } else {
        elementUSD.classList.add('top')
        triangleUSD.classList.add('top')
    }
    if (rates.EUR.Value > rates.USD.Previous) {
        elementEUR.classList.add('bottom')
        triangleEUR.classList.add('bottom')
    } else {
        elementEUR.classList.add('top')
        triangleEUR.classList.add('top')
    }
    if (rates.GBP.Value > rates.USD.Previous) {
        elementGBP.classList.add('bottom')
        triangleGBP.classList.add('bottom')
    } else {
        elementGBP.classList.add('top')
        triangleGBP.classList.add('top')
    }
}

function convert () {
    result.value = (parseFloat(input.value) * rates[inputOptions.value].Value / rates[select.value].Value).toFixed(2)
}

function addOptions(elem) {
    for (let key in rates) {
        const element = document.createElement('option')
        element.value = key
        element.innerHTML = key
        elem.insertAdjacentElement('beforeend', element)
    }
}

input.oninput = convert
select.oninput = convert

getCurrencies()
setInterval(getCurrencies, 60000)