import React from "react";

//vertical scroll
import { IOrder } from "../services/types/data";

const body = document.querySelector("body") as HTMLBodyElement;
function setElementHeight(el: HTMLElement, bottomEl: HTMLElement | null) {
  const marginBottom = 40;
  const top = el.getBoundingClientRect().top;
  const bottomHeight =
    bottomEl != null
      ? body.offsetHeight - bottomEl.getBoundingClientRect().top
      : marginBottom;
  el.style.maxHeight =
    Math.floor(document.documentElement.clientHeight - top - bottomHeight) +
    "px";
}
export function addScroll(
  selector: string,
  bottomSelector: string | null = null
) {
  const el = document.querySelector(selector) as HTMLElement;
  const bottomEl = bottomSelector
    ? (document.querySelector(bottomSelector) as HTMLElement)
    : null;
  setElementHeight(el, bottomEl);
}

// switch tabs

export const getCurrentTab = () => {
  let tabs;
  if (body !== null) {
    tabs = body.querySelector(".tabs");
  }
  const triggerLine = tabs ? tabs.getBoundingClientRect().bottom : null;
  const ingredientsLists = body.querySelectorAll(".ingredients__list");
  let currentList = ingredientsLists[0];
  for (let i = 0; i <= 2; i++) {
    const listBottom = ingredientsLists[i].getBoundingClientRect().bottom;
    if (triggerLine && listBottom > triggerLine) {
      currentList = ingredientsLists[i];
      break;
    }
  }
  let result = currentList.getAttribute("id");
  if (result === null) result = "Buns";
  return result;
};

//email validation

export function validateEmail(mail: string) {
  return /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(mail);
}

// token
export function setCookie(name: string, value: string) {
  document.cookie = name + "=" + value + "; path=/";
}

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" + name.replace(/([$?*|{}[\]\\/^])/g, "\\$1") + "=([^;]*)"
    )
  );
  if (matches) {
    return decodeURIComponent(matches[1]);
  }
  return null;
}
export function deleteCookie(name: string) {
  document.cookie = name + "=; expires=-1";
}

//input values
export const onInputChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setValue: (a: string) => void
) => {
  setValue(e.target.value);
};

//date converter

export const getDate = (date: string) => {
  const orderDate = new Date(date);
  let days;
  const now = new Date();
  const nowDay = now.getDate();
  let day = orderDate.getUTCDate();
  let hour = orderDate.getHours();
  let month = orderDate.getMonth();
  let min: number | string = orderDate.getMinutes();
  const gmt = orderDate.toString().split("GMT")[1];
  if (min < 10) min = "0" + min;
  const time = `${hour}:${min} i-GMT${gmt.slice(0, 1)}${Number(
    gmt.slice(1, 3)
  )}`;
  if (now.getMonth() - month > 0) {
    return `${day}/${month}, ${time}`;
  }
  if (nowDay - day > 1) {
    days = nowDay - day;
    return days < 5
      ? `${days} дня назад, ${time}`
      : `${days} дней назад, ${time}`;
  } else if (nowDay - day === 1) {
    return `Вчера, ${time}`;
  } else return `Сегодня, ${time}`;
};

//order status
export const getOrderStatus = (order: IOrder) => {
  return order.status === "done"
    ? {
        text: "Выполнен",
        className: "done text text_type_main-default",
      }
    : { text: "Готовится", className: "text text_type_main-default" };
};
