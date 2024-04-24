import pandas as pd
import geopandas as gpd
import matplotlib
matplotlib.use('TkAgg')
import matplotlib.pyplot as plt
from gerrychain import (Partition, Graph, MarkovChain,
                        updaters, constraints, accept,
                        GeographicPartition)
from gerrychain.proposals import recom
from gerrychain.tree import bipartition_tree
from gerrychain.constraints import contiguous
from functools import partial

from shapely.geometry import shape
from shapely.strtree import STRtree

if __name__ == '__main__':
    gdf = gpd.read_file('DE_sldl.zip')

    # Assume you have a specific polygon you want to find neighbors for
    target_polygon_id = 1  # Change this to the index of your target polygon
    target_polygon = gdf.geometry.iloc[target_polygon_id]
    print(f"Neighbors for: {gdf['DISTRICT'].iloc[target_polygon_id]}")

    # Create a spatial index using STRtree
    tree = STRtree(gdf.geometry)

    # Find neighbors of the target polygon
    neighbors = tree.query(target_polygon, predicate='touches')

    print(neighbors) # true indices
    print(tree.geometries.take(neighbors).tolist())

    neighbors = list(map(lambda n: gdf['DISTRICT'].iloc[n], neighbors))
    # gdf.iloc[target_polygon_id]['Adjacency'] = neighbors

    print(neighbors)