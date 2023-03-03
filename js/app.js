// All Data Loads
const aiUniverseData = async () => {
    // Spinner Showing for Loading the Data;
    isLoading(true);
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    try {
        const res = await fetch(url)
        const data = await res.json()

        // See More Button Enable & Disable functionality;
        const seeMoreBtn = document.getElementById('seeMoreBtn');
        if (data.data.tools.length > 6) {
            seeMoreBtn.classList.remove('d-none')
            displayData(data.data.tools.slice(0, 6))
        }
    } catch (error) {
        console.log('Some Erros occurs:' + error);
    }
}

// Data pass to the Frontend;
const displayData = (data) => {

    //console.log(data)

    
        // Main divContainer;
        const divContainer = document.getElementById('divContainer');
        divContainer.innerHTML = '';
        // fetching the each arrayList;
        data.forEach(aiHub => {
            //console.log(aiHub)

            // Destructuring the array;
            const { description, id, image, name, published_in, features, links } = aiHub;

            //console.log(published_in)

            // Create a div for inserting element to the divContainer;
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div class="card p-3 mainCard">
                    <img src="${image ? image : '../images/error.gif'}" class="card-img-top rounded" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Features</h5>
                        <div>
                            <ol type="1" id="listItem">
                            <li>${features[0] ? features[0] : '<b class="text-danger">No Data Found</b>'}</li>
                            <li>${features[1] ? features[1] : '<b class="text-danger">No Data Found</b>'}</li>
                            <li>${features[2] ? features[2] : '<b class="text-danger">No Data Found</b>'}</li>
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
                            <button onclick="CardDetails('${id}')" class="right-arrow" data-bs-toggle="modal" data-bs-target="#exampleModal"><span><img src="../images/right-arrow.png" /></span></button>
                        </div>
                    </div>
                </div>
        `
            // Inserted to the divContainer
            divContainer.appendChild(div);

            // Spinner Stop after Loading the Data Successfullyl;
            isLoading(false);
        })
}

// See More button Functionality;
document.getElementById('seeMore').addEventListener('click', function () {
    const seeMore = async () => {
        const url = `https://openapi.programming-hero.com/api/ai/tools`;
        try {
            const res = await fetch(url)
            const data = await res.json()
            displayData(data.data.tools)
        } catch (error) {
            console.log('Error may ocuurs;' + error)
        }
    }

    seeMore();
});

// Details of a Card;
const CardDetails = (id) => {

    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => modalData(data.data))
}

// Showing the data to the Modal;
const modalData = (modaldata) => {
    //console.log(modaldata)
    const { description, image_link, pricing, tool_name, use_cases, integrations, input_output_examples, features, accuracy } = modaldata;
    document.getElementById('leftCardTitle').innerText = description;

    document.getElementById('right-div').innerHTML = `
         <img src="${image_link[0] ? image_link[0] : 'Not Found Image'}" class="card-img-top rounded" alt="...">
         <div class="accuracy">
                    ${accuracy.score * 100 > 80 ? '<button class="btn btn-success">Accuracy: ' + accuracy.score * 100 + '%</button>' : '<button class="btn btn-danger">Accuracy Low</button>'
        }
                    
                </div>
            <div class="card-body">
                <h5 class="card-title text-center">${input_output_examples[0].input}</h5>
                <p class="card-text text-center">${input_output_examples[0].output}</p>
                
            </div>
    `;

    const divPricing = document.getElementById('pricing');
    divPricing.innerHTML = `
    <div class="col">
    <div class="card py-3 pricing-card ">
      <div class="card-body p-4  p-lg-1 text-center">
        <h5 class="card-title text-success">${pricing[0].price}</h5>
        <h5 class="card-title text-success">${pricing[0].plan}</h5>
      </div>
    </div>
  </div> 

  <div class="col">
  <div class="card py-3 pricing-card">
    <div class="card-body p-4  p-lg-1 text-center">
    <h5 class="card-title text-warning">${pricing[1].price}</h5>
    <h5 class="card-title text-warning">${pricing[1].plan}</h5>
    </div>
  </div>
</div> 

<div class="col">
<div class="card py-1 pricing-card">
  <div class="card-body p-4 p-lg-1 text-center">
    <h5 class="card-title text-danger">${pricing[2].price}</h5>
    <h5 class="card-title text-danger">${pricing[2].plan}</h5>
  </div>
</div>
</div> 
    `

    // Feature and Integration;
    const featureIntegration = document.getElementById('featureItegration');
    featureIntegration.innerHTML = `
    <div class="col">
    <div class="card pricing-card ">
      <div class="card-body p-1 featureInte">
        <h2 class="card-title fw-bold">Feature</h2>
        <ul>
        <li>${features[1].feature_name} </li>
        <li>${features[2].feature_name} </li>
        <li>${features[3].feature_name} </li>
        </ul>
      </div>
    </div>
  </div> 

  <div class="col">
  <div class="card pricing-card ">
    <div class="card-body p-1 featureInte">
    <h2 class="card-title fw-bold">Integration</h2>
        <ul>
        <li>${integrations[0] ? integrations[0] : '<b class="text-danger">No Data Found</b>'} </li>
        <li>${integrations[1] ? integrations[1] : '<b class="text-danger">No Data Found</b>'} </li>
        <li>${integrations[2] ? integrations[2] : '<b class="text-danger">No Data Found</b>'} </li>
        </ul>
    </div>
  </div>
</div> 
    `
}

// Sort by Date;
document.getElementById('sortByDate').addEventListener('click', function () {
    const sortByDate = async () => {
        const url = `https://openapi.programming-hero.com/api/ai/tools`;
        try {
            const res = await fetch(url)
            const data = await res.json()
            const mainData = data.data.tools;
            mainData.sort((a, b) => new Date(a.published_in) - new Date(b.published_in));

            // See More Button Enable & Disable functionality;
            const seeMoreBtn = document.getElementById('seeMoreBtn');
            if (mainData.length > 6) {
                seeMoreBtn.classList.remove('d-none')
                displayData(mainData)
            }
        } catch (error) {
            console.log('Error may ocuurs;' + error)
        }
    }
    sortByDate()
})

// Spinner Activity;
const isLoading = spinnerLoading =>{
    const spinner = document.getElementById('loading-spinner');
    if(spinnerLoading){
        spinner.classList.remove('d-none');
    }
    else{
        spinner.classList.add('d-none');
    }
}

// Call the aiUniverseData function;
aiUniverseData();