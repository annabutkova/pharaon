/* --- burger menu --- */

const body = document.querySelector('body');
const burgerBtn = document.querySelector('.burger');
const burgerMenu = document.querySelector('.nav-mobile-wrapper');
const navLinks = document.querySelectorAll('.nav_item-mobile');


function closeBurger() {
  burgerMenu.classList.remove('--active');
  burgerBtn.classList.remove('--active');
  body.classList.remove('--blocked');
}

burgerBtn.addEventListener('click', function () {
  burgerMenu.classList.toggle('--active');
  burgerBtn.classList.toggle('--active');
  body.classList.toggle('--blocked');
});


document.addEventListener('click', (e) => {
  if (e.target == burgerMenu) {
    closeBurger();
  }
});

for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener('click', closeBurger);
}

/* cards */

let requestURL = './pets.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

const slider = document.getElementById('pets-slider');
const petsPage = document.getElementById('pets-page');


function countSliderCards() {
  let pets = request.response;

  if (window.innerWidth >= 1280) {
    generatePetsCards(pets);
    generatePetsCards(pets);
    generatePetsCards(pets);
  } else if (window.innerWidth >= 768 && window.innerWidth < 1280) {
    generatePetsCards(pets, 2);
  } else {
    generatePetsCards(pets, 1);
  }
}

function countPageCards() {
  let pets = request.response;

  if (window.innerWidth >= 1280) {
    generatePetsPage(pets, 8);
  } else if (window.innerWidth >= 768 && window.innerWidth < 1280) {
    generatePetsPage(pets, 6);
  } else {
    generatePetsPage(pets, 3);
  }
}

request.onload = function () {
  if (slider) {
    countSliderCards();
  }
  if (petsPage) {
    countPageCards();
  }
};

const sliderPrev = document.getElementById('slider-prev');
const sliderNext = document.getElementById('slider-next');

sliderPrev.addEventListener('click', countSliderCards);
sliderNext.addEventListener('click', countSliderCards);



function generatePetsCards(jsonObj) {
  let petArray = jsonObj;
  petArray.sort(() => Math.random() - 0.5);
  console.log(petArray);
  let i = Math.floor(Math.random() * 9);



  console.log(window.innerWidth);
  let petCard = document.createElement('div');
  petCard.classList.add('pet_card');
  petCard.id = `${i}`;

  let petPhoto = document.createElement('div');
  petPhoto.classList.add('pet_photo');
  let petImage = document.createElement('img');


  petImage.setAttribute('src', `./assets/images/pets-${petArray[i].name.toLowerCase()}.png`);
  petPhoto.append(petImage);


  let petName = document.createElement('p');
  petName.classList.add('pet_name');
  petName.textContent = `${petArray[i].name}`;

  let petBtn = document.createElement('button');
  petBtn.classList.add('pet_card_btn');
  petBtn.classList.add('btn');
  petBtn.setAttribute('type', 'button');
  petBtn.textContent = 'Learn more';
  petCard.append(petPhoto, petName, petBtn);
  slider.append(petCard);

  petCard.addEventListener('click', function () {
    let popup = document.createElement('div');
    popup.classList.add('popup');

    let popupWrapper = document.createElement('div');
    popupWrapper.classList.add('popup-wrapper');

    let popupCloseBtn = document.createElement('div');
    popupCloseBtn.classList.add('close-btn');
    popupWrapper.append(popupCloseBtn);


    let popupImage = document.createElement('div');
    popupImage.classList.add('popup-img');

    let popupImg = document.createElement('img');
    popupImg.setAttribute('src', `./assets/images/pets-${petArray[i].name.toLowerCase()}.png`);
    popupImage.append(popupImg);

    let popupText = document.createElement('div');
    popupText.classList.add('popup-text');

    let popupName = document.createElement('h2');
    popupName.classList.add('popup-name');
    popupName.textContent = `${petArray[i].name}`;

    let popupTypeBreed = document.createElement('h5');
    popupTypeBreed.classList.add('popup-type');
    popupTypeBreed.textContent = `${petArray[i].type} - ${petArray[i].breed}`;

    let popupDescription = document.createElement('p');
    popupDescription.classList.add('popup-description');
    popupDescription.textContent = `${petArray[i].description}`;


    let popupList = document.createElement('ul');
    popupList.classList.add('popup-list');

    let popupAge = document.createElement('li');
    popupAge.innerHTML = `<b>Age:</b> ${petArray[i].age}`;
    let popupInoculations = document.createElement('li');
    popupInoculations.innerHTML = `<b>Inoculations:</b> ${petArray[i].inoculations}`;
    let popupDiseasess = document.createElement('li');
    popupDiseasess.innerHTML = `<b>Diseasess:</b> ${petArray[i].diseases}`;
    let popupParasites = document.createElement('li');
    popupParasites.innerHTML = `<b>Parasites:</b> ${petArray[i].parasites}`;

    popupList.append(popupAge, popupInoculations, popupDiseasess, popupParasites);

    popupText.append(popupName, popupTypeBreed, popupDescription, popupList);

    popupWrapper.append(popupImage, popupText);

    popup.append(popupWrapper);
    body.append(popup);
    body.classList.add('--blocked');



    function closePopup() {
      popup.style.display = 'none';
      body.classList.remove('--blocked');

    }

    popupCloseBtn.addEventListener('click', closePopup);

    document.addEventListener('click', (e) => {

      if (e.target == popup) {
        closePopup();
      }
    });

  });



}




function generatePetsPage(jsonObj, num) {

  let petArray = jsonObj;

  for (let i = 0; i < num; i++) {
    let petCard = document.createElement('div');
    petCard.classList.add('pet_card');
    petCard.id = `${i}`;

    let petPhoto = document.createElement('div');
    petPhoto.classList.add('pet_photo');
    let petImage = document.createElement('img');
    petImage.setAttribute('src', `./assets/images/pets-${petArray[i].name.toLowerCase()}.png`);
    petPhoto.append(petImage);


    let petName = document.createElement('p');
    petName.classList.add('pet_name');
    petName.textContent = `${petArray[i].name}`;

    let petBtn = document.createElement('button');
    petBtn.classList.add('pet_card_btn');
    petBtn.classList.add('btn');
    petBtn.setAttribute('type', 'button');
    petBtn.textContent = 'Learn more';
    petCard.append(petPhoto, petName, petBtn);
    petsPage.append(petCard);

    petCard.addEventListener('click', function () {
      let popup = document.createElement('div');
      popup.classList.add('popup');

      let popupWrapper = document.createElement('div');
      popupWrapper.classList.add('popup-wrapper');

      let popupCloseBtn = document.createElement('div');
      popupCloseBtn.classList.add('close-btn');
      popupWrapper.append(popupCloseBtn);


      let popupImage = document.createElement('div');
      popupImage.classList.add('popup-img');

      let popupImg = document.createElement('img');
      popupImg.setAttribute('src', `./assets/images/pets-${petArray[i].name.toLowerCase()}.png`);
      popupImage.append(popupImg);

      let popupText = document.createElement('div');
      popupText.classList.add('popup-text');

      let popupName = document.createElement('h2');
      popupName.classList.add('popup-name');
      popupName.textContent = `${petArray[i].name}`;

      let popupTypeBreed = document.createElement('h5');
      popupTypeBreed.classList.add('popup-type');
      popupTypeBreed.textContent = `${petArray[i].type} - ${petArray[i].breed}`;

      let popupDescription = document.createElement('p');
      popupDescription.classList.add('popup-description');
      popupDescription.textContent = `${petArray[i].description}`;


      let popupList = document.createElement('ul');
      popupList.classList.add('popup-list');

      let popupAge = document.createElement('li');
      popupAge.innerHTML = `<b>Age:</b> ${petArray[i].age}`;
      let popupInoculations = document.createElement('li');
      popupInoculations.innerHTML = `<b>Inoculations:</b> ${petArray[i].inoculations}`;
      let popupDiseasess = document.createElement('li');
      popupDiseasess.innerHTML = `<b>Diseasess:</b> ${petArray[i].diseases}`;
      let popupParasites = document.createElement('li');
      popupParasites.innerHTML = `<b>Parasites:</b> ${petArray[i].parasites}`;

      popupList.append(popupAge, popupInoculations, popupDiseasess, popupParasites);

      popupText.append(popupName, popupTypeBreed, popupDescription, popupList);

      popupWrapper.append(popupImage, popupText);

      popup.append(popupWrapper);
      body.append(popup);
      body.classList.add('--blocked');



      function closePopup() {
        popup.style.display = 'none';
        body.classList.remove('--blocked');

      }

      popupCloseBtn.addEventListener('click', closePopup);

      document.addEventListener('click', (e) => {

        if (e.target == popup) {
          closePopup();
        }
      });

    });

  }

}
