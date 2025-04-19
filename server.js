const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const app = express();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Middleware
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.render('criminal-risk-assessment');
});

app.post('/submit-assessment', upload.fields([
  { name: 'client_signature', maxCount: 1 },
  { name: 'witness_signature', maxCount: 1 }
]), (req, res) => {
  try {
    // Validate form data
    const errors = [];
    
    // Check required fields
    if (!req.body.first_name) errors.push('First name is required');
    if (!req.body.last_name) errors.push('Last name is required');
    if (!req.body.dob) errors.push('Date of birth is required');
    if (!req.body.gender) errors.push('Gender is required');
    if (!req.body.current_address) errors.push('Current address is required');
    if (!req.body.phone_numbers) errors.push('Phone numbers are required');
    if (!req.body.birth_place) errors.push('Birth place is required');
    
    // Check ID types (at least 2)
    if (!req.body.id_types || req.body.id_types.length < 2) {
      errors.push('At least two ID types must be selected');
    }
    
    // Agency information validation
    if (!req.body.agency_name) errors.push('Agency name is required');
    if (!req.body.reason) errors.push('Reason for assessment is required');
    if (!req.body.assigned_worker) errors.push('Assigned worker is required');
    if (!req.body.submitting_designate) errors.push('Submitting designate is required');
    if (!req.body.designate_phone) errors.push('Designate phone is required');
    if (!req.body.designate_email) errors.push('Designate email is required');
    if (!req.body.request_date) errors.push('Request date is required');
    
    // Check signature file was uploaded
    if (!req.files || !req.files['client_signature']) {
      errors.push('Client signature is required');
    }
    
    // If unconsented is 'no', check witness fields
    if (req.body.unconsented === 'no') {
      if (!req.body.witness_name) errors.push('Witness name is required when consent is given');
      if (!req.files || !req.files['witness_signature']) {
        errors.push('Witness signature is required when consent is given');
      }
    }
    
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }
    
    // Process the form data (in a real app, you'd save to database)
    const formData = {
      ...req.body,
      id_types: Array.isArray(req.body.id_types) ? req.body.id_types : [req.body.id_types],
      client_signature: req.files['client_signature'] ? req.files['client_signature'][0].filename : null,
      witness_signature: req.files['witness_signature'] ? req.files['witness_signature'][0].filename : null
    };
    
    // Here you would typically save to database and/or generate PDF
    console.log('Form submitted:', formData);
    
    res.json({ 
      success: true, 
      message: 'Assessment submitted successfully',
      data: formData
    });
    
  } catch (error) {
    console.error('Error processing form:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});