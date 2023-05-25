form.addEventListener("click", () => {
    const deletecategory = {
        id:secret.value,
    }
    fetch("/api/deletecategory", {
        method: "POST",
        body:JSON.stringify(deletecategory),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
    .then(data => {
        if(data.status == "error"){
            alert(data.error)
        }
        else{
            window.location.replace("/categories");
        }
    })
})

