// Copyright (c) 2025, Siddharth and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Registration", {
// 	refresh(frm) {

// 	},
// });

frappe.ui.form.on('Registration', {
    dob: function(frm) {
        if (frm.doc.dob) {
            let dob = new Date(frm.doc.dob);
            let today = new Date();
            let age = today.getFullYear() - dob.getFullYear();
            let monthDiff = today.getMonth() - dob.getMonth();
            let dayDiff = today.getDate() - dob.getDate();

            // Adjust age if birthday hasn't occurred yet this year
            if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
                age--;
            }

            frm.set_value('age', age);
        }
    },

    name1: function(frm) {
        update_full_name(frm);
    },
    last_name: function(frm) {
        update_full_name(frm);
    },
    middle_name: function(frm){
        update_full_name(frm);
    }
});
// Function to generate full name
function update_full_name(frm) {
    let first_name = frm.doc.name1|| "";
    let middle_name = frm.doc.middle_name || "";
    let last_name = frm.doc.last_name || "";
    let full_name = (first_name + " " + middle_name + " " + last_name).trim();  // Remove extra spaces
    frm.set_value('full_name', full_name);
}


// // registration.js

// function saveChanges() {
//     let docname = "{{ doc.name }}"; // Get record ID
//     let firstName = document.getElementById("first_name").value;
//     let middleName = document.getElementById("middle_name").value;
//     let lastName = document.getElementById("last_name").value;
//     let gender = document.getElementById("gender").value;

//     frappe.call({
//         method: "cyclist.doctype.registration.registration.update_registration",
//         args: {
//             docname: docname,
//             first_name: firstName,
//             middle_name: middleName,
//             last_name: lastName,
//             gender: gender
//         },
//         callback: function(response) {
//             if (response.message.status === "success") {
//                 alert("Record updated successfully!");
//                 location.reload(); // Refresh to show updated values
//             } else {
//                 alert("Failed to update: " + response.message.message);
//             }
//         }
//     });
// }