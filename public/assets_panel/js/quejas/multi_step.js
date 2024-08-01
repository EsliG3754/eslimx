//DOM elements
const DOMstrings = {
	stepsBtnClass: 'multisteps-form__progress-btn',
	stepsBtns: document.querySelectorAll(`.multisteps-form__progress-btn`),
	stepsBar: document.querySelector('.multisteps-form__progress'),
	stepsForm: document.querySelector('.multisteps-form__form'),
	stepsFormTextareas: document.querySelectorAll('.multisteps-form__textarea'),
	stepFormPanelClass: 'multisteps-form__panel',
	stepFormPanels: document.querySelectorAll('.multisteps-form__panel'),
	stepPrevBtnClass: 'js-btn-prev',
	stepNextBtnClass: 'js-btn-next'
};

const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: 'white',
    customClass: {
        popup: 'colored-toast'
    },
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    icon: 'error'
})

//remove class from a set of items
const removeClasses = (elemSet, className) => {

	elemSet.forEach(elem => {

		elem.classList.remove(className);

	});

};

//return exect parent node of the element
const findParent = (elem, parentClass) => {

	let currentNode = elem;

	while (!currentNode.classList.contains(parentClass)) {
		currentNode = currentNode.parentNode;
	}

	return currentNode;

};

//get active button step number
const getActiveStep = elem => {
	return Array.from(DOMstrings.stepsBtns).indexOf(elem);
};

//set all steps before clicked (and clicked too) to active
const setActiveStep = activeStepNum => {

	//remove active state from all the state
	removeClasses(DOMstrings.stepsBtns, 'js-active');

	//set picked items to active
	DOMstrings.stepsBtns.forEach((elem, index) => {

		if (index <= activeStepNum) {
			elem.classList.add('js-active');
		}

	});
};

//get active panel
const getActivePanel = () => {

	let activePanel;

	DOMstrings.stepFormPanels.forEach(elem => {

		if (elem.classList.contains('js-active')) {

			activePanel = elem;

		}

	});

	return activePanel;

};

//open active panel (and close unactive panels)
const setActivePanel = activePanelNum => {

	//remove active class from all the panels
	removeClasses(DOMstrings.stepFormPanels, 'js-active');

	//show active panel
	DOMstrings.stepFormPanels.forEach((elem, index) => {
		if (index === activePanelNum) {

			elem.classList.add('js-active');

			setFormHeight(elem);

		}
	});

};

//set form height equal to current panel height
const formHeight = activePanel => {

	const activePanelHeight = activePanel.offsetHeight + 50;

	DOMstrings.stepsForm.style.height = `${Number(activePanelHeight + 20)}px`;

};

const setFormHeight = () => {
	const activePanel = getActivePanel();

	formHeight(activePanel);
};

const countInputsByPanel = (activePanel, activePanelNum, next_btn = 0) => {
	let contador_inputs = 0;
	let contador_total = $(activePanel).find('.input_queja:not(.opcional):required, .input_persona:required').length;

	$(activePanel).find('.input_queja:not(.opcional):required, .input_persona:required').each(function () {
		// Caso especial para CKEditor
		console.log(this);
		if ($(this).hasClass('ckeditor')) {
			let editorId = $(this).attr('name');
			if (editoresCK[editorId] && editoresCK[editorId].getData() !== '') {
				contador_inputs += 1;
			}
		} else {
			let es_valido = $(this).parsley().isValid() && $(this).val() != '';
			
			contador_inputs = (es_valido) ? contador_inputs + 1 : contador_inputs;
		}
	});

	$('.multisteps-form__progress-btn').eq(activePanelNum).find('.contador_campos').css('display', 'inline');
	$('.multisteps-form__progress-btn').eq(activePanelNum).find('.contador_validos').text(contador_inputs);
	$('.multisteps-form__progress-btn').eq(activePanelNum).find('.contador_totales').text(contador_total);

	return {
		contador_inputs,
		contador_total
	}
};


const validatePanelForm = (activePanel, activePanelNum) => {

	//Contador de inputs llenados
	let contador_inputs = 0;
	let contador_total = $(activePanel).find('.input_queja:not(.opcional):required, .input_persona:required').length;
	let activeStep = $('.multisteps-form__progress-btn').eq(activePanelNum);

	//Validar form y setear colores
	if ($(activePanel).find('form').length == 1) { //Si hay un solo formulario se hace una validación simple
		if (!$(activePanel).find('form').parsley().isValid()) {

			$(activePanel).find('form').parsley().validate();

			//Cambiar color error
			$(activeStep).css('color', '#e60a00');
			$(activeStep).find('span').css('color', '#e60a00');

		} else {
			$(activePanel).find('form').parsley().validate();

			//Cambiar color success
			$(activeStep).css('color', '#82d616').find('span').css('color', '#82d616')
		}
	} else {

		let todos_validos = 1; //Setear flag para color
		$(activePanel).find('form').each(function (index, elemento) { //Si hay varios formularios se iteran

			if (!$(elemento).parsley().isValid()) {
				//Si no es valido lanzar los eventos de colores en el front para los input
				$(elemento).parsley().validate();
				todos_validos = 0
			}

			if (todos_validos == 1) {
				//Cambiar color success
				$(activeStep).css('color', '#82d616').find('span').css('color', '#82d616')
			} else {
				//Cambiar color danger
				$(activeStep).css('color', '#e60a00').find('span').css('color', '#e60a00');
			}

		})
	}

	contador_inputs = countInputsByPanel(activePanel, activePanelNum);
	contador_inputs = Number(contador_inputs.contador_inputs);

	if (contador_total == contador_inputs) {
		return true;
	} else {
		Toast.fire({
			title: '¡Atención!',
			position: 'top-right',
			html: 'Hay ' + Number(contador_total - contador_inputs) + ' campos requeridos aún sin responder en la sección ' + Number(activePanelNum + 1),
			icon: 'error'
		})

		return false;
	}
};

//STEPS BAR CLICK FUNCTION
DOMstrings.stepsBar.addEventListener('click', e => {

	//check if click target is a step button
	const eventTarget = e.target;

	if (!eventTarget.classList.contains(`${DOMstrings.stepsBtnClass}`)) {
		return;
	}

	//get active button step number
	const activeStep = getActiveStep(eventTarget);

	//set all steps before clicked (and clicked too) to active
	setActiveStep(activeStep);
	countInputsByPanel($('.multisteps-form__panel').eq(activeStep), activeStep, 1);

	//open active panel
	setActivePanel(activeStep);
});

//PREV/NEXT BTNS CLICK
DOMstrings.stepsForm.addEventListener('click', e => {

	const eventTarget = e.target;

	//check if we clicked on `PREV` or NEXT` buttons
	if (!(eventTarget.classList.contains(`${DOMstrings.stepPrevBtnClass}`) || eventTarget.classList.contains(`${DOMstrings.stepNextBtnClass}`))) {
		return;
	}

	//Buscar el panel activo
	const activePanel = findParent(eventTarget, `${DOMstrings.stepFormPanelClass}`);
	let activePanelNum = Array.from(DOMstrings.stepFormPanels).indexOf(activePanel);

	validatePanelForm(activePanel, activePanelNum);
	countInputsByPanel(activePanel, activePanelNum, 1);

	//Setea el panel activo y el boton al hacer clic
	if (eventTarget.classList.contains(`${DOMstrings.stepPrevBtnClass}`)) {
		activePanelNum--;

	} else {

		activePanelNum++;

	}

	setActiveStep(activePanelNum);
	setActivePanel(activePanelNum);
	volver_arriba();

});

//Inicializar contador de inputs
/*
window.addEventListener('load', $('.multisteps-form__panel').each(function () {
	countInputsByPanel($(this), $(this).index())
}), false);
*/
window.addEventListener('load', countInputsByPanel($('.multisteps-form__panel.js-active'), $('.multisteps-form__panel.js-active').index()));

//SETTING PROPER FORM HEIGHT ONLOAD
window.addEventListener('load', setFormHeight, false);

//SETTING PROPER FORM HEIGHT ONRESIZE
window.addEventListener('resize', setFormHeight, false);