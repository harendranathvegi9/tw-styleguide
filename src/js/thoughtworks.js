(function() {

  var TWSG = function() {
    var self = this;
    this.rclass = /[\t\r\n\f]/g;
    this.rnotwhite = (/\S+/g);
    this.whitespace = "[\\x20\\t\\r\\n\\f]";
    this.rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
  };

  TWSG.prototype.trim = function(text) {
    var self = this;
    return text == null ?
      '' :
      (text + '').replace(self.rtrim, '');
  };

  TWSG.prototype.addClass = function(element, value) {
    var self = this;
    var proceed = typeof value === 'string' && value;
    var classes, current, className, finalValue;
    if (proceed) {
      classes = (value || '').match(self.rnotwhite) || [];
      current = element.nodeType === 1 && (element.className ? (' ' + element.className + ' ').replace(self.rclass, ' ') : ' ');

      if (current) {
        var i = 0;
        while ((className = classes[i++])) {
          if (current.indexOf(' ' + className + ' ') < 0) {
            current += className + ' ';
          }
        }

        // only assign if different to avoid unneeded rendering.
        finalValue = self.trim(current);
        if (element.className !== finalValue) {
          element.className = finalValue;
        }
      }
    }
  };

  TWSG.prototype.preChecker = function() {
    var self = this;
    var preElements = document.getElementsByTagName('pre');
    for (var i = 0; i < preElements.length; i++) {
      var codeElement = preElements[i].firstChild;
      if (codeElement.tagName === 'CODE') {
        var codeClasses = codeElement.className;
        self.addClass(preElements[i], 'prettyprint linenums ' + codeClasses);
      }
    };
  }

  var twsgInstance = new TWSG();
  twsgInstance.preChecker();

})(window);