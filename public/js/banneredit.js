form.addEventListener("submit", () => {
    const banner = {
        titleru:titleru.value,
        exru:exru.value,
        titleen:titleen.value,
        exen:exen.value,
        titletm:titletm.value,
        extm:extm.value,
        secret:secret.value,
    }
    fetch("/api/updatebanner", {
        method: "POST",
        body:JSON.stringify(banner),
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

