#!/usr/bin/env python3
"""
Free Parkinson's Dataset Downloader
Downloads all available free datasets for model training
"""
import os
import urllib.request
import zipfile
import pandas as pd
from pathlib import Path
import json

# Directories
BASE_DIR = Path(__file__).parent.parent
DATA_DIR = BASE_DIR / "data" / "raw"
DATA_DIR.mkdir(parents=True, exist_ok=True)

print("=" * 70)
print("🎯 FREE PARKINSON'S DATASETS DOWNLOADER")
print("=" * 70)
print()

# Dataset information
datasets = {
    "uci_parkinsons": {
        "name": "UCI Parkinson's Dataset",
        "url": "https://archive.ics.uci.edu/ml/machine-learning-databases/parkinsons/parkinsons.data",
        "samples": 195,
        "format": "CSV",
        "license": "Open Source"
    },
    "uci_telemonitoring": {
        "name": "UCI Parkinson's Telemonitoring",
        "url": "https://archive.ics.uci.edu/ml/machine-learning-databases/parkinsons/telemonitoring/parkinsons_updrs.data",
        "samples": 5875,
        "format": "CSV",
        "license": "Open Source"
    }
}

def download_file(url, destination):
    """Download file with progress"""
    print(f"📥 Downloading from: {url}")
    print(f"📁 Saving to: {destination}")
    
    try:
        urllib.request.urlretrieve(url, destination)
        print("✅ Download complete!")
        return True
    except Exception as e:
        print(f"❌ Download failed: {e}")
        return False

def download_uci_parkinsons():
    """Download UCI Parkinson's Dataset"""
    print("\n" + "=" * 70)
    print("1️⃣  UCI PARKINSON'S DATASET")
    print("=" * 70)
    
    dataset = datasets["uci_parkinsons"]
    print(f"📊 Dataset: {dataset['name']}")
    print(f"📈 Samples: {dataset['samples']}")
    print(f"📄 Format: {dataset['format']}")
    print(f"⚖️  License: {dataset['license']}")
    print()
    
    # Download
    destination = DATA_DIR / "uci_parkinsons.data"
    
    if destination.exists():
        print("ℹ️  Dataset already exists. Skipping download.")
        return True
    
    success = download_file(dataset['url'], destination)
    
    if success:
        # Load and display info
        df = pd.read_csv(destination)
        print(f"\n📊 Dataset Info:")
        print(f"   Rows: {len(df)}")
        print(f"   Columns: {len(df.columns)}")
        print(f"   Features: {', '.join(df.columns[:5])}...")
        print(f"   Parkinson's: {df['status'].sum()} samples")
        print(f"   Healthy: {len(df) - df['status'].sum()} samples")
    
    return success

def download_uci_telemonitoring():
    """Download UCI Telemonitoring Dataset"""
    print("\n" + "=" * 70)
    print("2️⃣  UCI PARKINSON'S TELEMONITORING DATASET")
    print("=" * 70)
    
    dataset = datasets["uci_telemonitoring"]
    print(f"📊 Dataset: {dataset['name']}")
    print(f"📈 Samples: {dataset['samples']}")
    print(f"📄 Format: {dataset['format']}")
    print(f"⚖️  License: {dataset['license']}")
    print()
    
    # Download
    destination = DATA_DIR / "parkinsons_updrs.data"
    
    if destination.exists():
        print("ℹ️  Dataset already exists. Skipping download.")
        return True
    
    success = download_file(dataset['url'], destination)
    
    if success:
        # Load and display info
        df = pd.read_csv(destination)
        print(f"\n📊 Dataset Info:")
        print(f"   Rows: {len(df)}")
        print(f"   Columns: {len(df.columns)}")
        print(f"   Patients: {df['subject#'].nunique()}")
        print(f"   Features: {', '.join(df.columns[:5])}...")
    
    return success

def create_dataset_info():
    """Create dataset information file"""
    info = {
        "datasets": [],
        "total_samples": 0,
        "download_date": pd.Timestamp.now().isoformat()
    }
    
    # Check UCI Parkinson's
    uci_path = DATA_DIR / "uci_parkinsons.data"
    if uci_path.exists():
        df = pd.read_csv(uci_path)
        info["datasets"].append({
            "name": "UCI Parkinson's Dataset",
            "file": "uci_parkinsons.data",
            "samples": len(df),
            "parkinsons": int(df['status'].sum()),
            "healthy": int(len(df) - df['status'].sum()),
            "features": len(df.columns) - 2,  # Exclude name and status
            "url": datasets["uci_parkinsons"]["url"]
        })
        info["total_samples"] += len(df)
    
    # Check UCI Telemonitoring
    tele_path = DATA_DIR / "parkinsons_updrs.data"
    if tele_path.exists():
        df = pd.read_csv(tele_path)
        info["datasets"].append({
            "name": "UCI Parkinson's Telemonitoring",
            "file": "parkinsons_updrs.data",
            "samples": len(df),
            "patients": int(df['subject#'].nunique()),
            "features": len(df.columns) - 2,  # Exclude subject and test_time
            "url": datasets["uci_telemonitoring"]["url"]
        })
        info["total_samples"] += len(df)
    
    # Save info
    info_path = DATA_DIR / "datasets_info.json"
    with open(info_path, 'w') as f:
        json.dump(info, f, indent=2)
    
    print(f"\n✅ Dataset info saved to: {info_path}")
    return info

def print_summary(info):
    """Print download summary"""
    print("\n" + "=" * 70)
    print("📊 DOWNLOAD SUMMARY")
    print("=" * 70)
    print(f"\n✅ Downloaded {len(info['datasets'])} datasets")
    print(f"📈 Total samples: {info['total_samples']:,}")
    print(f"📁 Location: {DATA_DIR}")
    print()
    
    for dataset in info['datasets']:
        print(f"📦 {dataset['name']}")
        print(f"   File: {dataset['file']}")
        print(f"   Samples: {dataset.get('samples', 'N/A')}")
        if 'parkinsons' in dataset:
            print(f"   Parkinson's: {dataset['parkinsons']}")
            print(f"   Healthy: {dataset['healthy']}")
        if 'patients' in dataset:
            print(f"   Patients: {dataset['patients']}")
        print()

def print_next_steps():
    """Print next steps"""
    print("=" * 70)
    print("🚀 NEXT STEPS")
    print("=" * 70)
    print()
    print("1️⃣  Process the datasets:")
    print("   python scripts/process_datasets.py")
    print()
    print("2️⃣  Train the model:")
    print("   python train_59_feature_model.py")
    print()
    print("3️⃣  Test the model:")
    print("   python scripts/evaluate_model.py")
    print()
    print("💡 TIP: You can also download mPower dataset manually:")
    print("   URL: https://www.synapse.org/#!Synapse:syn4993293")
    print("   (Requires free registration)")
    print()

def main():
    """Main download function"""
    print("🎯 Starting download of free Parkinson's datasets...")
    print(f"📁 Data directory: {DATA_DIR}")
    print()
    
    # Download datasets
    success_count = 0
    
    if download_uci_parkinsons():
        success_count += 1
    
    if download_uci_telemonitoring():
        success_count += 1
    
    # Create info file
    if success_count > 0:
        info = create_dataset_info()
        print_summary(info)
        print_next_steps()
    else:
        print("\n❌ No datasets were downloaded successfully.")
        print("Please check your internet connection and try again.")
    
    print("=" * 70)
    print("✅ DOWNLOAD COMPLETE!")
    print("=" * 70)

if __name__ == "__main__":
    main()
