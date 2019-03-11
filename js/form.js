document.querySelector('#submit').addEventListener('click', e => {
  e.preventDefault();

  let newUser = {
    name: document.querySelector('#name').value.trim(),
    photo: document.querySelector('#photo').value.trim(),
    scores: [
      parseInt(document.querySelector('#q1').value),
      parseInt(document.querySelector('#q2').value),
      parseInt(document.querySelector('#q3').value),
      parseInt(document.querySelector('#q4').value),
      parseInt(document.querySelector('#q5').value),
      parseInt(document.querySelector('#q6').value),
      parseInt(document.querySelector('#q7').value),
      parseInt(document.querySelector('#q8').value),
      parseInt(document.querySelector('#q9').value),
      parseInt(document.querySelector('#q10').value)
    ]
  };

  // UPDATE VALIDATION FOR NAME (NO NUMBERS) & URL (MUST BE ACTUAL URL)
  if (
    newUser.name === '' ||
    newUser.photo === '' ||
    newUser.scores.includes(NaN)
  ) {
    // ADD WARNING TO USER FOR MISSING ENTRIES
    console.log('not ready');
  } else {
    // console.log(newUser);
    axios
      .post('/api/friends', newUser)
      .then(response => console.log(response))
      .catch(error => console.log(error));

    document.querySelector('#name').value = '';
    document.querySelector('#photo').value = '';
    document.querySelector('#q1').value = '';
    document.querySelector('#q2').value = '';
    document.querySelector('#q3').value = '';
    document.querySelector('#q4').value = '';
    document.querySelector('#q5').value = '';
    document.querySelector('#q6').value = '';
    document.querySelector('#q7').value = '';
    document.querySelector('#q8').value = '';
    document.querySelector('#q9').value = '';
    document.querySelector('#q10').value = '';
  }
});
