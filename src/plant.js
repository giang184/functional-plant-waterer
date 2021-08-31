import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

// This function stores our state.

const storeState = () => {
  let currentState = {};
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = {...newState};
    return newState;
  }
}

const stateControl = storeState();

let plants = {};

// This is a function factory. We can easily create more specific functions that alter a plant's soil, water, and light to varying degrees.

const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop] : (state[prop] || 0) + value
    })
  }
}

// We create four functions using our function factory. We could easily create many more.

const feed = changeState("soil")(1);
const blueFood = changeState("soil")(5);
const hydrate = changeState("water")(1);
const superWater = changeState("water")(5);

$(document).ready(function() {

  $('#feedWell').click(function() {
    let e = document.getElementById("plant-selector");
    let plant = e.value;
    const newState = plants[plant](blueFood);
    $('#soil-value').text(`Soil: ${newState.soil}`);
  });

  $('#feed').click(function() {
    let e = document.getElementById("plant-selector");
    let plant = e.value;
    const newState = plants[plant](feed);
    $('#soil-value').text(`Soil: ${newState.soil}`);
  });

  $('#water').click(function() {
    let e = document.getElementById("plant-selector");
    let plant = e.value;
    const newState = plants[plant](hydrate);
    $('#water-value').text(`Water: ${newState.water}`);
  });

  $('#waterWell').click(function() {
    let e = document.getElementById("plant-selector");
    let plant = e.value;
    const newState = plants[plant](superWater);
    $('#water-value').text(`Water: ${newState.water}`);
  });

  $('#newPlant').click(function() {
    const stateControl = storeState();
    const newState = stateControl(superWater);
    $('#water-value').text(`Water: ${newState.water}`);
  });

  $('#form1').submit(function() {
    event.preventDefault();
    let val1 = $('#newName').val();
    const temp = storeState();
    plants[val1] = temp;
    $('#plant-selector').append(`<option value=${val1}>${val1}</option>`);
  });

  // keys(plant)[keys(plant).length -1]


  // This function doesn't actually do anything useful in this application - it just demonstrates how we can "look" at the current state (which the DOM is holding anyway). However, students often do need the ability to see the current state without changing it so it's included here for reference.
  
  $('#show-state').click(function() {
    const currentState = stateControl();
    $('#soil-value').text(`Soil: ${currentState.soil}`);
    $('#water-value').text(`Water: ${currentState.water}`);
  });


  document.getElementById('plant-selector').addEventListener('change', function() {
    // const choice = $('#plant-selector').val();
    let e = document.getElementById("plant-selector");
    let plant = e.value;
    $('#soil-value').text(`Soil: ${plants[plant]().soil}`);
    $('#water-value').text(`Water: ${plants[plant]().soil}`);
    $('#trueName').text(`Your plant: ${plant}`);
    console.log("test");
    console.log(plants[plant]().soil );
    console.log(plants);
  });

});

//  { text1: new state, text2: new state...}    