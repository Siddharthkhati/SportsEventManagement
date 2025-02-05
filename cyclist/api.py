

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


# from frappe.utils.password import check_password

# @frappe.whitelist(allow_guest=True)
# def login_user(email, password):
#     user = frappe.db.get_value("Registration", {"email": email}, ["name", "password"])
    
#     if user:
#         user_id, hashed_password = user
#         if check_password(user_id, password):  # Validate password
#             frappe.local.response["type"] = "redirect"
#             frappe.local.response["location"] = "/registration.html"
#             return

#     return {"status": "failed", "message": "Invalid email or password"}

# @frappe.whitelist(allow_guest=True)
# def send_otp_to_email(email):
#     # Check if email exists in the Registration doctype
#     user = frappe.db.get_value("Registration", {"email": email}, "name")
#     if user:
#         # Generate random 6-digit OTP
#         otp = random.randint(100000, 999999)

#         # Store OTP in a custom doctype or session (to verify later)
#         frappe.session.user_data = {"otp": otp}

#         # Send OTP to the user's email
#         subject = "Your OTP for Cyclist Event Login"
#         message = f"Your OTP is {otp}. Please use it to verify your login."
#         send_email(recipients=email, subject=subject, message=message)

#         return {"status": "success"}
#     else:
#         return {"status": "failed", "message": "Email not found"}

# @frappe.whitelist(allow_guest=True)
# def verify_otp(email, otp):
#     # Verify the OTP stored in the session
#     if frappe.session.user_data.get("otp") == int(otp):
#         # Reset OTP after successful verification
#         del frappe.session.user_data["otp"]

#         return {"status": "success"}
#     else:
#         return {"status": "failed", "message": "Invalid OTP"}


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
        return {"status": "failed", "message": "Email not found"}

# @frappe.whitelist(allow_guest=True)
# def verify_otp(email, otp):
#     # Verify the OTP stored in the session
#     if frappe.session.user_data.get("otp") == int(otp):
#         # Reset OTP after successful verification
#         del frappe.session.user_data["otp"]

#         return {"status": "success"}
#     else:
#         return {"status": "failed", "message": "Invalid OTP"}

# import frappe
import json

@frappe.whitelist()
def get_license_details(cyclist_id):
    if not cyclist_id:
        return {}
    license_docs = frappe.get_all("License", filters = {"cyclist_id": cyclist_id}, fields = ["*"])
    if license_docs:
        return license_docs[0]
    return {}

@frappe.whitelist()
def update_license(cyclist_id, updated_fields):
    if isinstance(updated_fields, str):  # Handle JSON string input
        updated_fields = json.loads(updated_fields)

    # Fetch the License document
    if not updated_fields.get("name"):
        frappe.throw("Document name (license id) is required for updating.")

    license_doc = frappe.get_doc("License", updated_fields.get("name"))
    
    # Check if the document exists and if it matches the cyclist_id
    if license_doc and license_doc.cyclist_id == cyclist_id:
        # Update only the fields that are present in updated_fields
        for field, value in updated_fields.items():
            if value and field != "name":  # Skip the "name" field as it's the document name
                setattr(license_doc, field, value)
        
        # Save the document
        license_doc.save(ignore_permissions=True)
        return {"status": "success"}
    else:
        frappe.throw(f"No license found for cyclist_id: {cyclist_id}")
        return {"status": "error"}
@frappe.whitelist()
def get_event_details(event_name):
    event = frappe.get_doc("Events", event_name)
    # championship = frappe.get_doc("Events", event.championship)

    return {
        "event_name": event.event_name,
        "championship": event.championship,
        "category": event.category,
        "age_group": event.age_group,
    }

@frappe.whitelist()
def get_email():
        user_email = frappe.session.user  # Fetch the logged-in user's email
        return user_email  # Return the email

  
@frappe.whitelist()
def get_full_name():
    """Fetch the logged-in user's full name."""
    user_email = frappe.session.user  # Get the logged-in user's email
    user = frappe.get_doc("User", user_email)  # Fetch the User document
    return user.full_name  # Return the full name of the user


