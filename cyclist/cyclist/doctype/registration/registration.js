// Copyright (c) 2025, Siddharth and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Registration", {
// 	refresh(frm) {

// 	},
// });

// frappe.ui.form.on('Registration', {
//     dob: function(frm) {
//         if (frm.doc.dob) {
//             let dob = new Date(frm.doc.dob);
//             let today = new Date();
//             let age = today.getFullYear() - dob.getFullYear();
//             let monthDiff = today.getMonth() - dob.getMonth();
//             let dayDiff = today.getDate() - dob.getDate();

//             // Adjust age if birthday hasn't occurred yet this year
//             if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
//                 age--;
//             }

//             frm.set_value('age', age);
//         }
//     },

//     name1: function(frm) {
//         update_full_name(frm);
//     },
//     last_name: function(frm) {
//         update_full_name(frm);
//     },
//     middle_name: function(frm){
//         update_full_name(frm);
//     }
// });
// // Function to generate full name
// function update_full_name(frm) {
//     let first_name = frm.doc.name1|| "";
//     let middle_name = frm.doc.middle_name || "";
//     let last_name = frm.doc.last_name || "";
//     let full_name = (first_name + " " + middle_name + " " + last_name).trim();  // Remove extra spaces
//     frm.set_value('full_name', full_name);
// }

// frappe.web_form.after_render = function() {
//     // Trigger when first name is entered
//     frappe.web_form.on('first_name', (field, value) => {
//         update_full_name();
//     });
//     // Trigger when last name is entered
//     frappe.web_form.on('middle_name', (field, value) => {
//         update_full_name();
//     });

//     // Trigger when last name is entered
//     frappe.web_form.on('last_name', (field, value) => {
//         update_full_name();
//     });

//     function update_full_name() {
//         let first_name = frappe.web_form.get_value('first_name') || "";
//         let middle_name = frappe.web_form.get_value('middle_name') || "";
//         let last_name = frappe.web_form.get_value('last_name') || "";
//         let full_name = (first_name + " " + middle_name + " " + last_name).trim();  // Remove extra spaces
//         frappe.web_form.set_value('full_name', full_name);
//     }
// };