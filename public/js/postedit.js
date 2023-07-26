form.addEventListener("submit", () => {
    const post = {
        titleru:titleru.value,
        descru:descru.value,
        titleen:titleen.value,
        descen:descen.value,
        titletm:titletm.value,
        desctm:desctm.value,
        category:category.value,
        secret:secret.value,
    }
    fetch("/api/updatepost", {
        method: "POST",
        body:JSON.stringify(post),
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

