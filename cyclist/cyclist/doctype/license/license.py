# Copyright (c) 2025, Siddharth and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
import random
import string

class License(Document):
    def before_submit(self):
        if self.workflow_state == "Approved":  
            if not self.license_id:  
                self.license_id = "LIC-" + ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
            
            self.issue_date = frappe.utils.today()  
            self.expiry_date = frappe.utils.add_days(self.issue_date, 365)