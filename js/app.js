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
        //console.log(aiHub)

        // Destructuring the array;
        const {description,id,image,name,published_in,features,links} = aiHub;
       
        // Create a div for inserting element to the divContainer;
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
          <img src="${image ? image:'../images/error.gif' }" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Features</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          </div>
        </div>
        `
        // Inserted to the divContainer
        divContainer.appendChild(div);
    })


    }
}

// Call the aiUniverseData function;
aiUniverseData();