<p>Dear {{ doc.first_name }},</p>

<p>
    {% if doc.license_id %}
        <p>🎉 Your License ID: {{ doc.license_id }}</p>
    {% endif %}
</p>

<p>Your License has reached the following status</p>

<p>🚀 <strong>Status Update: {{ doc.workflow_state }}</strong></p>

<p>📋 <strong>Details:</strong></p>

<ul>
    <li><strong>📅 Status:</strong> {{ doc.workflow_state }}</li>

    {% if doc.workflow_state == "Approved" %}
        <li><strong>⏳ Approval Date:</strong> {{ doc.issue_date }}</li> 
        <li><strong>⏳ Expiry Date:</strong> {{ doc.expiry_date}}</li> 
    {% endif %}

</ul>

<p>{% if doc.workflow_state == "Approved at District Level" %}
    <p>✅ Your license has been approved at the District Level! The next step is State-level approval. Stay tuned! 🚀</p>

<p>{% elif doc.workflow_state == "Approved at State Level" %}
    <p>🏅 Your license has successfully passed the State Level approval! The next exciting step is National-level approval! 🌍</p>

<p>{% elif doc.workflow_state == "Approved" %}
    <p>🎉🎉 Congratulations! Your license has been <strong>Approved</strong> and is now active! 🏆🚀</p>

<p>{% else %}
    <p>Your license is currently in progress. We’ll keep you updated once it reaches the next approval stage! 🔄</p>

<p>{% endif %}</p></p></p></p></p>

<p>Best Regards, <br><strong>Management Team</strong> <br> pedalleague.management@gmail.com ✨</p>
