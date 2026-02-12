document.addEventListener('DOMContentLoaded', () => {
    const eventsContainer = document.querySelector('.portfolio-container');
    const portfolioFilters = document.getElementById('portfolio-flters');

    // Function to render events
    function renderEvents() {
        if (!eventsContainer) return;

        eventsContainer.innerHTML = ''; // Clear existing content

        eventsData.forEach(event => {
            // Create Event Card
            const eventItem = document.createElement('div');
            eventItem.className = `col-lg-4 col-md-6 portfolio-item ${event.category} wow fadeInUp`;
            eventItem.setAttribute('data-wow-delay', '0.1s');

            eventItem.innerHTML = `
                <div class="rounded overflow-hidden event-card-inner">
                    <div class="position-relative overflow-hidden">
                        <img class="img-fluid w-100" src="${event.image}" alt="${event.title}">
                        <!-- Removed Overlay -->
                    </div>
                    <div class="bg-light p-4 content-area">
                        <p class="text-primary fw-medium mb-2 text-uppercase" style="font-size: 0.8em; letter-spacing: 1px;">${event.category.replace('-', ' ')}</p>
                        <h5 class="lh-base mb-2">${event.title}</h5>
                        <p class="mb-3 small text-muted"><i class="far fa-calendar-alt me-2"></i>${new Date(event.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        
                        <button class="btn-more-info" data-bs-toggle="modal" data-bs-target="#eventModal-${event.id}">
                            More Info <i class="fa fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            `;

            eventsContainer.appendChild(eventItem);

            // Create Modal
            const modalHTML = `
                <div class="modal fade event-modal" id="eventModal-${event.id}" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-lg">
                        <div class="modal-content">
                            <div class="modal-header border-0">
                                <h5 class="modal-title text-white">${event.title}</h5>
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-md-5 mb-4 mb-md-0">
                                        <img src="${event.image}" class="img-fluid rounded shadow-sm" alt="${event.title}">
                                    </div>
                                    <div class="col-md-7">
                                        <div class="event-details-item">
                                            <i class="fa fa-map-marker-alt"></i>
                                            <div>
                                                <strong>Venue:</strong>
                                                <p class="mb-0 text-muted">${event.venue}</p>
                                            </div>
                                        </div>
                                        
                                        <div class="event-details-item">
                                            <i class="far fa-clock"></i>
                                            <div>
                                                <strong>Time:</strong>
                                                <p class="mb-0 text-muted">${event.time}</p>
                                            </div>
                                        </div>
                                        
                                        <div class="event-details-item">
                                            <i class="far fa-user"></i>
                                            <div>
                                                <strong>Leader Involved:</strong>
                                                <p class="mb-0 text-muted">${event.leader}</p>
                                            </div>
                                        </div>
                                        
                                        <div class="event-details-item">
                                            <i class="far fa-address-book"></i>
                                            <div>
                                                <strong>Contact Person:</strong>
                                                <p class="mb-0 text-muted">${event.contactName} (${event.contactPhone})</p>
                                            </div>
                                        </div>
                                        
                                        <hr>
                                        
                                        <div>
                                            <strong>About Event:</strong>
                                            <p class="text-muted mt-2">${event.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Append modal to specific container
            const modalsContainer = document.getElementById('modals-container');
            if (modalsContainer) {
                modalsContainer.insertAdjacentHTML('beforeend', modalHTML);
            } else {
                document.body.insertAdjacentHTML('beforeend', modalHTML);
            }
        });

        // Initialize Isotope after adding items
        // We need to wait for images to load or just run it, but since this is DOM manipulation we must re-init or layout
        setTimeout(() => {
            // Re-finding elements because they are new
            var portfolioIsotope = $('.portfolio-container').isotope({
                itemSelector: '.portfolio-item',
                layoutMode: 'fitRows'
            });

            $('#portfolio-flters li').on('click', function () {
                $("#portfolio-flters li").removeClass('active');
                $(this).addClass('active');

                portfolioIsotope.isotope({ filter: $(this).data('filter') });
            });
        }, 100);
    }

    // Run render
    renderEvents();
});
