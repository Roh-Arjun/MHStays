async function getConfig(){
    try{
        const url = '../assets/configuration/config.json?' + new Date().getTime(); // Add timestamp
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Cache-Control': 'no-cache',  // Ensure the request is not cached
                'Pragma': 'no-cache',         // Add additional cache control headers
                'Expires': '0',               // Expire the cache immediately
            }
        });
    const config = await response.json();
    const production=false
    if(production===true){
        return config.APIEndPoint
    }else{
        return config.LocalEndPoint
    }
    }
    catch(error){
        console.error('Error fetching properties:', error);
    }
}
config()