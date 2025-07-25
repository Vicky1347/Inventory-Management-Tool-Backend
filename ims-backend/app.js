const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');

dotenv.config(); // Make sure this comes before everything else

console.log('PORT:', process.env.PORT);
console.log('MONGO_URI:', process.env.MONGO_URI);

connectDB();

const app = express();
const swaggerDocument = YAML.load('./swagger.yaml');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
