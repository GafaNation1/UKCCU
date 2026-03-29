// ============================================================
// UKCCU MEDIA DATA
// To add a gallery item: copy any object in galleryItems and edit.
// To delete: remove the object from the array.
// To add a resource: copy any object in resourceItems and edit.
// To add a document: copy any object in documentItems and edit.
// ============================================================

const mediaData = {

    // -----------------------------------------------------------
    // GALLERY ITEMS
    // category options: "sunday" | "friday" | "outreach"
    // -----------------------------------------------------------
    galleryItems: [
        {
            id: 1,
            category: "sunday",
            image: "photos and videos/OLD SCHOOL SUNDAY.JPG",
            alt: "Old School Sunday",
            badge: "Sunday",
            title: "Old School Sunday (ICT Sunday)",
            description: "View photos from our Old School Sunday",
            albumLink: "https://photos.app.goo.gl/FLJ4pVRpCxyvtAio7",
        },
        {
            id: 2,
            category: "friday",
            image: "photos and videos/Creative Friday.jpeg",
            alt: "Friday Creative Service",
            badge: "Friday",
            title: "Friday Creative Service",
            description: "View photos from our Friday services and worship gatherings",
            albumLink: "https://photos.app.goo.gl/FvaZNpnZPHJGqBhy5",
            
        },
        {
            id: 3,
            category: "sunday",
            image: "photos and videos/Occupational Sunday.jpeg",
            alt: "Sunday Service",
            badge: "Sunday",
            title: "Occupational Sunday Service",
            description: "Browse photos from our Occupational Sunday service.",
            albumLink: "https://photos.app.goo.gl/Ftzk8jRg3JXDLo5f7",
        },
        {
            id: 4,
            category: "sunday",
            image: "photos and videos/Bible Study Launch.JPG",
            alt: "Bible Study Launch",
            badge: "Bible Study",
            title: "Bible Study Launch",
            description: "View photos from the Bible Study Launch event.",
            albumLink: "https://photos.app.goo.gl/6fuoMir5JmnRTDzX9",
        },
        {
            id: 5,
            category: "sunday",
            image: "photos and videos/Jesus Campaign.JPG",
            alt: "Jesus Campaign Inreach",
            badge: "Inreach",
            title: "Jesus Campaign Inreach",
            description: "Photos from our inreach activities during the Jesus Campaign inreach event.",
            albumLink: "https://photos.app.goo.gl/8byPBqYpmJFELAWj8",
        },
        {
            id: 6,
            category: "outreach",
            image: "photos and videos/Children Home Visist.JPG",
            alt: "Children's Home Outreach Visit",
            badge: "Outreach",
            title: "Children's Home Outreach Visit",
            description: "Photos from our outreach visit to a children's home, sharing love and joy with the kids.",
            albumLink: "https://photos.app.goo.gl/Lw3zRydQ5k6nZaTPA",
        },
        {
            id: 7,
            category: "sunday",
            image: "photos and videos/Prayer and Fasting Sunday.JPG",
            alt: "Sunday Prayer and Fasting Service",
            badge: "Sunday",
            title: "Prayer and Fasting Sunday Service",
            description: "Photos from our special Sunday service dedicated to prayer and fasting, where we learnt how to seek God's presence and guidance.",
            albumLink: "https://photos.app.goo.gl/Qh1f8GwZY27aATNb7",
        }
    ],

    // -----------------------------------------------------------
    // RESOURCE ITEMS
    // icon: any Font Awesome class, e.g. "fas fa-book"
    // gradient: any valid CSS gradient string
    // -----------------------------------------------------------
    resourceItems: [
        {
            id: 1,
            icon: "fas fa-book",
            gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            image: "img/about.png",
            alt: "Bible",
            title: "Bible",
            description: "Access digital Bibles and Bible reading plans to deepen your understanding of scripture.",
            link: "#"
        },
        {
            id: 2,
            icon: "fas fa-book-open",
            gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            image: "img/about.png",
            alt: "Bible Guide",
            title: "Bible Guide",
            description: "Study guides and resources for Bible study groups to enhance your group discussions.",
            link: "#"
        },
        {
            id: 3,
            icon: "fas fa-book-reader",
            gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            image: "img/about.png",
            alt: "Online Book",
            title: "Online Books",
            description: "Recommended reading and online book resources for spiritual and personal growth.",
            link: "#"
        }
    ],

    // -----------------------------------------------------------
    // DOCUMENT DOWNLOADS
    // icon: any Font Awesome class, e.g. "fas fa-file-pdf"
    // -----------------------------------------------------------
    documentItems: [
        {
            id: 1,
            icon: "fas fa-file-pdf",
            title: "UKCCU Constitution",
            description: "Download the official UKCCU constitution document containing our bylaws, governance structure, and organizational principles.",
            fileSize: "~2.5 MB",
            lastUpdated: "January 2026",
            downloadLink: "public/UKCCU constitution (1).pdf"
        },
        {
            id: 2,
            icon: "fas fa-book",
            title: "Leadership Manual",
            description: "Comprehensive guide for UKCCU leaders covering roles, responsibilities, procedures, and best practices.",
            fileSize: "~4.1 MB",
            lastUpdated: "January 2026",
            downloadLink: "public/Leadership Manual Revised 2023 (2).pdf"
        }
    ]

};