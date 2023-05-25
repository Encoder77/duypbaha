form.addEventListener("click", () => {
    const deletebanner = {
        id:secret.value,
    }
    console.log(secret.value)
    fetch("/api/deletebanner", {
        method: "POST",
        body:JSON.stringify(deletebanner),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
    .then(data => {
        if(data.status == "error"){
            alert(data.error)
        }
        else{
            window.location.replace("/banners");
        }
    })
})

