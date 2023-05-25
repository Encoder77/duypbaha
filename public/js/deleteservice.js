form.addEventListener("click", () => {
    const deleteservice = {
        id:secret.value,
    }
    console.log(secret.value)
    fetch("/api/deleteservice", {
        method: "POST",
        body:JSON.stringify(deleteservice),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
    .then(data => {
        if(data.status == "error"){
            alert(data.error)
        }
        else{
            window.location.replace("/service");
        }
    })
})

