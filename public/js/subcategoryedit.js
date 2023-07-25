form.addEventListener("submit", () => {
    const subcategory = {
        titleru:titleru.value,
        titletm:titletm.value,
        titleen:titleen.value,
        option:option.value,
        secret:secret.value,
    }
    fetch("/api/updatesubcategory", {
        method: "POST",
        body:JSON.stringify(subcategory),
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

