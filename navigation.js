$(document).ready(function($) {
  var contentSections = $("section"),
    navigationItems = $("#vertical-nav a");

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
    var top = document.getElementById("main-top");

    const scrollTop = Math.max(
      window.pageYOffset,
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    if (scrollTop < 150) {
      top.style.display = "none";
    } else {
      top.style.display = "block";
    }
  }

  function updateNavigation() {
    const nav = $("#vertical-nav");
    if (window.matchMedia("(min-width: 768px)").matches) {
      contentSections.each(function() {
        $this = $(this);

        var sectionId = $this.attr("id");
        var section = $('#vertical-nav a[href="#' + sectionId + '"]')[0];
        if (section != undefined) {
          if (
            $this.offset().top - $(window).height() / 2 <=
              $(window).scrollTop() &&
            $this.offset().top + $this.height() - $(window).height() / 2 >=
              $(window).scrollTop()
          ) {
            $(section)
              .parent()
              .addClass("is-selected");
          } else {
            $(section)
              .parent()
              .removeClass("is-selected");
          }
        }
      });

      const firstSection = $("#products");

      if (
        $(window).scrollTop() <
        firstSection.offset().top - $(window).height() / 3
      ) {
        nav.addClass("hidden");
      } else {
        nav.removeClass("hidden");
      }
    } else {
      nav.addClass("hidden");
    }
  }
});
