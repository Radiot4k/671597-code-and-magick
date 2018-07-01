'use strict';

var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var wizardCoat = window.util.setup.querySelector('.setup-wizard .wizard-coat');
var wizardCoatInput = window.util.setup.querySelector('.setup-wizard-form input[name="coat-color"]');
var wizardEyes = window.util.setup.querySelector('.setup-wizard .wizard-eyes');
var wizardEyesInput = window.util.setup.querySelector('.setup-wizard-form input[name="eyes-color"]');
var fireball = window.util.setup.querySelector('.setup-fireball-wrap');
var fireballInput = window.util.setup.querySelector('.setup-wizard-form input[name="fireball-color"]');

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
  setValue(wizardCoatInput, window.util.coatColors);
  wizardCoat.style.fill = wizardCoatInput.value;
};

var onWizardEyesClick = function () {
  setValue(wizardEyesInput, window.util.eyesColors);
  wizardEyes.style.fill = wizardEyesInput.value;
};

var onFireballClick = function () {
  setValue(fireballInput, FIREBALL_COLORS);
  fireball.style.background = fireballInput.value;
};

wizardCoat.addEventListener('click', onWizardCoatClick);
wizardEyes.addEventListener('click', onWizardEyesClick);
fireball.addEventListener('click', onFireballClick);
