import requests
import sys
from datetime import datetime, date, timedelta
import json

class ThambootaBackendTester:
    def __init__(self, base_url="https://dine-thamboora.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=""):
        """Log test results"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED")
        else:
            print(f"❌ {name} - FAILED: {details}")
        
        self.test_results.append({
            "name": name,
            "success": success,
            "details": details
        })

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        try:
            print(f"\n🔍 Testing {name}...")
            print(f"URL: {url}")
            
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            details = f"Status: {response.status_code}"
            
            if success:
                try:
                    response_data = response.json()
                    details += f", Response: {json.dumps(response_data, indent=2)}"
                except:
                    details += f", Raw Response: {response.text[:200]}"
            else:
                try:
                    error_data = response.json()
                    details += f", Error: {json.dumps(error_data, indent=2)}"
                except:
                    details += f", Raw Error: {response.text[:200]}"

            self.log_test(name, success, details)
            return success, response.json() if success and response.text else {}

        except requests.exceptions.RequestException as e:
            self.log_test(name, False, f"Request Error: {str(e)}")
            return False, {}
        except Exception as e:
            self.log_test(name, False, f"Unexpected Error: {str(e)}")
            return False, {}

    def test_api_health(self):
        """Test API health endpoint"""
        return self.run_test(
            "API Health Check",
            "GET",
            "",
            200
        )

    def test_create_reservation(self):
        """Test reservation creation"""
        test_data = {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "+919876543210",
            "date": (date.today() + timedelta(days=1)).isoformat(),
            "time": "19:00",
            "guests": 4,
            "special_requests": "Window seat please"
        }
        
        success, response = self.run_test(
            "Create Reservation",
            "POST",
            "reservations",
            200,  # Based on backend code, it returns 200 for successful creation
            data=test_data
        )
        
        if success and 'id' in response:
            print(f"✅ Reservation created with ID: {response['id']}")
            return success, response['id']
        return success, None

    def test_get_reservations(self):
        """Test getting all reservations"""
        return self.run_test(
            "Get Reservations",
            "GET",
            "reservations",
            200
        )

    def test_create_contact_message(self):
        """Test contact message creation"""
        test_data = {
            "name": "Test Contact",
            "email": "contact@example.com", 
            "phone": "+919876543210",
            "message": "This is a test contact message"
        }
        
        return self.run_test(
            "Create Contact Message",
            "POST",
            "contact",
            200,  # Based on backend code, it returns 200 for successful creation
            data=test_data
        )

    def test_invalid_reservation(self):
        """Test reservation with invalid data"""
        invalid_data = {
            "name": "",  # Empty name should fail
            "email": "invalid-email",  # Invalid email
            "phone": "",  # Empty phone
            "date": "2020-01-01",  # Past date
            "time": "25:00",  # Invalid time
            "guests": 0  # Invalid guest count
        }
        
        success, _ = self.run_test(
            "Invalid Reservation Data",
            "POST", 
            "reservations",
            422,  # FastAPI validation error
            data=invalid_data
        )
        
        # For this test, we expect it to fail (return 422), so success means it properly rejected invalid data
        return success, None

    def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting Thamboora Restaurant Backend API Tests")
        print(f"Base URL: {self.base_url}")
        print("=" * 60)

        # Test API health
        self.test_api_health()
        
        # Test reservation endpoints
        self.test_create_reservation()
        self.test_get_reservations()
        self.test_invalid_reservation()
        
        # Test contact endpoint  
        self.test_create_contact_message()

        # Print summary
        print("\n" + "=" * 60)
        print(f"📊 Test Results: {self.tests_passed}/{self.tests_run} tests passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All backend tests passed!")
            return True
        else:
            print(f"⚠️  {self.tests_run - self.tests_passed} test(s) failed")
            return False

def main():
    tester = ThambootaBackendTester()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())