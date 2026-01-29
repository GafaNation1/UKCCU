(function($) {
    "use strict";

    // Check if user has already voted
    function checkVotingStatus() {
        const hasVoted = localStorage.getItem('ukccu_voted');
        if (hasVoted === 'true') {
            lockVotingForm();
            showMessage('You have already cast your vote. Each member may vote only once.', 'warning');
            return true;
        }
        return false;
    }

    // Show message to user
    function showMessage(message, type = 'info') {
        const messageDiv = document.getElementById('votingMessage');
        const messageText = document.getElementById('messageText');
        
        messageDiv.className = `alert alert-${type}`;
        messageText.textContent = message;
        messageDiv.classList.remove('d-none');
    }

    // Lock the voting form after submission
    function lockVotingForm() {
        const form = document.getElementById('executiveVotingForm');
        const inputs = form.querySelectorAll('input, select, button');
        
        inputs.forEach(input => {
            input.disabled = true;
        });
        
        // Hide submit button
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.style.display = 'none';
        }
    }

    // Save vote to localStorage
    function saveVote(formData) {
        const voteData = {};
        const positions = [
            'chairperson',
            'first_vice_chairperson',
            'second_vice_chairperson',
            'secretary',
            'vice_secretary',
            'treasurer',
            'outreach_coordinator',
            'inreach_coordinator',
            'bible_study_coordinator',
            'prayer_coordinator',
            'worship_coordinator',
            'creative_ministries_coordinator',
            'resource_mobilization_coordinator'
        ];

        positions.forEach(position => {
            voteData[position] = {
                name: formData.get(`${position}_name`),
                year: formData.get(`${position}_year`),
                course: formData.get(`${position}_course`)
            };
        });

        // Save to localStorage
        localStorage.setItem('ukccu_vote_data', JSON.stringify(voteData));
        localStorage.setItem('ukccu_voted', 'true');
        localStorage.setItem('ukccu_vote_timestamp', new Date().toISOString());
    }

    // Validate form data
    function validateForm(formData) {
        const positions = [
            'chairperson',
            'first_vice_chairperson',
            'second_vice_chairperson',
            'secretary',
            'vice_secretary',
            'treasurer',
            'outreach_coordinator',
            'inreach_coordinator',
            'bible_study_coordinator',
            'prayer_coordinator',
            'worship_coordinator',
            'creative_ministries_coordinator',
            'resource_mobilization_coordinator'
        ];

        for (let position of positions) {
            const name = formData.get(`${position}_name`);
            const year = formData.get(`${position}_year`);
            const course = formData.get(`${position}_course`);

            if (!name || !name.trim()) {
                showMessage(`Please enter a candidate name for ${position.replace(/_/g, ' ')}.`, 'danger');
                return false;
            }

            if (!year || year === '') {
                showMessage(`Please select a year of study for ${position.replace(/_/g, ' ')}.`, 'danger');
                return false;
            }

            if (!course || !course.trim()) {
                showMessage(`Please enter a course for ${position.replace(/_/g, ' ')}.`, 'danger');
                return false;
            }
        }

        return true;
    }

    // Handle form submission
    function handleFormSubmit(event) {
        event.preventDefault();
        
        if (checkVotingStatus()) {
            return;
        }

        const form = event.target;
        const formData = new FormData(form);

        // Validate form
        if (!validateForm(formData)) {
            return;
        }

        // Confirm submission
        if (confirm('Are you sure you want to submit your vote? You can only vote once.')) {
            // Save vote
            saveVote(formData);
            
            // Lock form
            lockVotingForm();
            
            // Show success message
            showMessage('Your vote has been successfully submitted! Thank you for participating in the UKCCU executive elections.', 'success');
        }
    }

    // Initialize voting functionality
    function initVoting() {
        const form = document.getElementById('executiveVotingForm');
        
        if (form) {
            // Check voting status on page load
            checkVotingStatus();
            
            // Add form submit handler
            form.addEventListener('submit', handleFormSubmit);
        }
    }

    // Initialize when DOM is ready
    $(document).ready(function() {
        initVoting();
    });

})(jQuery);
