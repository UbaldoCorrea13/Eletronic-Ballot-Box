let yourVoteFor = document.querySelector('.d-1-1 span')
let office = document.querySelector('.d-1-2 span')
let description = document.querySelector('.d-1-4')
let warning = document.querySelector('.d-2')
let side = document.querySelector('.d-1-right')
let numbers = document.querySelector('.d-1-3')

let currentStage = 0
let number = ''
let blankVote = false
let votes = []

function startStep() {
  let stage = phases[currentStage]

  let numberHtml = ''
  number = ''
  blankVote = false

  for (let i = 0; i < stage.numbers; i++) {
    if (i === 0) {
      numberHtml += '<div class="number blink"></div>'
    } else {
      numberHtml += '<div class="number"></div>'
    }
  }

  yourVoteFor.style.display = 'none'
  office.innerHTML = stage.title
  description.innerHTML = ''
  warning.style.display = 'none'
  side.innerHTML = ''
  numbers.innerHTML = numberHtml
}
function updateInterface() {
  let stage = phases[currentStage]
  let candidate = stage.candidates.filter(item => {
    if (item.number === number) {
      return true
    } else {
      return false
    }
  })
  if (candidate.length > 0) {
    candidate = candidate[0]
    yourVoteFor.style.display = 'block'
    warning.style.display = 'block'
    description.innerHTML = `Name: ${candidate.name}<br/>Party: ${candidate.party}`

    let photosHtml = ''
    for (let i in candidate.photos) {
      photosHtml += `<div class="d-1-image"><img src="images/${candidate.photos[i].url}" alt="" />${candidate.photos[i].title}</div>`
    }
    side.innerHTML = photosHtml
  } else {
    yourVoteFor.style.display = 'block'
    warning.style.display = 'block'
    description.innerHTML = '<div class="big--warning blink">NULL VOTE</div>'
  }
}

function clicked(n) {
  let elNumber = document.querySelector('.number.blink')
  if (elNumber !== null) {
    elNumber.innerHTML = n
    number = `${number}${n}`

    elNumber.classList.remove('blink')
    if (elNumber.nextElementSibling !== null) {
      elNumber.nextElementSibling.classList.add('blink')
    } else {
      updateInterface()
    }
  }
}
function blank() {
  number = ''
  blankVote = true

  yourVoteFor.style.display = 'block'
  warning.style.display = 'block'
  numbers.innerHTML = ''
  description.innerHTML = '<div class="big--warning blink">BLANK VOTE</div>'
  side.innerHTML = ''
}
function correct() {
  startStep()
}
function confirm() {
  let stage = phases[currentStage]

  let confirmVote = false

  if (blankVote === true) {
    confirmVote = true
    votes.push({
      stage: phases[currentStage].title,
      vote: 'blank'
    })
  } else if (number.length === stage.numbers) {
    confirmVote = true
    votes.push({
      stage: phases[currentStage].title,
      vote: 'numbers'
    })
  }

  if (confirmVote) {
    currentStage++
    if (phases[currentStage] !== undefined) {
      startStep()
    } else {
      document.querySelector('.screen').innerHTML =
        '<div class="big--warning blink">END</div>'

      console.log(votes)
    }
  }
}

startStep()
