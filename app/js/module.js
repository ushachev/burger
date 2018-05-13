const humbButton = document.querySelector(".humburger-menu-btn");
const template = document.querySelector("#overlay-menu").innerHTML;
const section = document.querySelector(".start");

const overlayMenu = createMenu(template);

humbButton.addEventListener('click', function() {
	overlayMenu.open();
	// overlayMenu.toggle();
	this.classList.toggle('humburger-menu-btn_clicked');
});

function createMenu(templateIn) {
	let tempBlock = document.createElement('div');

	tempBlock.innerHTML = templateIn;

	let closeElem = tempBlock.querySelector(".humburger-menu-btn");
	let menuElem = tempBlock.querySelector(".overlay-menu");

	tempBlock = null;

	menuElem.addEventListener('click', function(e) {
		let target = e.target;
		if (target.className === 'nav-menu__link') {
			closeElem.click();
		}
		if (target === menuElem) {
			closeElem.classList.toggle('humburger-menu-btn_clicked');
		}
	})

	closeElem.addEventListener('click', function() {
		section.removeChild(menuElem);
		humbButton.classList.toggle('humburger-menu-btn_clicked');
	})

	return {
		open() {
			section.appendChild(menuElem);
			closeElem.classList.add('humburger-menu-btn_clicked');
		}
		// toggle() {
		// 	closeElem.classList.add('humburger-menu-btn_clicked');
		// }
		// close() {
		// 	closeElem.click();
		// }
	} 
}