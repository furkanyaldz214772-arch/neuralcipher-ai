#!/usr/bin/env python3
"""
241,000 DOSYA TAM TARAMA SCRIPT'İ
Her dosyayı kategorize eder, boyutlandırır ve kataloglar
"""

import os
import json
from pathlib import Path
from collections import defaultdict
import hashlib
from datetime import datetime

class DataInventoryScanner:
    def __init__(self, base_path):
        self.base_path = Path(base_path)
        self.inventory = {
            'scan_date': datetime.now().isoformat(),
            'total_files': 0,
            'total_size_gb': 0,
            'categories': defaultdict(lambda: {
                'count': 0,
                'size_bytes': 0,
                'files': []
            })
        }
        
    def get_file_category(self, file_path):
        """Dosya tipine göre kategori belirle"""
        ext = file_path.suffix.lower()
        name = file_path.name.lower()
        
        # Kategori mapping
        categories = {
            # Görüntü verileri
            '.tfrecords': 'tfrecords_images',
            '.png': 'images_png',
            '.jpg': 'images_jpg',
            '.jpeg': 'images_jpeg',
            
            # Ses verileri
            '.wav': 'audio_wav',
            '.m4a': 'audio_m4a',
            '.mp3': 'audio_mp3',
            
            # Tablo verileri
            '.csv': 'tabular_csv',
            '.xlsx': 'tabular_excel',
            '.xls': 'tabular_excel',
            
            # MATLAB verileri
            '.mat': 'matlab_data',
            
            # Metin verileri
            '.txt': 'text_data',
            
            # Model dosyaları
            '.h5': 'models_h5',
            '.pkl': 'models_pickle',
            '.pt': 'models_pytorch',
            '.pth': 'models_pytorch',
            
            # Numpy/Scipy
            '.npz': 'numpy_compressed',
            '.npy': 'numpy_array',
            
            # Dokümantasyon
            '.pdf': 'documentation_pdf',
            '.md': 'documentation_markdown',
            
            # Python
            '.py': 'scripts_python',
            
            # JSON
            '.json': 'metadata_json',
            '.tsv': 'metadata_tsv',
            
            # Diğer
            '.h5ad': 'anndata_h5ad',
            '.smi': 'chemical_smiles',
        }
        
        return categories.get(ext, f'other_{ext}')
    
    def calculate_file_hash(self, file_path, sample_size=1024*1024):
        """Dosya hash'i hesapla (ilk 1MB)"""
        try:
            hasher = hashlib.md5()
            with open(file_path, 'rb') as f:
                hasher.update(f.read(sample_size))
            return hasher.hexdigest()
        except:
            return None
    
    def scan_directory(self, progress_callback=None):
        """Tüm dizini tara"""
        print(f"🔍 Tarama başlıyor: {self.base_path}")
        print("⏳ Bu işlem 10-30 dakika sürebilir...")
        
        file_count = 0
        
        for root, dirs, files in os.walk(self.base_path):
            for file in files:
                file_path = Path(root) / file
                
                try:
                    # Dosya bilgilerini al
                    stat = file_path.stat()
                    size = stat.st_size
                    
                    # Kategori belirle
                    category = self.get_file_category(file_path)
                    
                    # Relative path
                    rel_path = file_path.relative_to(self.base_path)
                    
                    # Hash hesapla (sadece küçük dosyalar için)
                    file_hash = None
                    if size < 10 * 1024 * 1024:  # 10MB'dan küçükse
                        file_hash = self.calculate_file_hash(file_path)
                    
                    # Kaydet
                    file_info = {
                        'path': str(rel_path),
                        'size_bytes': size,
                        'size_mb': round(size / (1024*1024), 2),
                        'modified': datetime.fromtimestamp(stat.st_mtime).isoformat(),
                        'hash': file_hash
                    }
                    
                    self.inventory['categories'][category]['count'] += 1
                    self.inventory['categories'][category]['size_bytes'] += size
                    self.inventory['categories'][category]['files'].append(file_info)
                    
                    self.inventory['total_files'] += 1
                    self.inventory['total_size_gb'] += size / (1024**3)
                    
                    file_count += 1
                    
                    # Progress
                    if file_count % 1000 == 0:
                        print(f"✅ {file_count:,} dosya tarandı...")
                        if progress_callback:
                            progress_callback(file_count)
                    
                except Exception as e:
                    print(f"⚠️  Hata: {file_path} - {e}")
                    continue
        
        print(f"\n🎉 Tarama tamamlandı!")
        print(f"📊 Toplam: {self.inventory['total_files']:,} dosya")
        print(f"💾 Toplam boyut: {self.inventory['total_size_gb']:.2f} GB")
        
        return self.inventory
    
    def save_inventory(self, output_path):
        """Envanteri kaydet"""
        # Ana rapor
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(self.inventory, f, indent=2, ensure_ascii=False)
        
        # Özet rapor
        summary_path = output_path.replace('.json', '_summary.txt')
        with open(summary_path, 'w', encoding='utf-8') as f:
            f.write("=" * 80 + "\n")
            f.write("VERİ ENVANTERİ ÖZET RAPORU\n")
            f.write("=" * 80 + "\n\n")
            
            f.write(f"Tarama Tarihi: {self.inventory['scan_date']}\n")
            f.write(f"Toplam Dosya: {self.inventory['total_files']:,}\n")
            f.write(f"Toplam Boyut: {self.inventory['total_size_gb']:.2f} GB\n\n")
            
            f.write("KATEGORİ DAĞILIMI:\n")
            f.write("-" * 80 + "\n")
            
            # Kategorileri boyuta göre sırala
            sorted_cats = sorted(
                self.inventory['categories'].items(),
                key=lambda x: x[1]['size_bytes'],
                reverse=True
            )
            
            for category, data in sorted_cats:
                size_gb = data['size_bytes'] / (1024**3)
                f.write(f"\n{category}:\n")
                f.write(f"  Dosya Sayısı: {data['count']:,}\n")
                f.write(f"  Toplam Boyut: {size_gb:.2f} GB\n")
                f.write(f"  Ortalama Dosya: {data['size_bytes']/data['count']/1024:.2f} KB\n")
        
        print(f"\n💾 Envanter kaydedildi:")
        print(f"   - Detaylı: {output_path}")
        print(f"   - Özet: {summary_path}")
    
    def generate_usage_plan(self, output_path):
        """Her kategori için kullanım planı oluştur"""
        plan = {
            'tfrecords_images': {
                'priority': 'HIGH',
                'usage': 'CNN model eğitimi için görüntü verileri',
                'pipeline': 'TensorFlow Dataset API',
                'estimated_time': '2-3 hafta'
            },
            'audio_wav': {
                'priority': 'HIGH',
                'usage': 'Ses özellik çıkarma ve model eğitimi',
                'pipeline': 'librosa + feature_extraction.py',
                'estimated_time': '1 hafta'
            },
            'tabular_csv': {
                'priority': 'HIGH',
                'usage': 'Klinik veriler ve UPDRS skorları',
                'pipeline': 'pandas + sklearn',
                'estimated_time': '3-5 gün'
            },
            'matlab_data': {
                'priority': 'MEDIUM',
                'usage': 'Aktivite ve özellik verileri',
                'pipeline': 'scipy.io.loadmat',
                'estimated_time': '1 hafta'
            },
            'text_data': {
                'priority': 'MEDIUM',
                'usage': 'Yürüyüş analizi verileri',
                'pipeline': 'Custom parser',
                'estimated_time': '1 hafta'
            },
            'numpy_compressed': {
                'priority': 'MEDIUM',
                'usage': 'Sensör ve hareket verileri',
                'pipeline': 'numpy.load',
                'estimated_time': '3-5 gün'
            },
            'models_pickle': {
                'priority': 'LOW',
                'usage': 'Önceden eğitilmiş modeller',
                'pipeline': 'pickle.load + evaluation',
                'estimated_time': '1-2 gün'
            }
        }
        
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(plan, f, indent=2, ensure_ascii=False)
        
        print(f"📋 Kullanım planı oluşturuldu: {output_path}")


def main():
    """Ana fonksiyon"""
    import sys
    
    # Veriler klasörü yolu
    if len(sys.argv) > 1:
        data_path = sys.argv[1]
    else:
        data_path = "../Veriler"
    
    print("🚀 NeuralCipher.AI - Tam Veri Tarama Sistemi")
    print("=" * 80)
    
    # Scanner oluştur
    scanner = DataInventoryScanner(data_path)
    
    # Tara
    inventory = scanner.scan_directory()
    
    # Kaydet
    output_dir = Path("data_inventory")
    output_dir.mkdir(exist_ok=True)
    
    scanner.save_inventory(str(output_dir / "full_inventory.json"))
    scanner.generate_usage_plan(str(output_dir / "usage_plan.json"))
    
    print("\n✅ Tüm işlemler tamamlandı!")
    print(f"📁 Raporlar: {output_dir.absolute()}")


if __name__ == "__main__":
    main()
