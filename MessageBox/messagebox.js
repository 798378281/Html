((window,undefind) => {
  let createShade = function () {
    let $shade = document.createElement('div');
    $shade.id = 'P-Shade';
    $shade.class= 'p-shade';
    $shade.onclick = (e) => {
      e.srcElement.style.display = 'none';
    }
    return $shade;
    // console.log($shade);
  }

  let context = function () {
    // body...
  }

  // createShade();

})(window, );