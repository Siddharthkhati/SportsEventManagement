

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






@frappe.whitelist()
def register_for_event(event_name, user):
    """
    Registers a user for an event and redirects to confirmation page.
    
    Args:
    event_name (str): The name of the event.
    user (str): The user registering.

    Returns:
    dict: Redirect URL or error message.
    """
    events = frappe.get_doc("Events", {"event_name": event_name})

    if events.available_slots > 0:
        # Reduce available slots
        events.available_slots -= 1
        events.save()
        frappe.db.commit()

        # Generate confirmation page URL
        confirmation_url = f"/confirmation.html?event_name={event_name}&event_date={events.event_date}"

        return {"status": "success", "redirect_url": confirmation_url}
    
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
    

    

