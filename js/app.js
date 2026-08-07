/* =========================================================
   DİL PASAPORTU — Uygulama Mantığı
   ========================================================= */

const state = {
  lang: "de",
  view: "home",
  vocab: { level: "A1", cat: null },
  reading: { level: "A1" },
  listening: { level: "A1", cat: null, queue: [], idx: 0 },
  robot: { level: "A1", cat: null, queue: [], idx: 0, score: 0, streak: 0 },
};

const CAT_ORDER = Object.keys(CATS);

/* ---------------- helpers ---------------- */
function normalize(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // strip accents
    .replace(/[^a-z0-9şıöüçğ ]/gi, "")
    .trim()
    .replace(/\s+/g, " ");
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function speak(text, langCode) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = langCode;
  utter.rate = 0.92;
  window.speechSynthesis.speak(utter);
}

/* ---------------- nav / language switch ---------------- */
function buildLangSwitch() {
  const el = document.getElementById("langSwitch");
  el.innerHTML = "";
  Object.keys(LANGS).forEach((code) => {
    const L = LANGS[code];
    const btn = document.createElement("button");
    btn.className = "lang-pill" + (state.lang === code ? " is-active" : "");
    btn.style.setProperty("--pill-color", L.color);
    btn.innerHTML = `<span>${L.flag}</span><span>${L.label}</span>`;
    btn.addEventListener("click", () => {
      state.lang = code;
      buildLangSwitch();
      renderCurrentView();
    });
    el.appendChild(btn);
  });
}

function setView(view) {
  state.view = view;
  document.querySelectorAll(".view").forEach((v) => {
    v.hidden = v.dataset.view !== view;
  });
  document.querySelectorAll(".nav-link").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.nav === view);
  });
  document.getElementById("mainNav").classList.remove("is-open");
  window.scrollTo({ top: 0, behavior: "smooth" });
  renderCurrentView();
}

function renderCurrentView() {
  if (state.view === "home") renderHome();
  if (state.view === "vocab") renderVocabView();
  if (state.view === "reading") renderReadingView();
  if (state.view === "listening") renderListeningView();
  if (state.view === "robot") renderRobotView();
}

document.querySelectorAll("[data-nav]").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    setView(el.dataset.nav);
  });
});

document.getElementById("burgerBtn").addEventListener("click", () => {
  document.getElementById("mainNav").classList.toggle("is-open");
});

/* ---------------- level tabs / cat chips (generic builders) ---------------- */
function buildLevelTabs(container, activeLevel, onSelect) {
  container.innerHTML = "";
  LEVELS.forEach((lv) => {
    const btn = document.createElement("button");
    btn.className = "level-tab" + (lv === activeLevel ? " is-active" : "");
    btn.textContent = lv;
    btn.addEventListener("click", () => onSelect(lv));
    container.appendChild(btn);
  });
}

function buildCatChips(container, activeCat, onSelect) {
  container.innerHTML = "";
  const allBtn = document.createElement("button");
  allBtn.className = "cat-chip" + (activeCat === null ? " is-active" : "");
  allBtn.textContent = "Tümü";
  allBtn.addEventListener("click", () => onSelect(null));
  container.appendChild(allBtn);

  CAT_ORDER.forEach((cat) => {
    const btn = document.createElement("button");
    btn.className = "cat-chip" + (activeCat === cat ? " is-active" : "");
    btn.textContent = CATS[cat].label;
    btn.addEventListener("click", () => onSelect(cat));
    container.appendChild(btn);
  });
}

/* ---------------- HOME ---------------- */
function renderHome() {
  const stampsEl = document.getElementById("homeLangStamps");
  stampsEl.innerHTML = "";
  const rotations = [-3, 2, -1.5];
  Object.keys(LANGS).forEach((code, i) => {
    const L = LANGS[code];
    const wordCount = LEVELS.reduce(
      (sum, lv) => sum + CAT_ORDER.reduce((s2, c) => s2 + VOCAB[code][lv][c].length, 0),
      0
    );
    const div = document.createElement("div");
    div.className = "p-stamp";
    div.style.setProperty("--stamp-color", L.color);
    div.style.setProperty("--r", rotations[i] + "deg");
    div.innerHTML = `
      <div class="p-stamp-flag">${L.flag}</div>
      <div class="p-stamp-name">${L.label}</div>
      <div class="p-stamp-sub">${wordCount} kelime · A1–B1</div>
    `;
    stampsEl.appendChild(div);
  });

  const statsEl = document.getElementById("homeStats");
  const totalWords = Object.keys(LANGS).reduce(
    (sum, code) =>
      sum +
      LEVELS.reduce((s, lv) => s + CAT_ORDER.reduce((s2, c) => s2 + VOCAB[code][lv][c].length, 0), 0),
    0
  );
  statsEl.innerHTML = `
    <div class="stat-box"><div class="stat-num">3</div><div class="stat-label">Dil: Almanca, İngilizce, Fransızca</div></div>
    <div class="stat-box"><div class="stat-num">${totalWords}</div><div class="stat-label">Örnek cümleli kelime</div></div>
    <div class="stat-box"><div class="stat-num">3</div><div class="stat-label">Seviye: A1, A2, B1</div></div>
    <div class="stat-box"><div class="stat-num">${CAT_ORDER.length}</div><div class="stat-label">Kategori</div></div>
  `;
}

/* ---------------- VOCAB ---------------- */
function renderVocabView() {
  document.getElementById("vocabHeading").textContent = `${LANGS[state.lang].label} kelime kartları`;
  buildLevelTabs(document.getElementById("vocabLevelTabs"), state.vocab.level, (lv) => {
    state.vocab.level = lv;
    renderVocabView();
  });
  buildCatChips(document.getElementById("vocabCatChips"), state.vocab.cat, (cat) => {
    state.vocab.cat = cat;
    renderVocabView();
  });

  const grid = document.getElementById("vocabGrid");
  grid.innerHTML = "";
  const words = flatVocab(state.lang, state.vocab.level, state.vocab.cat);
  words.forEach((w) => grid.appendChild(buildFlipCard(w)));
}

function buildFlipCard(w) {
  const wrap = document.createElement("div");
  wrap.className = "flip-card";

  const inner = document.createElement("div");
  inner.className = "flip-card-inner";

  const front = document.createElement("div");
  front.className = "flip-face front";
  front.innerHTML = `
    <div class="flip-front-top">
      <span class="flip-cat-tag">${CATS[w.category].label}</span>
      <button class="speaker-btn" title="Dinle" data-say="1">
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 9v6h4l5 5V4L8 9H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7"/></svg>
      </button>
    </div>
    <div>
      <div class="flip-tr-word">${w.tr}</div>
      <div class="flip-target-word">${w.word}</div>
    </div>
    <div class="flip-hint">Örnek cümle için çevir →</div>
  `;
  const back = document.createElement("div");
  back.className = "flip-face back";
  back.innerHTML = `
    <div class="flip-example">“${w.example}”</div>
    <div class="flip-example-tr">${w.exampleTr}</div>
  `;

  inner.appendChild(front);
  inner.appendChild(back);
  wrap.appendChild(inner);

  front.addEventListener("click", (e) => {
    if (e.target.closest("[data-say]")) return;
    wrap.classList.add("is-flipped");
  });
  back.addEventListener("click", () => wrap.classList.remove("is-flipped"));
  front.querySelector("[data-say]").addEventListener("click", (e) => {
    e.stopPropagation();
    speak(w.word, LANGS[w.lang].ttsCode);
  });

  return wrap;
}

/* ---------------- READING ---------------- */
function renderReadingView() {
  document.getElementById("readingHeading").textContent = `${LANGS[state.lang].label} okuma parçaları`;
  buildLevelTabs(document.getElementById("readingLevelTabs"), state.reading.level, (lv) => {
    state.reading.level = lv;
    renderReadingView();
  });

  const passage = READINGS[state.lang][state.reading.level];
  document.getElementById("readingTitle").textContent = passage.title;
  document.getElementById("readingText").textContent = passage.text;

  const quizEl = document.getElementById("readingQuiz");
  quizEl.innerHTML = "";
  passage.questions.forEach((q, qi) => {
    const qDiv = document.createElement("div");
    qDiv.className = "quiz-q";
    const p = document.createElement("p");
    p.textContent = `${qi + 1}. ${q.q}`;
    qDiv.appendChild(p);
    const optsWrap = document.createElement("div");
    optsWrap.className = "quiz-opts";
    q.options.forEach((opt, oi) => {
      const b = document.createElement("button");
      b.className = "quiz-opt";
      b.textContent = opt;
      b.addEventListener("click", () => {
        [...optsWrap.children].forEach((c) => c.classList.remove("correct", "wrong"));
        if (oi === q.answer) {
          b.classList.add("correct");
        } else {
          b.classList.add("wrong");
          optsWrap.children[q.answer].classList.add("correct");
        }
      });
      optsWrap.appendChild(b);
    });
    qDiv.appendChild(optsWrap);
    quizEl.appendChild(qDiv);
  });

  document.getElementById("readingListenBtn").onclick = () => {
    speak(passage.text, LANGS[state.lang].ttsCode);
  };
}

/* ---------------- LISTENING ---------------- */
function buildListeningQueue() {
  const words = shuffle(flatVocab(state.lang, state.listening.level, state.listening.cat));
  state.listening.queue = words;
  state.listening.idx = 0;
}

function renderListeningView() {
  document.getElementById("listeningHeading").textContent = `${LANGS[state.lang].label} dinleme alıştırması`;
  buildLevelTabs(document.getElementById("listeningLevelTabs"), state.listening.level, (lv) => {
    state.listening.level = lv;
    buildListeningQueue();
    renderListeningView();
  });
  buildCatChips(document.getElementById("listeningCatChips"), state.listening.cat, (cat) => {
    state.listening.cat = cat;
    buildListeningQueue();
    renderListeningView();
  });

  if (!state.listening.queue.length) buildListeningQueue();

  document.getElementById("dictationInput").value = "";
  document.getElementById("dictationFeedback").textContent = "";
  document.getElementById("dictationFeedback").className = "dictation-feedback";

  document.getElementById("listenPlayBtn").onclick = playCurrentDictation;
  document.getElementById("dictationCheck").onclick = checkDictation;
  document.getElementById("dictationNext").onclick = () => {
    nextDictationWord();
  };
  document.getElementById("dictationInput").onkeydown = (e) => {
    if (e.key === "Enter") checkDictation();
  };
  document.getElementById("listenReadingBtn").onclick = () => {
    const passage = READINGS[state.lang][state.listening.level];
    speak(passage.text, LANGS[state.lang].ttsCode);
  };
}

function currentDictationWord() {
  return state.listening.queue[state.listening.idx % state.listening.queue.length];
}

function playCurrentDictation() {
  const w = currentDictationWord();
  if (w) speak(w.word, LANGS[state.lang].ttsCode);
}

function checkDictation() {
  const w = currentDictationWord();
  const input = document.getElementById("dictationInput");
  const fb = document.getElementById("dictationFeedback");
  if (!w) return;
  const ok = normalize(input.value) === normalize(w.word);
  fb.textContent = ok
    ? `Doğru! "${w.tr}" → "${w.word}"`
    : `Tekrar dene. Doğru cevap: "${w.word}" (${w.tr})`;
  fb.className = "dictation-feedback " + (ok ? "correct" : "wrong");
  fb.style.color = ok ? "#4c9a6a" : "var(--de)";
}

function nextDictationWord() {
  state.listening.idx++;
  document.getElementById("dictationInput").value = "";
  document.getElementById("dictationFeedback").textContent = "";
  playCurrentDictation();
}

/* ---------------- ROBOT ---------------- */
function buildRobotQueue() {
  const words = shuffle(flatVocab(state.lang, state.robot.level, state.robot.cat));
  state.robot.queue = words;
  state.robot.idx = 0;
}

function renderRobotView() {
  document.getElementById("robotHeading").textContent = `${LANGS[state.lang].label} ile pratik yap`;
  buildLevelTabs(document.getElementById("robotLevelTabs"), state.robot.level, (lv) => {
    state.robot.level = lv;
    buildRobotQueue();
    showRobotWord();
  });
  buildCatChips(document.getElementById("robotCatChips"), state.robot.cat, (cat) => {
    state.robot.cat = cat;
    buildRobotQueue();
    showRobotWord();
  });

  if (!state.robot.queue.length) buildRobotQueue();

  document.getElementById("robotScore").textContent = state.robot.score;
  document.getElementById("robotStreak").textContent = state.robot.streak;
  document.getElementById("robotCheck").onclick = checkRobotAnswer;
  document.getElementById("robotSkip").onclick = () => {
    state.robot.streak = 0;
    nextRobotWord();
  };
  document.getElementById("robotInput").onkeydown = (e) => {
    if (e.key === "Enter") checkRobotAnswer();
  };

  showRobotWord();
}

function currentRobotWord() {
  if (!state.robot.queue.length) return null;
  return state.robot.queue[state.robot.idx % state.robot.queue.length];
}

function showRobotWord() {
  const w = currentRobotWord();
  const fb = document.getElementById("robotFeedback");
  fb.textContent = "";
  fb.className = "robot-feedback";
  document.getElementById("robotInput").value = "";
  document.getElementById("robotAvatar").className = "robot-avatar is-thinking";
  if (!w) {
    document.getElementById("robotPromptWord").textContent = "Bu kategori/seviyede kelime yok";
    document.getElementById("robotPromptCat").textContent = "";
    return;
  }
  document.getElementById("robotPromptWord").textContent = w.tr;
  document.getElementById("robotPromptCat").textContent = CATS[w.category].label;
  document.getElementById("robotInput").focus({ preventScroll: true });
}

function checkRobotAnswer() {
  const w = currentRobotWord();
  if (!w) return;
  const input = document.getElementById("robotInput");
  const fb = document.getElementById("robotFeedback");
  const avatar = document.getElementById("robotAvatar");
  const ok = normalize(input.value) === normalize(w.word);

  if (ok) {
    state.robot.score += 10;
    state.robot.streak += 1;
    fb.className = "robot-feedback correct";
    fb.innerHTML = `Doğru! <strong>${w.word}</strong><span class="fb-example">${w.example}</span>`;
    avatar.className = "robot-avatar is-happy";
  } else {
    state.robot.streak = 0;
    fb.className = "robot-feedback wrong";
    fb.innerHTML = `Neredeyse! Doğrusu: <strong>${w.word}</strong><span class="fb-example">${w.example}</span>`;
    avatar.className = "robot-avatar is-sad";
  }
  document.getElementById("robotScore").textContent = state.robot.score;
  document.getElementById("robotStreak").textContent = state.robot.streak;
  speak(w.word, LANGS[state.lang].ttsCode);

  setTimeout(nextRobotWord, 1600);
}

function nextRobotWord() {
  state.robot.idx++;
  showRobotWord();
}

/* ---------------- init ---------------- */
buildLangSwitch();
renderHome();
