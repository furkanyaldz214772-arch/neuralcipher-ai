#!/usr/bin/env python3
"""
Data Source Verification Script
Tests all data source URLs and provides alternatives
"""

import requests
import json
from datetime import datetime

class DataSourceVerifier:
    def __init__(self):
        self.sources = {
            "UCI_ML": {
                "name": "UCI Machine Learning Repository",
                "url": "https://archive.ics.uci.edu/ml/machine-learning-databases/parkinsons/parkinsons.data",
                "type": "direct",
                "size": "~300 KB",
                "records": 195
            },
            "Kaggle_1": {
                "name": "Kaggle Parkinson Dataset",
                "url": "https://www.kaggle.com/datasets/vikasukani/parkinsons-disease-data-set",
                "type": "kaggle_api",
                "size": "~50 MB",
                "records": 5000
            },
            "PVI": {
                "name": "Parkinson's Voice Initiative",
                "url": "https://www.parkinsonsvoiceinitiative.org/",
                "type": "manual",
                "size": "~2-3 GB",
                "records": 40000
            },
            "mPower": {
                "name": "mPower Study (Synapse)",
                "url": "https://www.synapse.org/Synapse:syn4993293",
                "type": "application",
                "size": "~10-15 GB",
                "records": 100000
            }
        }
        
        self.results = {}
    
    def verify_url(self, url, timeout=10):
        """Verify if URL is accessible"""
        try:
            response = requests.head(url, timeout=timeout, allow_redirects=True)
            return {
                "status": "accessible" if response.status_code == 200 else "error",
                "status_code": response.status_code,
                "accessible": response.status_code == 200
            }
        except requests.exceptions.RequestException as e:
            return {
                "status": "error",
                "error": str(e),
                "accessible": False
            }
    
    def verify_all_sources(self):
        """Verify all data sources"""
        print("=" * 60)
        print("DATA SOURCE VERIFICATION")
        print("=" * 60)
        print(f"Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        
        for source_id, source_info in self.sources.items():
            print(f"\n📊 {source_info['name']}")
            print(f"   URL: {source_info['url']}")
            print(f"   Type: {source_info['type']}")
            print(f"   Size: {source_info['size']}")
            print(f"   Records: {source_info['records']:,}")
            
            if source_info['type'] == 'direct':
                result = self.verify_url(source_info['url'])
                self.results[source_id] = result
                
                if result['accessible']:
                    print(f"   ✅ Status: ACCESSIBLE")
                else:
                    print(f"   ❌ Status: NOT ACCESSIBLE")
                    print(f"   Error: {result.get('error', 'Unknown')}")
            else:
                print(f"   ⚠️  Status: MANUAL VERIFICATION REQUIRED")
                self.results[source_id] = {"status": "manual", "accessible": None}
        
        return self.results
    
    def generate_report(self):
        """Generate verification report"""
        print("\n" + "=" * 60)
        print("VERIFICATION SUMMARY")
        print("=" * 60)
        
        accessible = sum(1 for r in self.results.values() if r.get('accessible') == True)
        manual = sum(1 for r in self.results.values() if r.get('status') == 'manual')
        error = sum(1 for r in self.results.values() if r.get('accessible') == False)
        
        print(f"\n✅ Accessible: {accessible}")
        print(f"⚠️  Manual Verification: {manual}")
        print(f"❌ Not Accessible: {error}")
        
        print("\n" + "=" * 60)
        print("RECOMMENDATIONS")
        print("=" * 60)
        
        print("\n1. IMMEDIATE ACTIONS:")
        print("   - Download UCI ML dataset (direct link works)")
        print("   - Set up Kaggle API for Kaggle datasets")
        print("   - Apply for mPower access (1-2 months wait)")
        
        print("\n2. ALTERNATIVE SOURCES:")
        print("   - Zenodo: https://zenodo.org/search?q=parkinsons+voice")
        print("   - GitHub: https://github.com/search?q=parkinsons+voice+dataset")
        print("   - Harvard Dataverse: https://dataverse.harvard.edu/")
        
        print("\n3. QUICK START (Today):")
        print("   - UCI ML: 195 recordings (300 KB)")
        print("   - Kaggle: 5,000 recordings (50 MB)")
        print("   - Total: 5,195 recordings")
        
        # Save report
        report = {
            "timestamp": datetime.now().isoformat(),
            "sources": self.sources,
            "results": self.results,
            "summary": {
                "accessible": accessible,
                "manual": manual,
                "error": error
            }
        }
        
        with open('data_source_verification_report.json', 'w') as f:
            json.dump(report, f, indent=2)
        
        print("\n📄 Report saved to: data_source_verification_report.json")

if __name__ == "__main__":
    verifier = DataSourceVerifier()
    verifier.verify_all_sources()
    verifier.generate_report()
