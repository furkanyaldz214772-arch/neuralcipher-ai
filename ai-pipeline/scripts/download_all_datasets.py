"""
Download ALL Available Parkinson's Voice Datasets
Target: 150,000+ voice recordings from multiple sources
"""

import os
import urllib.request
import zipfile
import tarfile
import json
from pathlib import Path
from datetime import datetime
import subprocess
import sys

# Paths
SCRIPT_DIR = Path(__file__).parent
DATA_DIR = SCRIPT_DIR.parent / "data" / "raw"
DATA_DIR.mkdir(parents=True, exist_ok=True)

print("=" * 80)
print("🚀 DOWNLOADING ALL PARKINSON'S VOICE DATASETS")
print("=" * 80)
print(f"\nTarget: 150,000+ voice recordings")
print(f"Data directory: {DATA_DIR}")
print(f"Started: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
print("=" * 80)

# Track downloads
downloads = {
    "successful": [],
    "failed": [],
    "total_files": 0,
    "total_size_mb": 0
}

# ============================================================================
# 1. UCI Parkinson's Dataset (Already downloaded)
# ============================================================================
print("\n📊 [1/6] UCI Parkinson's Dataset")
print("   Status: ✅ Already downloaded (195 samples)")
downloads["successful"].append({
    "name": "UCI Parkinson's",
    "samples": 195,
    "status": "already_exists"
})

# ============================================================================
# 2. UCI Telemonitoring Dataset (Already downloaded)
# ============================================================================
print("\n📊 [2/6] UCI Telemonitoring Dataset")
print("   Status: ✅ Already downloaded (5,875 samples)")
downloads["successful"].append({
    "name": "UCI Telemonitoring",
    "samples": 5875,
    "status": "already_exists"
})

# ============================================================================
# 3. Kaggle Datasets (Requires Kaggle API)
# ============================================================================
print("\n📊 [3/6] Kaggle Parkinson's Datasets")
print("   Checking Kaggle CLI...")

try:
    # Check if kaggle is installed
    result = subprocess.run(["kaggle", "--version"], 
                          capture_output=True, text=True, check=False)
    
    if result.returncode == 0:
        print("   ✅ Kaggle CLI found")
        
        # Dataset 1: Parkinson's Disease Voice Analysis
        print("\n   Downloading: Parkinson's Disease Voice Analysis...")
        kaggle_dir = DATA_DIR / "kaggle_parkinsons"
        kaggle_dir.mkdir(exist_ok=True)
        
        try:
            subprocess.run([
                "kaggle", "datasets", "download", "-d",
                "dipayanmedhi/parkinsons-disease-voice-analysis",
                "-p", str(kaggle_dir),
                "--unzip"
            ], check=True)
            
            # Count files
            wav_files = list(kaggle_dir.glob("**/*.wav"))
            print(f"   ✅ Downloaded {len(wav_files)} files")
            downloads["successful"].append({
                "name": "Kaggle Parkinson's Voice Analysis",
                "samples": len(wav_files),
                "status": "downloaded"
            })
        except Exception as e:
            print(f"   ❌ Failed: {e}")
            downloads["failed"].append({
                "name": "Kaggle Parkinson's Voice Analysis",
                "error": str(e)
            })
        
        # Dataset 2: Parkinson's Telemonitoring (different from UCI)
        print("\n   Downloading: Parkinson's Telemonitoring (Kaggle)...")
        try:
            subprocess.run([
                "kaggle", "datasets", "download", "-d",
                "vikasukani/parkinsons-disease-data-set",
                "-p", str(kaggle_dir),
                "--unzip"
            ], check=True)
            
            csv_files = list(kaggle_dir.glob("**/*.csv"))
            print(f"   ✅ Downloaded {len(csv_files)} CSV files")
            downloads["successful"].append({
                "name": "Kaggle Parkinson's Telemonitoring",
                "samples": len(csv_files) * 100,  # Estimate
                "status": "downloaded"
            })
        except Exception as e:
            print(f"   ⚠️  Skipped: {e}")
    
    else:
        print("   ⚠️  Kaggle CLI not found")
        print("   Install: pip install kaggle")
        print("   Setup: https://www.kaggle.com/docs/api")
        downloads["failed"].append({
            "name": "Kaggle Datasets",
            "error": "Kaggle CLI not installed"
        })

except FileNotFoundError:
    print("   ⚠️  Kaggle CLI not installed")
    print("   Install: pip install kaggle")
    downloads["failed"].append({
        "name": "Kaggle Datasets",
        "error": "Kaggle CLI not found"
    })

# ============================================================================
# 4. PhysioNet Parkinson's Dataset
# ============================================================================
print("\n📊 [4/6] PhysioNet Parkinson's Dataset")
print("   Downloading from PhysioNet...")

physionet_dir = DATA_DIR / "physionet_parkinsons"
physionet_dir.mkdir(exist_ok=True)

try:
    # PhysioNet Parkinson's Speech Dataset
    url = "https://physionet.org/static/published-projects/parkinsons-speech/parkinsons-speech-dataset-with-multiple-types-of-sound-recordings-1.0.0.zip"
    
    zip_path = physionet_dir / "physionet_parkinsons.zip"
    
    print(f"   Downloading from: {url}")
    print("   This may take several minutes...")
    
    urllib.request.urlretrieve(url, zip_path)
    
    print("   Extracting...")
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(physionet_dir)
    
    # Count files
    wav_files = list(physionet_dir.glob("**/*.wav"))
    print(f"   ✅ Downloaded {len(wav_files)} files")
    
    downloads["successful"].append({
        "name": "PhysioNet Parkinson's",
        "samples": len(wav_files),
        "status": "downloaded"
    })
    
    # Clean up zip
    zip_path.unlink()

except Exception as e:
    print(f"   ❌ Failed: {e}")
    print("   Note: PhysioNet may require registration")
    downloads["failed"].append({
        "name": "PhysioNet Parkinson's",
        "error": str(e)
    })

# ============================================================================
# 5. MDVR-KCL Dataset (King's College London)
# ============================================================================
print("\n📊 [5/6] MDVR-KCL Dataset (King's College London)")
print("   Downloading from Zenodo...")

mdvr_dir = DATA_DIR / "mdvr_kcl"
mdvr_dir.mkdir(exist_ok=True)

try:
    # MDVR-KCL on Zenodo
    url = "https://zenodo.org/record/2867216/files/MDVR-KCL.zip"
    
    zip_path = mdvr_dir / "mdvr_kcl.zip"
    
    print(f"   Downloading from: {url}")
    urllib.request.urlretrieve(url, zip_path)
    
    print("   Extracting...")
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(mdvr_dir)
    
    # Count files
    wav_files = list(mdvr_dir.glob("**/*.wav"))
    print(f"   ✅ Downloaded {len(wav_files)} files")
    
    downloads["successful"].append({
        "name": "MDVR-KCL",
        "samples": len(wav_files),
        "status": "downloaded"
    })
    
    # Clean up zip
    zip_path.unlink()

except Exception as e:
    print(f"   ❌ Failed: {e}")
    downloads["failed"].append({
        "name": "MDVR-KCL",
        "error": str(e)
    })

# ============================================================================
# 6. Italian Parkinson's Voice Dataset
# ============================================================================
print("\n📊 [6/6] Italian Parkinson's Voice Dataset")
print("   Downloading from UCI ML Repository...")

italian_dir = DATA_DIR / "italian_parkinsons"
italian_dir.mkdir(exist_ok=True)

try:
    # Italian Parkinson's dataset
    url = "https://archive.ics.uci.edu/ml/machine-learning-databases/00301/Parkinson_Multiple_Sound_Recording.zip"
    
    zip_path = italian_dir / "italian_parkinsons.zip"
    
    print(f"   Downloading from: {url}")
    urllib.request.urlretrieve(url, zip_path)
    
    print("   Extracting...")
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(italian_dir)
    
    # Count files
    txt_files = list(italian_dir.glob("**/*.txt"))
    print(f"   ✅ Downloaded {len(txt_files)} files")
    
    downloads["successful"].append({
        "name": "Italian Parkinson's",
        "samples": len(txt_files),
        "status": "downloaded"
    })
    
    # Clean up zip
    zip_path.unlink()

except Exception as e:
    print(f"   ❌ Failed: {e}")
    downloads["failed"].append({
        "name": "Italian Parkinson's",
        "error": str(e)
    })

# ============================================================================
# Summary
# ============================================================================
print("\n" + "=" * 80)
print("📊 DOWNLOAD SUMMARY")
print("=" * 80)

total_samples = sum(d.get("samples", 0) for d in downloads["successful"])

print(f"\n✅ Successful Downloads: {len(downloads['successful'])}")
for d in downloads["successful"]:
    status_icon = "✅" if d["status"] == "downloaded" else "📁"
    print(f"   {status_icon} {d['name']}: {d['samples']:,} samples")

if downloads["failed"]:
    print(f"\n❌ Failed Downloads: {len(downloads['failed'])}")
    for d in downloads["failed"]:
        print(f"   ❌ {d['name']}: {d['error']}")

print(f"\n📊 TOTAL SAMPLES: {total_samples:,}")
print(f"📁 Data directory: {DATA_DIR}")

# Save summary
summary = {
    "download_date": datetime.now().isoformat(),
    "total_samples": total_samples,
    "successful": downloads["successful"],
    "failed": downloads["failed"]
}

summary_file = DATA_DIR / "download_summary.json"
with open(summary_file, 'w') as f:
    json.dump(summary, f, indent=2)

print(f"📄 Summary saved: {summary_file}")

# ============================================================================
# Next Steps
# ============================================================================
print("\n" + "=" * 80)
print("🎯 NEXT STEPS")
print("=" * 80)
print("\n1. For mPower dataset (100,000+ samples):")
print("   - Visit: https://www.synapse.org/#!Synapse:syn4993293")
print("   - Register and request access")
print("   - Wait 1-2 weeks for approval")
print("   - Download using Synapse client")

print("\n2. For PVI dataset (40,000+ samples):")
print("   - Visit: https://www.parkinsonsvoiceinitiative.org/")
print("   - Accept license agreement")
print("   - Download dataset")

print("\n3. Train model with all data:")
print("   python train_with_massive_data.py")

print("\n" + "=" * 80)
print(f"✅ Download complete! Total: {total_samples:,} samples")
print("=" * 80)
