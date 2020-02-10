console.clear();

const inputContainerEl = document.querySelector(".input-container");
const textInputEl = document.querySelector("input#text");
const suggestionEl = document.querySelector(".suggestion-container");
const svgTabIcon = document.querySelector(".icon.tab-key");
const svgEnterIcon = document.querySelector(".icon.enter-key");

const ENTER_KEYCODE = 13;
const TAB_KEYCODE = 9;
const BACKSPACE_KEYCODE = 8;
const UP_ARROW_KEYCODE = 38;
const DOWN_ARROW_KEYCODE = 40;
const SPACE_KEYCODE = 32;

let wordsArray = [
	"hello",
	"world",
	"what",
	"are",
	"you",
	"doing",
	"welloworld",
	"minister",
	"pot",
	"science",
	"rubbish",
	"adjust",
	"presentation",
	"prediction",
	"fate",
	"scholar",
	"pull",
	"string",
	"display",
	"estate",
	"reproduction",
	"scandal",
	"fun",
	"attachment",
	"sailor",
	"queen",
	"sleeve",
	"electron",
	"south",
	"elbow",
	"violation",
	"response",
	"commission",
	"conservation",
	"embryo",
	"explode",
	"car",
	"incentive",
	"snap",
	"mathematics",
	"moral",
	"disco",
	"cluster",
];
let suggestedWord = "";
let suggestedWordsArray = [];
let currentWordIndex = 0;
let insertText = false;

textInputEl.addEventListener("input", e => {
	if (e.data != " ") {
		insertText = true;
	}
	if (insertText == false) {
		textInputEl.value = "";
	}

	let inputValue = e.target.value;
	suggestedWordsArray = filterArray(wordsArray, inputValue);
	suggestedWord = suggestedWordsArray[0];

	if (suggestedWord != undefined) {
		suggestionEl.innerHTML = suggestedWord;
	}

	if (inputValue.length == 0 || suggestedWordsArray.length == 0) {
		suggestionEl.innerHTML = "";
	}

	if (suggestedWordsArray.length != 0) {
		svgTabIcon.classList.remove("hidden");
		svgEnterIcon.classList.add("hidden");
	} else {
		svgTabIcon.classList.add("hidden");
		svgEnterIcon.classList.remove("hidden");
	}

	if (inputValue.length == 0 || inputValue == suggestedWord) {
		svgTabIcon.classList.add("hidden");
		svgEnterIcon.classList.add("hidden");
	}

	if (textInputEl.value.length == 0) {
		insertText = false;
	}
});

textInputEl.addEventListener("keydown", e => {
	if (e.keyCode == ENTER_KEYCODE) {
		if (textInputEl.value.length == 0) return;
		appendTextToList();
	}

	if (textInputEl.value.length != 0) {
		if (e.keyCode == UP_ARROW_KEYCODE) {
			if (currentWordIndex == 0) return;
			currentWordIndex--;
			suggestionEl.innerHTML = suggestedWordsArray[currentWordIndex];
		}

		if (e.keyCode == DOWN_ARROW_KEYCODE) {
			if (currentWordIndex == suggestedWordsArray.length - 1) return;
			currentWordIndex++;
			suggestionEl.innerHTML = suggestedWordsArray[currentWordIndex];
		}

		if (e.keyCode == BACKSPACE_KEYCODE) {
			currentWordIndex = 0;
		}
	}

	if (suggestedWord != undefined && suggestedWord != "") {
		if (e.keyCode == TAB_KEYCODE) {
			e.preventDefault();
			enterSuggestionToInputEl();
		}
	}
});

svgTabIcon.addEventListener('click', () => {
	enterSuggestionToInputEl();
})

svgEnterIcon.addEventListener('click', () => {
	appendTextToList(textInputEl);
})

removeClassAfterAnimationCompletes(inputContainerEl, "animate");

function appendTextToList(){
		let inputValue = textInputEl.value;
		let words = inputValue.split(" ");
		for (let i in words) {
			if (words[i].length != 0) {
				wordsArray.push(words[i]);
				textInputEl.value = "";
				suggestionEl.innerHTML = "";
			}
		}
		wordsArray = removeDuplicatesFromArray(wordsArray);
		inputContainerEl.classList.add("animate");
		svgTabIcon.classList.add("hidden");
		svgEnterIcon.classList.add("hidden");
		removeClassAfterAnimationCompletes(inputContainerEl, "animate");
}

function enterSuggestionToInputEl(){
	textInputEl.value = suggestedWordsArray[currentWordIndex];
	suggestionEl.innerHTML = "";
	svgTabIcon.classList.add("hidden");
	svgEnterIcon.classList.add("hidden");
}

function removeClassAfterAnimationCompletes(el, className) {
	let elStyles = window.getComputedStyle(inputContainerEl);
	setTimeout(function() {
		el.classList.remove(className);
	}, +elStyles.animationDuration.replace("s", "") * 1000);
}

function filterArray(array, item, reverse = false) {
	if (reverse) {
		return array
			.filter(word => compareTwoStrings(word, item))
			.sort((a, b) => a.length - b.length);
	} else {
		return array
			.filter(word => compareTwoStrings(word, item))
			.sort((a, b) => b.length - a.length);
	}
}

function removeDuplicatesFromArray(array) {
	return [...new Set(array.map(i => i))];
}

function compareTwoStrings(string, subString) {
	let temp = string.split("", subString.length).join("");
	if (subString == temp) return subString;
}
