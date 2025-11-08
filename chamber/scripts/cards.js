// solution to scroll to top on page load
window.addEventListener('load', function () {
    console.log('Page loaded - Scroll to top');
    window.scrollTo(10, 0);
});

// when DOM is ready, scroll to top
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded - Scroll to top');
    window.scrollTo(0, 0);
});

// Prevent automatic scroll restoration
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

// hamburger menu toggle
document.addEventListener('DOMContentLoaded', function () {
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    if (hamburgerIcon && navMenu) {
        hamburgerIcon.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            body.classList.toggle('mobile-menu-active');

            // Change hamburger icon to X when active
            if (navMenu.classList.contains('active')) {
                hamburgerIcon.src = '../images/x-icon.svg';
            } else {
                hamburgerIcon.src = '../images/hamburger-button-icon.svg';
            }
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
                body.classList.remove('mobile-menu-active');
                hamburgerIcon.src = '../images/hamburger-button-icon.svg';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (event) {
            if (!event.target.closest('.nav-bar') && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                body.classList.remove('mobile-menu-active');
                hamburgerIcon.src = '../images/hamburger-button-icon.svg';
            }
        });
    }
});

let members = [];
let currentView = 'grid';

document.addEventListener('DOMContentLoaded', function () {
    console.log('Page loaded - Starting directory...');
    loadMembers();
    setupViewButtons();
});

// async function to load member data from JSON file
async function loadMembers() {
    try {
        console.log('Loading member data...');

        // ask for the JSON file
        const response = await fetch('data/members.json');

        if (!response.ok) {
            throw new Error('The JSON file could not be loaded.');
        }

        // Convert the response to JSON
        const data = await response.json();
        members = data.members;

        console.log('Members loaded:', members.length);

        // show members on the page
        showMembers();

    } catch (error) {
        console.error('Error:', error);
        showError('The data could not be loaded. Please try reloading the page.');
    }
}

// Show all members in the container
function showMembers() {
    const container = document.getElementById('membersGrid');

    if (!container) {
        console.error('The container for members was not found.');
        return;
    }

    // clear existing content
    container.innerHTML = '';

    // if no members, show a message
    if (members.length === 0) {
        container.innerHTML = '<p>There are no members to display.</p>';
        return;
    }

    // Create a card for each member and add it to the container
    members.forEach(member => {
        const card = createMemberCard(member);
        container.appendChild(card);
    });
}

// Create a card element for a member
function createMemberCard(member) {
    // Create article element for the cards
    const card = document.createElement('article');
    card.className = 'member-card';

    // Add membership level class for styling
    if (member.membershipLevel === 3) {
        card.classList.add('gold');
    } else if (member.membershipLevel === 2) {
        card.classList.add('silver');
    }

    // Create the inner HTML of the card
    card.innerHTML = `
        <h3>${member.name}</h3>
        <p class="member-description">${member.description}</p>
        <div class="divider"></div>
        <div class="card-content">
            <div class="logo-container">
                <img src="images/${member.image}" alt="${member.name}" loading="lazy" class="member-logo">
            </div>
            <div class="contact-info">
                <div class="contact-item">
                    <span class="contact-icon">🏠︎</span>
                    <span class="contact-text">${member.address}</span>
                </div>
                <div class="contact-item">
                    <span class="contact-icon">✉︎</span>
                    <span class="contact-text">${createEmail(member)}</span>
                </div>
                <div class="contact-item">
                    <span class="contact-icon">📱</span>
                    <span class="contact-text">${member.phone}</span>
                </div>
                <div class="contact-item">
                    <span class="contact-icon">🌐</span>
                    <span class="contact-text">
                        <a href="${member.website}" target="_blank" class="website-link">Visit Website</a>
                    </span>
                </div>
                ${createMembershipBadge(member.membershipLevel)}
            </div>
        </div>
    `;

    return card;
}
// create a simple email based on the member's name
function createEmail(member) {
    // Convert name to lowercase and remove spaces/special characters
    const emailName = member.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    return `info@${emailName}.com`;
}

// create membership badge based on level
function createMembershipBadge(level) {
    if (level === 3) {
        return '<span class="member-badge badge-gold">Gold Member</span>';
    } else if (level === 2) {
        return '<span class="member-badge badge-silver">Silver Member</span>';
    } else {
        return '<span class="member-badge badge-member">Member</span>';
    }
}

// configure view buttons
function setupViewButtons() {
    const gridButton = document.getElementById('gridView');
    const listButton = document.getElementById('listView');

    if (gridButton && listButton) {
        // on click "Grid View"
        gridButton.addEventListener('click', function () {
            switchToGridView();
        });

        // on click "List View"
        listButton.addEventListener('click', function () {
            switchToListView();
        });
    }
}

// change to grid view
function switchToGridView() {
    currentView = 'grid';

    // update buttons
    document.getElementById('gridView').classList.add('active');
    document.getElementById('listView').classList.remove('active');

    // change container class
    const container = document.getElementById('membersGrid');
    container.className = 'members-grid';

    // show members in grid view
    showMembers();
}

// change to list view
function switchToListView() {
    currentView = 'list';

    // update buttons
    document.getElementById('gridView').classList.remove('active');
    document.getElementById('listView').classList.add('active');

    // change container class
    const container = document.getElementById('membersGrid');
    container.className = 'members-list';

    // show members in list view
    showListView();
}

// show members in list view
function showListView() {
    const container = document.getElementById('membersGrid');
    container.innerHTML = '';

    members.forEach(member => {
        const listItem = document.createElement('div');
        listItem.className = 'member-list-item';

        if (member.membershipLevel === 3) {
            listItem.classList.add('gold');
        } else if (member.membershipLevel === 2) {
            listItem.classList.add('silver');
        }

        listItem.innerHTML = `
            <h3>${member.name}</h3>
            <div>
                <p>📞 ${member.phone}</p>
            </div>
            <div>
                <p><a href="${member.website}" target="_blank">${member.website}</a></p>
            </div>
        `;

        container.appendChild(listItem);
    });
}

// display error message
function showError(message) {
    const container = document.getElementById('membersGrid');
    if (container) {
        container.innerHTML = `<p class="error-message">${message}</p>`;
    }
}

// footer date update
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;