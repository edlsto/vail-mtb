# Vail MTB

Vail MTB is a mountain-biking app designed for mountain bikers who live in Denver and are interested in riding the trails in the Vail area.

Users can selected their desired day over the next five days to bike, and see information about trail conditions, weather forecasts and traffic predictions. They can also choose either Vail or Eagle, and the trail conditions, weather forecasts and traffic predictions will change to reflect that area of the Vail Valley.

Users can also browse the most popular trails in Eagle County, including viewing trails sorted by area. The user can navigate to an individual trail's page to see more details about the trail. The area and trail views include an interactive map.

The app uses the following external APIs:

- Adventure Projects API (mtbproject.com) for trail info.
- Bing Maps API for predictive travel times.
- OpenWeatherMap for weather forecasts.

## Technologies used

- React
- Redux
- React Router
- React Testing Library
- Jest
- Leaflet

## Screen Shots

### Home page:

![image](https://user-images.githubusercontent.com/4350550/79813396-c5e8d880-8338-11ea-88d4-66deb1bcf54d.png)

### The user can selected a different day or area for a ride:

![image](https://user-images.githubusercontent.com/4350550/79813439-e44ed400-8338-11ea-9abd-8fe145b76d88.png)

### The weather, traffic and trail status info automatically updates when a new area or date is selected.

![image](https://user-images.githubusercontent.com/4350550/79813405-ced9aa00-8338-11ea-9804-dfc0ee57ae15.png)

### The top three trails for each area are featured on the home page:

![image](https://user-images.githubusercontent.com/4350550/79813443-e9ac1e80-8338-11ea-8c4b-3b662f1825d2.png)

### The user can explore the trails by area. This view includes an interactive map.

![image](https://user-images.githubusercontent.com/4350550/79813447-ef096900-8338-11ea-8c76-db6752257ff5.png)

### The trail details page offers more info about the trail:

![image](https://user-images.githubusercontent.com/4350550/79813462-f597e080-8338-11ea-9aef-f2b1aa2da35d.png)

## How to install

1. Clone the [repo](https://github.com/edlsto/vail-mtb)

2. `cd` into the directory and run `npm install` and then `npm start`.
