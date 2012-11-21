yepnope([
  {
    test: test: window.JSON,
    nope: "./js/polyfills/jquery.json-2.4.min.js"
  },
  {
    test: ('localStorage' in window),
    nope: "./js/polyfills/jstorage.js"
  },
  // Load mobile datepicker if necessary
  // from http://css-tricks.com/8678-progressively-enhancing-html5-forms/
  {
    test: Modernizr.inputtypes.date,
    nope: [
      "./mobpick/external/xdate.js",
      "./mobpick/external/xdate.i18n.js",
      "./mobpick/js/mobipick.js",
      "./mobpick/css/mobipick.css",
      "./js/custom-datepicker.js"
    ]
  }
]);
