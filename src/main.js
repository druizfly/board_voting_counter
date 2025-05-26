import './src/style.css'

function calculateResult(votes, voteType, totalVoters) {
  const totalValid = votes.infavor + votes.opposed + votes.abstained;
  const totalAll = totalValid + votes.void;
  
  let passed = false;
  let message = '';
  let error = '';

  if (totalAll > totalVoters) {
    error = `Too many votes counted (${totalAll}) compared to total voters (${totalVoters})`;
  } else if (totalAll < totalVoters) {
    error = `Missing votes: ${totalVoters - totalAll} votes not counted`;
  }

  switch(voteType) {
    case 'majority':
      const majorityNeeded = Math.floor(totalValid / 2) + 1;
      passed = votes.infavor >= majorityNeeded;
      message = `Needs ${majorityNeeded} votes to pass`;
      break;
    case 'plurality':
      passed = votes.infavor > votes.opposed;
      message = 'Needs more votes in favor than opposed';
      break;
    case 'unanimous':
      passed = votes.infavor === totalValid && totalValid > 0;
      message = 'Needs all valid votes in favor';
      break;
  }

  return { passed, message, error };
}

function updateResult() {
  const totalVoters = parseInt(document.getElementById('totalVoters').value) || 0;
  const votes = {
    infavor: parseInt(document.getElementById('infavor').value) || 0,
    opposed: parseInt(document.getElementById('opposed').value) || 0,
    abstained: parseInt(document.getElementById('abstained').value) || 0,
    void: parseInt(document.getElementById('void').value) || 0
  };

  const voteType = document.querySelector('.vote-type button.active').dataset.type;
  const { passed, message, error } = calculateResult(votes, voteType, totalVoters);
  const totalValid = votes.infavor + votes.opposed + votes.abstained;
  const totalAll = totalValid + votes.void;

  document.getElementById('result').innerHTML = `
    <div class="vote-summary">
      <div class="vote-counts">
        <p>Total voters<strong>${totalVoters}</strong></p>
        <p>Directors in favor<strong>${votes.infavor}</strong></p>
        <p>Directors opposed<strong>${votes.opposed}</strong></p>
        <p>Directors abstaining<strong>${votes.abstained}</strong></p>
        <p>Void votes<strong>${votes.void}</strong></p>
        ${error ? `<p class="error">${error}</p>` : ''}
      </div>
      ${!error ? `
        <div class="vote-result ${passed ? 'passed' : 'failed'}">
          <h3>The motion was ${passed ? 'APPROVED' : 'NOT APPROVED'}</h3>
          <p>${message}</p>
        </div>
      ` : ''}
    </div>
  `;
}

document.querySelector('#app').innerHTML = `
  <div class="container">
    <h1>Board Vote Calculator</h1>
    <div class="calculator">
      <div class="vote-type">
        <button class="active" data-type="majority">Majority Vote</button>
        <button data-type="plurality">Plurality Vote</button>
        <button data-type="unanimous">Unanimous</button>
      </div>
      
      <div class="vote-inputs">
        <div class="input-group">
          <label for="totalVoters">Total Number of Voters:</label>
          <input type="number" id="totalVoters" min="0" value="0">
        </div>

        <div class="input-group">
          <label for="infavor">Votes in Favor:</label>
          <input type="number" id="infavor" min="0" value="0">
        </div>
        
        <div class="input-group">
          <label for="opposed">Votes Opposed:</label>
          <input type="number" id="opposed" min="0" value="0">
        </div>
        
        <div class="input-group">
          <label for="abstained">Votes Abstained:</label>
          <input type="number" id="abstained" min="0" value="0">
        </div>
        
        <div class="input-group">
          <label for="void">Void Votes:</label>
          <input type="number" id="void" min="0" value="0">
        </div>
      </div>

      <div id="result">
        <div class="vote-summary">
          <div class="vote-counts">
            <p>Total voters<strong>0</strong></p>
            <p>Directors in favor<strong>0</strong></p>
            <p>Directors opposed<strong>0</strong></p>
            <p>Directors abstaining<strong>0</strong></p>
            <p>Void votes<strong>0</strong></p>
          </div>
          <div class="vote-result failed">
            <h3>The motion was NOT APPROVED</h3>
            <p>Needs 1 vote to pass</p>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

// Add event listeners for vote type buttons
document.querySelectorAll('.vote-type button').forEach(button => {
  button.addEventListener('click', (e) => {
    document.querySelector('.vote-type button.active').classList.remove('active');
    e.target.classList.add('active');
    updateResult();
  });
});

// Add event listeners for inputs
['totalVoters', 'infavor', 'opposed', 'abstained', 'void'].forEach(id => {
  const input = document.getElementById(id);
  input.addEventListener('input', (e) => {
    e.target.value = Math.max(0, parseInt(e.target.value) || 0);
    updateResult();
  });
});

// Initial calculation
updateResult();