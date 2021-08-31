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


$(document).ready(function() {

  $('#form1').submit(function() {
    event.preventDefault();
    let val1 = $('#newName').val();
    const temp = storeState();
    plants[val1] = temp;
    $('#plant-selector').append(`<option value=${val1}>${val1}</option>`);
  });

  $('#form-soil').submit(function() {
    event.preventDefault();
    let amount = parseInt($('#amount').val());
    let property = $('#propertyName').val()
    let e = document.getElementById("plant-selector");
    let plant = e.value;
    const feed = changeState(property)(amount);
    const newState = plants[plant](feed);
    $('#displayProperties').append(`<h3>${property}: ${newState[property]}</p>`);
  });

  $('#show-state').click(function() {
    const currentState = stateControl();
    $('#soil-value').text(`Soil: ${currentState.soil}`);
    $('#water-value').text(`Water: ${currentState.water}`);
  });

  document.getElementById('plant-selector').addEventListener('change', function() {
    // const choice = $('#plant-selector').val();
    let e = document.getElementById("plant-selector");
    let plant = e.value;
    $('#trueName').text(`Your plant: ${plant}`);
    const propArray = Object.keys(plants[plant]());
    $('#displayProperties').empty();
    propArray.forEach (function(key) {
      $('#displayProperties').append(`<p>${key}: ${plants[plant]()[key]}</p>`);
    });
  });

});

//  { text1: new state, text2: new state...}    