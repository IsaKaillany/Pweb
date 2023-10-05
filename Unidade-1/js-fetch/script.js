import { createTable } from "./createTable.js";

const containerTable = document.getElementById("containerTable");
const button = document.getElementById("buttonLoad");

async function loadAddresses() {
    try {
        const resp = await fetch("https://random-data-api.com/api/v2/addresses?size=3");
        const addresses = await resp.json();
        const columns = ["city", "street_name", "street_address", "community", "building_number"];
        const table = createTable(addresses, columns);

        containerTable.innerHTML = '';
        containerTable.appendChild(table);
    } catch (error) {
        containerTable.innerHTML = "<h1>Ocorreu um erro!</h1>";
    }
}

button.addEventListener("click", () => loadAddresses());    