function validateForm() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username === "" || password === "") {
        alert("Both username and password are required.");
        return false;
    }

  
    redirectToIndexPage();

    return true;
}


function redirectToIndexPage() {
    window.location.href = "index.html";
}
