// All Data Loads
const aiUniverseData = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    try {
        const res = await fetch(url)
        const data = await res.json()
        displayData(data.data.tools)
    } catch (error) {
        console.log('Some Erros occurs:' + error);
    }
}

// Data pass to the Frontend;
const displayData = (data) => {
    //console.log(data);

    // Loading Spinner Activity;
    const loadingSpinnerSection = document.getElementById('loadingSpinner');
    const loadingSpinner = document.getElementById('loading-spinner');
    if (data.length < 0) {
        loadingSpinner.innerHTML = `
        <img src="images/loading-spinner.gif" alt="" srcset="">
        `;
        loadingSpinnerSection.appendChild(loadingSpinner);
    }
    else {

        // Main divContainer;
        const divContainer = document.getElementById('divContainer');

        // fetching the each arrayList;
        data.forEach(aiHub => {
            //console.log(aiHub)

            // Destructuring the array;
            const { description, id, image, name, published_in, features, links } = aiHub;

            console.log(features)
            // Create a div for inserting element to the divContainer;
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
        <div class="card p-3">
          <img src="${image ? image : '../images/error.gif'}" class="card-img-top rounded" alt="...">
          <div class="card-body">
            <h5 class="card-title">Features</h5>
            <div>
                <ol id="listItem">
                
                </ol>
            </div>
            <hr>
            <h5>${name}</h5>
            <div class="d-flex justify-content-between">
            <div class="d-flex gap-2 justify-content-start">
            <div class="date-img">
                <img src="../images/date.png" />
            </div>
            <div class="publish-data">
                <p>${published_in}</p>
            </div>
            
        </div>
        <div>
            <button><span class="right-arrow"><img src="../images/right-arrow.png" /></span></button>
        </div>
            </div>
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