(function($) {
    "use strict";

    // Google Sheets configuration
    const SHEET_CONFIG = {
        sheetId: 'UKCCU_NOMINATIONS_2026',
        configTab: 'CONFIG',
        votesTab: 'VOTES'
    };

    // Show status message
    function showStatus(message, type = 'info') {
        const statusDiv = document.getElementById('nominationStatus');
        const messageSpan = document.getElementById('statusMessage');
        
        statusDiv.className = `alert alert-${type}`;
        messageSpan.textContent = message;
        statusDiv.classList.remove('d-none');
    }

    // Hide status message
    function hideStatus() {
        const statusDiv = document.getElementById('nominationStatus');
        statusDiv.classList.add('d-none');
    }

    // Generate unique submission ID
    function generateSubmissionId() {
        return 'NOM_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Simple hash function for IP
    function hashString(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash.toString();
    }

    // Get user IP (simplified - in production, use a proper IP service)
    async function getUserIP() {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip;
        } catch (error) {
            console.warn('Could not get IP, using fallback');
            return 'unknown';
        }
    }

    // Check voting status from Google Sheets
    async function checkVotingStatus() {
        // In a real implementation, this would fetch from Google Sheets API
        // For now, simulate with mock data
        return {
            voting_status: 'OPEN', // or 'CLOSED'
            voting_start: '2026-01-01T00:00:00Z',
            voting_end: '2026-12-31T23:59:59Z',
            notice_message: 'Nominations are currently open for all executive positions.'
        };
    }

    // Check for duplicate nomination
    async function checkDuplicate(position, voterEmailOrPhone) {
        // In a real implementation, this would check Google Sheets
        // For now, simulate with localStorage
        const key = `nomination_${position}_${voterEmailOrPhone}`;
        return localStorage.getItem(key) !== null;
    }

    // Save nomination to Google Sheets
    async function saveNomination(data) {
        // In a real implementation, this would send to Google Sheets API
        // For now, save to localStorage as fallback
        const nominations = JSON.parse(localStorage.getItem('ukccu_nominations') || '[]');
        nominations.push(data);
        localStorage.setItem('ukccu_nominations', JSON.stringify(nominations));
        
        // Mark as submitted to prevent duplicates
        const key = `nomination_${data.position}_${data.voter_email_or_phone}`;
        localStorage.setItem(key, 'submitted');
        
        return true;
    }

    // Validate form data
    function validateForm(formData) {
        const position = formData.get('position');
        const nomineeName = formData.get('nominee_full_name');
        const voterName = formData.get('voter_full_name');
        const voterEmailOrPhone = formData.get('voter_email_or_phone');

        if (!position || position === '') {
            showStatus('Please select a position to nominate for.', 'danger');
            return false;
        }

        if (!nomineeName || !nomineeName.trim()) {
            showStatus('Please enter the nominee\'s full name.', 'danger');
            return false;
        }

        if (!voterName || !voterName.trim()) {
            showStatus('Please enter your full name.', 'danger');
            return false;
        }

        if (!voterEmailOrPhone || !voterEmailOrPhone.trim()) {
            showStatus('Please enter your email or phone number.', 'danger');
            return false;
        }

        // Basic email/phone validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        
        if (!emailRegex.test(voterEmailOrPhone) && !phoneRegex.test(voterEmailOrPhone)) {
            showStatus('Please enter a valid email address or phone number.', 'danger');
            return false;
        }

        return true;
    }

    // Disable form
    function disableForm() {
        const form = document.getElementById('executiveNominationForm');
        const inputs = form.querySelectorAll('input, select, button');
        
        inputs.forEach(input => {
            input.disabled = true;
        });
    }

    // Enable form
    function enableForm() {
        const form = document.getElementById('executiveNominationForm');
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
            // Check voting status
            const votingStatus = await checkVotingStatus();
            
            if (votingStatus.voting_status !== 'OPEN') {
                showStatus(votingStatus.notice_message || 'Nominations are currently closed.', 'warning');
                disableForm();
                return;
            }

            // Check if voting period has ended
            const now = new Date();
            const votingEnd = new Date(votingStatus.voting_end);
            
            if (now > votingEnd) {
                showStatus('The nomination period has ended.', 'warning');
                disableForm();
                return;
            }

            // Check for duplicate nomination
            const position = formData.get('position');
            const voterEmailOrPhone = formData.get('voter_email_or_phone');
            
            const isDuplicate = await checkDuplicate(position, voterEmailOrPhone);
            if (isDuplicate) {
                showStatus('You have already submitted a nomination for this position.', 'warning');
                return;
            }

            // Get user info
            const userIP = await getUserIP();
            const userAgent = navigator.userAgent;
            const submissionId = generateSubmissionId();

            // Prepare data for submission
            const submissionData = {
                timestamp: new Date().toISOString(),
                position: position,
                nominee_full_name: formData.get('nominee_full_name'),
                voter_full_name: formData.get('voter_full_name'),
                voter_registration_number: formData.get('voter_registration_number') || '',
                voter_email_or_phone: voterEmailOrPhone,
                ip_hash: hashString(userIP),
                user_agent: userAgent,
                submission_id: submissionId,
                vote_status: 'ACCEPTED',
                rejection_reason: ''
            };

            // Save nomination
            const saved = await saveNomination(submissionData);
            
            if (saved) {
                showStatus('Your nomination has been successfully submitted! Thank you for participating in the UKCCU nominations.', 'success');
                form.reset();
                
                // Optionally disable form after successful submission
                // disableForm();
            } else {
                showStatus('There was an error submitting your nomination. Please try again.', 'danger');
            }

        } catch (error) {
            console.error('Submission error:', error);
            showStatus('An unexpected error occurred. Please try again later.', 'danger');
        }
    }

    // Initialize nominations functionality
    async function initNominations() {
        const form = document.getElementById('executiveNominationForm');
        
        if (form) {
            // Check voting status on page load
            try {
                const votingStatus = await checkVotingStatus();
                
                if (votingStatus.voting_status !== 'OPEN') {
                    showStatus(votingStatus.notice_message || 'Nominations are currently closed.', 'warning');
                    disableForm();
                } else {
                    const now = new Date();
                    const votingEnd = new Date(votingStatus.voting_end);
                    
                    if (now > votingEnd) {
                        showStatus('The nomination period has ended.', 'warning');
                        disableForm();
                    } else {
                        hideStatus();
                    }
                }
            } catch (error) {
                console.error('Error checking voting status:', error);
                showStatus('Unable to verify nomination status. Please try again later.', 'warning');
            }
            
            // Add form submit handler
            form.addEventListener('submit', handleFormSubmit);
        }
    }

    // Initialize when DOM is ready
    $(document).ready(function() {
        initNominations();
    });

})(jQuery);
