// All Data Loads
const aiUniverseData = async() =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    try {
        const res = await fetch(url)
        const data = await res.json()
        console.log(data.data.tools)
    } catch (error) {
        console.log('Some Erros occurs:'+error);
    }
}


// Call the aiUniverseData function;
aiUniverseData();