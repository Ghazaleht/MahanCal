let display = document.getElementById("display");

function press(value) {
  display.value += value;
  speak(value);
}

function clearDisplay() {
  display.value = "";
  speak("پاک شد");
}

function calculate() {
  try {
    let result = eval(display.value);
    display.value = result;
    speak("برابر با " + result);
  } catch {
    speak("خطا در محاسبه");
  }
}

// تابع گفتار فارسی
function speak(text) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = convertToPersianSpeech(text);
    utterance.lang = "fa-IR";

    // صدای مردانه فارسی (در مرورگرها متفاوت است)
    const voices = window.speechSynthesis.getVoices();
    const maleVoice = voices.find(v => v.lang === "fa-IR" && v.name.includes("male"));
    if (maleVoice) utterance.voice = maleVoice;

    window.speechSynthesis.speak(utterance);
  }
}

// تبدیل نمادها به گفتار فارسی
function convertToPersianSpeech(text) {
  return text
    .replace(/\*/g, "ضربدر")
    .replace(/\//g, "تقسیم")
    .replace(/\+/g, "جمع")
    .replace(/\-/g, "منهای")
    .replace(/\=/g, "برابر با")
    .replace(/\./g, "ممیز");
}
