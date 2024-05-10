export async function get_data() {

    var geoJsonAl;
    var geoJsonDe;

    //const [selectedRows, setSelectedRows] = useState();
    /*
    useEffect(() => {

        const uniqueSelectedRowsData = props.selectedRows.filter((row, index, self) =>
                index === self.findIndex(r => (
                    r.district === row.district && r.state === row.state
                ))
        );
        const modifiedRows = uniqueSelectedRowsData.map(row => {
            if (row.state === "ALABAMA") {
                return { ...row, state: "al" };
            } else if (row.state === "DELAWARE") {
                return { ...row, state: "de" };
            }
            return row;
        });
        setSelectedRows(modifiedRows)
    }, [props.selectedRows]);

     */

    // const [geojsonData, setGeojsonData] = useState();


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
