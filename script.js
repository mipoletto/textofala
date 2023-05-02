let textarea = document.querySelector("#textarea");
let voices = document.querySelector("#voices");
let speed = document.querySelector("#speed");
let button = document.querySelector("#button");
let selectedVoice = 0;
let selectedSpeed = 1.0;

window.speechSynthesis.addEventListener("voiceschanged", () => {
    let voicesList = window.speechSynthesis.getVoices();
    for(let i in voicesList){
        let optionEl = document.createElement("option");
        optionEl.setAttribute("value", i);
        optionEl.innerText = voicesList[i].name;
        voices.appendChild(optionEl);
    }
});

button.addEventListener("click", () => {
    if (textarea.value !==""){
        let voicesList = window.speechSynthesis.getVoices();
        let ut =new SpeechSynthesisUtterance(textarea.value);
        ut.voice = voicesList[selectedVoice];
        ut.rate = selectedSpeed;
        window.speechSynthesis.speak(ut);
    }
});

let stopButton = document.querySelector("#stopButton");

    stopButton.addEventListener("click", () => {
    window.speechSynthesis.cancel();
});

voices.addEventListener("change", ()=>{
    selectedVoice = parseInt(voices.value);
});

speed.addEventListener("change", ()=>{
    selectedSpeed = parseFloat(speed.value);
});

function updateStatus(){
    if(window.speechSynthesis.speaking){
        voices.setAttribute("disabled", "disabled");
        speed.setAttribute("disabled", "disabled");
        button.setAttribute("disabled", "disabled");
    }else{
        voices.removeAttribute("disabled");
        speed.removeAttribute("disabled");
        button.removeAttribute("disabled");
    }
    
}
setInterval(updateStatus, 100);