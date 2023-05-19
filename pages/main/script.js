document.body.onload = addElement();
document.body.onload = dragndrop();
document.body.onload = overwiew();
document.body.onload = addCartButton();

let dragItem = null;
let booksItem = null;
let totalCartPrice = 0;

function addElement() {
	const title = document.createElement("h1");

	title.textContent = "Welcome to our bookshop!";
	document.body.appendChild(document.createElement("header"));
	const header = document.querySelector("header");
	header.appendChild(title);

	document.body.appendChild(document.createElement("div"));
	const div = document.querySelector("div");
	div.appendChild(document.createElement("div"));
	div.appendChild(document.createElement("div"));
	const divsId = document.querySelectorAll("div");
	divsId[0].classList.add("main");
	divsId[1].classList.add("book");
	divsId[2].classList.add("cart");
	divsId[2].classList.add("cart__border");

	addEmptyMessage();

	for (let i = 0; i < books.length; i++) {
		divsId[1].appendChild(document.createElement("article"));
	}

	const bookArticles = document.querySelectorAll("article");

	for (let i = 0; i < bookArticles.length; i++) {
		let bookSheet = document.createDocumentFragment();

		const bookTitle = document.createElement("h3");
		const bookAuthor = document.createElement("p");
		const bookImage = document.createElement("img");
		const bookPrice = document.createElement("p");
		const bookAbout = document.createElement("button");
		const bookBuy = document.createElement("button");

		bookTitle.textContent = books[i]["title"];
		bookAuthor.textContent = books[i]["author"];
		bookImage.src = books[i]["imageLink"];
		bookImage.draggable = true;
		bookPrice.textContent = books[i]["price"] + " " + "$";
		bookAbout.textContent = "Overview";
		bookBuy.textContent = "Add to cart";

		bookTitle.classList.add("book__title");
		bookAuthor.classList.add("book__author");
		bookImage.classList.add("book__img");
		bookPrice.classList.add("book__price");
		bookAbout.classList.add("book__about");
		bookBuy.classList.add("book__button");

		bookSheet.appendChild(bookImage);
		bookSheet.appendChild(bookTitle);
		bookSheet.appendChild(bookAuthor);
		bookSheet.appendChild(bookPrice);
		bookSheet.appendChild(bookAbout);
		bookSheet.appendChild(bookBuy);

		bookArticles[i].appendChild(bookSheet);
	}

	const foot = document.createElement("footer");
	const footHead = document.createElement("h5");
	const footTxt = document.createElement("p");
	footHead.textContent = "\"Reading is important. If you know how to read, then the whole world opens up to you.\""
	footTxt.textContent = "Barack Obama"
	footHead.classList.add('foot__head');
	footTxt.classList.add('foot__txt');
	foot.appendChild(footHead);
	foot.appendChild(footTxt);
	document.documentElement.appendChild(foot);
}

function dragndrop() {
	const drags = document.querySelectorAll('.book__img');
	const cart = document.querySelector('.cart');

	for (let i = 0; i < drags.length; i++) {
		drags[i].addEventListener('dragstart', dragStart);
	}

	cart.addEventListener('drop', dragDrop);
	cart.addEventListener('dragover', dragOver);
}


function dragStart() {
	dragItem = this;
	let tempn = this.parentElement;
	let boo = tempn.querySelector(".book__title").textContent;

	for (let i = 0; i < books.length; i ++) {
		if (boo === books[i]['title']) {
			booksItem = i;
		}
	}
}

function dragOver(e) {
	e.preventDefault();
}

function dragDrop() {
	const cartCheck = document.querySelectorAll('.cart__image');
	const emptyCheck = document.querySelectorAll('.cart__empty');
	
	if (emptyCheck.length != 0) {
		removeEmptyMessage();
	};

	for (let i = 0; i < cartCheck.length; i++) {
		if (dragItem.src === cartCheck[i].src) {
			const quant = document.querySelectorAll('.cart__quantity');
			let numa = Number(quant[i].textContent);
			quant[i].textContent = numa + 1;
			const priceItem = document.querySelectorAll('.cart__price');
			let numb = Number(priceItem[i].textContent);
			totalCartPrice += Number(books[booksItem]["price"]);
			const total = document.querySelector('.total__price');
			total.textContent = totalCartPrice;
			priceItem[i].textContent = numb + books[booksItem]["price"];
			return;
		}
	}
	this.appendChild(cartElement());
	const deleteItems = document.querySelectorAll('.cart__delete');
	for (let n = 0; n < deleteItems.length; n++) {
		deleteItems[n].addEventListener('click', deleteBook);
	}

	const total = document.querySelector('.total__price');
	total.textContent = totalCartPrice;
}

function cartElement() {
	let cartItem = document.createDocumentFragment();

	const cartWrapper = document.createElement("article")
	const cartImage = document.createElement("img");
	const cartTitle = document.createElement("h4");
	const cartQuantity = document.createElement("p");
	const cartPrice = document.createElement("p");
	const cartDelete = document.createElement("img");
	const cartQuantityTitle = document.createElement("p");
	const cartPriceTitle = document.createElement("p");

	cartImage.src = dragItem.src;
	cartTitle.textContent = books[booksItem]["title"];
	cartQuantity.textContent = "1";
	cartPrice.textContent = books[booksItem]["price"];
	totalCartPrice += Number(books[booksItem]["price"]);
	cartDelete.src = "../../assets/delete.png";
	cartQuantityTitle.textContent = "Quantity:"
	cartPriceTitle.textContent = "Price:"

	cartWrapper.classList.add("cart__wrapper");
	cartImage.classList.add("cart__image");
	cartTitle.classList.add("cart__title");
	cartQuantity.classList.add("cart__quantity");
	cartPrice.classList.add("cart__price");
	cartDelete.classList.add("cart__delete");
	cartQuantityTitle.classList.add("cart__quantity__title");
	cartPriceTitle.classList.add("cart__price__title");

	cartWrapper.appendChild(cartImage);
	cartWrapper.appendChild(cartTitle);
	cartWrapper.appendChild(cartQuantityTitle);
	cartWrapper.appendChild(cartQuantity);
	cartWrapper.appendChild(cartPriceTitle);
	cartWrapper.appendChild(cartPrice);
	cartWrapper.appendChild(cartDelete);
	cartItem.appendChild(cartWrapper);

	return cartItem;
}

function deleteBook() {
	const minus = Number(this.parentElement.querySelector('.cart__price').textContent);
	const total = document.querySelector('.total__price');
	totalCartPrice -= minus;
	total.textContent = totalCartPrice;
	this.parentElement.remove();

	const checkFullness = document.querySelectorAll('.cart__wrapper');

	if (checkFullness.length === 0) {
		addEmptyMessage();
	}
}

function addEmptyMessage() {
	const div = document.createElement("p");
	div.textContent = "Your cart is currently empty";
	div.classList.add('cart__empty');
	
	const emptyCart = document.querySelector('.cart');
	emptyCart.appendChild(div);
	emptyCart.classList.add('cart__border');

	const button = document.querySelector('.confirm');
	if (button) {
		button.remove();
	}

	const totalPrice = document.querySelector('.total__price');
	if (totalPrice) {
		totalPrice.remove();
	}
	const totalQuantity = document.querySelector('.total__quantity');
	if (totalQuantity) {
		totalQuantity.remove();
	}
}

function removeEmptyMessage() {
	let removing = document.querySelector('.cart__empty');
	removing.remove();
	let cartBorder = document.querySelector('.cart');
	cartBorder.classList.remove('cart__border');

	const totalPrice = document.createElement('p');
	totalPrice.classList.add('total__price');
	cartBorder.appendChild(totalPrice);

	const button = document.createElement("a");
	button.textContent = "Checkout";
	button.href = '../../pages/form/form.html';
	button.classList.add('confirm');
	cartBorder.appendChild(button);
	const buttonConfirm = document.querySelector('.confirm');
	buttonConfirm.addEventListener('click', confirmOrder);

	const totalQuantity = document.createElement('p');
	totalQuantity.classList.add('total__quantity');
	totalQuantity.textContent = "Total price, $"
	cartBorder.appendChild(totalQuantity);
}

function confirmOrder() {
	let totalPrice = 0;
	const cartPrice = document.querySelectorAll('.cart__price');

	for (let i = 0; i < cartPrice.length; i++) {
		console.log(cartPrice[i].textContent);
		totalPrice += Number(cartPrice[i].textContent);
	}
	console.log(totalPrice);
}

function overwiew() {
	const about = document.querySelectorAll(".book__about");

	for (let i = 0; i < about.length; i++) {
		about[i].addEventListener("click", createPopup);
	}
}

function createPopup() {
	let select1 = this.parentElement;
	let select2 = select1.children[1];
	let select3 = select2.textContent;
	let coords = this.getBoundingClientRect();
	let topP = coords.top + window.pageYOffset;
	let leftP = coords.left;

	let index = null; 

	for (let i = 0; i < books.length; i++) {
		if (select3 === books[i]["title"]) {index = i}
	}

	const popup = document.createElement('div');
	const popupHead = document.createElement('h4');
	const popupSub = document.createElement('p');
	const popupTxt = document.createElement('p');
	const popupClose = document.createElement('img');
	popup.classList.add('popup');
	popup.style.left = leftP - 180 + 'px';
	popup.style.top = topP - 180 + 'px';
	popupHead.classList.add('popup__head');
	popupSub.classList.add('popup__sub');
	popupTxt.classList.add('popup__txt');
	popupClose.classList.add('popup__close');
	popupHead.textContent = books[index]["title"];
	popupSub.textContent = books[index]["author"];
	popupTxt.textContent = books[index]["description"];
	popupClose.src = "../../assets/delete.png";

	popup.appendChild(popupHead);
	popup.appendChild(popupSub);
	popup.appendChild(popupTxt);
	popup.appendChild(popupClose);

	document.body.appendChild(popup);

	closePopup();
}

function closePopup() {
	const close = document.querySelectorAll('.popup__close');
	for (let i = 0; i < close.length; i++) {
		close[i].addEventListener('click', () => {
			close[i].parentElement.remove();
		});
	}
}

function addCartButton() {
	const addButtons = document.querySelectorAll('.book__button');
	for (let i = 0; i < addButtons.length; i++) {
		addButtons[i].addEventListener('click', addCart);
	}
}

function addCart() {
	let select1 = this.parentElement;
	let select2 = select1.children[1];
	let select3 = select2.textContent;

	const tempvar = document.querySelectorAll('.book__img');

	for (let i = 0; i < books.length; i++) {
		if (select3 === books[i]["title"]) {
			dragItem = tempvar[i];
			booksItem = i;
		}
	}

	const cartCheck = document.querySelectorAll('.cart__image');
	const emptyCheck = document.querySelectorAll('.cart__empty');
	
	if (emptyCheck.length != 0) {
		removeEmptyMessage();
	};

	for (let i = 0; i < cartCheck.length; i++) {
		if (dragItem.src === cartCheck[i].src) {
			const quant = document.querySelectorAll('.cart__quantity');
			let numa = Number(quant[i].textContent);
			quant[i].textContent = numa + 1;
			const priceItem = document.querySelectorAll('.cart__price');
			let numb = Number(priceItem[i].textContent);
			totalCartPrice += Number(books[booksItem]["price"]);
			const total = document.querySelector('.total__price');
			total.textContent = totalCartPrice;
			priceItem[i].textContent = numb + books[booksItem]["price"];
			return;
		}
	}

	const cartByButton = document.querySelector('.cart');
	cartByButton.appendChild(cartElement());

	const deleteItems = document.querySelectorAll('.cart__delete');
	for (let n = 0; n < deleteItems.length; n++) {
		deleteItems[n].addEventListener('click', deleteBook);
	}
	const total = document.querySelector('.total__price');
	total.textContent = totalCartPrice;
}