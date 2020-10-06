import React from 'react';

function startChat() {

}

function sendMessage() {

}

function getMessages() {

}

function getUser() {

}

function formatTime(time) {
  if(!time) return '';

  const timestamp = time.toDate();

  const rawHours = timestamp && timestamp.getHours();
  const rawMinutes = timestamp && timestamp.getMinutes();

  const meridian = rawHours > 12 ? 'pm' : 'am';
  const hours = rawHours % 12;
  const minutes = (rawMinutes > 9 || '0') + rawMinutes;

  return `${hours}:${minutes}${meridian}`;
}

function formatDate(date) {
  if(!date) return '';

  const timestamp = date.toDate();

  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const SUFFIX = ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'st'];

  const day = timestamp.getDate();
  const month = timestamp.getMonth();
  const year = 1900 + timestamp.getYear();

  return `${MONTHS[month]} ${day}${SUFFIX[day]}, ${year}`;
}

function formatText(text) {
  const bold = text.match(/\*[^ ](.*?)[^ ]\*|\*[^ ]\*/g);

  if(bold) {
    for(const s of bold) {
      const core = s.slice(1,-1);
      text = text.replace(s, `<b>${core}</b>`);
    }
  }

  const ital = text.match(/\_[^ ](.*?)[^ ]\_|\_[^ ]\_/g);

  if(ital) {
    for(const s of ital) {
      const core = s.slice(1,-1);
      text = text.replace(s, `<i>${core}</i>`);
    }
  }

  return text;
}



export { formatTime, formatDate, formatText }
