(function() {

  var TWSG = function() {
    var self = this;
    this.rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
  };

  TWSG.prototype.trim = function(text) {
    var self = this;
    return text === null ?
      '' :
      (text + '').replace(self.rtrim, '');
  };

  TWSG.prototype.hasClass = function(ele, cls) {
    return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
  };

  TWSG.prototype.addClass = function(ele, cls) {
    var self = this;
    if (!self.hasClass(ele, cls)) {
      ele.className = self.trim(ele.className + ' ' + cls);
    }
  };

  TWSG.prototype.removeClass = function(ele, cls) {
    var self = this;
    if (self.hasClass(ele, cls)) {
      var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
      ele.className = ele.className.replace(reg, '');
    }
  };

  TWSG.prototype.preChecker = function() {
    var self = this;
    var preElements = document.getElementsByTagName('pre');
    for (var i = 0; i < preElements.length; i++) {
      var codeElement = preElements[i].firstChild;
      if (codeElement.tagName === 'CODE') {
        var codeClasses = codeElement.className;
        self.addClass(preElements[i], 'prettyprint ' + codeClasses);
      }
    }
  };

  TWSG.prototype.navBinding = function() {

    var self = this;
    var body = document.querySelector('body');
    var navBars = document.querySelectorAll('.twsg-nav');
    var mbNav = document.querySelector('.twsg-nav-menu-mb');
    var mbNavClose = document.querySelectorAll('.twsg-nav-menu-mb__item > a');

    for (var i = 0; i < navBars.length; i++) {
      var toggleSwitch = navBars[i].querySelector(".twsg-nav__toggle");
      /* jshint ignore:start */
      toggleSwitch.onclick = function(e) {
        window.scrollTo(0, 0);
        var body = document.querySelector('body');
        self.addClass(body, 'twsg-remove-scroll');
        self.addClass(mbNav, 'active');
      };
      /* jshint ignore:end */
    }

    for (var j = 0; j < mbNavClose.length; j++) {
      var closeEl = mbNavClose[j];
      /* jshint ignore:start */
      closeEl.onclick = function(e) {
        self.removeClass(body, 'twsg-remove-scroll');
        self.removeClass(mbNav, 'active');
      };
      /* jshint ignore:end */
    }

    window.onresize = function(e) {
      self.removeClass(body, 'twsg-remove-scroll');
      self.removeClass(mbNav, 'active');
    };
  };

  TWSG.prototype.footerYear = function() {
    footerYearEl = document.getElementById('twsg-footer-year');
    if (footerYearEl) {
      footerYearEl.innerHTML = new Date().getFullYear();
    }
  };

  TWSG.prototype.markupToggle = function() {
    var self = this;
    var toggleEls = document.querySelectorAll('.twsg-section-markup__toggle');
    for (var i = 0; i < toggleEls.length; i++) {
      var toggleEl = toggleEls[i];
      /* jshint ignore:start */
      toggleEl.onclick = function(e) {
        var markupEl = e.target.parentElement.parentElement;
        if (!self.hasClass(markupEl, 'active')) {
          self.addClass(markupEl, 'active');
          return;
        }
        self.removeClass(markupEl, 'active');
      };
      /* jshint ignore:end */
    }
  };

  var twsgInstance = new TWSG();
  twsgInstance.preChecker();
  twsgInstance.navBinding();
  twsgInstance.footerYear();
  twsgInstance.markupToggle();

})(window);