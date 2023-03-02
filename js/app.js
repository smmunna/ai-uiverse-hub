// All Data Loads
const aiUniverseData = async() =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    try {
        const res = await fetch(url)
        const data = await res.json()
        displayData(data.data.tools)
    } catch (error) {
        console.log('Some Erros occurs:'+error);
    }
}

// Data pass to the Frontend;
const displayData = (data) =>{
    //console.log(data);

    // Loading Spinner Activity;
    const loadingSpinnerSection = document.getElementById('loadingSpinner');
    const loadingSpinner = document.getElementById('loading-spinner');
    if(data.length<0){
        loadingSpinner.innerHTML = `
        <img src="images/loading-spinner.gif" alt="" srcset="">
        `;
        loadingSpinnerSection.appendChild(loadingSpinner);
    }
    else{
        
    // Main divContainer;
    const divContainer = document.getElementById('divContainer');

    // fetching the each arrayList;
    data.forEach(aiHub=>{
        console.log(aiHub)

        // Create a div for inserting element to the divContainer;
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            
        `
    })


    }
}

// Call the aiUniverseData function;
aiUniverseData();