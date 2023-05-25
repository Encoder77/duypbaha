form.addEventListener("submit", () => {
    const post = {
        titleru:titleru.value,
        exru:exru.value,
        descru:descru.value,
        titletm:titletm.value,
        extm:extm.value,
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

