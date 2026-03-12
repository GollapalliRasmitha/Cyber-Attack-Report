import sqlite3

# create or connect to database
conn = sqlite3.connect("cyberguardian.db")

# create cursor
cursor = conn.cursor()

# create table for storing reports
cursor.execute("""
CREATE TABLE IF NOT EXISTS reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    filename TEXT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
""")

# save changes
conn.commit()

# close connection
conn.close()

print("Database created successfully")