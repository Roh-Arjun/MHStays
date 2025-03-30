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
					<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
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
