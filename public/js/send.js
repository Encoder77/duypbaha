form.addEventListener("submit", () => {
    const contact = {
        firstname:firstname.value,
        lastname:lastname.value,
        email:email.value,
        phone:phone.value,
        content:content.value,
        
    }
    fetch("/api/send", {
        method: "POST",
        body:JSON.stringify(contact),
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