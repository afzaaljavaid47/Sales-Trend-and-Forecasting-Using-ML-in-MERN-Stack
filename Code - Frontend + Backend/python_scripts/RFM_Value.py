#columns required
#'customerid', 'invoicedate', 'quantity', 'unitprice'

import pandas as pd
from sklearn.cluster import KMeans
import sys
id=sys.argv[1]
df = pd.read_csv(f"./public/{id}.csv", encoding="ISO-8859-1")
df.columns = map(str.lower, df.columns)
try:
    df = df[['customerid', 'invoicedate', 'quantity', 'unitprice']]
except KeyError as err:
    print("Key error")
    exit()
#----------------------------------Calculate Recency-------------------------------------
#change format of date time according to python scripts like year-month-day hour-minute-seconds

df['invoicedate'] = pd.to_datetime(df['invoicedate'])

user_unique_id = pd.DataFrame(df['customerid'].unique())
user_unique_id.columns = ['customerid']
recent_purchase = df.groupby('customerid').invoicedate.max().reset_index()
recent_purchase.columns = ['customerid', 'RecentPurchaseDate']

recent_purchase['Recency'] = (recent_purchase['RecentPurchaseDate'].max() - recent_purchase['RecentPurchaseDate']).dt.days

user_unique_id = pd.merge(user_unique_id, recent_purchase[['customerid', 'Recency']], on='customerid')

# print(user_unique_id)
#how many clusters are required
sse = {}
tx_recency = user_unique_id[['Recency']]
for k in range(1, 8):
    kmeans = KMeans(n_clusters=k, max_iter=1000).fit(tx_recency)
    #tx_recency["clusters"] = kmeans.labels_
    sse[k] = kmeans.inertia_

kmeans = KMeans(n_clusters=4)
kmeans.fit(user_unique_id[['Recency']])
user_unique_id['RecencyCluster'] = kmeans.predict(user_unique_id[['Recency']])

def order_cluster(cluster_field_name, target_field_name, df, ascending):
    new_cluster_field_name = 'new_' + cluster_field_name
    df_new = df.groupby(cluster_field_name)[target_field_name].mean().reset_index()
    df_new = df_new.sort_values(by=target_field_name, ascending=ascending).reset_index(drop=True)
    df_new['index'] = df_new.index
    df_final = pd.merge(df, df_new[[cluster_field_name, 'index']], on=cluster_field_name)
    df_final = df_final.drop([cluster_field_name], axis=1)
    df_final = df_final.rename(columns={"index": cluster_field_name})
    return df_final
user_unique_id = order_cluster('RecencyCluster', 'Recency', user_unique_id, False)

# print(user_unique_id.groupby('RecencyCluster')['Recency'].describe())

#---------------------------------Frequency--------------------------------------------

user_frequency = df.groupby('customerid').invoicedate.count().reset_index()
user_frequency.columns = ['customerid', 'Frequency']

#add this data to our main dataframe
user_unique_id = pd.merge(user_unique_id, user_frequency, on='customerid')

kmeans = KMeans(n_clusters=4)
kmeans.fit(user_unique_id[['Frequency']])
user_unique_id['FrequencyCluster'] = kmeans.predict(user_unique_id[['Frequency']])

#order the frequency cluster
user_unique_id = order_cluster('FrequencyCluster', 'Frequency', user_unique_id, True)

#---------------------Monetary-----------------------------------------------------------

#calculate revenue for each customer
df['Revenue'] = df['unitprice'] * df['quantity']
user_revenue = df.groupby('customerid').Revenue.sum().reset_index()

#merge it with our main dataframe
user_unique_id = pd.merge(user_unique_id, user_revenue, on='customerid')

kmeans = KMeans(n_clusters=4)
kmeans.fit(user_unique_id[['Revenue']])
user_unique_id['RevenueCluster'] = kmeans.predict(user_unique_id[['Revenue']])

#order the cluster numbers
user_unique_id = order_cluster('RevenueCluster', 'Revenue', user_unique_id, True)

#----------------------------------------Final result--------------------------------------------------------

#calculate overall score and use mean() to see details
user_unique_id['OverallScore'] = user_unique_id['RecencyCluster'] + user_unique_id['FrequencyCluster'] + user_unique_id['RevenueCluster']
#print(user_unique_id)
#print(user_unique_id.groupby('OverallScore')['Recency', 'Frequency', 'Revenue'].mean())

user_unique_id['Segment'] = 'Low-Value'
user_unique_id.loc[user_unique_id['OverallScore']>2,'Segment'] = 'Mid-Value'
user_unique_id.loc[user_unique_id['OverallScore']>4,'Segment'] = 'High-Value'

user_unique_id.to_csv(f"./excel_files/{id}/custSeg.csv")
print("RFM Executed Successfully")