document.addEventListener("DOMContentLoaded", function () {
    const tbody = document.querySelector("table tbody");
    const loader = document.createElement("tr");
    loader.innerHTML = `
        <td colspan="9" style="text-align: center;">Loading...</td>
    `;
    tbody.appendChild(loader);

    fetch("http://localhost:21705/api/MHStays/get-Rooms-Details", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        tbody.innerHTML = ""; // Clear existing rows including loader
        
        data.forEach((item, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>
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
                <a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                </td>
            `;
            tbody.appendChild(row);
        });
    })
    .catch(error => {
        tbody.innerHTML = `<tr><td colspan="9" style="text-align: center; color: red;">Error fetching data</td></tr>`;
        console.error("Error fetching data:", error);
    });
});

document.getElementById("room_type").addEventListener("change", function () {
        const roomType = this.value;
        const subtypeDropdown = document.getElementById("room_subtype");
  
        // Room subtype options based on room type
        const roomSubtypes = {
            couple: [
                { value: "couplewithfood", text: "Couple with Food" },
                { value: "couplewithoutfood", text: "Couple without Food" }
            ],
            family: [
                { value: "familywithfood", text: "Family with Food" },
                { value: "familywithoutfood", text: "Family without Food" }
            ],
            group: [
                { value: "groupwithfood", text: "Group with Food" },
                { value: "groupwithoutfood", text: "Group without Food" }
            ],
            single: [
                { value: "singlewithfood", text: "Single with Food" },
                { value: "singlewithoutfood", text: "Single without Food" }
            ]
        };
  
        // Clear previous options
        subtypeDropdown.innerHTML = '<option value="" selected disabled>Select</option>';
  
        // Add new options
        if (roomSubtypes[roomType]) {
            roomSubtypes[roomType].forEach(subtype => {
                let option = document.createElement("option");
                option.value = subtype.value;
                option.textContent = subtype.text;
                subtypeDropdown.appendChild(option);
            });
        }
});
