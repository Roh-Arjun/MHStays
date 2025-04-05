document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("forgotpasswordForm").addEventListener("submit", async (event) => {
        event.preventDefault();
        debugger;

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const errorMessageEl = document.getElementById("errorMessage");

        // Clear previous error message
        errorMessageEl.innerText = "";

        // Frontend Validation
        if (!username || !password || !confirmPassword) {
            errorMessageEl.innerText = "All fields are required.";
            return;
        }

        if (password !== confirmPassword) {
            errorMessageEl.innerText = "Passwords do not match.";
            return;
        }

        try {
            const BaseURl = await getConfig(); // assuming getConfig() is defined elsewhere
            const response = await fetch(BaseURl + "forgotPassword", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password})
            });

            const data = await response.json();

            if (response.ok) {
                errorMessageEl.style.color = "green";
                errorMessageEl.innerText = "Successfully Password Reset";
                document.getElementById("forgotpasswordForm").reset();
            } else {
                errorMessageEl.style.color = "red";
                errorMessageEl.innerText = data.message || "Something went wrong";
            }
        } catch (error) {
            errorMessageEl.innerText = "Failed to Reset. Try again.";
        }
    });
});
