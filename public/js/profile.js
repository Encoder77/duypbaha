form.addEventListener("submit", () => {
    const profile = {
        mail:mail.value,
        pass:pass.value,
        secret:secret.value,
    }
    fetch("/api/profile", {
        method: "POST",
        body:JSON.stringify(profile),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
    .then(data => {
        if(data.status == "error"){
            success.style.display = "none"
            error.style.display = "block"
            error.innerText = data.error
        }
        else{
            error.style.display = "none"
            success.style.display = "block"
            success.innerText = data.success
        }
    })
})

