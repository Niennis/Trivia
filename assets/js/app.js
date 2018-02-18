let triviaCall;
let quantity;

$('#configBtn').click(function(){
  $('#welcome').toggle();
  $('#configuration').toggle();
});

$('#setQuestions').click(function(){
  $('#configuration').toggle();
})

function configTrivia() {
  let pickNumber = $('#pickNumber').val();
  let pickCategory = $('#pickCategory').val();
  let pickDifficulty = $('#pickDifficulty').val();
  let pickType = $('#pickType').val();
  quantity = pickNumber;

  function setCategory() {
    let category;
    if (pickCategory === '') {
      return category = '';
    } else {
      return category = '&category=' + pickCategory;
    }
  }
  function setDifficulty() {
    let difficulty;
    if (pickDifficulty === '') {
      return difficulty = '';
    } else {
      return difficulty = '&difficulty=' + pickDifficulty;
    }
  }
  function setType() {
    let type;
    if (pickType === '') {
      return type = '';
    } else {
      return type = '&type=' + pickType;
    }
  }
  triviaCall = fetch('https://opentdb.com/api.php?amount=' + pickNumber + setCategory() + setDifficulty() + setType());

  return triviaCall;  
}

let multipleAnswers;
let booleanAnswers;
let correct;

function setQuestions() {
  let multipleOrder;
  let booleanOrder;
  triviaCall.then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
    $('#questions').empty();

    data.results.forEach(element => {
      let configurationDiv = $('#configuration');
      if (element.type === 'multiple') {
        multipleOrder = [element.correct_answer, element.incorrect_answers[0], element.incorrect_answers[1], element.incorrect_answers[2]];
        multipleAnswers = multipleOrder;
        
        let multipleQuestion= `<div class=" multiple divQuestion">
        <div class="row">
          <div class="col-10">
            <h5>${element.question}</h5>
          </div>
        </div>
        <div class="row">
          <div class="col-10">
            <p><input type="checkbox" class="checkAnswer"><label>${multipleOrder.splice((parseInt(Math.random() * (4 -0) + 0)),1)}</label></p>
            <p><input type="checkbox" class="checkAnswer"><label>${multipleOrder.splice((parseInt(Math.random() * (3 -0) + 0)),1)}</label></p>
            <p><input type="checkbox" class="checkAnswer"><label>${multipleOrder.splice((parseInt(Math.random() * (2 -0) + 0)),1)}</label></p>
            <p><input type="checkbox" class="checkAnswer"><label>${multipleOrder.splice((parseInt(Math.random() * (1 -0) + 0)),1)}</label></p>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <button type="button" class="btn sendAnswer" onclick="jojo()">Next question</button>
          </div>
        </div>
      </div>`;

      $('#questions').append(multipleQuestion);
      
      } else {
        booleanOrder = [element.correct_answer, element.incorrect_answers[0]];
        booleanAnswers = booleanOrder;
        let booleanQuestion = `<div class=" boolean divQuestion">
        <div class="row">
          <div class="col-10">
            <h5>${element.question}</h5>
          </div>
        </div>
        <div class="row">
          <div class="col-10">
          <p><input type="checkbox" class="checkAnswer"><label>${booleanOrder.splice((parseInt(Math.random() * (2 -0) + 0)),1)}</label></p>
          <p><input type="checkbox" class="checkAnswer"><label>${booleanOrder.splice((parseInt(Math.random() * (1 -0) + 0)),1)}</label></p>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <button type="button" class="btn sendAnswer" onclick="jojo()">Next question</button>
          </div>
        </div>
      </div>`;
      $('#questions').append(booleanQuestion);      
      }
    });
  }); 
}
function jojo() {
  $('.divQuestion').first().remove();
}

