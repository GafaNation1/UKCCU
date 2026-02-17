(function () {
    'use strict';

    // ========================================
    // ANNOUNCEMENT DATA
    // Admin: Add/edit announcements here
    // ========================================
    const announcements = [
        {
            id: "easter-service-2025",
            title: "Easter Sunday Service",
            description: "Join us for a special Easter celebration with worship and fellowship.",
            startDate: "2026-02-17",
            endDate: "2026-02-18",
            link: "events.html#easter"
        },
        {
            id: "bible-study-marchc",
            title: "Weekly Bible Study",
            description: "Every Wednesday at 6 PM. All are welcome to join our study sessions.",
            startDate: "2026-02-26",
            endDate: "2026-02-28",
            link: "events.html#bible-study"
        },
        {
            id: "youth-retreat-2025",
            title: "Youth Retreat Registration",
            description: "Sign up for the annual youth retreat happening in May. Limited spots available.",
            startDate: "2026-02-10",
            endDate: "2026-02-28",
            link: "events.html#youth-retreat"
        },
        {
            id: "bible-study-march",
            title: "Weekly Bible Study",
            description: "Every Wednesday at 6 PM. All are welcome to join our study sessions.",
            startDate: "2026-02-16",
            endDate: "2026-02-20",
            link: "events.html#bible-study"
        },
    ];

    // ========================================
    // UTILITY FUNCTIONS
    // ========================================

    function parseDate(dateString) {
        const parts = dateString.split('-');
        return new Date(parts[0], parts[1] - 1, parts[2]);
    }

    function isActiveAnnouncement(announcement) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const start = parseDate(announcement.startDate);
        const end = parseDate(announcement.endDate);

        return today >= start && today <= end;
    }

    function getActiveAnnouncements() {
        return announcements.filter(isActiveAnnouncement);
    }

    function formatDate(dateString) {
        const date = parseDate(dateString);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
    }

    // ========================================
    // LOCAL STORAGE MANAGEMENT
    // ========================================

    const STORAGE_KEY = 'ukccu_read_announcements';

    function getReadAnnouncements() {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    }

    function markAllAsRead(announcementIds) {
        const readAnnouncements = getReadAnnouncements();
        const updated = [...new Set([...readAnnouncements, ...announcementIds])];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }

    function getUnreadCount(activeAnnouncements) {
        const readAnnouncements = getReadAnnouncements();
        return activeAnnouncements.filter(a => !readAnnouncements.includes(a.id)).length;
    }

    // ========================================
    // DOM ELEMENTS
    // ========================================

    let bell, badge, panel, closeBtn, announcementList;

    function initializeElements() {
        bell = document.getElementById('announcement-bell');
        badge = document.getElementById('announcement-badge');
        panel = document.getElementById('announcement-panel');
        closeBtn = document.getElementById('close-panel');
        announcementList = document.getElementById('announcement-list');

        if (!bell || !badge || !panel || !closeBtn || !announcementList) {
            console.error('Announcement system: Required HTML elements not found');
            return false;
        }
        return true;
    }

    // ========================================
    // RENDERING
    // ========================================

    function renderAnnouncements(activeAnnouncements) {
        if (activeAnnouncements.length === 0) {
            announcementList.innerHTML = '<div class="empty-announcements">No active announcements</div>';
            return;
        }

        const html = activeAnnouncements.map(announcement => `
            <div class="announcement-item">
                <div class="announcement-date">${formatDate(announcement.startDate)} - ${formatDate(announcement.endDate)}</div>
                <h6>${announcement.title}</h6>
                <p>${announcement.description}</p>
                ${announcement.link ? `<a href="${announcement.link}" class="announcement-link">Learn More →</a>` : ''}
            </div>
        `).join('');

        announcementList.innerHTML = html;
    }

    function updateBadge(count) {
        if (count > 0) {
            badge.textContent = count;
            badge.classList.add('show');
            bell.classList.add('has-unread');
        } else {
            badge.classList.remove('show');
            bell.classList.remove('has-unread');
        }
    }

    // ========================================
    // PANEL TOGGLE
    // ========================================

    function openPanel() {
        panel.classList.add('active');

        const activeAnnouncements = getActiveAnnouncements();
        const activeIds = activeAnnouncements.map(a => a.id);
        markAllAsRead(activeIds);

        updateBadge(0);
    }

    function closePanel() {
        panel.classList.remove('active');
    }

    function togglePanel() {
        if (panel.classList.contains('active')) {
            closePanel();
        } else {
            openPanel();
        }
    }

    // ========================================
    // EVENT LISTENERS
    // ========================================

    function setupEventListeners() {
        bell.addEventListener('click', function (e) {
            e.stopPropagation();
            togglePanel();
        });

        closeBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            closePanel();
        });

        document.addEventListener('click', function (e) {
            if (!panel.contains(e.target) && !bell.contains(e.target)) {
                closePanel();
            }
        });

        panel.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    }

    // ========================================
    // INITIALIZATION
    // ========================================

    function initialize() {
        if (!initializeElements()) {
            return;
        }

        const activeAnnouncements = getActiveAnnouncements();
        const unreadCount = getUnreadCount(activeAnnouncements);

        renderAnnouncements(activeAnnouncements);
        updateBadge(unreadCount);
        setupEventListeners();

        // Hide bell if no active announcements
        if (activeAnnouncements.length === 0) {
            bell.style.display = 'none';
        } else {
            bell.style.display = 'flex';
        }
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }

})();