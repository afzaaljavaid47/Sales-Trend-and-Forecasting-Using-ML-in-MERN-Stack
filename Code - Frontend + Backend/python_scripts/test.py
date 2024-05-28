import pandas as pd
import sys
id=sys.argv[1]
df = pd.read_csv(f"./public/{id}.csv", encoding="ISO-8859-1")
'''converting all column names to lower case'''
df.columns = map(str.lower, df.columns)
try:
    Xdf = df[['invoiceno', 'description', 'quantity', 'invoicedate', 'customerid', 'unitprice', 'country']]
except KeyError as err:
    print("Key error: {0}".format(err))
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
trending_products=pd.DataFrame()
trending_products = df.groupby(['description'])['quantity'].sum().reset_index().sort_values(by=['quantity'], ascending=False).head(5)
trending_products.to_csv(f"./excel_files/{id}/trend.csv")
print(list(trending_products['description']))
print('Sales Forecasting executed successfully !')