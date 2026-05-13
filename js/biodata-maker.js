/**
 * Free biodata maker: live preview + print / Save as PDF (browser)
 */
(function () {
  "use strict";

  var sheet = document.getElementById("bd-sheet");
  var form = document.getElementById("bd-form");
  if (!sheet || !form) return;

  var themes = ["classic", "modern", "festive"];
  var params = new URLSearchParams(window.location.search);
  var urlTheme = (params.get("style") || params.get("theme") || "").toLowerCase();

  function val(id) {
    var el = document.getElementById(id);
    return el && el.value ? el.value.trim() : "";
  }

  function setText(id, text) {
    var el = document.getElementById(id);
    if (el) el.textContent = text || "—";
  }

  function sync() {
    setText("pv-name", val("fullName") || "Your name here");
    setText("pv-father", val("fatherName"));
    setText("pv-mother", val("motherName"));
    setText("pv-dob", val("dob"));
    setText("pv-pob", val("pob"));
    setText("pv-height", val("height"));
    setText("pv-education", val("education"));
    setText("pv-work", val("occupation"));
    setText("pv-income", val("income"));
    setText("pv-siblings", val("siblings"));
    setText("pv-family", val("familyBrief"));
    setText("pv-phone", val("phone"));
    setText("pv-email", val("email"));
    setText("pv-address", val("address"));
    setText("pv-gotra", val("gotra"));
    setText("pv-prefs", val("partnerPrefs"));
    setText("pv-rashi", val("rashi"));
    setText("pv-nakshatra", val("nakshatra"));
  }

  function applyTheme(t) {
    if (themes.indexOf(t) === -1) t = "classic";
    themes.forEach(function (th) {
      sheet.classList.remove("bd-sheet--" + th);
    });
    sheet.classList.add("bd-sheet--" + t);
    document.querySelectorAll("[data-theme-pick]").forEach(function (btn) {
      var on = btn.getAttribute("data-theme-pick") === t;
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      btn.classList.toggle("ring-2", on);
      btn.classList.toggle("ring-gold-500", on);
      btn.classList.toggle("bg-white", on);
      btn.classList.toggle("shadow-soft", on);
    });
  }

  document.querySelectorAll("[data-theme-pick]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyTheme(btn.getAttribute("data-theme-pick"));
    });
  });

  form.addEventListener("input", sync);
  form.addEventListener("change", sync);

  applyTheme(themes.indexOf(urlTheme) !== -1 ? urlTheme : "classic");
  sync();

  var printBtn = document.getElementById("btn-print-pdf");
  if (printBtn) {
    printBtn.addEventListener("click", function () {
      window.print();
    });
  }
})();
