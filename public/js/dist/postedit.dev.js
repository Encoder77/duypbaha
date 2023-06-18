"use strict";

form.addEventListener("submit", function () {
  var post = {
    titleru: titleru.value,
    exru: extm.value,
    descru: descru.value,
    titleen: titleen.value,
    exen: extm.value,
    descen: descen.value,
    titletm: titletm.value,
    extm: extm.value,
    desctm: desctm.value,
    category: category.value,
    secret: secret.value
  };
  fetch("/api/updatepost", {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.status == "error") {
      success.style.display = "none";
      error.style.display = "block";
      error.innerText = data.error;
    } else {
      error.style.display = "none";
      success.style.display = "block";
      success.innerText = data.success;
    }
  });
});