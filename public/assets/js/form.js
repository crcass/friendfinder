// enables animated underline on focus
const handleBorder = () => {
  let name = document.querySelector('#name');
  let photo = document.querySelector('#photo');
  let questions = document.getElementsByTagName('select');

  name.addEventListener('focus', e => {
    document.querySelector('#name-wrapper').className = 'focused-wrapper';
  });
  name.addEventListener('blur', e => {
    document.querySelector('#name-wrapper').className = 'input-wrapper';
  });
  photo.addEventListener('focus', e => {
    document.querySelector('#photo-wrapper').className = 'focused-wrapper';
  });
  photo.addEventListener('blur', e => {
    document.querySelector('#photo-wrapper').className = 'input-wrapper';
  });

  for (var i = 0; i < questions.length; i++) {
    let question = document.querySelector(`#q${i + 1}`);
    let wrapper = document.querySelector(`#q${i + 1}-wrapper`);
    question.addEventListener('focus', e => {
      wrapper.className = 'select-focused';
    });
    question.addEventListener('blur', e => {
      wrapper.className = 'select-wrapper';
    });
  }
};
handleBorder();

// convert user name to Title Case
const titleCase = str =>
  str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

// validate user name
const validName = name => {
  if (!name) {
    document.querySelector('#name').placeholder = 'please enter your name';
    return false;
  } else if (!name.match(/^[a-zA-Z\s]+$/)) {
    document.querySelector('#name').value = '';
    document.querySelector('#name').placeholder = 'letters only please';
    return false;
  } else {
    return true;
  }
};

// validate photo url
const validUrl = url => {
  if (!url) {
    document.querySelector('#photo').placeholder = 'please enter a valid url';
    return false;
  } else if (
    !url.match(
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
    )
  ) {
    document.querySelector('#photo').value = '';
    document.querySelector('#photo').placeholder = 'please enter a valid url';
    return false;
  } else {
    return true;
  }
};

// validate user scores
const validScores = arr => {
  if (arr.includes(NaN)) {
    for (let i = 0; i < arr.length; i++) {
      let question = document.querySelector(`#q${i + 1}`);
      if (!arr[i]) {
        question.style.color = '#dc3545';
      }
    }
    return false;
  } else {
    return true;
  }
};

// create user, validate, post to server, reset form
document.querySelector('#submit').addEventListener('click', e => {
  e.preventDefault();

  let newUser = {
    name: titleCase(document.querySelector('#name').value.trim()),
    photo: document
      .querySelector('#photo')
      .value.trim()
      .toLowerCase(),
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

  if (
    validName(newUser.name) &&
    validUrl(newUser.photo) &&
    validScores(newUser.scores)
  ) {
    document.querySelector('#modal').style.display = 'block';
    axios
      .post('/api/friends', newUser)
      .then(response => {
        document.querySelector('#newUser-name').textContent = newUser.name;
        document.querySelector('#newUser-photo').src = newUser.photo;
        document.querySelector('#bestFriend-name').textContent =
          response.data[0];
        document.querySelector('#bestFriend-photo').src = response.data[1];
      })
      .catch(error => console.log(error));

    document.querySelector('#name').value = '';
    document.querySelector('#name').placeholder = '';
    document.querySelector('#photo').value = '';
    document.querySelector('#photo').placeholder = '';
    let select = document.getElementsByTagName('select');
    for (let i = 0; i < select.length; i++) {
      let question = document.querySelector(`#q${i + 1}`);
      question.value = '';
      question.style.color = '';
    }
  }
});

// close modal
document.querySelector('#close').onclick = () =>
  (document.querySelector('#modal').style.display = 'none');

document.querySelector('#close-btn').onclick = () =>
  (document.querySelector('#modal').style.display = 'none');

window.onclick = e => {
  if (e.target === modal) {
    document.querySelector('#modal').style.display = 'none';
  }
};
