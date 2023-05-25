formapprove.addEventListener("submit", () => {
    const comment = {
        secretapp:secretapp.value,
    }
    fetch("/api/approvecomment", {
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
            success.innerText = data.success
        }
    })
})

formreject.addEventListener("submit", () => {
    const comment = {
        secretrej:secretrej.value,
    }
    fetch("/api/rejectcomment", {
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
            success.innerText = data.success
        }
    })
})
