/**
 * Free biodata maker: live preview + print / Save as PDF (browser)
 */
(function () {
  "use strict";

  var sheet = document.getElementById("bd-sheet");
  var form = document.getElementById("bd-form");
  var topGrid = document.getElementById("bd-topgrid");
  var photoWrap = document.getElementById("bd-photo-wrap");
  var photoImg = document.getElementById("bd-photo");
  var photoInput = document.getElementById("photoFile");

  if (!sheet || !form) return;

  var themes = ["classic", "modern", "festive", "minimal", "elegant", "contrast"];
  var params = new URLSearchParams(window.location.search);
  var urlTheme = (params.get("style") || params.get("theme") || "").toLowerCase();

  function val(id) {
    var el = document.getElementById(id);
    return el && el.value ? String(el.value).trim() : "";
  }

  function setRow(row, text) {
    if (!row) return;
    var v = row.querySelector(".bd-value");
    if (v) v.textContent = text;
    if (text) {
      row.removeAttribute("data-empty");
    } else {
      row.setAttribute("data-empty", "true");
    }
  }

  function setName() {
    var el = document.getElementById("pv-name");
    var t = val("fullName");
    if (el) {
      el.textContent = t || "";
      if (!t) {
        el.setAttribute("data-empty", "true");
      } else {
        el.removeAttribute("data-empty");
      }
    }
  }

  function syncTopGrid() {
    if (!topGrid) return;
    var hasName = !!val("fullName");
    var hasPhoto = photoImg && photoImg.getAttribute("src");
    var hasDob = !!val("dob");
    var hasPob = !!val("pob");
    if (!hasName && !hasPhoto && !hasDob && !hasPob) {
      topGrid.setAttribute("data-empty", "true");
    } else {
      topGrid.removeAttribute("data-empty");
    }
  }

  function syncPhoto() {
    if (!photoWrap || !topGrid || !photoImg) return;
    var src = photoImg.getAttribute("src");
    if (src) {
      photoImg.removeAttribute("hidden");
      photoWrap.removeAttribute("data-empty");
      topGrid.classList.remove("bd-topgrid--nophoto");
    } else {
      photoImg.setAttribute("hidden", "");
      photoWrap.setAttribute("data-empty", "true");
      topGrid.classList.add("bd-topgrid--nophoto");
    }
  }

  function syncSection(sec) {
    if (!sec) return;
    var visible = false;
    sec.querySelectorAll("[data-bd-row]").forEach(function (node) {
      if (node.getAttribute("data-empty") !== "true") visible = true;
    });
    if (visible) sec.removeAttribute("data-hidden");
    else sec.setAttribute("data-hidden", "true");
  }

  function sync() {
    setName();

    var dob = val("dob");
    var pob = val("pob");
    setRow(document.getElementById("row-dob-head"), dob);
    setRow(document.getElementById("row-pob-head"), pob);

    setRow(document.getElementById("row-dob"), dob);
    setRow(document.getElementById("row-tob"), val("tob"));
    setRow(document.getElementById("row-pob"), pob);
    setRow(document.getElementById("row-rashi"), val("rashi"));
    setRow(document.getElementById("row-nakshatra"), val("nakshatra"));
    setRow(document.getElementById("row-complexion"), val("complexion"));
    setRow(document.getElementById("row-height"), val("height"));
    setRow(document.getElementById("row-gotra"), val("gotra"));
    setRow(document.getElementById("row-education"), val("education"));
    setRow(document.getElementById("row-work"), val("occupation"));
    setRow(document.getElementById("row-income"), val("income"));

    setRow(document.getElementById("row-father"), val("fatherName"));
    setRow(document.getElementById("row-fatherocc"), val("fatherOcc"));
    setRow(document.getElementById("row-mother"), val("motherName"));
    setRow(document.getElementById("row-motherocc"), val("motherOcc"));
    setRow(document.getElementById("row-siblings"), val("siblings"));
    setRow(document.getElementById("blk-family"), val("familyBrief"));

    setRow(document.getElementById("row-phone"), val("phone"));
    setRow(document.getElementById("row-email"), val("email"));
    setRow(document.getElementById("blk-address"), val("address"));
    setRow(document.getElementById("blk-prefs"), val("partnerPrefs"));

    syncPhoto();
    syncTopGrid();

    document.querySelectorAll("[data-bd-section]").forEach(syncSection);
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

  function applyTypography() {
    var fontFamily = document.getElementById("fontFamily");
    var fontSize = document.getElementById("fontSize");
    if (fontFamily) {
      var fallback = fontFamily.value === "Cormorant Garamond" || fontFamily.value === "Georgia" ? "serif" : "sans-serif";
      sheet.style.setProperty("--bd-font-family", fontFamily.value + ", " + fallback);
    }
    if (fontSize) {
      sheet.style.setProperty("--bd-base-scale", fontSize.value);
    }
  }

  document.querySelectorAll("[data-theme-pick]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyTheme(btn.getAttribute("data-theme-pick"));
    });
  });

  var fontFamilyInput = document.getElementById("fontFamily");
  var fontSizeInput = document.getElementById("fontSize");
  if (fontFamilyInput) {
    fontFamilyInput.addEventListener("change", applyTypography);
  }
  if (fontSizeInput) {
    fontSizeInput.addEventListener("change", applyTypography);
  }

  if (photoInput && photoImg) {
    photoInput.addEventListener("change", function () {
      var f = photoInput.files && photoInput.files[0];
      if (!f) {
        photoImg.removeAttribute("src");
        sync();
        return;
      }
      var reader = new FileReader();
      reader.onload = function () {
        photoImg.src = reader.result;
        sync();
      };
      reader.onerror = function () {
        photoImg.removeAttribute("src");
        sync();
      };
      reader.readAsDataURL(f);
    });
  }

  form.addEventListener("input", sync);
  form.addEventListener("change", function (event) {
    sync();
    applyTypography();
  });

  applyTheme(themes.indexOf(urlTheme) !== -1 ? urlTheme : "classic");
  applyTypography();
  sync();

  var printBtn = document.getElementById("btn-print-pdf");
  if (printBtn) {
    printBtn.addEventListener("click", function () {
      window.print();
    });
  }
})();
