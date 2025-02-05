frappe.ready(() => {
    console.log("Script Loaded");

    let urlParams = new URLSearchParams(window.location.search);
    let cyclist_id = urlParams.get("cyclist_id");

    if (cyclist_id) {
        console.log("Cyclist ID from URL:", cyclist_id);

        frappe.call({
            method: "cyclist.api.get_license_details",
            args: { cyclist_id: cyclist_id },
            callback: function (r) {
                if (r.message) {
                    console.log("License details fetched:", r.message);

                    frappe.web_form.doc_name = r.message.name;
                    frappe.web_form.set_values(r.message);
                } else {
                    frappe.msgprint("License not found!");
                }
            }
        });
    }

    frappe.web_form.validate = function () {
        console.log("Validate function triggered!");

        if (frappe.web_form.doc_name) {
            console.log("Existing License Record Name:", frappe.web_form.doc_name);

            let updated_fields = frappe.web_form.get_values();
            updated_fields.name = frappe.web_form.doc_name;

            // Ensure the cyclist_id is part of the updated_fields
            updated_fields.cyclist_id = new URLSearchParams(window.location.search).get("cyclist_id");

            let license_type = updated_fields.license_type;

            if(license_type && license_type != "Amateur") {
                let championship_participation = updated_fields.previous_championship_participation;

                if (!championship_participation || championship_participation.length === 0) {
                    frappe.msgprint("Must have at least one value in the previous championship participation.");
                    return false;
                }

                // Validate that all required fields in the child table are filled
                for (let row of championship_participation) {
                    if (!row.championship_name || !row.year_of_participation || !row.position_achieved) {
                        frappe.msgprint("Please fill all required fields in the Championship Participation.");
                        return false;
                    }
                }
            }

            frappe.call({
                method: "cyclist.api.update_license",
                args: {
                    cyclist_id: updated_fields.cyclist_id,
                    updated_fields: JSON.stringify(updated_fields)
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

            return false;
        } else {
            console.log("No existing license record found!");
            frappe.msgprint("No existing license record found!");
            return false;
        }
    };

    frappe.web_form.on("submit", function() {

        let updated_fields = frappe.web_form.get_values();

        console.log("Manual form submission triggered!");
        return false;
    });
});