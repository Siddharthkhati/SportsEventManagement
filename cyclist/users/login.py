import frappe
from frappe.auth import LoginManager
from frappe.exceptions import ValidationError

@frappe.whitelist(allow_guest=True)  # Allows access to this method by non-logged-in users
def login_user(email, password):
    # Check if the email exists in the Registration doctype
    registration = frappe.get_all('Registration', filters={'email': email}, fields=['name', 'email', 'password'])
    
    if not registration:
        frappe.msgprint("No user found with this email.")
        return
    
    # Assuming password in the Registration doctype is stored as plain text (or hashed if necessary)
    stored_password = registration[0].get('password')

    if stored_password == password:  # You can modify this to use hashed passwords
        # You can either authenticate with LoginManager or handle the session manually
        login_manager = LoginManager()
        login_manager.authenticate(email, password)
        login_manager.login()
        frappe.msgprint("Login successful!")  # Show a success message
    else:
        frappe.msgprint("Invalid credentials.")  # Show an error message if the credentials are incorrect
