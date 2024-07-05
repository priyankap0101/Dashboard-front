import React from 'react';

const Feedback = () => {
    const handleSubmitFeedback = () => {
        alert('Submitting feedback');
        // Implement actual feedback submission logic here
    };

    return (
        <div className="feedback">
            <h2>Feedback</h2>
            <textarea placeholder="Your feedback"></textarea>
            <button onClick={handleSubmitFeedback} className="submit-feedback-button">
                Submit Feedback
            </button>
        </div>
    );
};

export default Feedback;
