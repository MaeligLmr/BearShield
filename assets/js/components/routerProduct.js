document.addEventListener('DOMContentLoaded', () => {
	const productButtons = document.querySelectorAll('button.lined.w-100');
	productButtons.forEach((btn, idx) => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();
			window.location.href = `./produit.html?id=${idx + 1}`;
		});
	});
});
