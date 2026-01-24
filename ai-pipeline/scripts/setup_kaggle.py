#!/usr/bin/env python3
"""
Kaggle Setup and Dataset Downloader
Sets up Kaggle API and downloads Parkinson datasets
"""

import os
import json
import subprocess
from pathlib import Path

class KaggleSetup:
    def __init__(self):
        self.kaggle_dir = Path.home() / ".kaggle"
        self.kaggle_json = self.kaggle_dir / "kaggle.json"
        
    def check_kaggle_installed(self):
        """Check if Kaggle CLI is installed"""
        try:
            result = subprocess.run(['kaggle', '--version'], 
                                  capture_output=True, text=True)
            print(f"✅ Kaggle CLI installed: {result.stdout.strip()}")
            return True
        except FileNotFoundError:
            print("❌ Kaggle CLI not installed")
            return False
    
    def install_kaggle(self):
        """Install Kaggle CLI"""
        print("\n📦 Installing Kaggle CLI...")
        try:
            subprocess.run(['pip', 'install', 'kaggle'], check=True)
            print("✅ Kaggle CLI installed successfully!")
            return True
        except subprocess.CalledProcessError as e:
            print(f"❌ Installation failed: {e}")
            return False
    
    def setup_credentials(self):
        """Setup Kaggle credentials"""
        print("\n" + "=" * 60)
        print("KAGGLE CREDENTIALS SETUP")
        print("=" * 60)
        
        if self.kaggle_json.exists():
            print(f"✅ Kaggle credentials already exist: {self.kaggle_json}")
            return True
        
        print("\n📝 To set up Kaggle credentials:")
        print("   1. Go to https://www.kaggle.com/")
        print("   2. Sign in or create account")
        print("   3. Go to Account → API → Create New API Token")
        print("   4. Download kaggle.json")
        print(f"   5. Move it to: {self.kaggle_json}")
        
        print(f"\n⚠️  Credentials not found at: {self.kaggle_json}")
        print("   Please follow the steps above and run this script again.")
        
        return False
    
    def verify_credentials(self):
        """Verify Kaggle credentials work"""
        try:
            result = subprocess.run(['kaggle', 'datasets', 'list', '--max-size', '1'],
                                  capture_output=True, text=True, check=True)
            print("✅ Kaggle credentials verified!")
            return True
        except subprocess.CalledProcessError:
            print("❌ Kaggle credentials verification failed")
            return False
    
    def list_parkinson_datasets(self):
        """List available Parkinson datasets on Kaggle"""
        print("\n" + "=" * 60)
        print("AVAILABLE PARKINSON DATASETS")
        print("=" * 60)
        
        try:
            result = subprocess.run(
                ['kaggle', 'datasets', 'list', '-s', 'parkinsons'],
                capture_output=True, text=True, check=True
            )
            print(result.stdout)
            return True
        except subprocess.CalledProcessError as e:
            print(f"❌ Failed to list datasets: {e}")
            return False
    
    def download_dataset(self, dataset_name, output_dir="data/raw/kaggle"):
        """Download specific Kaggle dataset"""
        output_path = Path(output_dir)
        output_path.mkdir(parents=True, exist_ok=True)
        
        print(f"\n📥 Downloading: {dataset_name}")
        print(f"📁 Output: {output_path}")
        
        try:
            subprocess.run(
                ['kaggle', 'datasets', 'download', '-d', dataset_name, '-p', str(output_path)],
                check=True
            )
            print(f"✅ Downloaded successfully!")
            
            # Unzip if needed
            zip_files = list(output_path.glob("*.zip"))
            if zip_files:
                print(f"\n📦 Extracting {len(zip_files)} zip file(s)...")
                for zip_file in zip_files:
                    subprocess.run(['unzip', '-o', str(zip_file), '-d', str(output_path)],
                                 check=True)
                    print(f"✅ Extracted: {zip_file.name}")
            
            return True
        except subprocess.CalledProcessError as e:
            print(f"❌ Download failed: {e}")
            return False
    
    def run_setup(self):
        """Run complete setup"""
        print("=" * 60)
        print("KAGGLE SETUP WIZARD")
        print("=" * 60)
        
        # Check if Kaggle is installed
        if not self.check_kaggle_installed():
            if not self.install_kaggle():
                return False
        
        # Setup credentials
        if not self.setup_credentials():
            return False
        
        # Verify credentials
        if not self.verify_credentials():
            return False
        
        # List datasets
        self.list_parkinson_datasets()
        
        print("\n" + "=" * 60)
        print("✅ KAGGLE SETUP COMPLETE!")
        print("=" * 60)
        
        print("\n📥 To download a dataset, run:")
        print("   python setup_kaggle.py download <dataset-name>")
        print("\nExample:")
        print("   python setup_kaggle.py download vikasukani/parkinsons-disease-data-set")
        
        return True

if __name__ == "__main__":
    import sys
    
    setup = KaggleSetup()
    
    if len(sys.argv) > 1 and sys.argv[1] == 'download':
        if len(sys.argv) > 2:
            dataset_name = sys.argv[2]
            setup.download_dataset(dataset_name)
        else:
            print("❌ Please provide dataset name")
            print("Usage: python setup_kaggle.py download <dataset-name>")
    else:
        setup.run_setup()
