from flask import Flask, request, jsonify
from flask_cors import CORS
from bs4 import BeautifulSoup
from urllib.request import urlopen
import requests
import os

app = Flask(__name__)
CORS(app)
load_dotenv()

@app.route("/api", methods=["GET"])
def message():
    # req = request.get_json()
    # data = req['data']

    state = request.args.get('state') 
    print(state)
    
    response = requests.get(f'https://www.lgbtmap.org/democracy_maps/state_profile/{state}')
    html = response.text
    soup = BeautifulSoup(html, 'lxml')

    registration = []
    representation = []
    in_person = []
    by_mail = []
    security = []
    independence = []

    for t in range(6):
        table = soup.find_all('table')[t]

        headers = []
        rows = []
        for i, row in enumerate(table.find_all('tr')):
            if i == 0:
                headers = [el.text.strip() for el in row.find_all('th')]
            else:
                row_data = []
                for el in row.find_all('td'):
                    checkmark = el.find('i', class_=lambda x: x and 'fa-check-circle' in x.split())
                    xmark = el.find('i', class_='fa fa-times-circle')
                    if checkmark:
                        row_data.append('Checkmark')
                    elif xmark:
                        row_data.append('X')
                    else:
                        row_data.append(el.text.strip())
                rows.append(row_data)
        
        bad_laws = []
        # for i, row in enumerate(rows):
        #     if row[0] == 'X':
        #         bad_laws.append(i)
        for i in range(len(rows)):
            if rows[i] != [] and rows[i][1] == 'NEGATIVE LAW': 
                cleaned_string = rows[i][0].replace('Negative Law:\n', '') 
                cleaned_string = cleaned_string.replace('Negative Law: \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t \n\t              \t\t\n\t              \t\t\t              \t\t\t', '') 
                # cleaned_string = rows[i][0].strip().replace('Negative Law:\n', '')
                bad_laws.append(cleaned_string)

        if t == 0:
            registration = bad_laws
        elif t == 1:
            representation = bad_laws
        elif t == 2:
            in_person = bad_laws
        elif t == 3:
            by_mail = bad_laws
        elif t == 4:
            security = bad_laws
        elif t == 5:
            independence = bad_laws
    
    print('\n\n\nRegistration: ', registration) 
    print('\n\n\nRepresentation: ', representation) 
    print('\n\n\nIn-person: ', in_person) 
    print('\n\n\nBy mail: ', by_mail) 
    print('\n\n\nSecurity: ', security) 
    print('\n\n\nIndependence: ', independence) 
    
    url = "https://vote.gov/register/{state}"
    page = urlopen(url)
    html = page.read().decode("utf-8")
    soup = BeautifulSoup(html, "html.parser")
    string = soup.get_text()
    sub1 = "2024"
    sub2 = "Online"
    arr = string.split(sub1)
    arr1 = arr[1].split(sub2)
    str1 = sub2 + arr1[1]
    str2 = arr[2] + sub2
    str3 = arr[3] + sub2
    registration_deadline = [str1, str2, str3]
    
    return jsonify({'registration': registration},
                   {'representation': representation},
                   {'inperson': in_person},
                   {'bymail': by_mail},
                   {'security': security},
                   {'independence': independence},
                   {'registrationdeadline': registration_deadline})

@app.route("/api/map", methods=["GET"])
def api():
    key = os.getenv('api_key')
    streetNumber = "13232"
    streetName = "Corte Villanueva"
    streetName = streetName.replace(" ", "+")
    apartmentNum = ""
    city = "San Diego"
    city = city.replace(" ", "+")
    state = "CA"
    zip = "92129"
    param = streetNumber + '+' + streetName + ',+' + city + ',+' + state + '+' + zip + "&electionId=2000"
    url = "https://www.googleapis.com/civicinfo/v2/voterinfo?{param}&key={key}"
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        electionInfoUrl = data['state']['electionAdministrationBody']['electionInfoUrl']
        electionRegistrationUrl = data['state']['electionAdministrationBody']['electionRegistrationUrl']
        electionRegistrationConfirmationUrl = data['state']['electionAdministrationBody']['electionRegistrationConfirmationUrl']
        absenteeVotingInfoUrl = data['state']['electionAdministrationBody']['absenteeVotingInfoUrl']
        votingLocationFinderUrl = data['state']['electionAdministrationBody']['votingLocationFinderUrl']
        ballotInfoUrl = data['state']['electionAdministrationBody']['ballotInfoUrl']
        return jsonify({'electionInfoUrl': electionInfoUrl},
                       {'electionRegistrationUrl': electionRegistrationUrl},
                       {'electionRegistrationConfirmationUrl': electionRegistrationConfirmationUrl},
                       {'absenteeVotingInfoUrl': absenteeVotingInfoUrl},
                       {'votingLocationFinderUrl': votingLocationFinderUrl},
                       {'ballotInfoUrl': ballotInfoUrl})
    else:
        print(f"Error: {response.status_code}")
        return None
