'use strict';

/*
 * No variable name pollution issue considered here.
 * Easy control in debugger console :)
 */
var doc = document;
var $ = doc.querySelector.bind(doc);
var $$ = doc.querySelectorAll.bind(doc);
var NS = 'http://www.w3.org/2000/svg';
var svgNum = svgs.length;

/*
 * random number generated in [min, max)
 */
function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var svgRoot = $('.wrapper .inner');
var rootEl = $('.wrapper');

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/*
 * append one svg into svgRoot
 */
function appendOneSvg(svgName) {
  var svg = doc.createElementNS(NS, 'svg');
  svg.classList.add('icon');

  // var u = doc.createElementNS(NS, 'use');
  var html = '<use xlink:href="' + svgName + '"/>';
  svg.innerHTML = html;
  svgRoot.appendChild(svg);
}

function clean()
{
  svgRoot.parentNode.removeChild(svgRoot);

  svgRoot = doc.createElement('div'); // update the global reference
  svgRoot.classList.add('inner');
  rootEl.appendChild(svgRoot);
}

function refresh(num) {
  // clean up
  clean();

  var i, j;

  // remove ignores
  var tmpSvgArr = [];
  var includeSvgArr = [];
  var newArr = [];
  svgs.forEach(function (svg) {
    if (svg.match(include)) {
      includeSvgArr.push(svg);
    }
    if (!svg.match(exclude) && !svg.match(include)) {
      tmpSvgArr.push(svg);
    }
  });

  // shuffle
  tmpSvgArr = shuffle(tmpSvgArr);

  var svgNum = num || svgs.length;

  var cutLen = tmpSvgArr.length < svgNum
    ? tmpSvgArr.length
    : svgNum;

  var newArr = tmpSvgArr.slice(0, cutLen);
  var randSeq = genRandSeq(cutLen, includeSvgArr.length);

  randSeq.forEach((x) => {
    newArr[x] = includeSvgArr.pop();
  });


  // append children
  for (i = 0; i < svgNum; i++) {
    appendOneSvg(newArr[i % newArr.length]);
  }

  console.log(svgNum + ' of icons displayed.');


  function genRandSeq(limit, num) {
    var ret = [];
    var i;
    var tmp;
    for (i = 0; i < num; i++) {
      // add what is not present in the arr
      while(ret.indexOf(tmp = random(0, limit)) > -1) {}
      ret.push(tmp);
    }
    return ret;
  }

}

function help() {
  var help= 'Hello there' +
            '\n' +
            'run refresh(20) to display 20 icons in random sequence'
  console.log(help);
}


function init() {
  var colorButtons = $$('.button');
  var i;
  var link = $('link');
  for (i = 0; i < colorButtons.length; i++) {
    var btn = colorButtons[i];
    btn.addEventListener('click', function (ev) {
      ev.preventDefault();
      var color = ev.srcElement.getAttribute('id');
      link.setAttribute('href', color + '/octwall.css');

      refresh(svgs.length);
    });
  }
}

init();