import { refreshCookie } from "./api.js";

//vertical scroll
const body = document.querySelector("body");
function setElementHeight(el, bottomEl) {
  const marginBottom = 40;
  const top = el.getBoundingClientRect().top;
  const bottomHeight = bottomEl
    ? body.offsetHeight - bottomEl.getBoundingClientRect().top
    : marginBottom;
  el.style.maxHeight =
    Math.floor(document.documentElement.clientHeight - top - bottomHeight) +
    "px";
}
export function addScroll(selector, bottomSelector = null) {
  const el = document.querySelector(selector);
  const bottomEl = bottomSelector
    ? document.querySelector(bottomSelector)
    : null;
  setElementHeight(el, bottomEl);
}

// smooth scroll
export function setTabsListeners() {
  const navLinks = document.querySelectorAll(".tabLink");

  for (let link of navLinks) {
    link.addEventListener("click", smoothScroll);
  }
}
function smoothScroll(evt) {
  evt.preventDefault();
  const blockID = evt.target.closest(".tabLink").getAttribute("href").slice(1);

  document.getElementById(blockID).scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

//switch tabs

export const getCurrentTab = () => {
  const triggerLine = body
    .querySelector(".tabs")
    .getBoundingClientRect().bottom;
  const ingredientsLists = body.querySelectorAll(".ingredients__list");
  let currentList = ingredientsLists[0];
  for (let i = 0; i <= 2; i++) {
    const listBottom = ingredientsLists[i].getBoundingClientRect().bottom;
    if (listBottom > triggerLine) {
      currentList = ingredientsLists[i];
      break;
    }
  }
  return currentList.getAttribute("id");
};

//email validation

export function validateEmail(mail) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
}

//get form values

export const getFormValues = (form) => {
  let values = {};
  for (let el of form) {
    values[el.name] = el.value;
  }
  return values;
};

// token

export function setCookie(name, value, props) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}
export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  if (matches) {
    return decodeURIComponent(matches[1]);
  } else {
    console.log("else");
    if (name === "refreshToken") return;
    refreshCookie()
      .then((res) => {
        setCookie("refreshToken", res.refreshToken, 1200);
        setCookie("accessToken", res.accessToken, 1200);
        return getCookie(name);
      })
      .catch((err) => console.log(err));
  }
}
export function deleteCookie(name) {
  setCookie(name, null, { expires: -1 });
}
