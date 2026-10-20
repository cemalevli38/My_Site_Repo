function mainMenu(document) {
	var sayac = 1;
	var acilma;
	var baslik;
	var karakterDefault = 17;
	var eldeKarakter = 0;
	var ekleKarakter = 0;
	var tipBox = "";
	$(document).find("menusatir").each(function () {
		if ($(this).find('baslik').text() != 'İletişim') {
			if (sayac != 1) {
				baslik = $(this).find('baslik').text();
				tasanKarakter = baslik.length - karakterDefault;
				if (tasanKarakter < 0) {
					eldeKarakter = eldeKarakter - tasanKarakter;
				}
			}
		}
		sayac++;
	})
	eldeKarakter = eldeKarakter + (((10 - sayac) * karakterDefault) + 4);
	sayac = 1;
	$(document).find("menusatir").each(function () {
		acilma = '';
		if ($(this).attr('acilma') == 2) acilma = 'target="_blank"';
		if ($(this).find('baslik').text() != 'İletişim') {
			if (sayac != 1) {
				baslik = $(this).find('baslik').text();
				tasanKarakter = baslik.length - karakterDefault;
				if (tasanKarakter > 0) {
					if (tasanKarakter > (eldeKarakter)) {
						ekleKarakter = (eldeKarakter);
						eldeKarakter = 0;
					}
					else {
						ekleKarakter = tasanKarakter;
						eldeKarakter = eldeKarakter - tasanKarakter;
					}
				}
				kripBaslik = $(this).find('baslik').text().substring(0, ekleKarakter + karakterDefault);
				if (baslik.length > ekleKarakter + karakterDefault) tipBox = 'data-toggle="tooltip" data-placement="left"';
				//Browser Menu
				if ($(this).find('altmenuadi').text()) {
					$(".sf-menu").append('<li class="menu-header-' + $(this).find('altmenuadi').text() + '"><a href="javascript:void(0)" ' + tipBox + ' title="' + $(this).find('baslik').text() + '" class="sf-with-ul">' + kripBaslik + '</a></li>');
				}
				else {
					$(".sf-menu").append('<li><a ' + tipBox + ' title="' + $(this).find('baslik').text() + '" href="' + $(this).find('link').text() + '" ' + acilma + '>' + kripBaslik + '</a></li>');
				}
			}
			else {
				$(".sf-menu").append('<li><a href="' + $(this).find('link').text() + '" ' + acilma + '><i class="fas fa-home"></i></a></li>');
			}
		}
		//Mobile Menu
		if ($(this).find('altmenuadi').text()) {
			$("#mobile-menu ul").append('<li data-menu-id="' + $(this).find('altmenuadi').text() + '"><span><a>' + $(this).find('baslik').text() + '</a><span></li>');
		}
		else {
			$("#mobile-menu ul").append('<li><span><a href="' + $(this).find('link').text() + '">' + $(this).find('baslik').text() + '</a><span></li>');
		}
		//Footer Menu
		/*if($(this).find('altmenuadi').text() && sayac<=3){
			$("#footer-menu").append('<div class="col-md-3 text-left" id="footer-menu'+$(this).find('altmenuadi').text()+'"><h3>'+$(this).find('baslik').text()+'</h3></div>');
			}
		*/
		sayac++;
		acilma = '';
	})
	$("#footer-menu").append('<div class="col-md-3 text-center"><a href="http://www.meb.gov.tr/duyurular/duyurular2012/basinmus/mebim.php" style="position: relative;top: -10px;"><img src="/assets/images/icons/icon-alo-meb.png" alt="MEBÄ°M 444 0 632"/></a><br/><br/><a href="/www/harita.php"><img src="/meb_iys_dosyalar/harita_thumb.png" class="img-fluid ft-image" alt="Google Harita Konum Bilgisi"/> </a><br/><br/></div>');
	$('ul.sf-menu').superfish({
		delay: 1000,                            // one second delay on mouseout
		animation: {
			opacity: 'show',
			height: 'show'
		},  // fade-in and slide-down animation
		speed: 'fast',                          // faster animation speed
		autoArrows: true
	})
	/*$.ajax({
		url: '/meb_iys_dosyalar/xml/diksubmenu.xml',// name of file you want to parse
		dataType: "xml",
		success: subMenu,
		error: function () { alert("Error: Alt MenÃ¼ YÃ¼klenemedi"); }
	});*/
	$('[data-toggle="tooltip"]').tooltip();
	DeleteHref();
}
///sub menu	
function subMenu(document) {
	var acilma;
	$(document).find("altmenu").each(function () {
		/*header*/
		$(".menu-header-" + $(this).attr('altmenuadi')).append('<ul>');
		$(this).find("altmenubaglantisatir").each(function () {
			acilma = '';
			if ($(this).attr('acilma') == 2) acilma = 'target="_blank"';
			if ($(this).find('altmenubaglanti').text()) {
				$(".menu-header-" + $(this).parent().attr('altmenuadi') + " ul").append(
					'<li class="menu-header-' + $(this).find('altmenubaglanti').text() + '"> <a href="javascript:void(0);" class="sf-with-ul">' + $(this).find('baslik').text() + '</a></li>');
			}
			else {
				$(".menu-header-" + $(this).parent().attr('altmenuadi') + " ul").append(
					'<li> <a href="' + $(this).find('url').text() + '" ' + acilma + '>' + $(this).find('baslik').text() + '</a></li>');
			}
			acilma = '';
		});
		$("#menu-header-" + $(this).attr('altmenuadi')).append('</ul>');
		/*header*/
		/*mobile*/
		$("[data-menu-id='" + $(this).attr('altmenuadi') + "']").append('<ul>');
		$(this).find("altmenubaglantisatir").each(function () {
			if ($(this).attr('acilma') == 2) acilma = 'target="_blank"';
			if ($(this).find('altmenubaglanti').text()) {
				$("[data-menu-id='" + $(this).parent().attr('altmenuadi') + "'] ul").append(
					'<li data-menu-id="' + $(this).find('altmenubaglanti').text() + '"> <span>' + $(this).find('baslik').text() + '</span></li>');
			}
			else {
				$("[data-menu-id='" + $(this).parent().attr('altmenuadi') + "'] ul").append(
					'<li> <a href="' + $(this).find('url').text() + '" ' + acilma + '>' + $(this).find('baslik').text() + '</a></li>');
			}
		});
		$("[data-menu-id='" + $(this).attr('altmenuadi') + "']").append('</ul>');
		/*mobile*/
		/*footer*/
		/*$("#footer-menu"+$(this).attr('altmenuadi')).append('<ul>');
			$(this).find("altmenubaglantisatir").each(function(){
			if($(this).attr('acilma')==2) acilma='target="_blank"';
			$("#footer-menu"+$(this).parent().attr('altmenuadi')+" ul").append(
			'<li> <a class="collapsed" href="'+$(this).find('url').text()+'" '+acilma+'>'+$(this).find('baslik').text()+'</a></li>');
			});
		$("#footer-menu"+$(this).attr('altmenuadi')).append('</ul>');*/
		/*footer*/
	});
	$("#mobile-menu").mmenu({
		extensions: [
			"fx-menu-fade",
		],
		"iconbar": {
			"add": true,
			"top": [
				"<a href='javascript:void(0)' class='menu-close'><i class='fas fa-home'></i></a>"
			],
			"bottom": [
				"<a href='https://www.facebook.com/mebbasinmus' target='_blank'><i class='fab fa-facebook-f'></i></a>",
				"<a href='https://twitter.com/tcmeb' target='_blank'><i class='fab fa-twitter'></i></a>",
				"<a href='https://www.youtube.com/mebbasin' target='_blank'><i class='fab fa-youtube'></i></a>"
			]
		},
		"navbars": [
			{
				"position": "top",
				"content": [
					"searchfield"
				]
			}
		],
		"searchfield": {
			"panel": true,
			"showSubPanels": false,
			"placeholder": "Arama"
		}
	});

}

function DeleteHref() {
	$('.banner--clone a.sf-with-ul').each(function () {
		var value = $(this).attr('href');
		if (value == "javascript:void(0)") {
			$(this).removeAttr('href');
		}
	});
}	