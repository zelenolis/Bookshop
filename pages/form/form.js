document.body.onload = addElement();
document.body.onload = checks();

function addElement() {
	const formSheet = document.createDocumentFragment();

	const formHead = document.createElement("h1");
	formHead.textContent = "Delivery order";

	const formWrapper = document.createElement("form");

	const formName = document.createElement("label");
	const formNameInput = document.createElement("input");
	formNameInput.type = "text";
	formNameInput.id = "name";
	formNameInput.pattern = "[a-zA-Z]{4,}";
	formNameInput.required = true;
	formName.textContent = "Name";
	formName.appendChild(formNameInput);

	const formSurname = document.createElement("label");
	const formSurnameInput = document.createElement("input");
	formSurnameInput.type = "text";
	formSurnameInput.id = "surname";
	formSurnameInput.pattern = "[a-zA-Z]{5,}";
	formSurnameInput.required = true;
	formSurname.textContent = "Surname";
	formSurname.appendChild(formSurnameInput);

	const formDelivery = document.createElement("label");
	const formDeliveryInput = document.createElement("input");
	formDeliveryInput.type = "date";
	formDeliveryInput.id = "delivery";
	formDeliveryInput.name = "deliveryDate";
	formDeliveryInput.value = dates();
	formDeliveryInput.min = dates();
	formDeliveryInput.required = true;
	formDelivery.textContent = "Delivery";
	formDelivery.appendChild(formDeliveryInput);

	const formStreet = document.createElement("label");
	const formStreetInput = document.createElement("input");
	formStreetInput.type = "text";
	formStreetInput.id = "street";
	formStreetInput.pattern = "[ a-zA-Z0-9]{5,}";
	formStreetInput.required = true;
	formStreet.textContent = "Street";
	formStreet.appendChild(formStreetInput);

	const formBuilding = document.createElement("label");
	const formBuildingInput = document.createElement("input");
	formBuildingInput.id = "building";
	formBuildingInput.pattern = "[0-9]";
	formBuildingInput.type = "number";
	formBuildingInput.min = 1;
	formBuildingInput.required = true;
	formBuilding.textContent = "Building";
	formBuilding.appendChild(formBuildingInput);

	const formApt = document.createElement("label");
	const formAptInput = document.createElement("input");
	formAptInput.type = "text";
	formAptInput.id = "apt";
	formAptInput.pattern = "[0-9]{1,}((-[0-9]+)?)";
	formAptInput.required = true;
	formApt.textContent = "Apt.";
	formApt.appendChild(formAptInput);

	const payment = document.createElement("p");
	payment.textContent = "Payment options:";

	const paymentOptions = document.createElement("div");
	const paymentCash = document.createElement("label");
	const paymentCard = document.createElement("label");
	const paymentCashInput = document.createElement("input");
	const paymentCardInput = document.createElement("input");
	paymentCash.textContent = "Cash";
	paymentCard.textContent = "Card";
	paymentCashInput.type = "radio";
	paymentCardInput.type = "radio";
	paymentCashInput.name = "payments";
	paymentCardInput.name = "payments";
	paymentCashInput.id = "cash";
	paymentCardInput.id = "card";
	paymentCashInput.checked = true;
	paymentCash.appendChild(paymentCashInput);
	paymentCard.appendChild(paymentCardInput);
	paymentOptions.appendChild(paymentCash);
	paymentOptions.appendChild(paymentCard);

	const gift = document.createElement("p");
	gift.textContent = "You can also choose up to two gifts:";

	const giftOptions = document.createElement("div");
	giftOptions.classList.add('gifts');
	const giftPack = document.createElement("label");
	const giftCard = document.createElement("label");
	const giftPen = document.createElement("label");
	const giftNext = document.createElement("label");
	const giftPackInput = document.createElement("input");
	const giftCardInput = document.createElement("input");
	const giftPenInput = document.createElement("input");
	const giftNextInput = document.createElement("input");
	giftPack.textContent = "pack as a gift";
	giftCard.textContent = "add postcard";
	giftNext.textContent = "provide 2% discount to the next time";
	giftPen.textContent = "branded pen or pencil";
	giftPackInput.type = "checkbox";
	giftCardInput.type = "checkbox";
	giftPenInput.type = "checkbox";
	giftNextInput.type = "checkbox";
	giftPackInput.classList.add('check');
	giftCardInput.classList.add('check');
	giftPenInput.classList.add('check');
	giftNextInput.classList.add('check');
	giftPackInput.name = "gifts";
	giftCardInput.name = "gifts";
	giftPenInput.name = "gifts";
	giftNextInput.name = "gifts";
	giftPack.appendChild(giftPackInput);
	giftCard.appendChild(giftCardInput);
	giftNext.appendChild(giftNextInput);
	giftPen.appendChild(giftPenInput);
	giftOptions.appendChild(giftPack);
	giftOptions.appendChild(giftCard);
	giftOptions.appendChild(giftNext);
	giftOptions.appendChild(giftPen);

	const send = document.createElement("button");
	send.textContent = "Submit";
	send.classList.add('button');
	send.type = 'submit';
	send.disabled = true;

	formWrapper.appendChild(formName);
	formWrapper.appendChild(formSurname);
	formWrapper.appendChild(formStreet);
	formWrapper.appendChild(formBuilding);
	formWrapper.appendChild(formApt);
	formWrapper.appendChild(formDelivery);
	formWrapper.appendChild(payment);
	formWrapper.appendChild(paymentOptions);
	formWrapper.appendChild(gift);
	formWrapper.appendChild(giftOptions);
	formWrapper.appendChild(send);

	formSheet.appendChild(formHead);
	formSheet.appendChild(formWrapper);

	document.body.appendChild(formSheet);

	console.log(document.documentElement);
}

function checks() {
	let checks = document.querySelectorAll(".check");
	let max = 2;
	for (var i = 0; i < checks.length; i++) {
		  checks[i].onclick = selectiveCheck;
		}

	function selectiveCheck (event) {
	  let checkedChecks = document.querySelectorAll(".check:checked");
	  if (checkedChecks.length >= max + 1) {
	  	return false;
	  }
	}

	const form = document.querySelector('form');
	form.addEventListener("change", () => {
	    document.querySelector('button').disabled = !form.checkValidity()
	});

	const subBut = document.querySelector('.button');
	subBut.addEventListener('click', (e) => {
		e.preventDefault();
		const name = document.getElementById('name');
		const surName = document.getElementById('surname');
		const street = document.getElementById('street');
		const building = document.getElementById('building');
		const apt = document.getElementById('apt');

		const fullForm = document.querySelector('form');
		fullForm.classList.add('invis');

		const body = document.querySelector('body');
		const divMessage = document.createElement('div');
		divMessage.classList.add('divMessage');
		const messageOne = document.createElement('p');
		messageOne.textContent = name.value + ' ' + surName.value + ','; 
		divMessage.appendChild(messageOne);
		const messageTwo = document.createElement('p');
		messageTwo.textContent = 'Your order is successfully created!';
		divMessage.appendChild(messageTwo);
		const messageThree = document.createElement('p');
		messageThree.textContent = 'Delivery adress is:';
		messageThree.classList.add('messageThree');
		divMessage.appendChild(messageThree);
		const messageFour = document.createElement('p');
		messageFour.textContent = street.value + ' street, ' + building.value + ' - ' + apt.value;
		divMessage.appendChild(messageFour);
		body.appendChild(divMessage);

		const back = document.createElement('a');
		back.classList.add('back');
		back.href = '../../pages/main/index.html';
		back.textContent = 'Back to main page';
		body.appendChild(back);

	});
}

function dates() {
	const tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	let fullDate = tomorrow.getFullYear() +
    "-" +
    ("0" + (tomorrow.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + tomorrow.getDate()).slice(-2);
	return fullDate;
}