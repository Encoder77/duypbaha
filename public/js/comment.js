form.addEventListener("submit", () => {
    const comment = {
        email:email.value,
        firstname:firstname.value,
        lastname:lastname.value,
        content:content.value,    
        id:secret.value,   
    }
    fetch("/api/createcomment", {
        method: "POST",
        body:JSON.stringify(comment),
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
            success.innerText = data.success,
            email.value = '',
            firstname.value = '',
            lastname.value = '',
            content.value = ''
        }
    })
})