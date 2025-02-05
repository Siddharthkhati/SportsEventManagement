# Copyright (c) 2025, Siddharth and contributors
# For license information, please see license.txt

import frappe

def execute(filters=None):
    # Columns for the report
    columns = get_columns()
    
    # Fetching data based on filters
    data = get_data(filters)
    
    return columns, data

def get_columns():
    return [
        {"fieldname": "name1", "label": "First Name", "fieldtype": "Data", "width": 150},
        {"fieldname": "last_name", "label": "Last Name", "fieldtype": "Data", "width": 150},
        {"fieldname": "dob", "label": "Date of Birth", "fieldtype": "Date", "width": 120},
        {"fieldname": "gender", "label": "Gender", "fieldtype": "Data", "width": 100},
        {"fieldname": "quota", "label": "Quota", "fieldtype": "Data", "width": 100}
    ]

def get_data(filters):
    # Build conditions based on filters
    conditions = []
    if filters.get("name1"):
        conditions.append("name1 LIKE %(name1)s")
    if filters.get("last_name"):
        conditions.append("last_name LIKE %(last_name)s")
    if filters.get("dob"):
        conditions.append("dob = %(dob)s")
    if filters.get("gender"):
        conditions.append("gender = %(gender)s")
    if filters.get("quota"):
        conditions.append("quota = %(quota)s")
    
    # Combine all conditions into a single WHERE clause
    where_clause = " AND ".join(conditions) if conditions else "1=1"
    
    # Query to fetch data
    query = f"""
        SELECT
            name1, last_name, dob, gender, quota
        FROM
            `tabRegistration`
        WHERE
            {where_clause}
    """
    
    # Execute query and return results
    return frappe.db.sql(query, filters, as_dict=True)
