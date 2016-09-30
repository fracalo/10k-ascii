(function() {
  //polyfill
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };



/* divide ascii-logo text in individual elements */
    var asciiLogo = document.getElementById('ascii-logo')
    var asciiLogoArray = asciiLogo.textContent.split('\n')

    var asciiLogoSubNodes = asciiLogoArray.map(function(x){
      var children =  textInNodes(x.split(''),'i')
      return populateNode('pre', children)
    })

    var populatedDiv = populateNode('div', asciiLogoSubNodes)
    populatedDiv.setAttribute('id', asciiLogo.id)
    asciiLogo.parentNode.replaceChild(populatedDiv, asciiLogo)
    asciiLogo = populatedDiv //change ref


/* text is divided you can now fire some animations */

/* rainbow animation for logo */

    var rainbowColors = ['rgb(255, 0, 0)', 'rgb(255, 165, 0)', 'rgb(255, 255, 0)', 'rgb(255,255,255)', 'rgb(50,255,50)', 'rgb(50,50,255)', 'rgb(119, 111, 119)', 'rgb(238,130,238)']
    var rainbowRGBMap = rainbowColors.map(stringToRgb)
    var startCol = 'rgb(0,0,0)'
    var startColMap = stringToRgb(startCol)

    // we give text same color as bg
    setTimeout(function(){
        asciiLogo.className = 'darkness'
        asciiLogo.addEventListener('transitionend', function(){
          linesAnim(asciiLogoSubNodes)
        })
    },500)

/*animation function for lines of asciiLogo */
    function linesAnim(n){ // arg is an array of <pre> refs, each rappresents a line
      var line = 0
      var letter = 0
      var step = 0
      var stepLim = 5

      function anim(){
        if (step ===  stepLim + 1)
          letter++, step = 0;
        if (letter === n[line].childNodes.length )
          line++ , letter = 0;
        if (line === n.length) return; //base

        var col = shiftCol(startColMap, rainbowRGBMap[line], step/stepLim)
        n[line].childNodes[letter].style.color = rgbToString( col )
        step++;
        window.requestAnimationFrame(anim)
      }
      window.requestAnimationFrame(anim)
    }
/* utility used by linesAnim to shirt color*/
    function shiftCol(start, end, rat){ // start and end are object with r, g, b keys
      return {
        r: start.r + Math.round((end.r - start.r) * rat),
        g: start.g + Math.round((end.g - start.g) * rat),
        b: start.b + Math.round((end.b - start.b) * rat)
      }
    }
/* utility to convert an rgb string to a  map */
    function stringToRgb(s){
      var a = s.match(/[0-9]+/g)
      return {
        r: Number(a[0]),
        g: Number(a[1]),
        b: Number(a[2])
      }
    }
/* utility to convert an rgb map to strin g*/
    function rgbToString(m){
      return 'rgb(' + m.r + ',' + m.g + ',' + m.b + ')';
    }

/* utility functions for manipulating ascii logo text into nodes */
    function textInNodes(arrText, nodeTag){
      return arrText.map(function(x){
        var el = document.createElement(nodeTag)
        el.textContent = x
        return el
      })
    }

    function populateNode(node, fragments){
      var parent = (typeof node === 'string') ? document.createElement(node) : node;

      return fragments.reduce(function(ac,x){
          ac.appendChild(x)
        return ac
      }, parent)
    }


 })();
