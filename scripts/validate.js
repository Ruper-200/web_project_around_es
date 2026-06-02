// Funciones de validacion
function showInputError(inputElement) {
  const errorElement = inputElement
    .closest(".popup__form")
    .querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = inputElement.validationMessage;
}

function hideInputError(inputElement) {
  const errorElement = inputElement
    .closest(".popup__form")
    .querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.textContent = "";
}

function checkInputValidity(inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(inputElement);
  } else {
    hideInputError(inputElement);
  }
}

function toggleSubmitButton(inputList, submitButton) {
  if (hasInvalidInput(inputList)) {
    submitButton.classList.add("popup__button_disabled");
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove("popup__button_disabled");
    submitButton.disabled = false;
  }
}

export function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

export function resetFormValidation(inputList, submitButton) {
  inputList.forEach((inputElement) => {
    hideInputError(inputElement);
  });
  toggleSubmitButton(inputList, submitButton);
}

export function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const submitButton = formElement.querySelector(".popup__button");

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(inputElement);
      toggleSubmitButton(inputList, submitButton);
    });
  });

  toggleSubmitButton(inputList, submitButton);
}

export function enableValidation(formList) {
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}
