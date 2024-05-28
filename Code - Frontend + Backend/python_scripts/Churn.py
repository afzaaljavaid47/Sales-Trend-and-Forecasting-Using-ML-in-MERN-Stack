import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
from sklearn.model_selection import train_test_split
from xgboost import XGBClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import confusion_matrix, recall_score, precision_score, f1_score
import warnings
import sys
import os
id=sys.argv[1]

def read_data_etl():
    df = pd.read_csv(f"./public/{id}churn.csv", encoding="ISO-8859-1")
    '''removing empty rows'''
    for col in df.columns:
        df[col].replace(' ', np.nan, inplace=True)
        df.dropna(subset=[col], inplace=True)

    '''converting all column names to lower case'''
    df.columns = map(str.lower, df.columns)

    '''checking if churn or customerid is in file, if not then end the program'''
    try:
        Xdf = df[['customerid', 'churn']]
    except KeyError as err:
        print("Key error")
        exit()
    return df

def clustering_data():
    cols = []
    for col in df.columns:

        if df[col].nunique() == 2 or df[col].dtype == np.object:  # binary column or string column
            pass
        else:
            user_unique_id = df[[col]]

            '''how many clusters are required'''
            sse = {}
            tx = user_unique_id[[col]]
            for k in range(1, 10):
                kmeans = KMeans(n_clusters=k, max_iter=1000).fit(tx)

                sse[k] = kmeans.inertia_

            kmeans = KMeans(n_clusters=3)
            kmeans.fit(user_unique_id[[col]])
            temp = pd.DataFrame(user_unique_id)
            df[col] = kmeans.predict(temp[[col]])

            temp_df = pd.get_dummies(df[col])

            temp_df.columns = [str(col) + '_low', str(col) + '_mid', str(col) + '_high']

            df[str(col) + '_low'] = temp_df[str(col) + '_low']
            df[str(col) + '_mid'] = temp_df[str(col) + '_mid']
            df[str(col) + '_high'] = temp_df[str(col) + '_high']

            cols.append(str(col))

    df.drop(cols, axis=1, inplace=True)

    return df

def train_fit_models(labels, df_x):

    X_train, X_test, Y_train, Y_test = train_test_split(df.values, labels.values, test_size=0.1)

    '''XGBOOST is more efficient and uses gradient boosting and has a slightly enhanced algo'''
    '''combining the estimates of a set of simpler, weaker models'''
    xgb_model = XGBClassifier(max_depth=5, learning_rate=0.08, objective='binary:logistic', n_jobs=-1, iter=1000)
    xgb_model.fit(X_train, Y_train.ravel())
    pred_test = xgb_model.predict(X_test)
    print_metrics(X_test, Y_test, pred_test, xgb_model)

    X_train = pd.DataFrame(X_train)

    df_x = df_x.iloc[len(X_train[0]):]

    df_x = pd.DataFrame(df_x)

    df_x['churn'] = list(pred_test)

    df_x.to_csv(f"./excel_files/{id}/churn.csv", index=False)

    '''
    model = LogisticRegression(solver='liblinear', random_state=56, C=1e35)
    model.fit(X_train, Y_train.ravel())
    pred_test = model.predict(X_test)
    print_metrics(X_test, Y_test, pred_test, model)
    '''
    return


def print_metrics(X_test, Y_test, pred_test, model):
    conf_matrix = confusion_matrix(Y_test, pred_test)
    print(conf_matrix)
    print(int(recall_score(Y_test, pred_test) * 100))
    print(int(model.score(np.array(X_test), np.array(Y_test)) * 100))
    print(int(precision_score(Y_test, pred_test) * 100))
    tn, fp, fn, tp = conf_matrix.ravel()
    fp_rate = float(fp) / float(fp + tn) * 100
    print(int(fp_rate))
    print(int(f1_score(Y_test, pred_test) * 100))
    return

if __name__ == '__main__':

    df = read_data_etl()

    labels = df.pop('churn')

    df_x = df.customerid.copy(deep=True)

    labels, levels = pd.factorize(labels)

    labels = pd.DataFrame(labels)

    df = df.apply(lambda x: pd.factorize(x)[0])

    with warnings.catch_warnings():
        warnings.simplefilter("ignore")
        df = clustering_data()

    train_fit_models(labels, df_x)