
var logoAnimScript = load('js/logo-anim.js')
var tableClickScript = load('js/table-details.js')
















logoAnimScript.addEventListener('load',function(){

})





/* utility for loading scripts, returns reference to script element */
function load(s){
  var script = document.createElement('script')
  script.src = s;
  script.type = 'text/javascript'
  script.async = true
  var headTag = document.getElementsByTagName('head')[0];
  headTag.appendChild(script);
  return script
}
