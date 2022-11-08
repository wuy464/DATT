// validate email
function validateEmail(email) {
  const res =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return res.test(String(email).toLowerCase());
}

//validate password
function validatePassword(password) {
  const res = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  return res.test(String(password));
}

function validate() {
  let emailnoti = $("#u-emailnoti");
  let passnoti = $("#u-passnoti");
  let email = $("#email").val();
  let password = $("#password").val();
  emailnoti.text("");
  passnoti.text("");
  if (validateEmail(email)) {
    emailnoti.text(email + " is valid");
    emailnoti.css("color", "blue");
  } else {
    emailnoti.text(email + " is not valid");
    emailnoti.css("color", "red");
  }

  if (validatePassword(password)) {
    passnoti.text(email + " is valid");
    passnoti.css("color", "blue");
  } else {
    passnoti.text(email + " is not valid");
    passnoti.css("color", "red");
  }
  return false;
}
$("#validate").on("click", validate);
