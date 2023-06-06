let CardPin = '';
let displayer = document.getElementById('displayer');

let cards = [];
cards = JSON.parse(localStorage.getItem('pinGen')) || []; // Set default value as an empty array

let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1;
let yy = today.getFullYear();

let networkCode = {
  MTN: '*555*',
  AIRTEL: '*126*',
  GLO: '*123*',
  ETISALAT: '*222*'
};

function generateNumber() {
  CardPin = ''; // Remove the "let" declaration to update the global variable
  for (let index = 0; index < 11; index++) {
    CardPin += Math.floor(Math.random() * 10);
  }

  document.getElementById('pin').value = CardPin;
}

function display() {
  displayer.innerHTML = '';
  cards.forEach((element, index) => {
    displayer.innerHTML += `
      <td class="col-1">${index + 1}</td>
      <td class="col-2">${element.netwrk}</td>
      <td class="col-1">${element.date}</td>
      <td class="col-1">${element.amount}</td>
      <td class="col-2">${element.pin}</td>
      <td class="col-2">${element.printref}</td>
      <td class="col-1">${element.status ? 'Used' : 'Unused'}</td>
      <td><button class="btn text-dark" onclick="del(${index})">Delete</button></td>`;
  });
}

function storePin() {
  let getData = localStorage.getItem('pinGen');
  if (getData) {
    cards = JSON.parse(getData);
    display();
  }
}

storePin();

function savebtn() {
  let networkSelect = document.getElementById('netwrk').value;
  let chosenAmount = document.getElementById('chooseAmount');
  let pin = document.getElementById('pin').value;
  let printref = `${networkCode[networkSelect]}${pin}#`;

  let carddata = {
    netwrk: networkSelect,
    amount: chosenAmount.value,
    pin: pin,
    printref: printref,
    date: `${dd}-${mm}-${yy}`,
    status: false,
  };

  cards.push(carddata);
  localStorage.setItem('pinGen', JSON.stringify(cards));
  display();
  alert('Saved successfully!');
}

function del(index) {
  cards.splice(index, 1);
  localStorage.setItem('pinGen', JSON.stringify(cards));
  display();
}

function recharge() {
    let pinInput = document.getElementById('pinInput').value;
    let selectedCard = cards.find((card) => card.printref === pinInput);
  
    if (selectedCard) {
    
      selectedCard.status = true;
  
      alert('Recharge successful!');
    } else {
      alert('Invalid PIN. Please enter a valid PIN.');
    }
  }
  display();

   