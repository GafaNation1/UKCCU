(function($) {
    "use strict";

    // Google Sheets configuration
    const SHEET_CONFIG = {
        sheetId: 'UKCCU_BIBLE_STUDY_REGISTRATION',
        registrationsTab: 'REGISTRATIONS'
    };

    // Show status message
    function showStatus(message, type = 'info') {
        const statusDiv = document.getElementById('registrationStatus');
        const messageSpan = document.getElementById('statusMessage');
        
        statusDiv.className = `alert alert-${type}`;
        messageSpan.textContent = message;
        statusDiv.classList.remove('d-none');
    }

    // Hide status message
    function hideStatus() {
        const statusDiv = document.getElementById('registrationStatus');
        statusDiv.classList.add('d-none');
    }

    // Generate unique submission ID
    function generateSubmissionId() {
        return 'BS_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Save registration to Google Sheets
    async function saveRegistration(data) {
        // In a real implementation, this would send to Google Sheets API
        // For now, save to localStorage as fallback
        const registrations = JSON.parse(localStorage.getItem('ukccu_bible_study_registrations') || '[]');
        registrations.push(data);
        localStorage.setItem('ukccu_bible_study_registrations', JSON.stringify(registrations));
        
        return true;
    }

    // Check for duplicate registration
    async function checkDuplicate(email, phone) {
        // In a real implementation, this would check Google Sheets
        // For now, simulate with localStorage
        const registrations = JSON.parse(localStorage.getItem('ukccu_bible_study_registrations') || '[]');
        
        return registrations.some(reg => 
            reg.email === email || reg.phone === phone
        );
    }

    // Validate form data
    function validateForm(formData) {
        const fullName = formData.get('full_name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const yearOfStudy = formData.get('year_of_study');
        const course = formData.get('course');
        const preferredDay = formData.get('preferred_day');
        const preferredTime = formData.get('preferred_time');
        const consent = formData.get('consent');

        if (!fullName || !fullName.trim()) {
            showStatus('Please enter your full name.', 'danger');
            return false;
        }

        if (!email || !email.trim()) {
            showStatus('Please enter your email address.', 'danger');
            return false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showStatus('Please enter a valid email address.', 'danger');
            return false;
        }

        if (!phone || !phone.trim()) {
            showStatus('Please enter your phone number.', 'danger');
            return false;
        }

        // Phone validation
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(phone)) {
            showStatus('Please enter a valid phone number.', 'danger');
            return false;
        }

        if (!yearOfStudy || yearOfStudy === '') {
            showStatus('Please select your year of study.', 'danger');
            return false;
        }

        if (!course || !course.trim()) {
            showStatus('Please enter your course of study.', 'danger');
            return false;
        }

        if (!preferredDay || preferredDay === '') {
            showStatus('Please select your preferred day.', 'danger');
            return false;
        }

        if (!preferredTime || preferredTime === '') {
            showStatus('Please select your preferred time.', 'danger');
            return false;
        }

        if (!consent) {
            showStatus('Please consent to receive communications about Bible study groups.', 'danger');
            return false;
        }

        return true;
    }

    // Disable form
    function disableForm() {
        const form = document.getElementById('bibleStudyRegistrationForm');
        const inputs = form.querySelectorAll('input, select, button');
        
        inputs.forEach(input => {
            input.disabled = true;
        });
    }

    // Enable form
    function enableForm() {
        const form = document.getElementById('bibleStudyRegistrationForm');
        const inputs = form.querySelectorAll('input, select, button');
        
        inputs.forEach(input => {
            input.disabled = false;
        });
    }

    // Handle form submission
    async function handleFormSubmit(event) {
        event.preventDefault();
        
        const form = event.target;
        const formData = new FormData(form);

        // Validate form
        if (!validateForm(formData)) {
            return;
        }

        try {
            // Check for duplicate registration
            const email = formData.get('email');
            const phone = formData.get('phone');
            
            const isDuplicate = await checkDuplicate(email, phone);
            if (isDuplicate) {
                showStatus('You have already registered for Bible study. If you need to update your information, please contact us.', 'warning');
                return;
            }

            // Prepare data for submission
            const submissionData = {
                timestamp: new Date().toISOString(),
                full_name: formData.get('full_name'),
                email: email,
                phone: phone,
                year_of_study: formData.get('year_of_study'),
                course: formData.get('course'),
                preferred_day: formData.get('preferred_day'),
                preferred_time: formData.get('preferred_time'),
                consent: formData.get('consent') ? 'Yes' : 'No',
                submission_id: generateSubmissionId()
            };

            // Save registration
            const saved = await saveRegistration(submissionData);
            
            if (saved) {
                showStatus('Thank you for registering for Bible study! We will contact you soon with more details about your assigned group.', 'success');
                form.reset();
                
                // Optionally disable form after successful submission
                // disableForm();
            } else {
                showStatus('There was an error submitting your registration. Please try again.', 'danger');
            }

        } catch (error) {
            console.error('Submission error:', error);
            showStatus('An unexpected error occurred. Please try again later.', 'danger');
        }
    }

    // Initialize Bible Study registration functionality
    function initBibleStudy() {
        const form = document.getElementById('bibleStudyRegistrationForm');
        
        if (form) {
            // Hide status on page load
            hideStatus();
            
            // Add form submit handler
            form.addEventListener('submit', handleFormSubmit);
        }
    }

    // Initialize when DOM is ready
    $(document).ready(function() {
        initBibleStudy();
    });

})(jQuery);
