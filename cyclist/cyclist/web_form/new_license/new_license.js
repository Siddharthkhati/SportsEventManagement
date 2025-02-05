frappe.ready(function() {
    // Add custom CSS styling
    const style = document.createElement("style");
    style.innerHTML = `
        /* General Form Styling */
        .web-form-container {
            max-width: 800px; /* Increased width */
            margin: auto;
            padding: 30px;
            background: #f9f9f9;
            border-radius: 12px;
            box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
            border: 1px solid #ddd;
        }

        /* Form Title */
        .web-form-title {
            font-size: 24px;
            font-weight: bold;
            color: #333;
            text-align: center;
            margin-bottom: 20px;
        }

        /* Form Fields */
        .frappe-control {
            margin-bottom: 18px;
        }

        .frappe-control label {
            font-weight: 600;
            color: #222;
            font-size: 15px;
            margin-bottom: 5px;
        }

        .frappe-control select, 
        .frappe-control textarea {
            width: 100%;
            border-radius: 6px;
            transition: all 0.3s ease-in-out;
        }

        .frappe-control input {
            width: 100%;
            transition: all 0.3s ease-in-out;
        }

        .frappe-control input:focus, 
        .frappe-control select:focus, 
        .frappe-control textarea:focus {
            border-color: #007bff;
            outline: none;
            box-shadow: 0px 0px 8px rgba(0, 123, 255, 0.3);
        }

        /* Submit Button */
        .btn-primary {
            width: 50%;
            background-color: #007bff;
            border: none;
            padding: 12px 15px;
            font-size: 17px;
            font-weight: 600;
            border-radius: 6px;
            transition: all 0.3s ease-in-out;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .btn-primary:hover {
            background-color: #0056b3;
            box-shadow: 0px 4px 10px rgba(0, 91, 187, 0.3);
        }

        /* Alert Message */
        .custom-alert {
            background: #ffcc00;
            color: #333;
            padding: 12px;
            border-radius: 6px;
            text-align: center;
            font-weight: bold;
            margin-bottom: 15px;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .web-form-container {
                width: 90%;
                padding: 20px;
            }
        }
    `;
    document.head.appendChild(style);

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

    frappe.web_form.validate = () => {
        let is_agreed = frappe.web_form.get_value("i_agree_to_abide_by_the_regulations");
    
        if (!is_agreed) {
            frappe.msgprint({
                title: __('⚠️ Agreement Required'),
                message: __('You must agree to abide by the regulations before submitting the form.'),
                indicator: 'red'
            });
            return false; 
        }
        return true; 
    };
    
    
});
