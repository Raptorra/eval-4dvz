from flask import Flask, render_template
import requests

app = Flask(__name__)


@app.route("/")
def hello():
    url = "https://coronavirus-tracker-api.herokuapp.com/all"

    r = requests.get(url=url)

    data = r.json()
    if r.status_code != 200:
        render_template('default_error.html', context={
            "error": {
                "strerror": "Error while retrieving data from api https://coronavirus-tracker-api.herokuapp.com/"
            }
        })

    context = {
        "latest": data.get('latest'),
        "locations": {}
    }
    for location in data.get('confirmed', {}).get('locations', {}):
        if location.get('country') not in context.get('locations', {}):
            context['locations'][location.get('country')] = {
                "name": location.get('country'),
                "confirmed": {
                    "latest": location.get('latest', 0),
                    "history": location.get('history', {})
                },
                "deaths": {
                    "latest": 0,
                    "history": {}
                },
                "recovered": {
                    "latest": 0,
                    "history": {}
                }
            }
        else:
            context['locations'][location.get('country')]['confirmed']['latest'] += location.get('latest', 0)
            context['locations'][location.get('country')]['confirmed']['history'] = {x: (context['locations'][location.get('country')]['confirmed']['history'][x] if x in context['locations'][location.get('country')]['confirmed']['history'].keys() else 0) + location['history'][x] for x in location['history'].keys()}

    for location in data.get('deaths', {}).get('locations', {}):
        if location.get('country') not in context.get('locations', {}):
            context['locations'][location.get('country')] = {
                "name": location.get('country'),
                "deaths": {
                    "latest": location.get('latest', 0),
                    "history": location.get('history', {})
                },
                "confirmed": {
                    "latest": 0,
                    "history": {}
                },
                "recovered": {
                    "latest": 0,
                    "history": {}
                }
            }
        else:
            context['locations'][location.get('country')]['deaths']['latest'] += location.get('latest', 0)
            context['locations'][location.get('country')]['deaths']['history'] = {x: (context['locations'][location.get('country')]['deaths']['history'][x] if x in context['locations'][location.get('country')]['deaths']['history'].keys() else 0)  + location['history'][x] for x in location['history'].keys()}

    for location in data.get('recovered', {}).get('locations', {}):
        if location.get('country') not in context.get('locations', {}):
            context['locations'][location.get('country')] = {
                "name": location.get('country'),
                "recovered": {
                    "latest": location.get('latest', 0),
                    "history": location.get('history', {})
                },
                "deaths": {
                    "latest": 0,
                    "history": {}
                },
                "confirmed": {
                    "latest": 0,
                    "history": {}
                }
            }
        else:
            context['locations'][location.get('country')]['recovered']['latest'] += location.get('latest', 0)
            context['locations'][location.get('country')]['recovered']['history'] = {x: (context['locations'][location.get('country')]['recovered']['history'][x] if x in context['locations'][location.get('country')]['recovered']['history'].keys() else 0) + location['history'][x] for x in location['history'].keys()}

    return render_template('base.html', context=context)


if __name__ == "__main__":
    app.run()
