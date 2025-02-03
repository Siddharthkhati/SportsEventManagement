frappe.ready(function () {
	// Get the license_id from URL
	let urlParams = new URLSearchParams(window.location.search);
	let license_id = urlParams.get("license_id");

	// Ensure the form values are collected and the license_id is added
	let formData = frappe.web_form.get_values();
	formData.license_id = license_id;  // Add license_id to the form data

	// Add an event listener for the save button
	frappe.web_form.on_submit = function () {
		// Make sure required fields are filled (if needed)
		if (!formData.medical_fitness_certificate || !formData.doping_test_clearance) {
			frappe.msgprint("Please fill in the mandatory fields.");
			return false; // Prevent form submission
		}

		// Now call the update_license_details method via frappe.call
		frappe.call({
			method: "cyclist.cyclist.api.update_license_details",
			args: { data: JSON.stringify(formData) },  // Send all form data as JSON
			callback: function (response) {
				if (response.message.status === "success") {
					// Show success message after updating license details
					frappe.msgprint(response.message.message);
					// Optionally, redirect or refresh the page
					window.location.reload();
				} else {
					// Show error message if something goes wrong
					frappe.msgprint(response.message.message);
				}
			}
		});
	};
})