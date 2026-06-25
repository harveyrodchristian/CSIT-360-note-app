# MySQL Workbench Setup Guide 🐬

This guide explains how to set up the MySQL Database for your Note Application using **MySQL Workbench**.

---

## What is MySQL Workbench?
MySQL Workbench is a visual database design and administration tool. It allows you to create databases, write SQL scripts, and inspect your tables using a clean graphical interface.

---

## Step 1: Connect to Your MySQL Server
1. Open the **MySQL Workbench** application.
2. Under the **MySQL Connections** section, click on your local instance (usually named **Local Instance 3306** or **localhost**).
3. If prompted, enter your MySQL root **password** (the password you created when installing MySQL) and click **OK**.
4. You will see a clean dashboard with a query text editor tab.

---

## Step 2: Create the Database (Schema)
You need to create a database container called `cozy_notes_db`.

1. In the open query tab (or click the SQL sheet icon with a `+` to open a new tab), copy and paste this code:
   ```sql
   CREATE DATABASE IF NOT EXISTS cozy_notes_db;
   ```
2. Click the **Lightning Bolt icon** (Execute) in the toolbar.
3. In the bottom **Action Output** panel, you should see a green checkmark next to `Create Database`.
4. In the left **Navigator** sidebar under **Schemas**, right-click and choose **Refresh All**. You will now see `cozy_notes_db` listed!

---

## Step 3: Create the Notes Table
Now, let's create a table to hold our note cards.

1. Paste the following SQL script into your query tab:
   ```sql
   USE cozy_notes_db;

   CREATE TABLE IF NOT EXISTS notes (
     id INT AUTO_INCREMENT PRIMARY KEY,
     title VARCHAR(255) NOT NULL,
     content TEXT,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```
2. Click the **Lightning Bolt icon** to execute the query.
3. Refresh your Schemas sidebar again. Expand `cozy_notes_db` -> `Tables` and you will see the `notes` table!

### Table Column Explanations (Easy to Explain):
- `id`: A unique number for each note. `AUTO_INCREMENT` means MySQL automatically assigns a new number starting from 1 for every note we add.
- `title`: The title of the note (stores text up to 255 characters).
- `content`: The main text of the note. We use `TEXT` because notes can be very long.
- `created_at`: The exact time the note was created. `DEFAULT CURRENT_TIMESTAMP` means MySQL sets this automatically when a new note is added.

---

## Step 4: Write and Read Test Data
Let's add a dummy note directly from Workbench to test the database:

1. Run this SQL command to add a note:
   ```sql
   INSERT INTO notes (title, content) 
   VALUES ('Hello from Workbench!', 'This note was written directly inside MySQL Workbench! 🐬');
   ```
2. Run this SQL command to view all notes in your database:
   ```sql
   SELECT * FROM notes;
   ```
3. You should see a grid table at the bottom showing your newly inserted note!

---

## Step 5: Connect the App to Your Database
Open the `.env` file in the `server/` directory and configure the credentials to match your MySQL server:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD  <-- Replace with your actual MySQL password
DB_NAME=cozy_notes_db
PORT=5000
```
Once configured, the Express server will automatically connect to this database and fetch/save notes dynamically!
