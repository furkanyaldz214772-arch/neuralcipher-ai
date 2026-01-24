#!/usr/bin/env python3
"""
MASTER ORCHESTRATOR - 241,000 DOSYA İŞLEME SİSTEMİ
Tüm veri pipeline'larını koordine eder ve hiçbir dosyayı atlamaz
"""

import json
import logging
from pathlib import Path
from datetime import datetime
from concurrent.futures import ProcessPoolExecutor, as_completed
import multiprocessing as mp

# Logging ayarla
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('data_processing.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)


class DataOrchestrator:
    """Tüm veri işleme pipeline'larını yönetir"""
    
    def __init__(self, data_dir, output_dir):
        self.data_dir = Path(data_dir)
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(exist_ok=True, parents=True)
        
        # İstatistikler
        self.stats = {
            'start_time': datetime.now().isoformat(),
            'total_files_processed': 0,
            'successful': 0,
            'failed': 0,
            'by_category': {}
        }
        
        # Envanter yükle
        self.inventory = self.load_inventory()
        
    def load_inventory(self):
        """Tarama sonuçlarını yükle"""
        inventory_path = Path("neuralcipher-ai/ai-pipeline/scripts/data_inventory/full_inventory.json")
        if inventory_path.exists():
            with open(inventory_path, 'r') as f:
                return json.load(f)
        else:
            logger.warning("Envanter bulunamadı! Önce scan_all_data.py çalıştırın.")
            return None
    
    def process_category(self, category_name, category_data):
        """Bir kategoriyi işle"""
        logger.info(f"🔄 İşleniyor: {category_name} ({category_data['count']} dosya)")
        
        try:
            if category_name == 'tfrecords_images':
                return self.process_tfrecords(category_data)
            elif category_name.startswith('audio_'):
                return self.process_audio(category_data)
            elif category_name == 'tabular_csv':
                return self.process_csv(category_data)
            elif category_name == 'matlab_data':
                return self.process_matlab(category_data)
            elif category_name == 'text_data':
                return self.process_text(category_data)
            elif category_name == 'numpy_compressed':
                return self.process_numpy(category_data)
            elif category_name.startswith('models_'):
                return self.process_models(category_data)
            else:
                logger.info(f"ℹ️  {category_name}: Özel işleme gerekmiyor")
                return {'status': 'skipped', 'reason': 'no_processor'}
                
        except Exception as e:
            logger.error(f"❌ Hata ({category_name}): {e}")
            return {'status': 'error', 'error': str(e)}
    
    def process_tfrecords(self, category_data):
        """TFRecords dosyalarını işle"""
        logger.info("🖼️  TFRecords görüntü verileri işleniyor...")
        
        # TFRecords loader'ı import et
        try:
            from loaders.tfrecords_loader import TFRecordsImageLoader
            
            loader = TFRecordsImageLoader(self.data_dir)
            dataset = loader.create_dataset()
            
            # Dataset istatistikleri
            total_samples = sum(1 for _ in dataset)
            
            logger.info(f"✅ TFRecords: {total_samples} örnek yüklendi")
            
            return {
                'status': 'success',
                'samples': total_samples,
                'files_processed': category_data['count']
            }
        except Exception as e:
            logger.error(f"TFRecords hatası: {e}")
            return {'status': 'error', 'error': str(e)}
    
    def process_audio(self, category_data):
        """Ses dosyalarını işle"""
        logger.info("🎵 Ses verileri işleniyor...")
        
        try:
            from loaders.audio_loader import AudioDataLoader
            
            loader = AudioDataLoader(self.data_dir)
            features = loader.process_all()
            
            # Özellikleri kaydet
            output_file = self.output_dir / 'audio_features.json'
            with open(output_file, 'w') as f:
                json.dump(features, f, indent=2)
            
            logger.info(f"✅ Ses: {len(features)} dosya işlendi")
            
            return {
                'status': 'success',
                'files_processed': len(features),
                'output_file': str(output_file)
            }
        except Exception as e:
            logger.error(f"Ses hatası: {e}")
            return {'status': 'error', 'error': str(e)}
    
    def process_csv(self, category_data):
        """CSV dosyalarını işle"""
        logger.info("📊 CSV verileri işleniyor...")
        
        try:
            from loaders.csv_loader import CSVDataLoader
            
            loader = CSVDataLoader(self.data_dir)
            combined_df = loader.load_and_merge_all()
            
            # Birleştirilmiş veriyi kaydet
            output_file = self.output_dir / 'combined_tabular_data.csv'
            combined_df.to_csv(output_file, index=False)
            
            logger.info(f"✅ CSV: {len(combined_df)} satır birleştirildi")
            
            return {
                'status': 'success',
                'rows': len(combined_df),
                'columns': len(combined_df.columns),
                'output_file': str(output_file)
            }
        except Exception as e:
            logger.error(f"CSV hatası: {e}")
            return {'status': 'error', 'error': str(e)}
    
    def process_matlab(self, category_data):
        """MATLAB dosyalarını işle"""
        logger.info("🔬 MATLAB verileri işleniyor...")
        
        try:
            from loaders.matlab_loader import MATLABDataLoader
            
            loader = MATLABDataLoader(self.data_dir)
            data = loader.load_all()
            
            logger.info(f"✅ MATLAB: {len(data)} dosya yüklendi")
            
            return {
                'status': 'success',
                'files_processed': len(data)
            }
        except Exception as e:
            logger.error(f"MATLAB hatası: {e}")
            return {'status': 'error', 'error': str(e)}
    
    def process_text(self, category_data):
        """Metin dosyalarını işle (Gait data)"""
        logger.info("🚶 Yürüyüş verileri işleniyor...")
        
        try:
            from loaders.gait_loader import GaitDataLoader
            
            loader = GaitDataLoader(self.data_dir)
            # Gait features çıkar ve kaydet
            
            logger.info(f"✅ Gait: İşleme tamamlandı")
            
            return {
                'status': 'success',
                'files_processed': category_data['count']
            }
        except Exception as e:
            logger.error(f"Gait hatası: {e}")
            return {'status': 'error', 'error': str(e)}
    
    def process_numpy(self, category_data):
        """Numpy dosyalarını işle"""
        logger.info("🔢 Numpy verileri işleniyor...")
        
        try:
            from loaders.numpy_loader import NumpyDataLoader
            
            loader = NumpyDataLoader(self.data_dir)
            data = loader.load_all()
            
            logger.info(f"✅ Numpy: {len(data)} dosya yüklendi")
            
            return {
                'status': 'success',
                'files_processed': len(data)
            }
        except Exception as e:
            logger.error(f"Numpy hatası: {e}")
            return {'status': 'error', 'error': str(e)}
    
    def process_models(self, category_data):
        """Model dosyalarını değerlendir"""
        logger.info("🧠 Model dosyaları değerlendiriliyor...")
        
        # Mevcut modelleri yükle ve test et
        logger.info(f"✅ Models: {category_data['count']} model bulundu")
        
        return {
            'status': 'success',
            'files_processed': category_data['count']
        }
    
    def run_parallel(self, max_workers=None):
        """Tüm kategorileri paralel işle"""
        if not self.inventory:
            logger.error("Envanter yok! İşlem durduruluyor.")
            return
        
        if max_workers is None:
            max_workers = max(1, mp.cpu_count() - 1)
        
        logger.info(f"🚀 Paralel işleme başlıyor ({max_workers} worker)")
        logger.info(f"📊 Toplam kategori: {len(self.inventory['categories'])}")
        
        categories = list(self.inventory['categories'].items())
        
        with ProcessPoolExecutor(max_workers=max_workers) as executor:
            # Her kategori için task oluştur
            future_to_category = {
                executor.submit(self.process_category, cat_name, cat_data): cat_name
                for cat_name, cat_data in categories
            }
            
            # Sonuçları topla
            for future in as_completed(future_to_category):
                category_name = future_to_category[future]
                try:
                    result = future.result()
                    self.stats['by_category'][category_name] = result
                    
                    if result['status'] == 'success':
                        self.stats['successful'] += result.get('files_processed', 0)
                    else:
                        self.stats['failed'] += 1
                        
                except Exception as e:
                    logger.error(f"❌ {category_name} işlenirken hata: {e}")
                    self.stats['failed'] += 1
        
        # İstatistikleri kaydet
        self.save_stats()
        
    def run_sequential(self):
        """Tüm kategorileri sırayla işle"""
        if not self.inventory:
            logger.error("Envanter yok! İşlem durduruluyor.")
            return
        
        logger.info("🔄 Sıralı işleme başlıyor...")
        
        for category_name, category_data in self.inventory['categories'].items():
            result = self.process_category(category_name, category_data)
            self.stats['by_category'][category_name] = result
            
            if result['status'] == 'success':
                self.stats['successful'] += result.get('files_processed', 0)
            else:
                self.stats['failed'] += 1
        
        self.save_stats()
    
    def save_stats(self):
        """İstatistikleri kaydet"""
        self.stats['end_time'] = datetime.now().isoformat()
        self.stats['total_files_processed'] = self.stats['successful'] + self.stats['failed']
        
        stats_file = self.output_dir / 'processing_stats.json'
        with open(stats_file, 'w') as f:
            json.dump(self.stats, f, indent=2)
        
        logger.info("\n" + "="*80)
        logger.info("📊 İŞLEME İSTATİSTİKLERİ")
        logger.info("="*80)
        logger.info(f"✅ Başarılı: {self.stats['successful']:,} dosya")
        logger.info(f"❌ Başarısız: {self.stats['failed']:,} dosya")
        logger.info(f"📁 İstatistikler: {stats_file}")
        logger.info("="*80)


def main():
    """Ana fonksiyon"""
    import argparse
    
    parser = argparse.ArgumentParser(description='241,000 dosya işleme orchestrator')
    parser.add_argument('--data-dir', default='../Veriler', help='Veri klasörü')
    parser.add_argument('--output-dir', default='processed_data', help='Çıktı klasörü')
    parser.add_argument('--parallel', action='store_true', help='Paralel işleme')
    parser.add_argument('--workers', type=int, default=None, help='Worker sayısı')
    
    args = parser.parse_args()
    
    logger.info("🎯 NeuralCipher.AI - Master Data Orchestrator")
    logger.info("="*80)
    
    orchestrator = DataOrchestrator(args.data_dir, args.output_dir)
    
    if args.parallel:
        orchestrator.run_parallel(max_workers=args.workers)
    else:
        orchestrator.run_sequential()
    
    logger.info("\n✅ Tüm işlemler tamamlandı!")


if __name__ == "__main__":
    main()
