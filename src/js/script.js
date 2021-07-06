$(document).ready(function () {
	$('.carousel__inner').slick({
		speed: 1200,
		autoplay: true,
		autoplaySpeed: 5000,
		prevArrow:
			'<button type="button" class="slick-prev"><img src="icons/arrow_left.png"/></button>',
		nextArrow:
			'<button type="button" class="slick-next"><img src="icons/arrow_right.png"/></button>',
		responsive: [
			{
				breakpoint: 992,
				settings: {
					dots: true,
					arrows: false,
				},
			},
		],
	});
	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
		$(this)
			.addClass('catalog__tab_active')
			.siblings()
			.removeClass('catalog__tab_active')
			.closest('div.container')
			.find('div.catalog__content')
			.removeClass('catalog__content_active')
			.eq($(this).index())
			.addClass('catalog__content_active');
	});


	function toggleSlide(item) {
		$(item).each(function (i) {
			$(this).on('click', function (e) {
				e.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
			});
		});
	}

	toggleSlide('.catalog-item__link');
	toggleSlide('.catalog-item__back');


	//Modal

	$('[data-modal=consultation]').on('click', function () {
		$('.overlay, #consultation').fadeIn('slow');
	});

	$('.modal__close').on('click', function () {
		$('.overlay, .modal').fadeOut('slow');
	});

	$(window).on('click', function (e) {
		if (e.target.classList.contains('overlay')) {
			$('.overlay, .modal').fadeOut('slow');
		}
	});

	$('.button_mini').each(function (i) {
		$(this).on('click', function () {
			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn('slow');
		});
	});

	function validateForms(form) {
		$(form).validate({
			rules: {
				name: 'required',
				phone: 'required',
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				name: 'Пожалуйста, введите свое имя',
				phone: 'Пожалуйста, введите свой номер телефона',
				email: {
					required: 'Пожалуйста, введите свой e-mail',
					email: 'Неправильно введен e-mail'
				}
			}
		});
	}

	validateForms('#consultation-form');
	validateForms('#consultation form');
	validateForms('#order form');

	$('input[name=phone]').mask('+7 (999) 999-9999');

	$('form').submit(function(e) {
		e.preventDefault();
		$.ajax({
			type: 'POST',
			url: 'mailer/smart.php',
			data: $(this).serialize()
		}).done(function() {
			$(this).find('input').val('');
			$('#consultation, #order').fadeOut();
			$('.overlay, #thanks').fadeIn('slow');

			$('form').trigger('reset');
		});
		return false;
	});

	// Smooth scroll and pageup

	$(window).scroll(function() {
		if ($(this).scrollTop() > 1600) {
			$('.pageup').fadeIn();
		} else {
			$('.pageup').fadeOut();
		}
		
	});
	new WOW().init();

});
