(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(["chartist"], function (Chartist) {
      return (root.returnExportsGlobal = factory(Chartist));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory(require("chartist"));
  } else {
    root['Chartist.plugins.ctRotatedPieLabels'] = factory(Chartist);
  }
}(this, function (Chartist) {
  /**
   * Chartist.js plugin to display rotated / translated pie chart labels.
   * 
   * By Noah Mushkin, github: @nmushkin
   * 
   */
  /* global Chartist */
  (function(globalThis, document, Chartist) {
      'use strict';

      var defaultOptions = {
        labelTranslate: .95,
        outerAnchor: true
      };  

      Chartist.plugins = Chartist.plugins || {};
      Chartist.plugins.ctRotatedPieLabels = function(options) {

        options = Chartist.extend({}, defaultOptions, options);
    
        function rotateLabel(data, chart) {
          let center_x = chart.container.offsetWidth / 2
          let center_y = chart.container.offsetHeight / 2
          let width = data.x - center_x
          let height = data.y - center_y
          if (width == 0) {width = -1}
          // Calculate the norm of the line from the center of the pie to the current label's position
          // .00001 to avoid division by 0
          let norm = Math.max(Math.sqrt(width ** 2 + height ** 2), .00001)
          // 'move' the label along the radial line.  (width/norm = 1)
          let labelTranslate = options.labelTranslate ? options.labelTranslate : (center_x - 10)
          let dx = center_x + labelTranslate * center_x * (width / norm)
          let dy = center_y + labelTranslate * center_y * (height / norm)
          // Find angle between horizontal diameter of pie and line we translated the label along earlier
          // 57 is for conversion to degrees
          let angle = Math.atan(Math.abs(height) / (Math.abs(width)+.00001)) * 57
          if (width < 0 != height < 0) { angle *= -1 }
          // Grab the current label text and transform it
          const label = data.element.getNode()
          let reverseAnchor = options.outerAnchor ? (width < 0) : (width > 0)
          label.setAttribute('text-anchor', reverseAnchor ? 'start' : 'end')
          label.setAttribute('transform', `rotate(${angle}, ${dx}, ${dy})`)
          label.setAttribute('dx', dx)
          label.setAttribute('dy', dy)
        }
    
        return function ctRotatedLabels(chart) {
          if (chart instanceof Chartist.Pie) {
            chart.on('draw', function(data) {
              if (data.type === 'label') {
                rotateLabel(data, chart)
              }
            })
          }
        }
      }
    
    }(globalThis, document, Chartist));

    return Chartist.plugins.ctRotatedPieLabels

}));