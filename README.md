Criminal Risk Assessment Form Application
This application provides a web interface for submitting Criminal Risk Assessment requests to Manitoba Families' Child Protection Branch, based on the official form requirements.

Features
Online version of the Criminal Risk Assessment Request form

Responsive design works on desktop and mobile devices

File upload for signatures

Form validation (client-side and server-side)

PDF-like layout matching the official document

Prerequisites
Node.js (v14 or higher recommended)

npm (comes with Node.js)


Installation:
git clone https://github.com/yourusername/criminal-risk-assessment-form.git
cd criminal-risk-assessment-form



npm install

Form Source Files
criminal-risk-assessment.pug: Pug template for the form

Copy of Criminal_Risk_Assessment_ODK_Form_FINAL(1).xlsx: Original Excel specification

Criminal Risk Assessment Request - e-request form.pdf: PDF version of the form

Form Fields
The form includes all fields from the official documents:

Consent Section

Date

Signature upload

Unconsented option

Witness information (when consented)

Personal Information

Name (first, second, last)

Date of birth

Gender

Other names used

Current address

Phone numbers

Birth place

Identification documents (minimum 2 required)

Agency Information

Agency name

Reason for assessment

Assigned worker

Last assessment date (if known)

Designate information

Request date

Validation
Client-side validation using JavaScript

Server-side validation in server.js

Minimum 2 ID types required

Required fields marked with asterisks (*)

File type and size restrictions for signatures
