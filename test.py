import requests

BASE_URL = "http://localhost:8080"

def print_result(test_name, passed, expected=None, got=None, request_data=None, response_body=None):
    if passed:
        print(f"{test_name}: PASSED")
    else:
        print(f"{test_name}: FAILED")
        if request_data:
            print(f"  Request: {request_data}")
        if expected is not None and got is not None:
            print(f"  Expected: {expected}, Got: {got}")
        if response_body:
            print(f"  Response Body: {response_body}")

def test_register_user():
    payload = {"username": "testuser", "password": "testpass"}
    res = requests.post(f"{BASE_URL}/api/auth/register", json=payload)
    passed = res.status_code in [201, 409]
    print_result("User Registration", passed, "201 or 409", res.status_code, payload, res.text)

def test_login():
    payload = {"username": "testuser", "password": "testpass"}
    res = requests.post(f"{BASE_URL}/api/auth/login", json=payload)

    token = None
    passed = False

    if res.status_code == 200:
        try:
            token = res.json().get("access_token")
            passed = token is not None
        except Exception:
            passed = False

    print_result("Login Test", passed, {"username": payload["username"]}, res.text, payload, res.text)
    return token

def test_add_product(token):
    payload = {
        "name": "MacBook",
        "type": "Electronics",
        "sku": "MAC-002",
        "image_url": "https://example.com/macbook.jpg",
        "description": "Apple MacBook Pro",
        "quantity": 3,
        "price": 2500.00
    }
    res = requests.post(
        f"{BASE_URL}/api/products",
        json=payload,
        headers={"Authorization": f"Bearer {token}"}
    )

    passed = res.status_code in [201, 200]
    print_result("Add Product", passed, 201, res.status_code, payload, res.text)

    if passed:
        return res.json().get("product_id")
    return None

def test_update_quantity(token, product_id, quantity):
    payload = {"quantity": quantity}
    res = requests.put(
        f"{BASE_URL}/api/products/{product_id}/quantity",
        json=payload,
        headers={"Authorization": f"Bearer {token}"}
    )
    passed = res.status_code == 200
    print_result("Update Quantity", passed, 200, res.status_code, payload, res.text)

def test_get_products(token, expected_name):
    res = requests.get(
        f"{BASE_URL}/api/products",
        headers={"Authorization": f"Bearer {token}"}
    )
    try:
        data = res.json()
    except:
        print("Get Products: FAILED (Invalid JSON response)")
        return

    matched = any(p["name"] == expected_name for p in data)
    print_result("Get Products", matched, f"name={expected_name}", data, None, data)

def run_all_tests():
    test_register_user()
    token = test_login()
    if not token:
        print("Login failed. Cannot continue tests.")
        return

    product_id = test_add_product(token)
    if not product_id:
        print("Product creation failed. Cannot continue tests.")
        return

    test_update_quantity(token, product_id, 10)
    test_get_products(token, "MacBook")

if __name__ == "__main__":
    run_all_tests()
