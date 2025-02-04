// Copyright (c) 2025, Siddharth and contributors
// For license information, please see license.txt

frappe.query_reports["Registration Report"] = {
	"filters": [
        {
            "fieldname": "name1",
            "label": "First Name",
            "fieldtype": "Data",
        },
        {
            "fieldname": "last_name",
            "label": "Last Name",
            "fieldtype": "Data",
        },
        {
            "fieldname": "dob",
            "label": "Date of Birth",
            "fieldtype": "Date",
        },
        {
            "fieldname": "gender",
            "label": "Gender",
            "fieldtype": "Autocomplete",
            "options": ["Male", "Female", "Others"],
        },
        {
            "fieldname": "quota",
            "label": "Quota",
            "fieldtype": "Autocomplete",
            "options": ["Home State","Other State"],
        }
    ],
	onload: function(report) {
        // Add a button to clear filters
        report.page.add_inner_button(__('Clear All Filters'), function() {
            // Reset all filters
            frappe.query_report.set_filter_value({
                "name1": "",
                "last_name": "",
                "dob": "",
                "gender": "",
                "quota": ""
            });
        });
    }
};