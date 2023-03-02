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
    console.log(data);

    // Main divContainer;
    const divContainer = document.getElementById('divContainer');

    // fetching the each arrayList;
    data.forEach(aiHub=>{
        console.log(aiHub)
    })
}

// Call the aiUniverseData function;
aiUniverseData();