// dashboard.js — DevShowcase Dashboard Interactions

// --- Copy Portfolio Link ---
document.addEventListener('DOMContentLoaded', () => {
    const copyBtn = document.getElementById('copyLinkBtn');
    const portfolioLink = document.querySelector('#portfolioLink a');

    if (copyBtn && portfolioLink) {
        copyBtn.addEventListener('click', () => {
            const link = portfolioLink.href;
            navigator.clipboard.writeText(link).then(() => {
                alert('✅ Portfolio link copied to clipboard!');
            }).catch(err => {
                console.error('Failed to copy:', err);
                alert('❌ Could not copy the link.');
            });
        });
    }
});
