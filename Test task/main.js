// First tab
const tab1 = document.querySelector(".tab1");
const tab2 = document.querySelector(".tab2");
const tab3 = document.querySelector(".tab3");
const tab4 = document.querySelector(".tab4");

const sex = document.querySelectorAll(".form__sex-radio");
const tab1Button = document.querySelector(".tab1__button");

//Range
function valueInpTypeRange() {
  let rng = document.getElementById("age");
  let p = document.querySelector(".form__age-result");

  if (rng.value == 21 || rng.value == 31) {
    p.innerHTML = rng.value + " год";
  } else if (
    rng.value == 22 ||
    rng.value == 23 ||
    rng.value == 24 ||
    rng.value == 32 ||
    rng.value == 33 ||
    rng.value == 34
  ) {
    p.innerHTML = rng.value + " года";
  } else {
    p.innerHTML = rng.value + " лет";
  }
}
// Add event
let age = document.getElementById("age");
age.addEventListener("input", valueInpTypeRange);

// Check radiobuttons
for (let item of sex) {
  item.onchange = () => {
    tab1Button.disabled = false;
  };
}

// Transfer from 1 page to 2 page
tab1Button.onclick = (e) => {
  e.preventDefault();
  if (tab1.classList.contains("show")) {
    tab1.classList.remove("show");
  }
  tab1.classList.add("hide");
  tab2.classList.add("show");
};

// Second tab
const tab2BackButton = document.querySelector(".tab2__back-button");
const tab2NextButton = document.querySelector(".tab2__next-button");
const message = document.querySelector(".form__message-text");

// Back to first page
tab2BackButton.onclick = (e) => {
  e.preventDefault();

  tab1.classList.remove("hide");
  tab1.classList.add("show");
  tab2.classList.remove("show");
};

// Undisabled second tab button
message.onkeyup = (e) => {
  e.preventDefault();
  if (message.value.length > 0) {
    tab2NextButton.disabled = false;
  } else {
    tab2NextButton.disabled = true;
  }
};

// Transfer from tab2 to tab3
tab2NextButton.onclick = (e) => {
  e.preventDefault();
  if (tab2.classList.contains("show")) {
    tab2.classList.remove("show");
  }
  tab2.classList.add("hide");
  tab3.classList.add("show");
};

// Third tab
const tab3BackButton = document.querySelector(".tab3__back-button");
const tab3NextButton = document.querySelector(".tab3__next-button");
const name = document.querySelector(".form__name");
const phone = document.querySelector(".form__phone");
const rwButton = document.querySelector(".form__rw-button");
const loader = document.querySelector(".form__button--loading");
let isPhoneComplete = false;
let isRW = false;

// Check phone and add phone mask
fetch("https://ipinfo.io/json?token=30c06331b70d81")
  .then((response) => response.json())
  .then((jsonResponse) => {
    if (jsonResponse.country == "BY") {
      const maskOptions = {
        mask: "+{375} (00) 000-00-00",
      };
      const mask = IMask(phone, maskOptions);
      phone.addEventListener("input", () => {
        if (mask.masked.isComplete) {
          isPhoneComplete = true;
					if(isRW && name.value.length > 0) {
						tab3NextButton.disabled = false;
					}
        } else {
          isPhoneComplete = false;
					tab3NextButton.disabled = true;
        }
      });
    }
    if (jsonResponse.country == "RU") {
      const maskOptions = {
        mask: "+{7} ({9}00) 000-00-00",
      };
      const mask = IMask(phone, maskOptions);
      phone.addEventListener("input", () => {
        if (mask.masked.isComplete) {
          isPhoneComplete = true;
        } else {
          isPhoneComplete = false;
        }
      });
    }
  });

// Check rw
function checkRW() {
	if(rwButton.checked) {
		isRW = true;
		if(isPhoneComplete && name.value.length > 0) {
			tab3NextButton.disabled = false;
		}
	} else {
		isRW = false;
		tab3NextButton.disabled = true;
	}
}

rwButton.addEventListener("click", checkRW);

// Undisabled third tab button
name.onkeyup = (e) => {
  e.preventDefault();
  if (name.value.length > 0 && isPhoneComplete && isRW) {
    tab3NextButton.disabled = false;
  } else {
    tab3NextButton.disabled = true;
  }
}

// Back to second page
tab3BackButton.onclick = (e) => {
  e.preventDefault();

  tab2.classList.remove("hide");
  tab2.classList.add("show");
  tab3.classList.remove("show");
};

// Third tab button onclick
tab3NextButton.addEventListener("click", thirdNextButton);

function thirdNextButton(e) {
	e.preventDefault();
	loader.classList.add("show");
	setTimeout(() => {
		loader.classList.remove("show");
		if (tab3.classList.contains("show")) {
			tab3.classList.remove("show");
		}
		tab3.classList.add("hide");
		tab4.classList.add("show");
	}, 1500)
}



// Fourth tab
const finishButton = document.querySelector(".form__button--finish");
finishButton.onclick = () => location.reload();