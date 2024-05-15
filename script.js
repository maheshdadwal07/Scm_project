var electionData = {
  'BJP': { votes: 0, percentage: 0 },
  'AAP': { votes: 0, percentage: 0 },
  'AKALI DAL': { votes: 0, percentage: 0 },
  'CONGRESS': { votes: 0, percentage: 0 },
  'NOTA': { votes: 0, percentage: 0 },
};

var hasVoted = false; // Flag to track whether the user has already voted

function vote(candidate) {
  if (!hasVoted) {
    alert('Vote cast for candidate ' + candidate);
    hasVoted = true; // Set the flag to true after the first vote
    castVote(candidate);
    disableRadioButtons();
  } else {
    alert('You have already voted.');
  }
}

function displayRadioValue() {
  var ele = document.getElementsByName('vote');
  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      if (!hasVoted) {
        alert('You voted for ' + ele[i].nextElementSibling.innerHTML);
        vote(ele[i].value);
      } else {
        alert('You have already voted.');
      }
      ele[i].disabled = true; // Disable the radio button after voting
    }
  }
}

function castVote(candidate) {
  updateData(candidate);
  alert('Vote cast for ' + candidate);
}

function updateData(candidate) {
  updateResults(candidate);
}

function updateResults(candidate) {
  updateTable(candidate);
  updateBars(candidate);
}

function updateTable(candidate) {
  electionData[candidate].votes += 1;
  calculatePercentages();
  document.querySelector('#voteCount' + candidate.replace(/\s+/g, '')).textContent = electionData[candidate].votes;
  document.querySelector('#percentageCount' + candidate.replace(/\s+/g, '')).textContent = electionData[candidate].percentage + '%';
}

function calculatePercentages() {
  var totalVotes = Object.values(electionData).reduce((total, candidate) => total + candidate.votes, 0);
  for (var candidate in electionData) {
    electionData[candidate].percentage = ((electionData[candidate].votes / totalVotes) * 100).toFixed(2);
  }
}

function updateBars(candidate) {
  var percentage = electionData[candidate].percentage;
  var barElement = document.getElementById('bar' + candidate.replace(/\s+/g, ''));
  var barPercentageElement = document.getElementById('barPercentage' + candidate.replace(/\s+/g, ''));

  barPercentageElement.textContent = percentage + '%';
  barElement.style.width = percentage + '%';

  // Add color based on the candidate
  switch (candidate) {
    case 'BJP':
      barElement.style.backgroundColor = 'blue';
      break;
    case 'AAP':
      barElement.style.backgroundColor = 'green';
      break;
    case 'AKALI DAL':
      barElement.style.backgroundColor = 'orange';
      break;
    case 'CONGRESS':
      barElement.style.backgroundColor = 'red';
      break;
    case 'NOTA':
      barElement.style.backgroundColor = 'grey';
      break;
    default:
      break;
  }
}

function disableRadioButtons() {
  var ele = document.getElementsByName('vote');
  for (var i = 0; i < ele.length; i++) {
    ele[i].disabled = true;
  }

  var voteButton = document.getElementById('voteButton');
  if (voteButton) {
    voteButton.disabled = true;
  }
}

function showResults() {
  alert('Voting under progress , be patient!');
}

function displayDateTime() {
  var currentDate = new Date();
  var dateElement = document.getElementById('date');
  var timeElement = document.getElementById('time');

  dateElement.innerHTML = 'Date: ' + currentDate.toDateString();
  timeElement.innerHTML = 'Time: ' + currentDate.toLocaleTimeString();
}

window.onload = function () {
  displayDateTime();
  setInterval(displayDateTime, 1000);
};
