'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var gameSetup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = gameSetup.querySelector('.setup-close');
var wizardCoat = gameSetup.querySelector('.setup-wizard .wizard-coat');
var wizardCoatInput = gameSetup.querySelector('.setup-wizard-form input[name="coat-color"]');
var wizardEyes = gameSetup.querySelector('.setup-wizard .wizard-eyes');
var wizardEyesInput = gameSetup.querySelector('.setup-wizard-form input[name="eyes-color"]');
var fireball = gameSetup.querySelector('.setup-fireball-wrap');
var fireballInput = gameSetup.querySelector('.setup-wizard-form input[name="fireball-color"]');

var setFill = function (elem, color) {
  elem.style.fill = color;
};

var setBackground = function (elem, color) {
  elem.style.background = color;
};

var setValue = function (inp, colors) {
  var currentColor;
  var ind;
  currentColor = inp.value;
  ind = colors.indexOf(currentColor);
  if (ind < colors.length - 1) {
    inp.value = colors[ind + 1];
  } else {
    inp.value = colors[0];
  }
};

var onWizardCoatClick = function () {
  setValue(wizardCoatInput, COAT_COLORS);
  setFill(wizardCoat, wizardCoatInput.value);
};

var onWizardEyesClick = function () {
  setValue(wizardEyesInput, EYE_COLORS);
  setFill(wizardEyes, wizardEyesInput.value);
};

var onFireballClick = function () {
  setValue(fireballInput, FIREBALL_COLORS);
  setBackground(fireball, fireballInput.value);
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  gameSetup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  gameSetup.classList.add('hidden');
  gameSetup.removeAttribute('style');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

wizardCoat.addEventListener('click', onWizardCoatClick);
wizardEyes.addEventListener('click', onWizardEyesClick);
fireball.addEventListener('click', onFireballClick);

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var wizards = [
  {
    name: WIZARD_NAMES[Math.floor(Math.random() * 8)] + ' ' + WIZARD_SURNAMES[Math.floor(Math.random() * 8)],
    coatColor: COAT_COLORS[Math.floor(Math.random() * 6)],
    eyesColor: EYE_COLORS[Math.floor(Math.random() * 5)]
  },
  {
    name: WIZARD_NAMES[Math.floor(Math.random() * 8)] + ' ' + WIZARD_SURNAMES[Math.floor(Math.random() * 8)],
    coatColor: COAT_COLORS[Math.floor(Math.random() * 6)],
    eyesColor: EYE_COLORS[Math.floor(Math.random() * 5)]
  },
  {
    name: WIZARD_NAMES[Math.floor(Math.random() * 8)] + ' ' + WIZARD_SURNAMES[Math.floor(Math.random() * 8)],
    coatColor: COAT_COLORS[Math.floor(Math.random() * 6)],
    eyesColor: EYE_COLORS[Math.floor(Math.random() * 5)]
  },
  {
    name: WIZARD_NAMES[Math.floor(Math.random() * 8)] + ' ' + WIZARD_SURNAMES[Math.floor(Math.random() * 8)],
    coatColor: COAT_COLORS[Math.floor(Math.random() * 6)],
    eyesColor: EYE_COLORS[Math.floor(Math.random() * 5)]
  }
];

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

gameSetup.querySelector('.setup-similar').classList.remove('hidden');

var dialogHandler = gameSetup.querySelector('.upload');

dialogHandler.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var dragged = false;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    gameSetup.style.top = (gameSetup.offsetTop - shift.y) + 'px';
    gameSetup.style.left = (gameSetup.offsetLeft - shift.x) + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (dragged) {
      var onClickPreventDefault = function (evt) {
        evt.preventDefault();
        dialogHandler.removeEventListener('click', onClickPreventDefault)
      };
      dialogHandler.addEventListener('click', onClickPreventDefault);
    }
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
