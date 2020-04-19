export const fetchTrails = () => {
  return fetch(
    `https://www.mtbproject.com/data/get-trails?lat=39.5764&lon=-106.7235&maxDistance=25&maxResults=70&key=200333709-${process.env.REACT_APP_MTBPROJECT_API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      return data.trails.map(
        ({
          id,
          name,
          difficulty,
          location,
          imgMedium,
          latitude,
          longitude,
          length,
        }) => {
          return {
            id,
            name,
            difficulty,
            location,
            imgMedium,
            lat: latitude,
            lng: longitude,
            length,
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
          starVotes,
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
            starVotes,
          };
        }
      );
    });
};
