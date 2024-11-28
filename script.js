// Sample data
const agencies = [
    {
        id: 1,
        name: "Digital Solutions Agency",
        description: "Full-service digital marketing and web development",
        services: ["Digital Marketing", "Web Development", "SEO"],
        location: "New York",
        rating: 4.8,
        expertise: ["E-commerce", "B2B", "Startups"],
        contactEmail: "contact@digitalsolutions.com",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c",
        minPrice: 1000,
        maxPrice: 5000
    },
    {
        id: 2,
        name: "Creative Minds Co",
        description: "Creative design and branding solutions",
        services: ["Branding", "UI/UX Design", "Graphic Design"],
        location: "San Francisco",
        rating: 4.6,
        expertise: ["Retail", "Technology", "Healthcare"],
        contactEmail: "hello@creativeminds.com",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
        minPrice: 2000,
        maxPrice: 7500
    }
];

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    const icon = themeToggle.querySelector('i');
    if (document.body.getAttribute('data-theme') === 'dark') {
        document.body.removeAttribute('data-theme');
        icon.classList.replace('fa-sun', 'fa-moon');
    } else {
        document.body.setAttribute('data-theme', 'dark');
        icon.classList.replace('fa-moon', 'fa-sun');
    }
});

// Populate filters
function populateFilters() {
    const locations = [...new Set(agencies.map(agency => agency.location))];
    const services = [...new Set(agencies.flatMap(agency => agency.services))];
    
    const locationFilter = document.getElementById('location-filter');
    const serviceFilter = document.getElementById('service-filter');

    locations.forEach(location => {
        const option = document.createElement('option');
        option.value = location;
        option.textContent = location;
        locationFilter.appendChild(option);
    });

    services.forEach(service => {
        const option = document.createElement('option');
        option.value = service;
        option.textContent = service;
        serviceFilter.appendChild(option);
    });
}

// Render agency cards
function renderAgencies(filteredAgencies = agencies) {
    const agencyList = document.getElementById('agency-list');
    agencyList.innerHTML = '';

    filteredAgencies.forEach(agency => {
        const card = document.createElement('div');
        card.className = 'agency-card';
        card.innerHTML = `
            <img src="${agency.image}" alt="${agency.name}">
            <div class="agency-card-content">
                <h3>${agency.name}</h3>
                <p>${agency.location}</p>
                <p>${agency.description}</p>
                <div class="services">
                    ${agency.services.map(service => `<span class="tag">${service}</span>`).join('')}
                </div>
            </div>
        `;
        card.addEventListener('click', () => showAgencyDetail(agency));
        agencyList.appendChild(card);
    });
}

// Show agency detail in modal
function showAgencyDetail(agency) {
    const modal = document.getElementById('agency-modal');
    const detail = document.getElementById('agency-detail');
    
    detail.innerHTML = `
        <h2>${agency.name}</h2>
        <div class="rating">Rating: ${agency.rating}/5</div>
        <p>${agency.description}</p>
        <h3>Location</h3>
        <p>${agency.location}</p>
        <h3>Services</h3>
        <div class="services">
            ${agency.services.map(service => `<span class="tag">${service}</span>`).join('')}
        </div>
        <h3>Expertise</h3>
        <div class="expertise">
            ${agency.expertise.map(exp => `<span class="tag">${exp}</span>`).join('')}
        </div>
        <button onclick="window.location.href='mailto:${agency.contactEmail}'">Contact Agency</button>
    `;
    
    modal.style.display = 'block';
}

// Close modal
document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('agency-modal').style.display = 'none';
});

// Filter functionality
function setupFilters() {
    const searchInput = document.getElementById('search');
    const locationFilter = document.getElementById('location-filter');
    const serviceFilter = document.getElementById('service-filter');
    const priceRange = document.getElementById('price-range');

    function filterAgencies() {
        const searchTerm = searchInput.value.toLowerCase();
        const location = locationFilter.value;
        const service = serviceFilter.value;
        const maxPrice = parseInt(priceRange.value);

        const filtered = agencies.filter(agency => {
            const matchesSearch = agency.name.toLowerCase().includes(searchTerm) ||
                                agency.description.toLowerCase().includes(searchTerm);
            const matchesLocation = !location || agency.location === location;
            const matchesService = !service || agency.services.includes(service);
            const matchesPrice = agency.maxPrice <= maxPrice;

            return matchesSearch && matchesLocation && matchesService && matchesPrice;
        });

        renderAgencies(filtered);
    }

    searchInput.addEventListener('input', filterAgencies);
    locationFilter.addEventListener('change', filterAgencies);
    serviceFilter.addEventListener('change', filterAgencies);
    priceRange.addEventListener('input', (e) => {
        document.getElementById('price-range-value').textContent = 
            `$0 - $${e.target.value}`;
        filterAgencies();
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    populateFilters();
    renderAgencies();
    setupFilters();
}); 