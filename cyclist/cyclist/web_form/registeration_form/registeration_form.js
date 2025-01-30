// frappe.ready(function() {

//     // Auto-generate Full Name when First Name or Last Name changes
//     frappe.web_form.on('name1', (field, value) => {
//         update_full_name();
//     });
// 	frappe.web_form.on('middle_name', (field, value) => {
//         update_full_name();
//     });

//     frappe.web_form.on('last_name', (field, value) => {
//         update_full_name();
//     });

//     // Function to update full name in real time
//     function update_full_name() {
//         let first_name = frappe.web_form.get_value('name1') || "";
// 		let middle_name = frappe.web_form.get_value('middle_name') || "";
//         let last_name = frappe.web_form.get_value('last_name') || "";
//         let full_name = (first_name + " " + middle_name + " " + last_name).trim();  // Trim to avoid unnecessary spaces
//         frappe.web_form.set_value('full_name', full_name);
//     }

//     // Auto-calculate Age when DOB is entered (can also trigger real-time)
//     frappe.web_form.on('dob', (field, value) => {
//         if (value) {
//             let dob = new Date(value);
//             let today = new Date();
//             let age = today.getFullYear() - dob.getFullYear();
//             let monthDiff = today.getMonth() - dob.getMonth();

//             if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
//                 age--;
//             }

//             frappe.web_form.set_value('age', age);
//         }
//     });

// });

frappe.ready(function () {

    frappe.web_form.after_save = function(doc) {
        let redirectUrl = `/cyclist_doc/{{ doc.name }}`;
        window.location.href = redirectUrl;
    };
    // Inject Google Fonts
    let fontLink = document.createElement("link");
    fontLink.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap";
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);

    // Enhance UI with custom CSS
    let style = document.createElement("style");
    style.innerHTML = `
        body {
            font-family: 'Poppins', sans-serif;
            margin: 0;
            padding: 0;
            color: #444;
            background: url('https://previews.123rf.com/images/kannaa123rf/kannaa123rf1612/kannaa123rf161200160/67876091-retro-bike-seamless-pattern-vector-illustration-for-bicycle-transport-design-bright-vehicle.jpg') center center;
            background-size: cover;
            background-attachment: fixed;
        }

        .web-form-container {
            background: rgba(255, 255, 255, 0.9);
            border-radius: 20px;
            padding: 40px;
            max-width: 1200px;
            margin: 40px auto;
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
        }

        .web-form-container h2, .web-form-container h1 {
            text-align: center;
            color: #2575fc;
            font-size: 2.8rem;
            font-weight: bold;
            margin-bottom: 30px;
        }

        .web-form-container form {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            gap: 30px;
            flex-wrap: wrap;
        }

        .form-left,
        .form-right {
            flex: 1;
            min-width: 300px;
        }

        .form-right {
            text-align: right;
        }

        .form-group {
            display: flex;
            flex-direction: column;
            margin-bottom: 15px;
        }

        .form-group label {
            font-weight: 600;
            margin-bottom: 10px;
            color: #444;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
            padding: 12px;
            font-size: 16px;
            border: 2px solid #2575fc;
            border-radius: 10px;
            transition: all 0.3s ease-in-out;
            background: #f9f9f9;
            color: #333;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            border-color: #6a11cb;
            outline: none;
            box-shadow: 0 0 10px rgba(58, 141, 255, 0.5);
        }

        .form-group attach {
            background: #87ceeb; /* Sky Blue */
            color: #fff;
            font-weight: bold;
            border: none;
            padding: 15px 30px;
            border-radius: 12px;
            cursor: pointer;
            font-size: 16px;
            transition: background 0.3s ease, transform 0.2s ease;
        }

        .form-group button:hover {
            background: #6ac3ff;
            transform: scale(1.05);
        }

        .form-actions {
            text-align: center;
            margin-top: 40px;
        }

        .signature-container {
            border: 2px dashed #2575fc;
            padding: 20px;
            background: #ffffff;
            border-radius: 12px;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 200px;
            margin-top: 20px;
            position: relative;
        }

        .signature-container canvas {
            width: 100%;
            height: 100%;
            border-radius: 8px;
        }

        @media screen and (max-width: 768px) {
            .web-form-container form {
                flex-direction: column;
            }

            .form-right {
                text-align: left;
            }
        }
    `;
    document.head.appendChild(style);

    frappe.web_form.on('name1', (field, value) => {
		update_full_name();
	});
	frappe.web_form.on('middle_name', (field, value) => {
		update_full_name();
	});
	
	frappe.web_form.on('last_name', (field, value) => {
		update_full_name();
	});
	
	// Function to update full name in real time
	function update_full_name() {
		let first_name = frappe.web_form.get_value('name1') || "";
		let middle_name = frappe.web_form.get_value('middle_name') || "";
		let last_name = frappe.web_form.get_value('last_name') || "";
		let full_name = (first_name + " " + middle_name + " " + last_name).trim();  // Trim to avoid unnecessary spaces
		frappe.web_form.set_value('full_name', full_name);
	}
	
	// Auto-calculate Age when DOB is entered (can also trigger real-time)
	frappe.web_form.on('dob', (field, value) => {
		if (value) {
			let dob = new Date(value);
			let today = new Date();
			let age = today.getFullYear() - dob.getFullYear();
			let monthDiff = today.getMonth() - dob.getMonth();
	
			if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
				age--;
			}
	
			frappe.web_form.set_value('age', age);
		}
	});
	
	
	
    // Configure Digital Signature (ensures black ink is used)
    let signatureContainer = document.querySelector(".signature-container");
    let canvas = document.createElement("canvas");
    canvas.width = signatureContainer.offsetWidth;
    canvas.height = signatureContainer.offsetHeight;
    canvas.style.background = "#fff";
    let ctx = canvas.getContext("2d");
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000"; // Black Pen
    signatureContainer.appendChild(canvas);

    let isDrawing = false;
    canvas.addEventListener("mousedown", () => (isDrawing = true));
    canvas.addEventListener("mouseup", () => (isDrawing = false));
    canvas.addEventListener("mousemove", (e) => {
        if (!isDrawing) return;
        let rect = canvas.getBoundingClientRect();
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    });

});







