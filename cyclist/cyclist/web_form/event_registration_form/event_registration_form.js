frappe.ready(function() {
    let urlParams = new URLSearchParams(window.location.search);
    // let cyclist_id = urlParams.get("cyclist_id"); // Get cyclist_id from URL
    let event_name = urlParams.get("event_name"); // Get cyclist_id from URL


    if (event_name) {
        frappe.call({
            method: "cyclist.api.get_event_details",
            args: { event_name: event_name },
            callback: function(response) {
                if (response.message) {
                    let data = response.message;
	

                    // Auto-fill License Web Form fields
                    frappe.web_form.set_value("event", event_name);
                    // code for setting championship name from the event doctype
                    frappe.web_form.set_value("championship",data.championship);
                    frappe.web_form.set_value("champ",data.championship);
                    frappe.web_form.set_value("gender", data.category);
                    frappe.web_form.set_value("age_group", data.age_group);
                    frappe.web_form.set_value("location", data.location);
                    frappe.web_form.set_value("date", data.date);

                }
            }
        });

        frappe.call({
            method: "cyclist.api.get_email",
            callback: function(response) {
                if (response.message) {
                    let data = response.message;
                    
                    // Auto-fill License Web Form fields
                    frappe.web_form.set_value("email", data);
                }
            }
        });

        // name_of_championship = frappe.web_form.get_value("championship");
        // frappe.call({
        //     method: "cyclist.api.get_championship_details",
        //     args: { name_of_championship: name_of_championship },
        //     callback: function(response) {
        //         if (response.message) {
        //             let data = response.message;
                    
        //             // Auto-fill License Web Form fields
        //             frappe.web_form.set_value("location", data.location);
        //             frappe.web_form.set_value("date", data.date);
        //         }
        //     }
        // });

        frappe.call({
            method: "cyclist.api.get_full_name",
            callback: function(response) {
                if (response.message) {
                    let data = response.message;
                    
                    // Auto-fill License Web Form fields
                    frappe.web_form.set_value("full_name", data);
                }
            }
        });
    }

    frappe.web_form.validate = () => {
        let is_agreed = frappe.web_form.get_value("i_confirm_the_above_event_registration_details");
    
        if (!is_agreed || is_agreed == "0") {
            return false; 
        }
        return true; 
    };
   
    frappe.web_form.on("after_save", function () {  // Ensure this runs after the form is saved
        let event_name = frappe.web_form.get_value("event_name");  // Ensure "event_name" exists
    
        if (!event_name) {
            frappe.msgprint({
                title: "Error",
                message: "Event name is missing or incorrect. Cannot update slot count.",
                indicator: "red"
            });
            return;
        }
    
        frappe.call({
            method: "cyclist.api.update_event_count",
            args: { event_name: event_name },
            callback: function(response) {
                if (response.message && response.message.status === "success") {
                    frappe.msgprint({
                        title: "Success",
                        message: "Event slot count updated successfully!",
                        indicator: "green"
                    });
                } else {
                    frappe.msgprint({
                        title: "Update Failed",
                        message: response.message ? response.message.message : "Failed to update event slot count.",
                        indicator: "red"
                    });
                }
            }
        });
    });
   

});