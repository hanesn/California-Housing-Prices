import pandas as pd
import sys
import pickle

with open('models\house_price_model.h5','rb') as f:
    model=pickle.load(f)
with open('assets\scalar.h5','rb') as f:
    scalar=pickle.load(f)

longitude=float(sys.argv[1])
latitude=float(sys.argv[2])
housing_median_age=float(sys.argv[3])
total_rooms=float(sys.argv[4])
total_bedrooms=float(sys.argv[5])
population=float(sys.argv[6])
households=float(sys.argv[7])
median_income=float(sys.argv[8])
ocean_proximity=sys.argv[9]
population_ratio=population/total_bedrooms
room_ratio=total_rooms/households
h_ocean=False
inland=False
island=False
near_bay=False
near_ocean=False
if ocean_proximity=='1H Ocean':
    h_ocean=True
elif ocean_proximity=='Inland':
    inland=True
elif ocean_proximity=='Island':
    island=True
elif ocean_proximity=='Near Bay':
    near_bay=True
elif ocean_proximity=='Near Ocean':
    near_ocean=True

inp=pd.DataFrame({
    'longitude':[longitude],
    'latitude':[latitude],
    'housing_median_age':[housing_median_age],
    'total_rooms':[total_rooms],
    'total_bedrooms':[total_bedrooms],
    'population':[population],
    'households':[households],
    'median_income':[median_income],
    '<1H OCEAN':[h_ocean],
    'INLAND':[inland],
    'ISLAND':[island],
    'NEAR BAY':[near_bay],
    'NEAR OCEAN':[near_ocean],
    'population_ratio':[population/total_bedrooms],
    'room_ratio':[total_rooms/households]
})
inp=scalar.transform(inp)
out=model.predict(inp)[0]
print(f'{out:.2f}')