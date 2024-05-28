import pandas as pd
import numpy as np
from fbprophet import Prophet
from datetime import datetime
from sklearn.metrics import mean_squared_error

import sys
id=sys.argv[1]
df = pd.read_csv(f"./public/{id}.csv", encoding="ISO-8859-1")
'''converting all column names to lower case'''
df.columns = map(str.lower, df.columns)
try:
    Xdf = df[['invoiceno', 'description', 'quantity', 'invoicedate', 'customerid', 'unitprice', 'country']]
except KeyError as err:
    print("Key error")
    exit()
#de_duplication
df.drop_duplicates(subset=['invoiceno', 'description', 'quantity', 'invoicedate', 'customerid', 'unitprice', 'country'], keep='first', inplace=True)
#date_format_standardization
if '/' in df['invoicedate']:
    df['invoicedate'] = pd.to_datetime(df.invoicedate, errors='coerce')
    df['invoicedate'] = df['invoicedate'].dt.strftime('%e -%m -%Y')
else:
    df['invoicedate'] = pd.to_datetime(df.invoicedate, errors='coerce')
    df['invoicedate'] = df['invoicedate'].dt.strftime('%m -%e -%Y')   
sales_df=df
new_df = df.groupby(['invoiceno', 'invoicedate', 'customerid', 'country'])['unitprice'].sum()
df = new_df.to_frame().reset_index()
def parser(x):
    return datetime.strptime('190' + x, '%Y-%m')
df['invoicedate'] = pd.to_datetime(df.invoicedate, errors='coerce')
df['invoicedate'] = df['invoicedate'].dt.strftime('%Y-%m-%d')
future_df=df
df = df.groupby(['invoicedate'])['unitprice'].sum()
df = df.to_frame()
df.to_excel(f"./excel_files/{id}/ARIMA.xlsx")
trending_products=pd.DataFrame()
trending_products = sales_df.groupby(['description'])['quantity'].sum().reset_index().sort_values(by=['quantity'], ascending=False).head(5)
all_trending_products = sales_df.groupby(['description'])['quantity'].sum().reset_index().sort_values(by=['quantity'], ascending=False)
sales_df['total_price']=sales_df['unitprice']*sales_df['quantity']
sales_df['total_price']=sales_df['total_price'].apply(int)
all_trending_products_by_sale_price_5 = sales_df.groupby(['description'])['total_price'].sum().reset_index().sort_values(by=['total_price'], ascending=False).head(5)
all_trending_products_by_sale_price_all = sales_df.groupby(['description'])['total_price'].sum().reset_index().sort_values(by=['total_price'], ascending=False)
products=list(trending_products['description'])
products=[i for i in reversed(products)]
print(products)
prices=list(trending_products['quantity'])
prices=[i for i in reversed(prices)]
print(prices)
trending_products.to_csv(f"./excel_files/{id}/trend_5.csv")
all_trending_products.to_csv(f"./excel_files/{id}/trend_all.csv")
all_trending_products_by_sale_price_5.to_csv(f"./excel_files/{id}/trend_by_sales_5.csv")
all_trending_products_by_sale_price_all.to_csv(f"./excel_files/{id}/trend_by_sales_all.csv")
print('Sales Forecasting Executed Successfully !')

df = pd.read_csv(f"./public/{id}.csv", encoding="ISO-8859-1")
df.columns = map(str.lower, df.columns)
try:
    Xdf = df[['invoiceno', 'description', 'quantity', 'invoicedate', 'customerid', 'unitprice', 'country']]
except KeyError as err:
    print("Key error: {0}".format(err))
    exit()
df.drop_duplicates(subset=['invoiceno', 'description', 'quantity', 'invoicedate', 'customerid', 'unitprice', 'country'], keep='first', inplace=True)
if '/' in df['invoicedate']:
    df['invoicedate'] = pd.to_datetime(df.invoicedate, errors='coerce')
    df['invoicedate'] = df['invoicedate'].dt.strftime('%e -%m -%Y')
else:
    df['invoicedate'] = pd.to_datetime(df.invoicedate, errors='coerce')
    df['invoicedate'] = df['invoicedate'].dt.strftime('%m -%e -%Y')
new_df = df.groupby(['invoiceno', 'invoicedate', 'customerid', 'country'])['unitprice'].sum()
new_dff = new_df.to_frame()
df['invoicedate'] = pd.to_datetime(df.invoicedate, errors='coerce')
df['invoicedate'] = df['invoicedate'].dt.strftime('%Y-%m-%d')
df['total']=df['unitprice']*df['quantity']
df = df.groupby(['invoicedate'])['total'].sum().reset_index()
df=pd.DataFrame(df)
from sklearn.metrics import mean_absolute_error
df['ds']=df['invoicedate']
df['y']=df['total']
df=pd.DataFrame(df)
df.drop(['invoicedate','total'],axis='columns',inplace=True)
df=df.set_index('ds').reset_index()
index = df.index
number_of_rows = len(index)

size = int(len(df) * .85)
train, test = df[0:size], df[size:]
m = Prophet()
m.fit(train)
future = m.make_future_dataframe(periods=len(test)+32)
forecast = m.predict(future)
new_df=forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']]
predict=pd.DataFrame()
predict['date']=new_df['ds']

predict['date'] = pd.to_datetime(predict.date, errors='coerce')
predict['date'] = predict['date'].dt.strftime('%Y-%m-%d')

predict['predicted_sales']=abs(new_df['yhat']).astype(int)
predict['higher_predicted_sales']=abs(new_df['yhat_upper']).astype(int)
predict['lower_predicted_sales']=abs(new_df['yhat_lower']).astype(int)

# predict=predict.set_index('date')

test.to_csv(f"./excel_files/{id}/trest_data.csv")
df1=pd.read_csv(f"./excel_files/{id}/trest_data.csv")
predict.loc[len(train)+1:len(train)+len(test)].to_csv(f"./excel_files/{id}/Train_Fecasting_Data.csv")
predict.loc[len(df)+2:].to_excel(f"./excel_files/{id}/Next_30Days_Forecasting.xlsx")
predict.loc[len(df)+2:].to_csv(f"./excel_files/{id}/Next_30Days_Forecasting.csv")
df2=pd.read_csv(f"./excel_files/{id}/Train_Fecasting_Data.csv")
error = np.sqrt(mean_absolute_error(df1['y'],df2['predicted_sales']))
print('Test RMSE: %f' % error)
print('Test RMSE: %f' % error)