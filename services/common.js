    document.addEventListener("DOMContentLoaded", function () {
        // Check if sessionStorage has clientTrust set to "yes"
        if (sessionStorage.getItem("clientTrust") !== "Valid") {
            // Redirect to login page if not trusted
            window.location.href = "login.html";
        }else{
          const user = JSON.parse(sessionStorage.getItem("user"));
          document.getElementById("username").innerText =user.username
        }
    });

