export const fetchAllProfiles = async () => {
    try {
      const response = await fetch("http://localhost:3000/profiles", {
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

  export const fetchAllUserGenres = async (clickedGenres) => {
    try {
      const response = await fetch("http://localhost:3000/userGenres", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clickedGenres),
        credentials: "include",
      });

        const resolve = await response.json();
        
        return resolve;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const fetchAllUserInstruments = async (clickedInstruments) => {
    try {
      const response = await fetch("http://localhost:3000/userInst", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clickedInstruments),
        credentials: "include",
      });

        const resolve = await response.json();
        
        return resolve;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };