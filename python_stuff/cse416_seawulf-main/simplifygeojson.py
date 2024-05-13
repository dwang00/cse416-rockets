import geopandas as gpd
import matplotlib

matplotlib.use('TkAgg')
import matplotlib.pyplot as plt
import topojson as tp

if __name__ == "__main__":
    # Example usage
    gdf = gpd.read_file("DE_AL_data_250/DE_White_max37.geojson")

    topo = tp.Topology(gdf,
                       prequantize=True,
                       presimplify=3,
                       toposimplify=3)
    gdf_simplified = topo.toposimplify(40).to_gdf()

    gdf_simplified.to_file("DE_AL_data_250/DE_White_max37.geojson", driver="GeoJSON")