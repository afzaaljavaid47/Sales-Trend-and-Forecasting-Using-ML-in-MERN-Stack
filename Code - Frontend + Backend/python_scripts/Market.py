import pandas as pd
import numpy as np
from xgboost import XGBClassifier
from sklearn.model_selection import  train_test_split
from sklearn.metrics import accuracy_score
from warnings import filterwarnings
import sys
import os
id=sys.argv[1]

def read_data_etl():
    df = pd.read_csv(f"./public/{id}market.csv", encoding="ISO-8859-1")
    '''converting all column names to lower case'''
    df.columns = map(str.lower, df.columns)
    '''checking if churn or customerid is in file, if not then end the program'''
    try:
        Xdf = df[['offer', 'conversion']]
    except KeyError as err:
        print("Key error")
        exit()
    data = pd.get_dummies(df)
    return data
if __name__ == '__main__':
    filterwarnings('ignore')
    df = read_data_etl()
    labels = df.pop('conversion')
    labels, levels = pd.factorize(labels)
    labels = pd.DataFrame(labels)
    '''spliting into test,train'''
    X_train, X_test, Y_train, Y_test = train_test_split(df, labels, test_size=0.1, random_state=56)
    xgb_model = XGBClassifier().fit(X_train, Y_train)
    a = xgb_model.predict_proba(X_test)
    X_test['probability'] = xgb_model.predict_proba(X_test)[:,1]
    X_test['conversion'] = Y_test
    disc_orders_real = X_test[X_test['offer_Discount'] == 1].conversion.mean() - X_test[X_test['offer_No Offer'] == 1].conversion.mean()
    disc_orders_predict = X_test[X_test['offer_Discount'] == 1].probability.mean() - X_test[X_test['offer_No Offer'] == 1].probability.mean()
    bogo_orders_real = X_test[X_test['offer_Buy One Get One'] == 1].conversion.mean() - X_test[X_test['offer_No Offer'] == 1].conversion.mean()
    bogo_orders_predict = X_test[X_test['offer_Buy One Get One'] == 1].probability.mean() - X_test[X_test['offer_No Offer'] == 1].probability.mean()
    total_disc_order_real = len(X_test) * disc_orders_real
    total_disc_order_predict = len(X_test) * disc_orders_predict
    total_bogo_orders_real = len(X_test) * bogo_orders_real
    total_bogo_orders_predict = len(X_test) * bogo_orders_predict
    print(int(total_disc_order_real))
    print(int(total_disc_order_predict))
    print(int(total_disc_order_real*25))
    print(int(total_disc_order_predict*25))
    print(int(total_bogo_orders_real))
    print(int(total_bogo_orders_predict))
    X_test['probability']= np.where(X_test['probability']>= 0.5, 1, 0)
    actual_y_bogo = X_test[X_test['offer_Buy One Get One'] == 1].conversion
    predict_y_bogo = X_test[X_test['offer_Buy One Get One'] == 1].probability
    actual_y_disc = X_test[X_test['offer_Discount'] == 1].conversion
    predict_y_disc = X_test[X_test['offer_Discount'] == 1].probability
    bogo_accuracy = accuracy_score(actual_y_bogo, predict_y_bogo)
    disc_accuracy = accuracy_score(actual_y_disc,predict_y_disc)
    print(int(bogo_accuracy*100))
    print(int(disc_accuracy*100))