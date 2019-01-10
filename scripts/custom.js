$(document).ready(function() {
  moveScroller();
  $(".category").click(function() {
    var dataTarget = $(this).attr("data-target");
    $(this)
      .siblings(".category")
      .each(function() {
        var a = $(this).attr("data-target");
        $(a).slideUp();
        $("#filter-block").slideUp();
      });
    $(dataTarget).slideToggle();
    $(this).html(function(i, text) {
      var a;
      if ($(this).is(":contains('Market')")) {
        a = text.replace(/Market/g, "Classifieds");
        $(".market-header").hide();
        $(".classified-header").show();
      }
      return a;
    });
    if ($(this).attr("id") == "general-post") {
      var a = $(this)
        .siblings("#market")
        .html();
      var a = a.replace(/Classifieds/g, "Market");
      $(this)
        .siblings("#market")
        .html("");
      $(this)
        .siblings("#market")
        .append(a);
      $(".market-header").show();
      $(".classified-header").hide();
    }
  });
  $(".filter-img").click(function() {
    var dataTarget = $(this).attr("data-target");
    $(dataTarget).slideToggle();
    $(this)
      .parent()
      .siblings(".category")
      .each(function() {
        var a = $(this).attr("data-target");
        $(a).slideUp();
      });
    if ($(this).hasClass("show")) {
      $(this).removeClass("show");
    } else {
      $(this)
        .parent()
        .siblings(".category")
        .removeClass("show");
      $(this).addClass("show");
    }
  });
  $(".primary-filters li").click(function() {
    var value = $(this).attr("value");
    if (value != "all") {
      $(this)
        .siblings("li")
        .removeClass("selected");
      $(this).addClass("selected");
      $(".post-block").css({ display: "none" });
      $("." + value)
        .siblings()
        .hide();
      $("." + value).css({ display: "block" });
    } else {
      $(this)
        .siblings("li")
        .removeClass("selected");
      $(this).addClass("selected");
      $(".post-block").css({ display: "block" });
      $(".empty-block").hide();
      var dataTarget = $(this).attr("data-target");
      if (dataTarget != null) {
        $(dataTarget)
          .children()
          .show();
      }
    }
  });
  $(".post-option ul li").click(function() {
    $(this)
      .siblings()
      .removeClass("selected");
    $(this).addClass("selected");
    $(this)
      .parent()
      .siblings(".dropdown-head")
      .show();
    $(this)
      .parent()
      .siblings(".dropdown-selected")
      .html("");
    $(this)
      .parent()
      .siblings(".dropdown-selected")
      .addClass("selected");
    var value = $(this).html();
    if ($(this).is(":last-child")) {
      var a = $(this).attr("class");
      if (a == "specfic-s selected") {
      } else {
        $(this)
          .parent()
          .siblings(".dropdown-selected")
          .append(value);
      }
    } else {
      $(this)
        .parent()
        .siblings(".dropdown-selected")
        .append(value);
    }
  });
  $(".post-categories .category").click(function() {
    if ($(this).hasClass("show")) {
      $(this).removeClass("show");
    } else {
      $(this)
        .siblings(".category")
        .removeClass("show");
      $(".filter-img").removeClass("show");
      $(this).addClass("show");
    }
  });
  $(".contacts li").click(function() {
    var name = $(this)
      .find("#name")
      .html();
    var id = name.replace(" ", "");
    register_popup(id, name);
  });
  $("#SourceListDopdown a").click(function() {
    $(this).addClass("source-active");
    var a = $(this)
      .children("span")
      .html();
    $("#searchSourceList").val(a);
    $(this)
      .parent()
      .siblings()
      .children("a")
      .removeClass("source-active");
    $(this)
      .parent()
      .siblings()
      .hide();
    $("#searchSourceList").hide();
  });
  function moveScroller() {
    var $anchor = $("#scroller-anchor");
    var $scroller = $(".popular-across-biztrique");

    var move = function() {
      var st = $(window).scrollTop();
      var ot = $anchor.offset().top;
      if (st > ot) {
        $scroller.css({
          position: "fixed",
          top: "0px",
          width: "263px"
        });
      } else {
        $scroller.css({
          position: "relative",
          top: "",
          width: "auto"
        });
      }
    };
    $(window).scroll(move);
    move();
  }
  $("#searchSourceList").keyup(function() {
    if ($(this).val() != "") {
      $("#SourceListDopdown").show();
      var input, filter, ul, li, a, i, txtValue;
      input = document.getElementById("searchSourceList");
      filter = input.value.toUpperCase();
      ul = document.getElementById("SourceListDopdown");
      li = ul.getElementsByTagName("li");
      for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
        } else {
          li[i].style.display = "none";
        }
      }
    } else {
      $("#SourceListDopdown").hide();
    }
  });
  $(".specfic-s").click(function() {
    $(this).addClass("selected");
  });
  $(".confirm-source").click(function() {
    var a = $(this)
      .parent()
      .siblings(".modal-body")
      .find(".model-input")
      .val();
    $(".specfic-s.selected")
      .parent()
      .siblings(".dropdown-selected")
      .append(a);
    $(".specfic-s").removeClass("selected");
    $(".modal").modal("hide");
    $(".model-input").show();
    $("#SourceListDopdown")
      .find(".source-active")
      .removeClass(".source-active");
    if ($(this).val() == "source") {
      $(".selected-user-post").show();
      $(".post-block").hide();
      $(".empty-block").show();
      $(".reset").show();
    }
    $("#searchSourceList").show();
  });
  $(".reset").click(function() {
    $(".selected-user-post").hide();
    $(".post-block").show();
    $(".empty-block").hide();
    $(".reset").hide();
  });
  $(".selected-user-post .arrow").click(function() {
    $(".selected-user-post").hide();
    $(".post-block").show();
    $(".empty-block").hide();
    $(".reset").hide();
  });
  $(".search-main input").focus(function() {
    $(this)
      .siblings(".floating-label")
      .css({
        "margin-top": "4px",
        "font-size": "11px",
        "margin-left": "44px"
      });
  });
  $(".post-input input[type='text']").focus(function() {
    $(this)
      .prev(".floating-label")
      .css({
        "margin-top": "4px",
        "font-size": "11px"
      });
  });
  $(".description-block input[type='text']").focus(function() {
    $(this)
      .prev(".floating-label")
      .css({
        "margin-top": "-4px",
        "font-size": "11px"
      });
  });
  $(".modal-body input").focus(function() {
    $(this)
      .prev(".floating-label")
      .css({
        "margin-top": "-4px",
        "font-size": "11px"
      });
  });
  $("textarea").focus(function() {
    $(this)
      .prev(".floating-label")
      .css({
        "margin-top": "-4px",
        "font-size": "11px"
      });
  });
  $("textarea").focusout(function() {
    if ($(this).val() == "") {
      $(this)
        .prev(".floating-label")
        .removeAttr("style");
    }
  });
  $("input").focusout(function() {
    if ($(this).val() == "") {
      $(this)
        .siblings(".floating-label")
        .removeAttr("style");
    }
  });
  $("#locationName").keyup(function() {
    if ($(this).val() != "") {
      $("#locationLists").show();
      var input, filter, ul, li, a, i, txtValue;
      input = document.getElementById("locationName");
      filter = input.value.toUpperCase();
      ul = document.getElementById("locationLists");
      li = ul.getElementsByTagName("li");
      for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
        } else {
          li[i].style.display = "none";
        }
      }
    } else {
      $("#locationLists").hide();
    }
  });
  $("#locationLists li a").click(function() {
    $(this).addClass("source-active");
    var a = $(this).html();
    $("#locationName").val(a);
    $(this)
      .parent()
      .siblings()
      .children("a")
      .removeClass("source-active");
    $(this)
      .parent()
      .siblings()
      .hide();
  });
});
