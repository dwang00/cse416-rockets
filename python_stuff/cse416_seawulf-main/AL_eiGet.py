from pymongo import MongoClient

import pandas as pd
import csv
import json

# Connect to MongoDB
#client = MongoClient('mongodb://localhost:27017/')
#db = client['cse416-rockets']
#collection = db['your_collection']

'''

# Read CSV file into DataFrame
df = pd.read_csv('AL_l2_2022stats_2020block.csv')

# List of columns you want to keep
columns_to_keep = ['total_reg', 'party_rep', 'party_dem', 'eth1_eur', 'eth1_aa']

# Drop columns except the ones in columns_to_keep
columns_to_drop = [col for col in df.columns if col not in columns_to_keep]
df.drop(columns=columns_to_drop, inplace=True)

df = df.dropna(subset=[col for col in df.columns if 0 in df[col].values])

df['party_other'] = df['total_reg'] - df['party_rep'] - df['party_dem']
df['eth1_other'] = df['total_reg'] - df['eth1_eur'] - df['eth1_aa']

df['pct_party_rep'] = df['party_rep'] / df['total_reg']
df['pct_party_dem'] = df['party_dem'] / df['total_reg']
df['pct_party_other'] = df['party_other'] / df['total_reg']

df['pct_eth1_eur'] = df['eth1_eur'] / df['total_reg']
df['pct_eth1_aa'] = df['eth1_aa'] / df['total_reg']
df['pct_eth1_other'] = df['eth1_other'] / df['total_reg']



df.to_csv('AL_ei_data.csv')
'''
# Print the resulting DataFrame
#print(df)

df = pd.read_csv('al_2022_gen_prec.csv')

columns_to_keep = ['County', 'G22GOVDFLO', 'G22GOVRIVE', 'G22GOVOWRI', 'G22GOVLBLA']

# Create a new DataFrame containing only the columns to keep
df = df[columns_to_keep]
df['County'] = df['County'].str.upper()
df = df.groupby('County').sum().reset_index()
df['votecount'] = df['G22GOVDFLO'] + df['G22GOVRIVE'] + df['G22GOVOWRI'] + df['G22GOVLBLA']
del df['G22GOVOWRI']
del df['G22GOVLBLA']
df.rename(columns={'G22GOVDFLO':'voted_for_flowers'}, inplace=True)
df.rename(columns={'G22GOVRIVE':'voted_for_ivey'}, inplace=True)

df2 = pd.read_csv('AL_l2_2022stats_county.csv')

#voted_all will be used as population
columns_to_keep2 = ['countyname', 'g20221108_voted_eur', 'g20221108_voted_aa']
df2 = df2[columns_to_keep2]
df2.rename(columns={'countyname': 'County'}, inplace=True)
#df2.rename(columns={'g20221108_voted_all': 'votecount'}, inplace=True)
df2.rename(columns={'g20221108_voted_eur': 'voted_eur'}, inplace=True)
df2.rename(columns={'g20221108_voted_aa': 'voted_aa'}, inplace=True)

merged_df = pd.merge(df, df2, on='County', how='inner')

merged_df['voted_for_others'] = merged_df['votecount'] - merged_df['voted_for_flowers'] - merged_df['voted_for_ivey']
merged_df['voted_oth'] = merged_df['votecount'] - merged_df['voted_eur'] - merged_df['voted_aa']

del merged_df['County']
negative_rows = merged_df[(merged_df < 0).any(axis=1)]
merged_df = merged_df.drop(negative_rows.index)

merged_df['pct_flowers'] = merged_df['voted_for_flowers'] / merged_df['votecount']
merged_df['pct_ivey'] = merged_df['voted_for_ivey'] / merged_df['votecount']
merged_df['pct_others'] = merged_df['voted_for_others'] / merged_df['votecount']

columns_to_normalize = merged_df[['pct_flowers', 'pct_ivey', 'pct_others']]
row_sums = columns_to_normalize.sum(axis=1)
normalized_cols = columns_to_normalize.div(row_sums, axis=0)
merged_df[['pct_flowers', 'pct_ivey', 'pct_others']] = normalized_cols

merged_df['pct_eth_eur'] = merged_df['voted_eur'] / merged_df['votecount']
merged_df['pct_eth_aa'] = merged_df['voted_aa'] / merged_df['votecount']
merged_df['pct_eth_oth'] = merged_df['voted_oth'] / merged_df['votecount']

columns_to_normalize = merged_df[['pct_eth_eur', 'pct_eth_aa', 'pct_eth_oth']]
row_sums = columns_to_normalize.sum(axis=1)
normalized_cols = columns_to_normalize.div(row_sums, axis=0)
merged_df[['pct_eth_eur', 'pct_eth_aa', 'pct_eth_oth']] = normalized_cols


merged_df.to_csv('AL_countydata.csv', index=False)
