from flask import Flask, request, render_template,jsonify
import pandas as pd
import joblib
import xgboost as xgb

app = Flask(__name__)

# Load the dataset, preprocessor and model
data = pd.read_csv('Airbnb_India_dataset.csv') 
xgb_model = joblib.load('xgb_price_predictor.pkl')
preprocessor = joblib.load('preprocessor.pkl')
data.rename(columns={'pricing/rate/amount': 'price'}, inplace=True)

@app.route('/')
def home():
    # Fetch unique location values
    unique_locations = data['address'].dropna().unique()
    unique_locations = sorted(unique_locations)  # Sort alphabetically
    return render_template('index.html', locations=unique_locations)


@app.route('/recommend', methods=['POST'])
def recommend():
    location = request.form['location']
    max_price = float(request.form['max_price'])
    guests = int(request.form['guests'])
    recommended = data[
        (data['address'].str.contains(location, case=False)) &
        (data['price'] <= max_price) &
        (data['numberOfGuests'] >= guests)
    ]

    recommended = recommended.sort_values(by='stars', ascending=False)
    output = recommended[['name', 'address', 'numberOfGuests', 'price', 'roomType', 'stars', 'map_link']].to_dict(orient='records')

    return render_template('recommendations.html', recommendations=output)


@app.route('/predict', methods=['POST'])
def predict():
    # Get the input data from the form
    room_type = request.form['room_type']
    number_of_guests = int(request.form['number_of_guests'])
    stars = float(request.form['stars'])
    address = request.form['address']

    # Create a DataFrame to hold the input data (this is necessary for the preprocessor)
    input_data = pd.DataFrame({
        'roomType': [room_type],
        'numberOfGuests': [number_of_guests],
        'stars': [stars],
        'address': [address]
    })

    # Preprocess the input data
    input_preprocessed = preprocessor.transform(input_data)

    # Convert to DMatrix for XGBoost prediction
    dinput = xgb.DMatrix(input_preprocessed)

    # Make the prediction
    predicted_price = round(xgb_model.predict(dinput)[0])

    # Render the prediction in the HTML template
    return render_template('prediction.html', price=predicted_price)

if __name__ == '__main__':
    app.run(debug=True)