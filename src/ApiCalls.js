export const fetchTrails = () => {
  return fetch(
    `https://www.mtbproject.com/data/get-trails?lat=39.608581&lon=-106.448480&maxDistance=5&maxResults=40&key=200333709-${process.env.REACT_APP_MTBPROJECT_API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      return data.trails.map(
        ({
          id,
          name,
          summary,
          difficulty,
          stars,
          location,
          url,
          imgMedium,
          length,
          ascent,
          descent,
          high,
          low,
          latitude,
          longitude,
        }) => {
          return {
            id,
            name,
            summary,
            difficulty,
            stars,
            location,
            url,
            imgMedium,
            length,
            ascent,
            descent,
            high,
            low,
            lat: latitude,
            lng: longitude,
          };
        }
      );
    });
};

export const fetchTrail = (id) => {
  return fetch(
    `https://www.mtbproject.com/data/get-trails-by-id?ids=${id}&key=200333709-${process.env.REACT_APP_MTBPROJECT_API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      return data.trails.map(
        ({
          id,
          name,
          summary,
          difficulty,
          stars,
          location,
          url,
          imgMedium,
          length,
          ascent,
          descent,
          high,
          low,
          latitude,
          longitude,
        }) => {
          return {
            id,
            name,
            summary,
            difficulty,
            stars,
            location,
            url,
            imgMedium,
            length,
            ascent,
            descent,
            high,
            low,
            lat: latitude,
            lng: longitude,
          };
        }
      );
    });
};
