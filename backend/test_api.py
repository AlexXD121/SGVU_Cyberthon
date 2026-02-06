#!/usr/bin/env python3
"""
TRU Backend API Test Suite
Tests the Brain (AI), Eyes (Feed), and Logic (Reporting) endpoints
"""

import httpx
import sys

BASE_URL = "http://localhost:8000"

def test_ai_brain():
    """Test 1: Verify AI text analysis endpoint"""
    print("\n🧠 Testing AI Brain (POST /verify)...")
    
    payload = {
        "text": "Breaking news: Aliens have landed in Times Square today."
    }
    
    try:
        response = httpx.post(f"{BASE_URL}/verify", json=payload, timeout=10.0)
        response.raise_for_status()
        data = response.json()
        
        # Assertions
        assert "trust_score" in data, "Missing trust_score in response"
        assert "verdict" in data, "Missing verdict in response"
        assert "hash" in data, "Missing hash in response (blockchain proof)"
        
        print(f"✅ AI Brain Check: Score={data['trust_score']}, Verdict={data['verdict']}")
        print(f"   Hash: {data['hash'][:16]}...")
        return True
        
    except Exception as e:
        print(f"❌ AI Brain Test Failed: {e}")
        return False

def test_live_feed():
    """Test 2: Verify live scam feed endpoint"""
    print("\n👁️  Testing Live Feed (GET /feed)...")
    
    try:
        response = httpx.get(f"{BASE_URL}/feed", timeout=10.0)
        response.raise_for_status()
        data = response.json()
        
        # Assertions
        assert isinstance(data, list), "Feed should return a list"
        assert len(data) >= 1, "Feed should have at least 1 item"
        
        print(f"✅ Live Feed Check: {len(data)} items found")
        print(f"   Latest: {data[0].get('title', 'N/A')[:50]}...")
        return True
        
    except Exception as e:
        print(f"❌ Live Feed Test Failed: {e}")
        return False

def test_reporting_logic():
    """Test 3: Verify report submission endpoint"""
    print("\n📝 Testing Reporting Logic (POST /report)...")
    
    payload = {
        "url": "https://fake-scam-site-test.com",
        "reason": "Automated test - suspicious phishing attempt"
    }
    
    try:
        response = httpx.post(f"{BASE_URL}/report", json=payload, timeout=10.0)
        response.raise_for_status()
        data = response.json()
        
        # Assertions
        assert "reportId" in data, "Missing reportId in response"
        assert len(data["reportId"]) > 0, "reportId should not be empty"
        
        print(f"✅ Reporting Logic Check: Created Report ID {data['reportId'][:8]}...")
        print(f"   Status: {data.get('status', 'N/A')}")
        return True
        
    except Exception as e:
        print(f"❌ Reporting Logic Test Failed: {e}")
        return False

def main():
    """Run all tests"""
    print("=" * 60)
    print("🚀 TRU Backend API Test Suite")
    print("=" * 60)
    
    results = []
    
    # Run all tests
    results.append(("AI Brain", test_ai_brain()))
    results.append(("Live Feed", test_live_feed()))
    results.append(("Reporting Logic", test_reporting_logic()))
    
    # Summary
    print("\n" + "=" * 60)
    print("📊 Test Summary")
    print("=" * 60)
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} - {name}")
    
    print(f"\nTotal: {passed}/{total} tests passed")
    
    if passed == total:
        print("\n🎉 All systems operational! Backend is ready.")
        sys.exit(0)
    else:
        print("\n⚠️  Some tests failed. Check the backend server.")
        sys.exit(1)

if __name__ == "__main__":
    main()
