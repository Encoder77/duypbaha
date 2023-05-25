form.addEventListener("click", () => {
    const deletepost = {
        id:secret.value,
    }
    console.log(secret.value)
    fetch("/api/deletepost", {
        method: "POST",
        body:JSON.stringify(deletepost),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
    .then(data => {
        if(data.status == "error"){
            alert(data.error)
        }
        else{
            window.location.replace("/posts");
        }
    })
})

