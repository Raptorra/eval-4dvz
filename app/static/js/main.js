
/*------------------------------------*\
    $MOTEUR DE RECHERCHE AUTOCOMPLETE
    voir doc http://easyautocomplete.com/
\*------------------------------------*/
var options = {
	url: "Js/example.json", 

	getValue: "name",

	list: {
		match: {
			enabled: true
		},
		maxNumberOfElements: 8
	},

	theme: "square"

};

$("#mainsearch").easyAutocomplete(options);



/*------------------------------------*\
    $LANCEMENT CUSTOM SCROLL BAR
    voir doc http://manos.malihu.gr/jquery-custom-content-scroller/
\*------------------------------------*/
$(document).ready(function(){
//$("aside.main .list-item").mCustomScrollbar({theme:"minimal-dark",	scrollbarPosition:"outside"});
});




/*------------------------------------*\
    $MENU HAMBURGER MOBILE
\*------------------------------------*/
function openMenuMobile(){
		$("body").addClass("menu-mobile-visible");

}

/*------------------------------------*\
    $FERMETURE MENU MOBILE
\*------------------------------------*/
function closeElements(){
	$("body").removeClass("menu-mobile-visible");
}


/*-------------------------------------------------*\
    $SIMULATION OUVERTURE DE DOCUMENT / DOSSIER
\*--------------------------------------------------*/

// ICI FONCTION RESIZE PERMETTANT DE DETERMINER SI LA PARTIE
// ASIDE DOIT DISPARAITRE AU CLIC SUR UN DOCUEMENT (MOBILE UNIQUEMENT)
function mobileView(){
	var windowWidth = $(window).width();
		if(windowWidth<992){
			//$("aside.main .list-item").mCustomScrollbar('destroy'); // ICI ON SUPPRIME LA CUSTOM SCROLLBAR CAR INUTILE SUR MOBILE
			$("aside.main").addClass("small-screen"); // AJOUT CLASS SMALL-SCREEN SI ECRAN < LG
			if($("aside.main").hasClass("document-loaded")){
				$("aside.main").addClass("mobileViewerDoc"); // SI DOCUMENT LOADED, AJOUT CLASS MOBILEVIEWERDOC QUI REMPLACE LA LISTE PAR LE DOCUMENT
			} else {
			$("aside.main").removeClass("mobileViewerDoc");
			}
			
		} else {
				$("aside.main").removeClass("small-screen"); // SI PAS ECRAN < LG, ON SUPPRIME LA CLASS SMALL SCREEN
				$("aside.main").removeClass("mobileViewerDoc")// INUTILE SUR ECRAN > LG DONC ON SUPPRIME LA CLASS
				//$("aside.main .list-item").mCustomScrollbar({theme:"minimal-dark",	scrollbarPosition:"outside"});

		}
}


$(window).resize(function(){
		mobileView();
});

$(document).ready(function(){

		mobileView();
});

function openDocument(element){
		var id = $(element).attr("data-rel");// RECUPERATION DATA REL DU DOC
	
		$("aside.main .list-item li").removeClass("selected");// SUPPRESSION CLASS DE DOCUMENT DEJA SELECTIONNE
		$(element).parent().addClass("selected")// AJOUT CLASS SELECTED SUR ELEMENT CLIQUE
		$("div.panel-empty").addClass("hide");
		$("div.document").hide();
		$("div."+id).fadeIn(); // AFFICHAGE TAF DOC-+DATA REL
		$("aside.main").addClass("document-loaded");



		if($("aside.main").hasClass("small-screen")){
			$("aside.main").addClass("mobileViewerDoc");

			} else {
			$("aside.main").removeClass("mobileViewerDoc");
			}
		


};

// RETOUR A LA LISTE SUR MOBILE
function backState(){
		$("aside.main").removeClass("mobileViewerDoc");
		$("aside.main").removeClass("document-loaded");
		$("aside.main .list-item li").removeClass("selected");
		$("div.document").hide();
		$("div.panel-empty").removeClass("hide");
}

// OUVERTURE DUN DOSSIER 

function openFolder(element){
		$("aside.main .list-item li").removeClass("selected");// SUPPRESSION CLASS DE DOCUMENT DEJA SELECTIONNE
		$("div.panel-empty").removeClass("hide");
		$("div.document").hide();
			$("aside.main").removeClass("document-loaded");

};