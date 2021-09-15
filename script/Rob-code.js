const convertData = (data) => {
    // results should be array of objects
    const { results } = data;

    //cats and dogs will be array of objects
    const cats =[];
    const dogs;
    
    results.forEach((result) => {

      if (result.type === "cat") {
        // catlist should be ul
        const catList = document.getElementById("catlist");
        const cat     = document.createElement("li");
        cat.innerText = result.name;
        catList.appendChild(cat);
        cats.push(result);

      } else {
        const dogList = document.getElementById("doglist");
        const dog = document.createElement("li");
        dog.innerText = result.name;
        dogList.appendChild(dog);
        dogs.push(result);
      }
    });
    
    return {
      cats,
      dogs,
    };
   };

   // bug
   // explain
   // change suggests