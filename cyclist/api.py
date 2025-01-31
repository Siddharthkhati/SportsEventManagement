import frappe
from frappe.auth import LoginManager

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


@frappe.whitelist()
def register_for_event(event_name, user):
    event = frappe.get_doc("Event", {"event_name": event_name})
    
    if event.available_slots > 0:
        # Register user
        new_registration = frappe.get_doc({
            "doctype": "Event Registration",
            "event": event_name,
            "user": user
        })
        new_registration.insert()

        # Reduce available slots
        event.available_slots -= 1
        event.save()

        return {"status": "success", "message": "Registration successful!"}
    else:
        return {"status": "error", "message": "No slots available!"}
    

# @frappe.whitelist(allow_guest=True)
# def submit_review(event_name, user, review):
#     try:
#         # Create a new review document
#         review_doc = frappe.new_doc('Review')
#         review_doc.event = event_name
#         review_doc.user = user
#         review_doc.review_text = review
#         review_doc.save()

#         # Return success message
#         return {"status": "success", "message": "Review Submitted!"}
    
#     except Exception as e:
#         return {"status": "error", "message": "An error occurred while submitting your review."}

