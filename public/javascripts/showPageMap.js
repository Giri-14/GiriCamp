// const campground = require("../../models/campground");

// const campground = require("../../models/campground");

// mapboxgl.accessToken = mapToken;
// const map = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
//     center: [-74.5,40], // starting position [lng, lat]
//     zoom: 10 // starting zoom
// });


// mapboxgl.accessToken = mapToken;
// const map = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
//     center:campground.geometry.coordinates, // starting position [lng, lat]
//     zoom: 8 // starting zoom
// });

// new mapboxgl.Marker()
//     .setLngLat(campground.geometry.coordinates)
//     .addTo(map)
    // .setPopup(
    //     new mapboxgl.Popup({offset:25})
    //        .setHTML(
    //         `<h3>${campground.title}</h3>`
    //        )
    // )
    
    // .setPopup(
    //     new mapboxgl.Popup({ offset: 25 })
    //         .setHTML(
    //             `<h3>${campground.title}</h3><p>${campground.location}</p>`
    //         )
    // )
    
    // 


//-------------------------------------
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10', // stylesheet location
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 10 // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());


new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${campground.title}</h3><p>${campground.location}</p>`
            )
    )
    .addTo(map)