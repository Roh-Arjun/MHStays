document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("registrationForm").addEventListener("submit", async (event) => {
        event.preventDefault();
        debugger;

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmpassword").value;
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const errorMessageEl = document.getElementById("errorMessage");

        // Clear previous error message
        errorMessageEl.innerText = "";

        // Frontend Validation
        if (!username || !password || !confirmPassword || !email || !phone) {
            errorMessageEl.innerText = "All fields are required.";
            return;
        }

        if (password !== confirmPassword) {
            errorMessageEl.innerText = "Passwords do not match.";
            return;
        }

        try {
            const BaseURl = await getConfig(); // assuming getConfig() is defined elsewhere
            const response = await fetch(BaseURl + "register-user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password, email, phno: phone })
            });

            const data = await response.json();

            if (response.ok) {
                errorMessageEl.style.color = "green";
                errorMessageEl.innerText = "Successfully Registered";
                document.getElementById("registrationForm").reset();
            } else {
                errorMessageEl.style.color = "red";
                errorMessageEl.innerText = data.message || "Something went wrong";
            }
        } catch (error) {
            errorMessageEl.innerText = "Register failed. Try again.";
        }
    });
});
