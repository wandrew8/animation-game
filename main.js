const keys = document.querySelectorAll(".key"),
  note = document.querySelector(".nowplaying"),
  keyboard = document.querySelector('.keys'),
  darkModeButton = document.querySelector('#darkMode'),
  hintModeButton = document.querySelector('#hintMode'),
  hints = document.querySelectorAll(".hints");

let showNotes = false;

function playNote(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`),
    key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  if (!key) return;
  const keyNote = key.getAttribute("data-note");
  key.classList.add("playing");
  note.innerHTML = keyNote;
  audio.currentTime = 0;
  audio.play();
}

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing");
}

function hintsOn(e, index) {
  e.setAttribute("style", "transition-delay:" + index * 50 + "ms");
}
hints.forEach(hintsOn);

function toggleDarkMode() {
  note.classList.toggle('light');
  const body = document.querySelector('body');
  body.classList.toggle('darkMode');
}

function toggleHints() {
  console.log('Hello');
  if(showNotes) {
    hints.forEach(hint => {
      const note = hint.dataset.note;
      hint.innerHTML = note;
    })
    showNotes = false;
  } else {
    hints.forEach(hint => {
      const key = hint.dataset.key;
      hint.innerHTML = key;
    })
    showNotes = true;
  }
}

keyboard.addEventListener("click", (e) => {
  if(e.target.classList.value.includes("key")) {
    const audio = document.querySelector(`audio[data-key="${e.target.dataset.key}"]`),
    key = document.querySelector(`.key[data-key="${e.target.dataset.key}"]`);
    if (!key) return;
    const keyNote = key.getAttribute("data-note");

    key.classList.add("playing");
    note.innerHTML = keyNote;
    audio.currentTime = 0;
    audio.play();
  }
})


keys.forEach(key => key.addEventListener("transitionend", removeTransition));
window.addEventListener("keydown", playNote);  
darkModeButton.addEventListener("click", toggleDarkMode)
hintModeButton.addEventListener("click", toggleHints)

hints.forEach(hint => {
  const note = hint.dataset.note;
  hint.innerHTML = note;
})