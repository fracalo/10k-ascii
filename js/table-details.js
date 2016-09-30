(function(){


var rows = arrFrom(document.getElementsByTagName('tr'))

var rowsTd = rows.filter(function(x){
  return arrFrom(x.childNodes).some(function(t){
    return (t.tagName === 'TD' || t.tagName === 'td')
  })
})

rowsTd.forEach(function(r){
  r.addEventListener('click',detailsRowHandler)
})

function detailsRowHandler(e) {
  var el = e.currentTarget

  if (el.nextElementSibling && el.nextElementSibling.children[0].className.match(/details/))
    toggleVisibiity(el.nextElementSibling);
  else if(el.children[0].className.match(/details/))
    toggleVisibiity(el);
  else
    addDetail(el,e);
}

function addDetail(tr, e){
  var val = Number(tr.children[0].textContent)
  /*add a class to row */
  var colspan = ancestorPath(tr).some(x => x.className && x.className.match(/control/)) ? '2' : '3';
  var row = create('tr')
  var td = create('td',{
    class:'details row' + val,
    colspan: colspan
  })
  var li1 = create('li', null, 'Binary: '+ val.toString(2))
  var li2 = create('li',null, 'Oct: 0'+ val.toString(8))
  var li3 = create('li',null, 'Hex: 0x'+ val.toString(6))
  var ul = create('ul')

  append(ul, li1, li2, li3)
  append(td, ul)
  append(row, td)
  insertAfter(row, tr)

  row.addEventListener('click', detailsRowHandler)
}
/****

fix ul margins // paddings
add an infoboxto ul
*****/
function toggleVisibiity(el){
  if (el.style.display === 'none')
    el.style.display = null;
  else
    el.style.display = 'none';
}
function create(elTag, op, text){
  var el = document.createElement(elTag)
  if (!op) op = {}
  Object.keys(op).forEach(function(x){ el.setAttribute(x, op[x]) })
  el.textContent = text || ''
  return el
}

function append(n){
  arrFrom(arguments).reduce(function(ac,x){
    ac.appendChild(x)
    return ac
  })
}
function ancestorPath(n,res){
  res = res || []
  if (! n.parentNode)
    return res;

  res.push(n.parentNode)
  return ancestorPath(n.parentNode, res)
}

/* utility to convert nodeList to array */
function arrFrom(n){
  var r = []
  var i = n.length
  while(i--)
    r.unshift(n[i]);
  return r
}


/* insert after */
function insertAfter(n, ref){
  var sib = ref.nextSibling
  if (!ref)
    ref.parentNode.appendChild(n);
  else
    ref.parentNode.insertBefore(n,sib);

}

})()
