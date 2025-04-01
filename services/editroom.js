// document.addEventListener("DOMContentLoaded", async function () {
//     const tbody = document.querySelector("table tbody");
//     const loader = document.createElement("tr");
//     loader.innerHTML = `
//         <td colspan="9" style="text-align: center;">Loading...</td>
//     `;
//     tbody.appendChild(loader);
//     const BaseURl = await getConfig();
//     fetch(BaseURl + "get-Rooms-Details", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         }
//     })
//     .then(response => response.json())
//     .then(data => {
//         tbody.innerHTML = ""; // Clear existing rows including loader
        
//         data.forEach((item, index) => {
//             const row = document.createElement("tr");
//             row.innerHTML = `
//                 <td hidden>
//                     <span class="custom-checkbox" >
//                         <input type="checkbox" id="checkbox${index + 1}" name="options[]" value="1">
//                         <label for="checkbox${index + 1}"></label>
//                     </span>
//                 </td>
//                 <td>${item.type}</td>
//                 <td>${item.typeSub}</td>
//                 <td>${item.display}</td>
//                 <td>${item.price}</td>
//                 <td>${item.fireCamp}</td>
//                 <td>${item.music}</td>
//                 <td>${item.games}</td>
//                 <td>${item.hotWater}</td>
//                 <td>${item.modifiedUser}</td>
//                 <td>${item.modifiedDate}</td>
//                 <td>
//                  <a href="#editEmployeeModal" class="edit" data-toggle="modal"
//                     data-id="${item.id}" 
//                     data-type="${item.type}" 
//                     data-typesub="${item.typeSub}"
//                     data-img1="${item.img1}"
//                     data-img2="${item.img2}"
//                     data-img3="${item.img3}"
//                     data-display="${item.display}"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>               
//                 </td>
//             `;
//             tbody.appendChild(row);
//         });

//     // Add event listeners to edit buttons
//     document.querySelectorAll(".edit").forEach(button => {
//         button.addEventListener("click", function () {
//             // Get data attributes
//             const id = this.getAttribute("data-id");
//             const type = this.getAttribute("data-type");
//             const typeSub = this.getAttribute("data-typesub");
//             const display= this.getAttribute("data-display")
//             const img1 = this.getAttribute("data-img1");
//             const img2 = this.getAttribute("data-img2");
//             const img3 = this.getAttribute("data-img3");

//             // Populate form fields
//             document.getElementById("roomid").value = id;
//             document.getElementById("room_type").value = type;
//             document.getElementById("room_subtype").value = typeSub;
//             document.getElementById("display").value=display
//             document.getElementById("img1").value=img1;
//             document.getElementById("img2").value=img2;
//             document.getElementById("img3").value=img3;
//         });
//     });
// })
//     .catch(error => {
//         tbody.innerHTML = `<tr><td colspan="9" style="text-align: center; color: red;">Error fetching data</td></tr>`;
//         console.error("Error fetching data:", error);
//     });
// });

// Function to fetch room details and update the table
async function fetchRoomDetails() {
    const tbody = document.querySelector("table tbody");
    tbody.innerHTML = `<tr><td colspan="9" style="text-align: center;">Loading...</td></tr>`;

    try {
        const config = await getConfig();
        if (!config) throw new Error("Configuration not loaded");

        const BaseURL = await getConfig();

        const response = await fetch(BaseURL + "get-Rooms-Details", {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        });

        const data = await response.json();
        tbody.innerHTML = ""; // Clear existing rows

        data.forEach((item, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td hidden>
                    <span class="custom-checkbox">
                        <input type="checkbox" id="checkbox${index + 1}" name="options[]" value="1">
                        <label for="checkbox${index + 1}"></label>
                    </span>
                </td>
                <td>${item.type}</td>
                <td>${item.typeSub}</td>
                <td>${item.display}</td>
                <td>${item.price}</td>
                <td>${item.fireCamp}</td>
                <td>${item.music}</td>
                <td>${item.games}</td>
                <td>${item.hotWater}</td>
                <td>${item.modifiedUser}</td>
                <td>${item.modifiedDate}</td>
                <td>
                 <a href="#editEmployeeModal" class="edit" data-toggle="modal"
                    data-id="${item.id}" 
                    data-type="${item.type}" 
                    data-typesub="${item.typeSub}"
                    data-img1="${item.img1}"
                    data-img2="${item.img2}"
                    data-img3="${item.img3}"
                    data-display="${item.display}"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>               
                </td>
            `;
            tbody.appendChild(row);
        });

        attachEditEventListeners(); // Attach event listeners to edit buttons

    } catch (error) {
        tbody.innerHTML = `<tr><td colspan="9" style="text-align: center; color: red;">Error fetching data</td></tr>`;
        console.error("Error fetching data:", error);
    }
}

// Function to attach event listeners to edit buttons
function attachEditEventListeners() {
    document.querySelectorAll(".edit").forEach(button => {
        button.addEventListener("click", function () {
            const id = this.getAttribute("data-id");
            const type = this.getAttribute("data-type");
            const typeSub = this.getAttribute("data-typesub");
            const display = this.getAttribute("data-display");
            const img1 = this.getAttribute("data-img1");
            const img2 = this.getAttribute("data-img2");
            const img3 = this.getAttribute("data-img3");

            document.getElementById("roomid").value = id;
            document.getElementById("room_type").value = type;
            document.getElementById("room_subtype").value = typeSub;
            document.getElementById("display").value = display;
            document.getElementById("img1").value = img1;
            document.getElementById("img2").value = img2;
            document.getElementById("img3").value = img3;
        });
    });
}


document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const fields = ["price", "food", "fire", "music", "game"];

    function validateField(input) {
        if (!input.value || input.value.trim() === "") {
            input.style.border = "2px solid red";
            return false;
        } else {
            input.style.border = "";
            return true;
        }
    }

    function validateSelect(select) {
        if (select.value === "") {
            select.style.border = "2px solid red";
            return false;
        } else {
            select.style.border = "";
            return true;
        }
    }

    // Add event listeners to remove validation when user corrects input
    fields.forEach(function (id) {
        let input = document.getElementById(id);
        input.addEventListener("input", function () {
            validateField(input);
        });
    });

    document.querySelectorAll("select").forEach(function (select) {
        select.addEventListener("change", function () {
            validateSelect(select);
        });
    });

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission

        let isValid = true;

        // Validate text inputs
        fields.forEach(function (id) {
            let input = document.getElementById(id);
            if (!validateField(input)) {
                isValid = false;
            }
        });

        // Validate select fields
        document.querySelectorAll("select").forEach(function (select) {
            if (!validateSelect(select)) {
                isValid = false;
            }
        });

        if (isValid) {
            const alertval=confirm("Are u sure you want submit the changes");
            if(alertval)
            {
                const roomId = document.getElementById("roomid").value;
                const roomType = document.getElementById("room_type").value;
                const roomTypeSub = document.getElementById("room_subtype").value;
                const price = document.getElementById("price").value;
                const display = document.getElementById("display").value;
                const img1 = document.getElementById("img1").value;
                const img2 = document.getElementById("img2").value;
                const img3 = document.getElementById("img3").value;
                const food = document.getElementById("food").value;
                const fireCamp = document.getElementById("fire").value;
                const music = document.getElementById("music").value;
                const games = document.getElementById("game").value;
                const hotWater = document.getElementById("water").value;
                const user = JSON.parse(sessionStorage.getItem("user"));
                const username=user.username
               

                // const Localhost = 'http://localhost:21705/api/MHStays/';
                // const APIhost = 'https://rohhworks.bsite.net/api/MHStays/';
                // let BaseURl = Localhost;
                const BaseURl = await getConfig();
                try{
                    const response = await fetch(BaseURl + "update-or-add-room", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ roomId, roomType, roomTypeSub, img1, img2, img3, price, display, food, fireCamp, music, games, hotWater, username})
                    });
                    const data = await response.json();
                    if (response.ok) {
                        document.getElementById("alertmsg").innerHTML="Successful submission"
                        fetchRoomDetails(); // **Refresh table after update**
                    }else{
                        document.getElementById("alertmsg").innerHTML="Try Again"
                    }

                }catch{
                    document.getElementById("alertmsg").innerHTML="Sometging went wrong. Try Again"
                }
            
            // sessionStorage
            // .setItem("Doc", JSON.stringify({ roomId, roomType, roomTypeSub, img1, img2, img3, price, display, food, fireCamp, music, games, hotWater,username}));
            // console.log("Successful submission");
            
        }

            // Reset form fields after submission
            form.reset();

            // Optionally, reset validation styles
            document.querySelectorAll("input, select").forEach(function (element) {
                element.style.border = "";
            });

            // Hide the modal
            $("#editEmployeeModal").modal("hide");
            document.getElementById("alertshowmsg").setAttribute("style", "display: block !important;");
        }
    });

    // Reset form when modal is closed
    $('#editEmployeeModal').on('hidden.bs.modal', function () {
        form.reset();
        document.querySelectorAll("input, select").forEach(function (element) {
            element.style.border = "";
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("alertshowmsg").setAttribute("style", "display: none !important;");
    const toggleButton = document.getElementById("closebtn");
    toggleButton.addEventListener("click", function () {
        document.getElementById("alertshowmsg").setAttribute("style", "display: none !important;");
    });
});

// Run fetchRoomDetails on page load
document.addEventListener("DOMContentLoaded", fetchRoomDetails);