frappe.ready(function() {
    // Adding background color dynamically
    let style = document.createElement("style");
    style.innerHTML = `
        .web-form-container {
            background-color: #E2E0C8; /* Change this to the color you prefer */
            border-radius: 20px;
            padding: 40px;
            max-width: 1200px;
            margin: 40px auto;
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
        }
    `;
    document.head.appendChild(style);
});
