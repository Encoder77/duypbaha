form.addEventListener("click", () => {
    const deletesubcategory = {
        id:secret.value,
    }
    fetch("/api/deletesubcategory", {
        method: "POST",
        body:JSON.stringify(deletesubcategory),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
    .then(data => {
        if(data.status == "error"){
            alert(data.error)
        }
        else{
            window.location.replace("/subcategories");
        }
    })
})

