export async function get_data() {
    var geoJsonAl;
    var geoJsonDe;

    try {
        await fetch('http://localhost:8080/get_geojson?region=al')
            .then(response => response.json())
            .then(data => {
                console.log('Received al data from Spring:', data);
                geoJsonAl = data["al"];
            })
            .catch(error => console.error(error));
    }
    catch (error) {
        console.error(error)
    }
    
    try {
        await fetch('http://localhost:8080/get_geojson?region=de')
        .then(response => response.json())
        .then(data => {
            console.log('Received de data from Spring:', data);
            geoJsonDe = data["de"];
        })
        .catch(error => console.error(error));
    }
    catch (error) {
        console.error(error)
    }


    // useEffect(() => {
    //     fetch('http://localhost:8080/get_geojson/sums_geojson')
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log('Received sums data from Spring:',data);
    //             setGeoJsonSums(data)
    //         })
    //         .catch(error => console.error(error));
    // }, []);

    return (
        {"de" : geoJsonDe, "al" : geoJsonAl}
    );
}
