document.addEventListener('DOMContentLoaded', function() {
	console.log("Hermes iniciado com sucesso!");

	var toggle = document.querySelector('.nav-toggle');
	var nav = document.getElementById('main-navigation');

	if (toggle && nav) {
		toggle.addEventListener('click', function(e) {
			var expanded = this.getAttribute('aria-expanded') === 'true';
			this.setAttribute('aria-expanded', String(!expanded));
			nav.classList.toggle('mobile-active');
		});

		// Close menu when a navigation link is clicked
		nav.querySelectorAll('a').forEach(function(link) {
			link.addEventListener('click', function() {
				nav.classList.remove('mobile-active');
				toggle.setAttribute('aria-expanded', 'false');
			});
		});

		// Close when clicking outside the nav
		document.addEventListener('click', function(event) {
			if (!nav.contains(event.target) && !toggle.contains(event.target)) {
				nav.classList.remove('mobile-active');
				toggle.setAttribute('aria-expanded', 'false');
			}
		});
	}
});