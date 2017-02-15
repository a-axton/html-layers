import { getMousePosition, getIterableDOMNodes } from './helpers/helpers';

export default class Layers {
  constructor ({
    wrapperSelector = '.layers',
    layerSelector = '.layer',
    perspective = '800px',
    transitionEasing = 'ease-out',
    transitionDuration = '80ms',
    wrapperTransformMultiplier = 5,
    layerTransformMultiplier = 1.5
  } = {}) {
    this._options = {};
    this._options.perspective = perspective;
    this._options.transitionEasing = transitionEasing;
    this._options.transitionDuration = transitionDuration;
    this._options.wrapperTransformMultiplier = wrapperTransformMultiplier;
    this._options.layerTransformMultiplier = layerTransformMultiplier;
    this.wrappers = this.buildDOMElements(wrapperSelector, layerSelector);
  }

  buildDOMElements (wrapperSelector, layerSelector) {
    const positionStyle = (el) => {
      return el.style.position === 'absolute' ? '' : 'position: relative;';
    };
    return getIterableDOMNodes(wrapperSelector).map((wrapper, i) => {
      // set base wrapper styles
      wrapper.setAttribute('style', `
        ${positionStyle(wrapper)}
        transition: transform ${this._options.transitionDuration} ${this._options.transitionEasing};
        transform-style: preserve-3d;
        perspective: ${this._options.perspective};
      `);

      wrapper.addEventListener('mousemove', (e) => {
        this.handleMouseMove(e, i);
      })
      wrapper.addEventListener('mouseleave', (e) => {
        this.handleMouseLeave(e, i);
      })

      // set base layer styles
      const layers = getIterableDOMNodes(layerSelector, wrapper).map((layer) => {
        let offsetLayer = parseFloat(layer.dataset.level) || 1;
        layer.setAttribute('style', `
          ${positionStyle(layer)}
          transform-style: flat;
          transition: transform ${this._options.transitionDuration} ${this._options.transitionEasing};
          transform: translateX(0px) translateY(0px) translateZ(0px);
          perspective: ${this._options.perspective};
          z-index: ${offsetLayer + 1};
        `);
        return layer;
      });

      return { layers, wrapper };
    });
  }

  handleMouseLeave (e, wrapperIndex) {
    let { wrapper, layers } = this.wrappers[wrapperIndex];
    wrapper.style.transform = 'translateY(0px) rotateX(0deg) rotateY(0deg) translateZ(0)';
    layers.forEach((layer) => {
      layer.style.transform = 'translateX(0px) translateY(0px)';
    });
  }

  handleMouseMove (e, wrapperIndex) {
    let { wrapper, layers } = this.wrappers[wrapperIndex];
    let mousePosition = getMousePosition(e, wrapper);
    let offsetX = 0.5 - (mousePosition.x / wrapper.offsetWidth);
    let offsetY = 0.5 - (mousePosition.y / wrapper.offsetHeight);
    let translateY = offsetX * -1;
    let rotateX = offsetY * this._options.wrapperTransformMultiplier * -1;
    let rotateY = offsetX * this._options.wrapperTransformMultiplier;

    wrapper.style.transform = `
      translateY(${translateY}px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateZ(0)
    `;

    layers.forEach((layer) => {
      let offsetLayer = parseFloat(layer.dataset.level) || 1;
      let translateX = offsetX * offsetLayer * this._options.layerTransformMultiplier;
      let translateY = offsetY * offsetLayer * this._options.layerTransformMultiplier;
      layer.style.transform = `
        translateX(${translateX}px)
        translateY(${translateY}px)
      `;
      layer.style['z-index'] = offsetLayer + 1;
    });
  }
}
