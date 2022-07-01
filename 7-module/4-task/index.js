import createElement from '../../assets/lib/create-element.js';
function StepSliderTemplate(value) {
  const result = `<div class="slider">
    <div class="slider__thumb">
      <span class="slider__value">${value}</span>
    </div>
    <div class="slider__progress"></div>
    <div class="slider__steps">
      <span  class="slider__step-active"></span>
    </div>
  </div>`;

  return result;

}

export default class StepSlider {
  steps = 0;
  template = '';
  elem = '';
  value = null;
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.template = StepSliderTemplate(value);
    this.elem = this.render();
  }

  render() {
    const slider = createElement(this.template);
    const stepsContainer = slider.querySelector('.slider__steps');
    const span = '<span></span>';
    let segments = this.steps - 1;
    let valuePercents = this.value / segments * 100;
    let thumb = slider.querySelector('.slider__thumb');
    let progress = slider.querySelector('.slider__progress');

    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;


    for (let i = 1; i < this.steps; i++) {
      stepsContainer.innerHTML += span;

    }


    thumb.ondragstart = () => false;

    thumb.addEventListener('pointerdown', () => {
      slider.classList.add('slider_dragging');

      document.addEventListener('pointermove', this.onPointerMove);

      document.addEventListener('pointerup', (event) => {
        let value = this.pointerMoveValue(event);
        this.onPointerUp(value);
      }, { once: true });

    });

    slider.addEventListener('click', (event) => {
      this.onSlideClick(event, stepsContainer);
    });
    return slider;
  }

  pointerMoveValue = (event) => {
    let value = 0;
    const slider = this.elem;
    let left = event.clientX - slider.getBoundingClientRect().left;
    let leftRelative = left / slider.offsetWidth;
    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    value = Math.round(approximateValue);

    return value;
  }

  onPointerMove = (event) => {
    const slider = this.elem;
    const stepsContainer = slider.querySelector('.slider__steps');
    let value = this.pointerMoveValue(event);
    let left = event.clientX - slider.getBoundingClientRect().left;
    let leftRelative = left / slider.offsetWidth;
    let leftPercents = leftRelative * 100;
    let thumb = slider.querySelector('.slider__thumb');
    let progress = slider.querySelector('.slider__progress');
    const sliderValueContainer = slider.querySelector('.slider__value');
    let activeStep = stepsContainer.childNodes[1];

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }



    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;
    sliderValueContainer.innerHTML = value;
    activeStep.classList.add('slider__step-active');
  }

  onPointerUp = (value) => {
    this.onSliderClickEvent(value);
    this.elem.classList.remove('slider_dragging');
    document.removeEventListener('pointermove', this.onPointerMove);
  }


  onSliderClickEvent = (value) => {
    const sliderChangeEvent = new CustomEvent("slider-change",
      {
        detail: value,
        bubbles: true
      });

    return this.elem.dispatchEvent(sliderChangeEvent);
  }

  onSlideClick = (event, stepsContainer) => {
    let segments = this.steps - 1;
    let value = this.pointerMoveValue(event);
    let valuePercents = value / segments * 100;
    const sliderValueContainer = this.elem.querySelector('.slider__value');
    let activeStep = stepsContainer.childNodes[1];


    sliderValueContainer.innerHTML = value;

    activeStep.classList.add('slider__step-active');

    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;
    this.onSliderClickEvent(value);

  }


  get elem() {
    return this.elem;
  }
}