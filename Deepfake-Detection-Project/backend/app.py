from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"

# create uploads folder if it doesn't exist
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


@app.route("/report", methods=["POST"])
def report():

    name = request.form.get("name")

    description = request.form.get("description")
    file = request.files.get("media")
    
    filename = ""

    # save uploaded file
    if file:
        filename = file.filename
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)

    # connect to database
    conn = sqlite3.connect("cyberguardian.db")
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO reports (name,description, filename) VALUES (?, ?, ?)",
        (name,description, filename)
    )

    conn.commit()
    conn.close()

    return jsonify({"message": "Report submitted successfully"})

@app.route("/reports", methods=["GET"])
def get_reports():
    import sqlite3
    
    conn = sqlite3.connect("cyberguardian.db")
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM reports")
    rows = cursor.fetchall()

    conn.close()

    reports = []
    for r in rows:
        reports.append({
            "id": r[0],
            "name": r[1],
            "description": r[2],
            "file": r[3],
            "date":r[4]
        })

    return {"reports": reports}

if __name__ == "__main__":
    app.run(debug=True)

