frappe.ready(function() {
    let urlParams = new URLSearchParams(window.location.search);
    let cyclist_id = urlParams.get("cyclist_id"); // Get cyclist_id from URL

    if (cyclist_id) {
        frappe.call({
            method: "cyclist.api.get_cyclist_details",
            args: { cyclist_id: cyclist_id },
            callback: function(response) {
                if (response.message) {
                    let data = response.message;

                    // Auto-fill License Web Form fields
                    frappe.web_form.set_value("cyclist_id", cyclist_id);
                    frappe.web_form.set_value("full_name", data.full_name);
                    frappe.web_form.set_value("first_name", data.first_name);
                    frappe.web_form.set_value("age", data.age);
                    frappe.web_form.set_value("aadhaar_number", data.aadhaar_number);
                    frappe.web_form.set_value("email", data.email);
                    frappe.web_form.set_value("passport_size_photograph", data.passport_size_photograph);
                    frappe.web_form.set_value("birth_certificate", data.birth_certificate);
                    frappe.web_form.set_value("aadhaar_card", data.aadhaar_card);
                    frappe.web_form.set_value("medical_fitness_certificate", data.medical_fitness_certificate);
                }
            }
        });
    }

    // Auto-fill application date
    frappe.web_form.set_value("application_date", frappe.datetime.get_today());
    
    // Dynamic validation for previous championship participation
    frappe.web_form.on("license_type", (field, value) => {
        if (value === "Amateur") {
            // If license type is 'Amateur', previous championship participation is not mandatory
            frappe.web_form.set_df_property("previous_championship_participation", "reqd", false);
            
        } else {
            // For any other license type, previous championship participation must have at least one row
            frappe.web_form.set_df_property("previous_championship_participation", "reqd", true);
            frappe.show_alert({
                message: __('⚠️ Previous championship participation is required for this license type.'),
                indicator: 'orange'
            }, 5);
        }
    });
});