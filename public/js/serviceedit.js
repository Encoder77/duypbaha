form.addEventListener("submit", () => {
    const service = {
        titleru:titleru.value,
        exru:exru.value,
        descru:descru.value,
        titletm:titletm.value,
        extm:extm.value,
        desctm:desctm.value,
        secret:secret.value,
    }
    fetch("/api/updateservice", {
        method: "POST",
        body:JSON.stringify(service),
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

