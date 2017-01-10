/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */

(function($) {

  // Use this variable to set up the common and page specific functions. If you
  // rename this variable, you will also need to rename the namespace below.
  var Sage = {
    // All pages
    'common': {
      init: function() {
        // JavaScript to be fired on all pages
      },
      finalize: function() {
        // JavaScript to be fired on all pages, after page specific JS is fired
      }
    },
    // Home page
    'home': {
      init: function() {
        // JavaScript to be fired on the home page
      },
      finalize: function() {
        // JavaScript to be fired on the home page, after the init JS
      }
    },
    // About us page, note the change from about-us to about_us.
    'about_us': {
      init: function() {
        // JavaScript to be fired on the about us page
      }
    }
  };

  // The routing fires all common scripts, followed by the page specific scripts.
  // Add additional events for more control over timing e.g. a finalize event
  var UTIL = {
    fire: function(func, funcname, args) {
      var fire;
      var namespace = Sage;
      funcname = (funcname === undefined) ? 'init' : funcname;
      fire = func !== '';
      fire = fire && namespace[func];
      fire = fire && typeof namespace[func][funcname] === 'function';

      if (fire) {
        namespace[func][funcname](args);
      }
    },
    loadEvents: function() {
      // Fire common init JS
      UTIL.fire('common');

      // Fire page-specific init JS, and then finalize JS
      $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
        UTIL.fire(classnm);
        UTIL.fire(classnm, 'finalize');
      });

      // Fire common finalize JS
      UTIL.fire('common', 'finalize');

      var s = Snap("#svg");
      var circle1 = s.circle(300,200,140);
      var circle2 = s.circle(250,200,140);
      var circles = s.group(circle1, circle2);
      // var square = s.rect(210,40,160,160);
      var ellipse = s.ellipse(275, 220, 170, 90);
      
      // circle1.attr({
      //   fill: 'coral',
      //   stroke: 'coral',
      //   strokeOpacity: .3,
      //   strokeWidth: 10
      // });
      // circle2.attr({
      //   fill: 'coral',
      //   stroke: 'coral',
      //   strokeOpacity: .3,
      //   strokeWidth: 10
      // });
      circles.attr({
        fill: 'coral',
        fillOpacity: .6,
        mask: ellipse
      });
      ellipse.attr({
        fill: '#fff',
        opacity: .8
      });
      
      // square.attr({
      //   fill: 'lightblue',
      //   stroke: 'lightblue',
      //   strokeOpacity: .3,
      //   strokeWidth: 10
      // });

      function blink(){
        ellipse.animate({ry:1}, 220, function(){
          ellipse.animate({ry: 90}, 300);
        });
      };
 
      // Recall blink method once every 3 seconds
      setInterval(blink, 3000);

    }
  };

  // Load Events
  $(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.
