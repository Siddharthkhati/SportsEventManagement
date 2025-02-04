frappe.ready(() => {
    console.log("Script Loaded");

    let urlParams = new URLSearchParams(window.location.search);
    let cyclist_id = urlParams.get("cyclist_id");

    if (cyclist_id) {
        console.log("Cyclist ID from URL:", cyclist_id);

        // Fetch the license details based on cyclist_id
        frappe.call({
            method: "cyclist.api.get_license_details",
            args: { cyclist_id: cyclist_id },
            callback: function (r) {
                if (r.message) {
                    console.log("License details fetched:", r.message);

                    // Set the values in the form
                    frappe.web_form.doc_name = r.message.name;  // Set the doc_name from fetched record
                    frappe.web_form.set_values(r.message);  // Set all the fetched values into the form
                } else {
                    frappe.msgprint("License not found!");
                }
            }
        });
    }

    // Override the validate function to ensure only update is triggered, not form creation
    frappe.web_form.validate = function () {
        console.log("Validate function triggered!");

        if (frappe.web_form.doc_name) {
            console.log("Existing License Record Name:", frappe.web_form.doc_name);

            // Prepare the updated fields from the form
            let updated_fields = frappe.web_form.get_values();
            updated_fields.name = frappe.web_form.doc_name;  // Ensure the document name is included

            // Ensure the cyclist_id is part of the updated_fields
            updated_fields.cyclist_id = urlParams.get("cyclist_id");

            // Call the update_license function with cyclist_id and updated_fields
            frappe.call({
                method: "cyclist.api.update_license",  // Calling the update_license method
                args: {
                    cyclist_id: updated_fields.cyclist_id,  // Pass cyclist_id explicitly
                    updated_fields: JSON.stringify(updated_fields)  // Pass the updated fields as a JSON string
                },
                callback: function (r) {
                    if (r.message && r.message.status === "success") {
                        frappe.msgprint("License details updated successfully!");
                    } else {
                        frappe.msgprint("Error updating license details!");
                    }
                },
                error: function (error) {
                    console.error("Error saving document:", error);
                }
            });

            // Prevent form submission that could trigger new record creation
            return false;  // Return false to stop form submission
        } else {
            console.log("No existing license record found!");
            frappe.msgprint("No existing license record found!");
            return false;  // Prevent form submission if no existing license record is found
        }
    };

    // Ensure we stop the form from submitting by handling submit event manually
    frappe.web_form.on("submit", function() {
        console.log("Manual form submission triggered!");
        return false;  // Prevent the default submission, which could create a new record
    });
});