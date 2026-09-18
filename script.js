
// --------------------------------
// DATA
// --------------------------------

const events = [
    {
        id: 1,
        title: "Robotics Demonstration",
        category: "Technology",
        location: "Technology Center",
        date: "September 18",
        time: "2:00 PM",
        description:
            "See student robotics projects in action."
    },
    {
        id: 2,
        title: "Jazz Concert",
        category: "Music",
        location: "Fine Arts Building",
        date: "September 19",
        time: "7:00 PM",
        description:
            "Enjoy an evening of live student jazz."
    },
    {
        id: 3,
        title: "Student Coding Night",
        category: "Technology",
        location: "Innovation Lab",
        date: "September 22",
        time: "6:00 PM",
        description:
            "Build projects and meet other student developers."
    },
    {
        id: 4,
        title: "Intramural Volleyball",
        category: "Athletics",
        location: "Recreation Center",
        date: "September 23",
        time: "5:30 PM",
        description:
            "Join an evening of recreational volleyball."
    },
    {
        id: 5,
        title: "Photography Walk",
        category: "Arts",
        location: "Student Center",
        date: "September 25",
        time: "4:00 PM",
        description:
            "Explore campus while practicing photography."
    },
    {
        id: 6,
        title: "Cybersecurity Club Meetup",
        category: "Technology",
        location: "Technology Center",
        date: "September 26",
        time: "3:30 PM",
        description:
            "Meet students interested in cybersecurity, networking, and digital forensics."
    }
];


// --------------------------------
// DOM REFERENCES
// --------------------------------

const eventList =
    document.querySelector("#event-list");

const eventsHeading =
    document.querySelector("#events-heading");

const eventCount =
    document.querySelector("#event-count");

const searchInput =
    document.querySelector("#search");

const categoryFilter =
    document.querySelector("#category-filter");

const resetButton =
    document.querySelector("#reset-filters");


// --------------------------------
// CREATE ONE EVENT CARD
// --------------------------------

function createEventCard(event) {

    const article =
        document.createElement("article");

    article.classList.add("event-card");


    const title =
        document.createElement("h3");

    title.textContent =
        event.title;


    const category =
        document.createElement("p");

    category.textContent =
        `Category: ${event.category}`;


    const location =
        document.createElement("p");

    location.textContent =
        `Location: ${event.location}`;


    const date =
        document.createElement("p");

    date.textContent =
        `${event.date} at ${event.time}`;


    const description =
        document.createElement("p");

    description.textContent =
        event.description;


    const button =
        document.createElement("button");

    button.textContent =
        "View Event";


    // Listen for a click on this card's button.
    button.addEventListener(
        "click",
        function() {

            alert(
                `${event.title}\n\n` +
                `Category: ${event.category}\n` +
                `Location: ${event.location}\n` +
                `${event.date} at ${event.time}\n\n` +
                `${event.description}`
            );

        }
    );


    article.appendChild(title);
    article.appendChild(category);
    article.appendChild(location);
    article.appendChild(date);
    article.appendChild(description);
    article.appendChild(button);

    return article;
}


// --------------------------------
// DISPLAY EVENTS
// --------------------------------

function displayEvents(eventArray) {

    // Remove the previous cards before rendering again.
    eventList.innerHTML = "";


    // Correct singular/plural wording.
    const eventWord =
        eventArray.length === 1
            ? "event"
            : "events";

    eventCount.textContent =
        `${eventArray.length} ${eventWord} found`;


    // If there are no matching events,
    // give the user a helpful message.
    if (eventArray.length === 0) {

        const message =
            document.createElement("p");

        message.classList.add("no-results");

        message.textContent =
            "No events match your search.";

        eventList.appendChild(message);

        return;
    }


    // Create and display a card for every event.
    eventArray.forEach(
        function(event) {

            const card =
                createEventCard(event);

            eventList.appendChild(card);

        }
    );
}


// --------------------------------
// FILTER EVENTS
// --------------------------------

function filterEvents() {

    // Read current search text.
    // Lowercase it so matching is case-insensitive.
    // trim() removes extra spaces.
    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    // Read the selected category.
    const selectedCategory =
        categoryFilter.value;


    // Useful while learning/debugging.
    console.log("Search:", searchText);
    console.log("Category:", selectedCategory);


    // filter() returns a NEW array.
    const matchingEvents =
        events.filter(
            function(event) {

                // SEARCH CONDITION
                //
                // Match title, category, location,
                // OR description.
                const matchesSearch =

                    event.title
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    event.category
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    event.location
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    event.description
                        .toLowerCase()
                        .includes(searchText);


                // CATEGORY CONDITION
                //
                // "all" accepts every category.
                const matchesCategory =

                    selectedCategory === "all"

                    ||

                    event.category ===
                    selectedCategory;


                // Both conditions must be true.
                return (
                    matchesSearch &&
                    matchesCategory
                );

            }
        );


    console.log(
        "Matching events:",
        matchingEvents
    );


    // Re-render only the matching events.
    displayEvents(matchingEvents);
}


// --------------------------------
// EVENT LISTENERS
// --------------------------------

// "input" fires as the user types.
searchInput.addEventListener(
    "input",
    filterEvents
);


// "change" fires when a different
// category is selected.
categoryFilter.addEventListener(
    "change",
    filterEvents
);


// Reset the controls and display all events.
resetButton.addEventListener(
    "click",
    function() {

        searchInput.value = "";

        categoryFilter.value = "all";

        displayEvents(events);

        searchInput.focus();
    }
);


// --------------------------------
// APPLICATION STARTUP
// --------------------------------

eventsHeading.textContent =
    "Upcoming Events";


// Show every event when the page first loads.
displayEvents(events);
