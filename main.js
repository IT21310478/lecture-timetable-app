var username, group;

const date = findDate();
const loginScreen = document.getElementById("login-section");

// onclick Dummy button
document.getElementById("dummy-button").addEventListener("click", function () {
  document.getElementById("login-section").style.display = "block";
});

//Check for cookies
let cookies = checkCookies();
if (cookies == false) {
  //load login prompt and get username + group
  loadLoginScreen(function () {
    document.getElementById("nickname").focus(); //set focus to field
    document // OK button code
      .getElementById("login-submit-btn")
      .addEventListener("click", function () {
        getUserInfo(function () {
          setCookie("username", username, 120);
          setCookie("group", group, 120);
          console.log("cookies set successfully");
          displayUserDetails(); //displays username and group
        });
        loginScreen.style.display = "none";
      });
  });
} else {
  //read from cookies
  username = getCookie("username");
  group = getCookie("group");
  displayUserDetails(function () {
    console.log("display successful");
  });
}

// display date month day
document.getElementById("date").innerHTML =
  "It's " + date[0] + ", " + date[1] + " " + date[2];

document.getElementById("time_now").innerHTML = date[3];
document.getElementById("am_pm").innerHTML = date[4];

/* FUNCTIONS */

//Check cookies
function checkCookies() {
  if (document.cookie == "") {
    return false;
  } else {
    return true;
  }
}

//Get Username and Group
function loadLoginScreen(callback) {
  loginScreen.style.display = "block";
  document.getElementById("nickname").focus();
  callback();
}

// set username and group on display
function displayUserDetails() {
  username = getCookie("username");
  group = getCookie("group");
  console.log(username + " " + group);
  document.getElementById("username").innerHTML = username;
  document.getElementById("group").innerHTML = group;
}

// Get username and group from login screen
function getUserInfo(callback) {
  username = document.getElementById("nickname").value;
  group = document.getElementById("group-dropdown").value;
  console.log("User details read success");
  callback();
}

// Set a Cookie
function setCookie(cName, cValue, expDays) {
  let date = new Date();
  date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
}

//Get a cookie
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// Clear cookies
function clearCookies() {
  document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  document.cookie = "group=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  location.reload();
}

// Get date, month, day to an array
function findDate() {
  const dateArray = [];
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const d = new Date();

  dateArray[0] = weekday[d.getDay()];
  dateArray[1] = month[d.getMonth()];
  dateArray[2] = d.getDate();
  let minutes = d.getMinutes().toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  let hours = d.getHours().toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  dateArray[3] = hours + ":" + minutes;

  if (d.getHours() >= 12) {
    dateArray[4] = "PM";
  } else {
    dateArray[4] = "AM";
  }
  if (d.getHours() == 0) {
    dateArray[3] = hours + 12 + ":" + minutes;
    dateArray[4] = "AM";
  }

  return dateArray;
}
