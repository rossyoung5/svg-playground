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
      var ellipse2 = ellipse.use();

      circles.attr({
        fill: 'blue',
        stroke: 'black',
        strokeWidth: 3,
        fillOpacity: .6,
        mask: ellipse
      });

      ellipse.attr({
        fill: '#fff',
        opacity: .3
      });
      ellipse2.attr({
        fill: '#fff',
        opacity: .9,
        stroke: 'black',
        strokeWidth: 5
      });

      
      function blink(){
        ellipse.animate({ry:1}, 220, function(){
          ellipse.animate({ry: 90}, 300);
        });
      };

      // Recall blink method once every 3 seconds
      setInterval(blink, 1000);



      // Bullhorn
      var bullhorn = Snap('#bullhorn'),
        soundWave1 = bullhorn.select('path#soundwave1'), 
        soundWave2 = bullhorn.select('path#soundwave2'),
        horn = bullhorn.select('g.horn');
      
      soundWave1.attr({
        "fill-opacity": 1
      });

      soundWave2.attr({
        "fill-opacity": 1
      });

      function hornSound(){
        horn.animate({transform:'t-2 0'}, 1000, mina.elastic);
        soundWave1.animate({transform:'t20 -5', "fill-opacity": 0}, 800, mina.ease);
        soundWave2.animate({transform:'t18 -5', "fill-opacity": 0}, 800, mina.easeout, function(){
          horn.animate({transform:'t0 0'}, 500, mina.ease);
          soundWave1.animate({transform:'t0 0', "fill-opacity": 1}, 1200, mina.ease);
          soundWave2.animate({transform:'t0 0', "fill-opacity": 1}, 1000, mina.easein);
        });
      };
      
      horn.click(hornSound);


      // Color Grid
      var colors = ['#00eb76', '#87cefa', '#ffe34d', '#f08080'];
      var color = colors[Math.floor(Math.random()*colors.length)];
      // console.log(color);

      var width = 50;
      var height = 50;
      var cols = 10;
      var rows = 10;

      function gridMaker() {
          var svgGrid = Snap('#squaremultiply');
          var squareEl = svgGrid.rect(0, 0, 50, 50);
          squareEl.attr({
            fill: color
          });
          for ( i=0; i<cols; i++) {
            for ( j=0; j<rows; j++) {
              if (i || j ) {   // skip the first cell
                  var idName = "square"+(i*j);
                  var h = svgGrid.rect(0, 0, 50, 50);
                  var randomizer = Math.floor(Math.random()*4 + 1);
                  // console.log(randomizer);
                  var color1 = '#00eb76';
                  var color2 = '#87cefa';
                  var color3 = '#ffe34d';
                  var color4 = '#f08080';
                  var xRandomizer = Math.floor(Math.random()*50 + 1);
                  xRandomizer *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
                  var yRandomizer = Math.floor(Math.random()*30) + 1;
                  yRandomizer *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
                  
                  switch (randomizer) {
                    case 1:
                      h.attr({
                        fill: color1,
                        id: idName
                      });
                      h.animate({transform:'t-2 0'}, 1000, mina.elastic);
                      break;
                    
                    case 2:
                      h.attr({
                        fill: color2,
                        id: idName
                      });
                      break;

                    case 3:
                      h.attr({
                        fill: color3,
                        id: idName
                      });
                      break;
                    case 4:
                      h.attr({
                        fill: color4,
                        id: idName
                      });
                      break;
                  }
                    
                  var x =i*width;
                  var y = j*height;
                  var setSquare = "translate("+x+","+y+")";
                  h.transform(setSquare);
              }
            }
        };
      };
      gridMaker();
      // setInterval(gridMaker, 5000);


    }
  };

  // Load Events
  $(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.
