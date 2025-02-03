# import frappe

# def get_context(context):
#     if not frappe.session.user or frappe.session.user == "Guest":
#         frappe.local.flags.redirect_location = "/login"
#         raise frappe.Redirect

#     # Fetch user-specific data (optional)
#     user_id = frappe.session.user
#     context.registration_details = frappe.get_doc("Registration", {"email": user_id})

#     return context
