import geopandas as gpd
import matplotlib

matplotlib.use('TkAgg')
import matplotlib.pyplot as plt
import topojson as tp

if __name__ == "__main__":
    # Example usage
    directory = '/save_data_250_FIXED/'

    states = ["AL", "DE"]
    races = ['Black', 'White']
    things = ['max', 'min']
    thresholds = ['37','44','50']

    for state in states:
        for race in races:
            for thing in things:
                for threshold in thresholds:
                    gdf = gpd.read_file(f"save_data_250_FIXED/{state}_{race}_{thing}{threshold}.geojson")
                    topo = tp.Topology(gdf,
                                       prequantize=True,
                                       presimplify=3,
                                       toposimplify=3)
                    gdf_simplified = topo.toposimplify(40).to_gdf()
                    gdf_simplified.to_file(f"save_data_250_FIXED/{state}_{race}_{thing}{threshold}.geojson", driver="GeoJSON")

