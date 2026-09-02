# Line-by-line explanation of server.js

This file creates a simple Node.js server using Express and MongoDB. It listens for requests, connects to a database, and handles student-related operations like create, read, update, and delete.

## 1. Import Express
```javascript
import express from 'express';
```
- This imports the Express framework so the server can handle HTTP requests.

## 2. Import dotenv
```javascript
dotenv.config();
```
- This loads environment variables from a `.env` file into the application.

## 3. Import MongoDB helpers
```javascript
import { MongoClient, ObjectId } from 'mongodb';
```
- `MongoClient` is used to connect to MongoDB.
- `ObjectId` is used to create and work with MongoDB document IDs.

## 4. Load environment variables from `.env`
```javascript
dotenv.config();
```
- This line makes variables such as `PORT`, `MONGO_URI`, and `DB_NAME` available in the file.

## 5. Create an Express app
```javascript
const app = express();
```
- This creates the server application object.

## 6. Enable JSON body parsing
```javascript
app.use(express.json());
```
- This tells Express to automatically parse incoming JSON request bodies.

## 7. Set the server port
```javascript
const PORT = process.env.PORT || 5000;
```
- This defines the port number the server will run on.
- If the environment variable `PORT` exists, it uses that value; otherwise it uses `5000`.

## 8. Set the MongoDB connection URL
```javascript
const url = process.env.MONGO_URI || 'mongodb://localhost:27017';
```
- This defines the MongoDB server address.
- If `MONGO_URI` is set in the environment, it uses it; otherwise it defaults to a local MongoDB instance.

## 9. Set the database name
```javascript
const dbName = process.env.DB_NAME || 'students_db';
```
- This chooses the database name.
- If no environment variable is provided, it uses `students_db`.

## 10. Create a MongoDB client
```javascript
const client = new MongoClient(url);
```
- This creates a MongoDB client object for connecting to the database.

## 11. Connect to MongoDB and select the database
```javascript
const db = await client.connect().then(() => client.db(dbName));
```
- This connects to the MongoDB server.
- Once connected, it selects the database named `students_db` (or whatever database name was provided).
- The `await` means the code waits until the connection is ready.

## 12. Root route
```javascript
app.get('/', (req, res) => {
```
- This defines a route for the home page or root URL.

## 13. Send a simple response
```javascript
  res.send('Server is running');
```
- This sends the text `Server is running` back to the browser or client.

## 14. Close the root route block
```javascript
});
```
- This ends the root route definition.

## 15. Create a new student route
```javascript
app.post('/students', async (req, res) => {
```
- This creates a route that handles HTTP POST requests to `/students`.
- It is used when a client wants to add a new student.

## 16. Insert the new student into the database
```javascript
  const result = await db.collection('students').insertOne(req.body);
```
- This inserts the data sent by the client into the `students` collection.
- `req.body` contains the request data in JSON format.

## 17. Send a success response
```javascript
  res.json({ message: 'Created', id: result.insertedId });
```
- This sends back a JSON response confirming the record was created.
- It also returns the generated MongoDB ID.

## 18. Close the create route
```javascript
});
```
- This closes the POST route.

## 19. Get all students route
```javascript
app.get('/api/students', async (req, res) => {
```
- This creates a route for GET requests to `/api/students`.
- It returns all students from the database.

## 20. Fetch all student documents
```javascript
  const students = await db.collection('students').find().toArray();
```
- This reads all documents from the `students` collection.
- `toArray()` converts the result into a JavaScript array.

## 21. Return the result as JSON
```javascript
  res.json(students);
```
- This sends the list of students back to the client.

## 22. Close the get-all route
```javascript
});
```
- This ends the route.

## 23. Get one student by ID route
```javascript
app.get('/api/students/:id', async (req, res) => {
```
- This defines a route that accepts a dynamic ID parameter in the URL.
- Example: `/api/students/123abc`

## 24. Start a try-catch block
```javascript
  try {
```
- This is used to safely handle errors.

## 25. Find the student by ID
```javascript
    const student = await db.collection('students').findOne({ _id: new ObjectId(req.params.id) });
```
- This searches the database for a student whose `_id` matches the given ID.
- `req.params.id` gets the value from the URL.
- `new ObjectId(...)` converts the ID string into a MongoDB ObjectId.

## 26. Check if student exists
```javascript
    if (!student) return res.status(404).json({ message: 'Student not found' });
```
- If no student is found, the server responds with a `404 Not Found` status.

## 27. Return the student data
```javascript
    res.json(student);
```
- If the student is found, the data is returned as JSON.

## 28. Catch errors
```javascript
  } catch (err) {
```
- If something goes wrong, this block runs.

## 29. Send an error response
```javascript
    res.status(400).json({ error: 'Invalid id or request', details: err.message });
```
- This sends a `400 Bad Request` response with an error message.

## 30. Close the try-catch block
```javascript
  }
```
- This ends the error handling block.

## 31. Close the get-by-ID route
```javascript
});
```
- This ends the route.

## 32. Update a student route
```javascript
app.put('/api/students/:id', async (req, res) => {
```
- This creates a route for HTTP PUT requests to update an existing student.

## 33. Update the student in the database
```javascript
  const result = await db.collection('students').updateOne(
```
- This updates a document in the `students` collection.

## 34. Find the matching student by ID
```javascript
    { _id: new ObjectId(req.params.id) },
```
- This selects the student whose `_id` matches the ID from the URL.

## 35. Apply the changes from the request body
```javascript
    { $set: req.body }
```
- This updates the document with the new values sent by the client.
- `$set` means “set these fields to these values”.

## 36. Close the update operation
```javascript
  );
```
- This ends the update query.

## 37. Send an update response
```javascript
  res.json({ message: 'Updated', result });
```
- This sends a JSON response telling the client that the update was successful.

## 38. Close the update route
```javascript
});
```
- This closes the PUT route.

## 39. Delete a student route
```javascript
app.delete('/api/students/:id', async (req, res) => {
```
- This creates a route for HTTP DELETE requests to remove a student.

## 40. Delete the matching student from the database
```javascript
  const result = await db.collection('students').deleteOne({ _id: new ObjectId(req.params.id) });
```
- This removes one student whose `_id` matches the ID from the URL.

## 41. Send a deletion response
```javascript
  res.json({ message: 'Deleted', result });
```
- This sends a response showing that deletion was done.

## 42. Close the delete route
```javascript
});
```
- This ends the delete route.

## 43. Start the server
```javascript
app.listen(PORT, () => {
```
- This starts the Express server on the configured port.

## 44. Print a message to the console
```javascript
  console.log(`Server running on http://localhost:${PORT}`);
```
- This logs a message to the terminal when the server starts successfully.

## 45. Close the server startup block
```javascript
});
```
- This ends the server startup code.

# Summary
This file:
- creates an Express server,
- connects to MongoDB,
- handles CRUD operations for students,
- and runs on a local port.

If you want, I can also make this into a Tamil explanation file or add comments directly inside the code.
