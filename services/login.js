document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("loginForm").addEventListener("submit", async (event) => {
        event.preventDefault();
        debugger;
        try {
            const Localhost = 'http://localhost:21705/api/MHStays/';
            const APIhost = 'https://rohhworks.bsite.net/api/MHStays/';
            let BaseURl = Localhost;
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
                sessionStorage.setItem("clientTrust", "yes")
                window.location.href = "dashboard.html"; // Redirect on success
            } else {
                sessionStorage.clear()
                document.getElementById("errorMessage").innerText = data.message;
            }
        } catch (error) {
            document.getElementById("errorMessage").innerText = "Login failed. Try again.";
        }
    });
});


function logout(event) {
    debugger
    event.preventDefault(); // Prevents the default anchor behavior (page reload)
    sessionStorage.clear(); // Clear all session storage
    window.location.href = "login.html"; // Redirect to login page
}
