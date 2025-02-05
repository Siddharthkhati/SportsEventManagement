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


});