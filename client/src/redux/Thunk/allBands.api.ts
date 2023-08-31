export const fetchAllBands = async () => {
    try {
      const response = await fetch("http://localhost:3000/bands", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

        const resolve = await response.json();
        console.log(resolve);
        
        return resolve;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };


export const fetchSuggestAddress = async () => {
    try {
        const area_id = 113;
      const response = await fetch(`https://api.hh.ru/areas/${area_id}`);
      const data = await response.json();

  console.log(data);
  
     const newArr = data.areas.map((el) => el.areas.map((el) => el.name))
 
     const flatCities = newArr.flatMap(el =>
    el.map(city => ({ label: city }))
      );

      const cityOne = {label: 'Москва' }
      const cityTwo = {label: 'Санкт-Петербург'}

      flatCities.push(cityOne)
      flatCities.push(cityTwo)
      const filteredCities = flatCities.filter(city => city.label !== 'Александровка');
     
     return filteredCities
    
    } catch (error) {
      console.error('Error fetching cities:', error);
      throw error;
    }
  };
  
