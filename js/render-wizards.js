'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var wizards = [
    {
      name: WIZARD_NAMES[Math.floor(Math.random() * 8)] + ' ' + WIZARD_SURNAMES[Math.floor(Math.random() * 8)],
      coatColor: window.util.coatColors[Math.floor(Math.random() * 6)],
      eyesColor: window.util.eyesColors[Math.floor(Math.random() * 5)]
    },
    {
      name: WIZARD_NAMES[Math.floor(Math.random() * 8)] + ' ' + WIZARD_SURNAMES[Math.floor(Math.random() * 8)],
      coatColor: window.util.coatColors[Math.floor(Math.random() * 6)],
      eyesColor: window.util.eyesColors[Math.floor(Math.random() * 5)]
    },
    {
      name: WIZARD_NAMES[Math.floor(Math.random() * 8)] + ' ' + WIZARD_SURNAMES[Math.floor(Math.random() * 8)],
      coatColor: window.util.coatColors[Math.floor(Math.random() * 6)],
      eyesColor: window.util.eyesColors[Math.floor(Math.random() * 5)]
    },
    {
      name: WIZARD_NAMES[Math.floor(Math.random() * 8)] + ' ' + WIZARD_SURNAMES[Math.floor(Math.random() * 8)],
      coatColor: window.util.coatColors[Math.floor(Math.random() * 6)],
      eyesColor: window.util.eyesColors[Math.floor(Math.random() * 5)]
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

  window.util.setup.querySelector('.setup-similar').classList.remove('hidden');
})();
