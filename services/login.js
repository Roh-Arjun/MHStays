document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("loginForm").addEventListener("submit", async (event) => {
        event.preventDefault();
        try {
            const BaseURl = await getConfig();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            const response = await fetch(BaseURl + "login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            console.log(data)
            if (response.ok) {
                sessionStorage.setItem("clientTrust", data.message)
                sessionStorage.setItem("user",JSON.stringify(data.userRes))
                window.location.href = "dashboard.html"; // Redirect on success
            } else {
                sessionStorage.clear()
                if(data.message==="Invalid")
                    document.getElementById("errorMessage").innerText = "Invalid Username or Password";
                else if(data.message==="NoUser")
                    document.getElementById("errorMessage").innerText = "User Not Found / Unauthorized Access";
            }
        } catch (error) {
            document.getElementById("errorMessage").innerText = "Login failed. Try again.";
        }
    });
});


function logout(event) {
    event.preventDefault(); // Prevents the default anchor behavior (page reload)
    sessionStorage.clear(); // Clear all session storage
    window.location.href = "login.html"; // Redirect to login page
}
