import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {

  steps = 0;
  sliderTemplate;
  elem;

  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.sliderTemplate = createSlider(value);
    this.elem = this.renderSlider();
  }

  renderSlider() {
    let sliderElement = createElement(this.sliderTemplate);
    let sliderStepsDiv = sliderElement.querySelector(".slider__steps");

    for (let i = 1; i < this.steps; i++) {
      sliderStepsDiv.innerHTML += `<span></span>`;
    }


    sliderElement.addEventListener("click", this.sliderClickEvent);

    return sliderElement;
  }

  sliderClickEvent = (event) => {
    let slider = this.elem;
    let steps = slider.querySelector(".slider__steps");
    let left = event.clientX - slider.getBoundingClientRect().left;
    let leftRelative = left / slider.offsetWidth;
    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    let valuePercents = value / segments * 100;

    let sliserValue = slider.querySelector(".slider__value");
    let activeStep = steps.childNodes[1];
    sliserValue.innerHTML = value;
    activeStep.classList.add(".slider__step-active");

    let thumb = slider.querySelector(".slider__thumb");
    let progress = slider.querySelector(".slider__progress");

    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;


    let sliderChangeEvent = new CustomEvent("slider-change", {
      detail: value,
      bubbles: true
    });

    return slider.dispatchEvent(sliderChangeEvent);
  };
}

function createSlider(value) {
  let sliderElement = `
  
  <!--Корневой элемент слайдера-->
    <div class="slider">
      <!--Ползунок слайдера с активным значением-->
      <div class="slider__thumb">
        <span class="slider__value">${value}</span>
      </div>
      <!--Полоска слайдера-->
      <div class="slider__progress"></div>
      <!-- Шаги слайдера (вертикальные чёрточки) -->
      <div class="slider__steps">
        <span class="slider__step-active"></span>
      </div>
    </div>
    `;
  return sliderElement;
}