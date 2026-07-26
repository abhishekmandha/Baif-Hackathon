import json
import urllib.request
import urllib.error

api_url = 'http://127.0.0.1:8000/api/users'

users = [
    {'email': 'alice@example.com', 'password': 'Secret123!', 'full_name': 'Alice Example'},
    {'email': 'bob@example.com', 'password': 'Secret456!', 'full_name': 'Bob Example'},
    {'email': 'charlie@example.com', 'password': 'Secret789!', 'full_name': 'Charlie Example'},
]

print("Inserting users via POST /api/users...")
print()

for user in users:
    req = urllib.request.Request(
        api_url,
        data=json.dumps(user).encode(),
        headers={'Content-Type': 'application/json'}
    )
    try:
        resp = urllib.request.urlopen(req)
        result = json.loads(resp.read().decode())
        print(f"OK - {user['email']}")
        print(f"   Response: {result}")
    except urllib.error.HTTPError as e:
        error_body = e.read().decode()
        print(f"FAIL - {user['email']}")
        print(f"   Error: {error_body}")

print()
print("Fetching all users...")
req = urllib.request.Request(api_url, headers={'Content-Type': 'application/json'})
resp = urllib.request.urlopen(req)
users_list = json.loads(resp.read().decode())
print(f"Total users in DB: {len(users_list)}")
for u in users_list:
    print(f"  - {u['email']} ({u['full_name']})")
