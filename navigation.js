$(document).ready(function($) {
  const CONTENT_SECTIONS = $("section");

  updateNavigation();

  loadListeners();

  function loadListeners() {
    if (window.addEventListener) {
      window.addEventListener("scroll", function() {
        updateMainTop();
        updateNavigation();
      });
    }
  }

  function updateMainTop() {
    const TOP = document.getElementById("main-top");

    let scrollTop = Math.max(
      window.pageYOffset,
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    if (scrollTop < 150) {
      TOP.style.display = "none";
    } else {
      TOP.style.display = "block";
    }
  }

  function updateNavigation() {
    const NAV = $("#vertical-nav");
    const FIRST_SECTION = $("#products");
    const PRODUCT_COINTAINER = FIRST_SECTION.find(".container");

    if (isNavMenuDisplayable(NAV, PRODUCT_COINTAINER)) {
      let newSelected, oldSelected, currentItem;
      CONTENT_SECTIONS.each(function() {
        $this = $(this);

        let sectionId = $this.attr("id");
        let menuItem = $('#vertical-nav a[href="#' + sectionId + '"]')[0];
        if (menuItem !== undefined) {
          currentItem = $(menuItem).parent();
          if (
            $this.offset().top - $(window).height() / 2 <=
              $(window).scrollTop() &&
            $this.offset().top + $this.height() - $(window).height() / 2 >=
              $(window).scrollTop()
          ) {
            newSelected = currentItem;
          } else {
            if (currentItem.hasClass("is-selected")) {
              oldSelected = currentItem;
            }
          }
        }
      });

      if (newSelected) {
        newSelected.addClass("is-selected");
        if (oldSelected) {
          oldSelected.removeClass("is-selected");
        }
      }

      if (
        $(window).scrollTop() <
        FIRST_SECTION.offset().top - $(window).height() / 3
      ) {
        NAV.addClass("hidden");
      } else {
        NAV.removeClass("hidden");
      }
    } else {
      NAV.addClass("hidden");
    }
  }

  function isNavMenuDisplayable(navMenu, productSectionContainer) {
    return (parseInt(navMenu.width()) < parseInt(productSectionContainer.css("margin-left")))

  }
});
