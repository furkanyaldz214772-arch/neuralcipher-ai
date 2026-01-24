"""
TFRecords Görüntü Loader
28.47 GB - 1,848 dosya
Spiral çizimler ve el yazısı için
"""

import tensorflow as tf
from pathlib import Path
from typing import List, Tuple
import logging

logger = logging.getLogger(__name__)


class TFRecordsImageLoader:
    """TFRecords formatındaki görüntüleri yükler"""
    
    def __init__(self, data_dir: str):
        self.data_dir = Path(data_dir)
        self.tfrecord_files = self.discover_files()
        logger.info(f"🖼️  {len(self.tfrecord_files)} TFRecords dosyası bulundu")
    
    def discover_files(self) -> List[str]:
        """Tüm .tfrecords dosyalarını bul"""
        files = list(self.data_dir.rglob('*.tfrecords'))
        return [str(f) for f in sorted(files)]
    
    def parse_tfrecord(self, example_proto):
        """TFRecord'u parse et"""
        feature_description = {
            'image/encoded': tf.io.FixedLenFeature([], tf.string),
            'image/height': tf.io.FixedLenFeature([], tf.int64),
            'image/width': tf.io.FixedLenFeature([], tf.int64),
            'image/label': tf.io.FixedLenFeature([], tf.int64),
        }
        
        parsed = tf.io.parse_single_example(example_proto, feature_description)
        
        # Görüntüyü decode et
        image = tf.io.decode_image(parsed['image/encoded'], channels=3)
        image = tf.cast(image, tf.float32) / 255.0
        
        label = tf.cast(parsed['image/label'], tf.int32)
        
        return image, label
    
    def augment_image(self, image, label):
        """Görüntü augmentasyonu"""
        # Random flip
        image = tf.image.random_flip_left_right(image)
        image = tf.image.random_flip_up_down(image)
        
        # Random rotation
        image = tf.image.rot90(image, k=tf.random.uniform([], 0, 4, dtype=tf.int32))
        
        # Random brightness/contrast
        image = tf.image.random_brightness(image, 0.2)
        image = tf.image.random_contrast(image, 0.8, 1.2)
        
        # Clip values
        image = tf.clip_by_value(image, 0.0, 1.0)
        
        return image, label
    
    def create_dataset(self, batch_size=32, augment=True, shuffle=True):
        """TensorFlow Dataset oluştur"""
        dataset = tf.data.TFRecordDataset(self.tfrecord_files)
        dataset = dataset.map(self.parse_tfrecord, num_parallel_calls=tf.data.AUTOTUNE)
        
        if augment:
            dataset = dataset.map(self.augment_image, num_parallel_calls=tf.data.AUTOTUNE)
        
        if shuffle:
            dataset = dataset.shuffle(buffer_size=1000)
        
        dataset = dataset.batch(batch_size)
        dataset = dataset.prefetch(tf.data.AUTOTUNE)
        
        return dataset


if __name__ == "__main__":
    print("🖼️  TFRecords Loader Test")
    loader = TFRecordsImageLoader("../../Veriler")
    dataset = loader.create_dataset(batch_size=4)
    
    for images, labels in dataset.take(1):
        print(f"✅ Batch shape: {images.shape}")
        print(f"✅ Labels: {labels.numpy()}")
        break
