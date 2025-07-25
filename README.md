<h1>Inventory Management System Backend</h1>

<p>This is a backend API for an Inventory Management System using Node.js, Express, and MongoDB. It allows users to register, login, and manage products securely using JWT authentication.</p>

<hr />

<h2> Features</h2>
<ul>
  <li>User Registration and Login (JWT based)</li>
  <li>Add Products with SKU check</li>
  <li>Update Product Quantity</li>
  <li>View Products (Paginated)</li>
  <li>Protected Routes</li>
  <li>Swagger API Documentation</li>
  <li>Python-based API Test Script</li>
</ul>

<hr />

<h2>📁 Folder Structure</h2>
<pre>
ims-backend/
│
├── config/            # MongoDB connection
├── controllers/       # Auth and product logic
├── middleware/        # JWT auth middleware
├── models/            # Mongoose models
├── routes/            # API routes
├── utils/             # Token generator
├── app.js             # Main Express server
├── .env               # Environment variables
├── package.json       # Dependencies
│
test.py                # Python test file (outside backend folder)
</pre>

<hr />

<h2> Getting Started</h2>

<h3>1. Clone Repository</h3>
<pre><code>git clone https://github.com/your-username/ims-backend.git
cd ims-backend
</code></pre>

<h3>2. Install Dependencies</h3>
<pre><code>npm install
</code></pre>

<h3>3. Configure Environment Variables</h3>
<pre><code>
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
</code></pre>

<h3>4. Start the Server</h3>
<pre><code>npm start
</code></pre>

<p><b>Server runs at:</b> http://localhost:8080</p>

<hr />

<h2> Authentication</h2>

<p><b>Endpoints:</b></p>
<ul>
  <li><code>POST /api/auth/register</code> – Register a new user</li>
  <li><code>POST /api/auth/login</code> – Login and get token</li>
</ul>

<p>For protected routes, use the token:</p>
<pre><code>Authorization: Bearer &lt;access_token&gt;
</code></pre>

<hr />

<h2> Products API</h2>
<ul>
  <li><code>POST /api/products</code> – Add product (protected)</li>
  <li><code>PUT /api/products/:id/quantity</code> – Update quantity (protected)</li>
  <li><code>GET /api/products</code> – Get all products with pagination (protected)</li>
</ul>

<hr />

<h2>🧪 Running Tests (Python)</h2>

<h3>1. Install Requests Library</h3>
<pre><code>pip install requests
</code></pre>

<h3>2. Run Test Script</h3>
<pre><code>python tester/test.py
</code></pre>



<h2> Hosted API</h2>
<p>Base URL:<br>
<a href="https://inventory-management-tool-backend-production.up.railway.app">
https://inventory-management-tool-backend-production.up.railway.app
</a></p>

<hr />

<h2> Author</h2>
<p>Vicky Kumar</p>
<p> email:- vickykumar1347@gmail.com</p>
