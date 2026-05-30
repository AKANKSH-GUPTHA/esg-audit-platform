from sklearn.ensemble import IsolationForest
import numpy as np


def detect_anomalies(emission_values):

    values = np.array(
        emission_values
    ).reshape(-1, 1)

    model = IsolationForest(
        contamination=0.2,
        random_state=42
    )

    predictions = model.fit_predict(values)

    results = []

    for pred in predictions:

        if pred == -1:
            results.append(True)

        else:
            results.append(False)

    return results