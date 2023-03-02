// All Data Loads
const aiUniverseData = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    try {
        const res = await fetch(url)
        const data = await res.json()

        // See More Button Enable & Disable functionality;
        const seeMoreBtn = document.getElementById('seeMoreBtn');

        if(data.data.tools.length>6){
            seeMoreBtn.classList.remove('d-none')
            displayData(data.data.tools.slice(0,6))
        }   
    } catch (error) {
        console.log('Some Erros occurs:' + error);
    }
}

// Data pass to the Frontend;
const displayData = (data) => {
     console.log(data);
    
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
        divContainer.innerHTML='';
        // fetching the each arrayList;
        data.forEach(aiHub => {
            //console.log(aiHub)
           
            // Destructuring the array;
            const { description, id, image, name, published_in, features, links } = aiHub;
            
            // Create a div for inserting element to the divContainer;
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div class="card p-3">
                    <img src="${image ? image : '../images/error.gif'}" class="card-img-top rounded" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Features</h5>
                        <div>
                            <ol type="1" id="listItem">
                            <li>${features[0]?features[0]:'<b class="text-danger">No Data Found</b>'}</li>
                            <li>${features[1]?features[1]:'<b class="text-danger">No Data Found</b>'}</li>
                            <li>${features[2]?features[2]:'<b class="text-danger">No Data Found</b>'}</li>
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
        })

       
    }
}

// See More button Functionality;
    document.getElementById('seeMore').addEventListener('click',function(){
        const seeMore = async() =>{
            const url = `https://openapi.programming-hero.com/api/ai/tools`;
            try {
                const res = await fetch(url)
                const data = await res.json()
                displayData(data.data.tools)
            } catch (error) {
                console.log('Error may ocuurs;'+error)
            }
        }

        seeMore();
    });

// Details of a Card;
const CardDetails = (id) =>{
    
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
     fetch(url)
        .then(res=>res.json())
        .then(data=>modalData(data.data))
}

// Showing the data to the Modal;
const modalData = (modaldata) =>{
    console.log(modaldata)
    const {description,logo,pricing,tool_name,use_cases,integrations,input_output_examples} = modaldata;
    document.getElementById('leftCardTitle').innerText = description;
}

// Call the aiUniverseData function;
aiUniverseData();