'use strict';

(function () {
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = window.util.setup.querySelector('.setup-close');
  var form = window.util.setup.querySelector('.setup-wizard-form');

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  var openPopup = function () {
    window.util.setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    window.util.setup.classList.add('hidden');
    window.util.setup.removeAttribute('style');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  var onSuccess = function () {
    closePopup();
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; color: #ffffff';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    form.insertAdjacentElement('beforeend', node);
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), onSuccess, onError);
    evt.preventDefault();
  });
})();
