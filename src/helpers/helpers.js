function mousePositionDocument (e) {
  let x = 0, y = 0;
  if (!e) {
    e = window.event;
  }
  if (e.pageX || e.pageY) {
    x = e.pageX;
    y = e.pageY;
  }
  else if (e.clientX || e.clientY) {
    x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  return { x, y };
}

function findPos (el) {
  let left = 0, top = 0;
  if (el.offsetParent) {
    do {
      left += el.offsetLeft;
      top += el.offsetTop;
    } while (el = el.offsetParent);
  }
  return { left, top };
}

export function getIterableDOMNodes (selector, parent) {
  parent = parent || document;
  return Array.prototype.slice.call(parent.querySelectorAll(selector));
}

export function getMousePosition (e, wrapper) {
  let mousePosDoc = mousePositionDocument(e);
  let targetPos = findPos(wrapper);
  let x = mousePosDoc.x - targetPos.left;
  let y = mousePosDoc.y - targetPos.top;
  return { x, y };
}
