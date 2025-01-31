

import frappe


@frappe.whitelist()
def get_cyclist_details(cyclist_id):
    cyclist = frappe.get_doc("Registration", cyclist_id)

    return {
        "first_name": cyclist.name1,
        "full_name": cyclist.full_name,
        "age": cyclist.age,
        # "gender": cyclist.gender,
        "aadhaar_number": cyclist.adhar_card_number,
        "email": cyclist.email,
        "passport_size_photograph": cyclist.passport_size_photograph,
        "birth_certificate": cyclist.birth_certificate,
        "aadhaar_card": cyclist.adhar_card,
        "medical_fitness_certificate": cyclist.medical_certificate,
        # "license_id": cyclist.license_id
    }
#from frappe.auth import LoginManager

@frappe.whitelist()
def update_registration(docname, first_name, middle_name, last_name, gender):
    """Update the registration record in the backend"""
    try:
        # Fetch the document
        doc = frappe.get_doc("Registration", docname)

        # Log the received values for debugging
        frappe.log_error(f"Updating Registration - Docname: {docname}, First Name: {first_name}, Last Name: {last_name}", "Registration Update")

        # Update fields
        doc.name1 = first_name
        doc.middle_name = middle_name
        doc.last_name = last_name
        doc.gender = gender

        # Save the document
        doc.save()
        frappe.db.commit()

        return {"status": "success", "message": "Record updated successfully"}
    except Exception as e:
        frappe.log_error(f"Registration Update Error: {str(e)}", "Registration Update")
        return {"status": "error", "message": str(e)}


# @frappe.whitelist(allow_guest=True)  
# def login_user(email, password):
#     """Authenticate and log in the user"""
#     try:
#         login_manager = LoginManager()
#         login_manager.authenticate(email, password)
#         login_manager.login()
#         return {"status": "success", "message": "Login successful"}
#     except frappe.AuthenticationError:
#         return {"status": "error", "message": "Invalid login credentials"}
#     except Exception as e:
#         frappe.log_error(f"Login Error: {str(e)}", "User Login")
#         return {"status": "error", "message": str(e)}
