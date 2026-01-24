#!/usr/bin/env python3
"""
UCI ML Parkinson Dataset Downloader
Downloads and organizes UCI ML Parkinson dataset
"""

import os
import urllib.request
import pandas as pd
from pathlib import Path
import json

class UCIDatasetDownloader:
    def __init__(self, data_dir="data"):
        self.data_dir = Path(data_dir)
        self.raw_dir = self.data_dir / "raw" / "uci"
        self.processed_dir = self.data_dir / "processed" / "uci"
        
        # Create directories
        self.raw_dir.mkdir(parents=True, exist_ok=True)
        self.processed_dir.mkdir(parents=True, exist_ok=True)
        
        self.url = "https://archive.ics.uci.edu/ml/machine-learning-databases/parkinsons/parkinsons.data"
        self.output_file = self.raw_dir / "parkinsons.csv"
    
    def download(self):
        """Download UCI dataset"""
        print("=" * 60)
        print("UCI ML PARKINSON DATASET DOWNLOADER")
        print("=" * 60)
        
        print(f"\n📥 Downloading from: {self.url}")
        print(f"📁 Saving to: {self.output_file}")
        
        try:
            urllib.request.urlretrieve(self.url, str(self.output_file))
            file_size = os.path.getsize(self.output_file)
            print(f"✅ Downloaded successfully! Size: {file_size:,} bytes")
            return True
        except Exception as e:
            print(f"❌ Download failed: {e}")
            return False
    
    def process(self):
        """Process and organize dataset"""
        print("\n" + "=" * 60)
        print("PROCESSING DATASET")
        print("=" * 60)
        
        # Read CSV
        df = pd.read_csv(self.output_file)
        
        print(f"\n📊 Dataset Info:")
        print(f"   Total records: {len(df)}")
        print(f"   Features: {len(df.columns)}")
        print(f"   Columns: {', '.join(df.columns[:5])}...")
        
        # Separate Parkinson and Healthy
        parkinson_df = df[df['status'] == 1]
        healthy_df = df[df['status'] == 0]
        
        print(f"\n🔴 Parkinson patients: {len(parkinson_df)}")
        print(f"🟢 Healthy controls: {len(healthy_df)}")
        
        # Save separated datasets
        parkinson_file = self.processed_dir / "parkinson_uci.csv"
        healthy_file = self.processed_dir / "healthy_uci.csv"
        
        parkinson_df.to_csv(parkinson_file, index=False)
        healthy_df.to_csv(healthy_file, index=False)
        
        print(f"\n✅ Saved Parkinson data: {parkinson_file}")
        print(f"✅ Saved Healthy data: {healthy_file}")
        
        # Generate metadata
        metadata = {
            "source": "UCI Machine Learning Repository",
            "url": self.url,
            "total_records": len(df),
            "parkinson_records": len(parkinson_df),
            "healthy_records": len(healthy_df),
            "features": list(df.columns),
            "feature_count": len(df.columns),
            "files": {
                "raw": str(self.output_file),
                "parkinson": str(parkinson_file),
                "healthy": str(healthy_file)
            }
        }
        
        metadata_file = self.processed_dir / "metadata.json"
        with open(metadata_file, 'w') as f:
            json.dump(metadata, f, indent=2)
        
        print(f"✅ Saved metadata: {metadata_file}")
        
        return metadata
    
    def analyze(self):
        """Analyze dataset features"""
        print("\n" + "=" * 60)
        print("DATASET ANALYSIS")
        print("=" * 60)
        
        df = pd.read_csv(self.output_file)
        
        print("\n📈 Feature Statistics:")
        print(df.describe())
        
        print("\n📊 Feature List:")
        for i, col in enumerate(df.columns, 1):
            print(f"   {i:2d}. {col}")
        
        print("\n🎯 Target Distribution:")
        print(df['status'].value_counts())
        
        return df

if __name__ == "__main__":
    downloader = UCIDatasetDownloader()
    
    # Download
    if downloader.download():
        # Process
        metadata = downloader.process()
        
        # Analyze
        df = downloader.analyze()
        
        print("\n" + "=" * 60)
        print("✅ UCI DATASET READY!")
        print("=" * 60)
        print(f"\n📁 Data location: {downloader.processed_dir}")
        print(f"📊 Total records: {metadata['total_records']}")
        print(f"🔴 Parkinson: {metadata['parkinson_records']}")
        print(f"🟢 Healthy: {metadata['healthy_records']}")
