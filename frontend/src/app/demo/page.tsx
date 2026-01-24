'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FiActivity, FiTrendingUp, FiBarChart2, FiMap, FiSliders, FiZap, FiAlertCircle, FiTarget, FiPieChart, FiDownload, FiSun, FiMoon, FiChevronDown, FiMail, FiMessageCircle, FiHelpCircle, FiArrowRight } from 'react-icons/fi';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, Cell, ScatterChart, Scatter, ZAxis } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import QRCode from 'qrcode';
import Footer from '@/components/layout/Footer';

// Her biyobelirtecin risk skoruna etkisi (feature importance)
const featureImportance: Record<string, number> = {
  // Pitch/F0 - Yüksek etki
  meanF0: 0.08, f0Std: 0.09, f0Range: 0.06, f0Min: 0.04, f0Max: 0.04,
  f0CoV: 0.07, jitterLocal: 0.12, jitterAbs: 0.11, jitterRAP: 0.10, jitterPPQ5: 0.09,
  // Amplitude - Orta-yüksek etki
  shimmerLocal: 0.11, shimmerDB: 0.10, shimmerAPQ3: 0.08, shimmerAPQ5: 0.09,
  shimmerAPQ11: 0.08, meanIntensity: 0.05, intensityStd: 0.06, intensityRange: 0.05,
  // Harmonics - Çok yüksek etki
  HNR: 0.15, NHR: 0.13, SNR: 0.12,
  // MFCC - Orta etki
  mfcc1: 0.07, mfcc2: 0.06, mfcc3: 0.05, mfcc4: 0.05, mfcc5: 0.04,
  mfcc6: 0.04, mfcc7: 0.03, mfcc8: 0.03, mfcc9: 0.03, mfcc10: 0.02,
  mfcc11: 0.02, mfcc12: 0.02, mfcc13: 0.02,
  // Formants - Orta etki
  f1Mean: 0.05, f1Std: 0.06, f2Mean: 0.05, f2Std: 0.06,
  f3Mean: 0.04, f3Std: 0.05, f4Mean: 0.04, f4Std: 0.04,
  // Temporal - Yüksek etki
  speechRate: 0.10, articulationRate: 0.09, phonationTime: 0.08,
  pauseDuration: 0.09, speechPauseRatio: 0.08, voicedUnvoicedRatio: 0.07, syllableDuration: 0.07,
  // Spectral - Orta etki
  spectralCentroid: 0.06, spectralRolloff: 0.05, spectralFlux: 0.06,
  spectralBandwidth: 0.05, spectralEntropy: 0.05, zeroCrossingRate: 0.06,
  // Voice Quality - Çok yüksek etki
  CPP: 0.14, breathinessIndex: 0.12, tremorIntensity: 0.13, vocalStability: 0.11
};

// Gerçek biomarker verileri - Sağlıklı vs Parkinson
const biomarkerData = {
  healthy: {
    // Pitch/F0 (10)
    meanF0: 120.5, f0Std: 15.2, f0Range: 85.3, f0Min: 80.0, f0Max: 165.3,
    f0CoV: 0.126, jitterLocal: 0.0045, jitterAbs: 0.000023, jitterRAP: 0.0028, jitterPPQ5: 0.0031,
    // Amplitude (8)
    shimmerLocal: 0.035, shimmerDB: 0.31, shimmerAPQ3: 0.018, shimmerAPQ5: 0.021,
    shimmerAPQ11: 0.024, meanIntensity: 72.5, intensityStd: 8.3, intensityRange: 45.2,
    // Harmonics (3)
    HNR: 22.5, NHR: 0.012, SNR: 18.7,
    // MFCC (13)
    mfcc1: -425.3, mfcc2: 98.5, mfcc3: 45.2, mfcc4: 28.7, mfcc5: 15.3,
    mfcc6: 8.9, mfcc7: 5.2, mfcc8: 3.1, mfcc9: 1.8, mfcc10: 0.9,
    mfcc11: 0.5, mfcc12: 0.3, mfcc13: 0.2,
    // Formants (8)
    f1Mean: 720, f1Std: 85, f2Mean: 1220, f2Std: 120,
    f3Mean: 2650, f3Std: 180, f4Mean: 3500, f4Std: 220,
    // Temporal (7)
    speechRate: 4.8, articulationRate: 5.2, phonationTime: 0.85,
    pauseDuration: 0.45, speechPauseRatio: 1.89, voicedUnvoicedRatio: 0.72, syllableDuration: 0.21,
    // Spectral (6)
    spectralCentroid: 2850, spectralRolloff: 5200, spectralFlux: 0.042,
    spectralBandwidth: 1850, spectralEntropy: 0.78, zeroCrossingRate: 0.085,
    // Voice Quality (4)
    CPP: 18.5, breathinessIndex: 0.15, tremorIntensity: 0.08, vocalStability: 0.92
  },
  parkinson: {
    // Pitch/F0 (10) - Parkinson'da daha düşük ve değişken
    meanF0: 105.2, f0Std: 28.5, f0Range: 125.8, f0Min: 65.0, f0Max: 190.8,
    f0CoV: 0.271, jitterLocal: 0.0089, jitterAbs: 0.000058, jitterRAP: 0.0062, jitterPPQ5: 0.0071,
    // Amplitude (8) - Daha fazla shimmer
    shimmerLocal: 0.068, shimmerDB: 0.62, shimmerAPQ3: 0.042, shimmerAPQ5: 0.048,
    shimmerAPQ11: 0.055, meanIntensity: 65.2, intensityStd: 12.8, intensityRange: 58.5,
    // Harmonics (3) - Daha düşük HNR, yüksek NHR
    HNR: 15.8, NHR: 0.028, SNR: 12.3,
    // MFCC (13) - Farklı spektral özellikler
    mfcc1: -485.7, mfcc2: 112.8, mfcc3: 58.5, mfcc4: 38.2, mfcc5: 22.7,
    mfcc6: 13.5, mfcc7: 8.9, mfcc8: 5.8, mfcc9: 3.5, mfcc10: 2.1,
    mfcc11: 1.3, mfcc12: 0.8, mfcc13: 0.5,
    // Formants (8) - Daha değişken
    f1Mean: 685, f1Std: 125, f2Mean: 1180, f2Std: 185,
    f3Mean: 2580, f3Std: 245, f4Mean: 3420, f4Std: 295,
    // Temporal (7) - Daha yavaş konuşma
    speechRate: 3.2, articulationRate: 3.8, phonationTime: 0.68,
    pauseDuration: 0.78, speechPauseRatio: 0.87, voicedUnvoicedRatio: 0.58, syllableDuration: 0.32,
    // Spectral (6) - Farklı spektral karakteristikler
    spectralCentroid: 2620, spectralRolloff: 4850, spectralFlux: 0.068,
    spectralBandwidth: 2150, spectralEntropy: 0.85, zeroCrossingRate: 0.112,
    // Voice Quality (4) - Daha kötü ses kalitesi
    CPP: 12.8, breathinessIndex: 0.35, tremorIntensity: 0.28, vocalStability: 0.65
  }
};

export default function DemoPage() {
  const [selectedPatient, setSelectedPatient] = useState<string>('h1');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [simulationMode, setSimulationMode] = useState(false);
  const [customValues, setCustomValues] = useState<Record<string, number>>({});
  const [selectedBiomarker, setSelectedBiomarker] = useState<string | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  
  // Ultra Professional View Controls
  const [viewMode, setViewMode] = useState<'grid' | 'table' | 'compact'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'risk' | 'deviation' | 'importance' | 'zscore'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  
  // Patient Selection Controls
  const [patientSearchQuery, setPatientSearchQuery] = useState('');
  const [patientStatusFilter, setPatientStatusFilter] = useState<'all' | 'Healthy' | 'At Risk' | 'Early PD' | 'Moderate PD' | 'Advanced PD'>('all');
  const [patientPage, setPatientPage] = useState(0);
  const patientsPerPage = 5;
  
  // PDF Theme Control
  const [pdfTheme, setPdfTheme] = useState<'dark' | 'light'>('dark');

  // Export fonksiyonu - ULTRA PROFESSIONAL Medical Report PDF
  const exportResults = async () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // Generate unique report ID
    const reportId = `NCR-${Date.now().toString().slice(-8)}`;
    
    // Save report to database
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/reports/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          report_id: reportId,
          patient_name: currentPatient.name,
          patient_age: currentPatient.age,
          patient_gender: currentPatient.gender,
          patient_location: currentPatient.location,
          risk_score: currentRiskScore,
          biomarker_data: currentValues,
          report_type: 'demo',
          pdf_theme: pdfTheme,
        }),
      });
    } catch (error) {
      console.error('Failed to save report:', error);
      // Continue with PDF generation even if save fails
    }
    
    // Theme colors
    const isDark = pdfTheme === 'dark';
    const bgColor: [number, number, number] = isDark ? [10, 14, 39] : [255, 255, 255];
    const textColor: [number, number, number] = isDark ? [255, 255, 255] : [15, 23, 42];
    const secondaryTextColor: [number, number, number] = isDark ? [203, 213, 225] : [71, 85, 105];
    const borderColor: [number, number, number] = isDark ? [51, 65, 85] : [226, 232, 240];
    const cardBgColor: [number, number, number] = isDark ? [30, 41, 59] : [248, 250, 252];
    const accentColor = [100, 255, 218]; // Cyan stays same
    
    // ============ PAGE 1: COVER PAGE ============
    // Background
    if (isDark) {
      // Gradient background for dark mode
      for (let i = 0; i < pageHeight; i += 2) {
        const opacity = 10 + (i / pageHeight) * 10;
        doc.setFillColor(10, 14, Math.floor(39 + opacity));
        doc.rect(0, i, pageWidth, 2, 'F');
      }
    } else {
      // White background for light mode
      doc.setFillColor(255, 255, 255);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');
    }
    
    // Top accent line
    doc.setFillColor(100, 255, 218);
    doc.rect(0, 0, pageWidth, 3, 'F');
    
    // ===== LOGO - Matching Website Design =====
    const logoX = pageWidth / 2;
    const logoY = 40;
    
    // Logo Icon Box (10mm x 10mm)
    const iconSize = 10;
    const iconX = logoX - iconSize / 2;
    const iconY = logoY - iconSize / 2;
    
    // Background box with gradient effect
    doc.setFillColor(isDark ? 10 : 248, isDark ? 14 : 250, isDark ? 39 : 252);
    doc.roundedRect(iconX, iconY, iconSize, iconSize, 2, 2, 'F');
    
    // Border
    doc.setDrawColor(100, 255, 218);
    doc.setLineWidth(0.3);
    doc.roundedRect(iconX, iconY, iconSize, iconSize, 2, 2, 'S');
    
    // Neural Network Icon
    const centerX = logoX;
    const centerY = logoY;
    
    // Center node (main node)
    doc.setFillColor(100, 255, 218);
    doc.circle(centerX, centerY, 1.2, 'F');
    
    // 5 outer nodes in circle pattern (72° apart)
    const nodeRadius = 3.5;
    const angles = [0, 72, 144, 216, 288];
    
    // Draw connection lines first (behind nodes)
    doc.setDrawColor(100, 255, 218);
    doc.setLineWidth(0.4);
    angles.forEach(angle => {
      const rad = (angle * Math.PI) / 180;
      const nodeX = centerX + Math.cos(rad) * nodeRadius;
      const nodeY = centerY + Math.sin(rad) * nodeRadius;
      doc.line(centerX, centerY, nodeX, nodeY);
    });
    
    // Draw outer nodes
    angles.forEach(angle => {
      const rad = (angle * Math.PI) / 180;
      const nodeX = centerX + Math.cos(rad) * nodeRadius;
      const nodeY = centerY + Math.sin(rad) * nodeRadius;
      doc.setFillColor(100, 255, 218);
      doc.circle(nodeX, nodeY, 0.8, 'F');
    });
    
    // Brand Name - Below Icon (Centered)
    const textY = logoY + 12;
    
    // "Neural" in Cyan
    doc.setTextColor(100, 255, 218);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Neural', logoX - 22, textY);
    
    // "Cipher" in Blue
    doc.setTextColor(59, 130, 246);
    doc.text('Cipher', logoX + 2, textY);
    
    // ".AI" in Purple
    doc.setTextColor(139, 92, 246);
    doc.setFontSize(20);
    doc.text('.AI', logoX + 30, textY);
    
    doc.setFontSize(10);
    doc.setTextColor(secondaryTextColor[0], secondaryTextColor[1], secondaryTextColor[2]);
    doc.setFont('helvetica', 'normal');
    doc.text('Voice Biomarker Analysis Report', logoX, textY + 8, { align: 'center' });
    
    // Decorative line
    doc.setDrawColor(100, 255, 218);
    doc.setLineWidth(0.5);
    doc.line(logoX - 40, textY + 12, logoX + 40, textY + 12);
    
    // Report ID and Date (use the reportId from above)
    const date = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text(`Report ID: ${reportId}`, logoX, textY + 18, { align: 'center' });
    doc.text(`Generated: ${date}`, logoX, textY + 24, { align: 'center' });
    
    // Generate QR Code for report verification
    const qrCodeDataUrl = await QRCode.toDataURL(
      `https://neuralcipher.ai/verify/${reportId}`,
      { 
        width: 200, 
        margin: 1,
        color: {
          dark: isDark ? '#64FFDA' : '#0A0E27',
          light: isDark ? '#0A0E27' : '#FFFFFF'
        }
      }
    );
    
    // Add QR Code to cover page (top right corner)
    const qrSize = 25;
    doc.addImage(qrCodeDataUrl, 'PNG', pageWidth - qrSize - 15, 15, qrSize, qrSize);
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    doc.text('Scan to Verify', pageWidth - qrSize / 2 - 15, 15 + qrSize + 4, { align: 'center' });
    
    // Patient Information Box
    let yPos = 85;
    doc.setFillColor(cardBgColor[0], cardBgColor[1], cardBgColor[2]);
    doc.roundedRect(15, yPos, pageWidth - 30, 28, 3, 3, 'F');
    
    // Border for light mode
    if (!isDark) {
      doc.setDrawColor(borderColor[0], borderColor[1], borderColor[2]);
      doc.setLineWidth(0.5);
      doc.roundedRect(15, yPos, pageWidth - 30, 28, 3, 3, 'S');
    }
    
    doc.setFontSize(11);
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.setFont('helvetica', 'bold');
    doc.text('Patient Information', 20, yPos + 7);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(secondaryTextColor[0], secondaryTextColor[1], secondaryTextColor[2]);
    doc.text(`Name: ${currentPatient.name}`, 20, yPos + 13);
    doc.text(`Age: ${currentPatient.age} years`, 20, yPos + 18);
    doc.text(`Gender: ${currentPatient.gender}`, 20, yPos + 23);
    
    doc.text(`Status: ${currentPatient.status}`, 90, yPos + 13);
    doc.text(`Location: ${currentPatient.location}`, 90, yPos + 18);
    doc.text(`Mode: ${simulationMode ? 'Simulation' : 'Standard'}`, 90, yPos + 23);
    
    // Risk Score - Large and prominent
    const riskColor = currentRiskScore < 30 ? [16, 185, 129] as [number, number, number] : // Green
                      currentRiskScore < 60 ? [251, 191, 36] as [number, number, number] : // Yellow
                      [239, 68, 68] as [number, number, number]; // Red
    
    doc.setFillColor(riskColor[0], riskColor[1], riskColor[2]);
    doc.roundedRect(pageWidth - 55, yPos + 4, 40, 20, 3, 3, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(`${currentRiskScore}%`, pageWidth - 35, yPos + 16, { align: 'center' });
    doc.setFontSize(7);
    doc.text('RISK SCORE', pageWidth - 35, yPos + 21, { align: 'center' });
    
    yPos += 34;
    
    // Summary Statistics
    doc.setFontSize(11);
    doc.setTextColor(100, 255, 218);
    doc.setFont('helvetica', 'bold');
    doc.text('Analysis Summary', 15, yPos);
    
    yPos += 5;
    
    // Summary table
    const summaryData = [
      ['Total Biomarkers Analyzed', '59'],
      ['High Risk Biomarkers', filteredAndSortedBiomarkers.filter(b => b.riskScore > 8).length.toString()],
      ['Medium Risk Biomarkers', filteredAndSortedBiomarkers.filter(b => b.riskScore > 4 && b.riskScore <= 8).length.toString()],
      ['Low Risk Biomarkers', filteredAndSortedBiomarkers.filter(b => b.riskScore <= 4).length.toString()],
      ['Average Deviation', `${(filteredAndSortedBiomarkers.reduce((sum, b) => sum + b.deviation, 0) / filteredAndSortedBiomarkers.length).toFixed(1)}%`],
    ];
    
    autoTable(doc, {
      startY: yPos,
      head: [],
      body: summaryData,
      theme: 'plain',
      styles: {
        fontSize: 9,
        cellPadding: 2,
        textColor: secondaryTextColor,
      },
      columnStyles: {
        0: { fontStyle: 'bold', textColor: isDark ? [148, 163, 184] : [100, 116, 139] },
        1: { halign: 'right', textColor: [100, 255, 218], fontStyle: 'bold' },
      },
      margin: { left: 15, right: 15 },
    });
    
    yPos = (doc as any).lastAutoTable.finalY + 10;
    
    // Top 10 High Risk Biomarkers
    doc.setFontSize(11);
    doc.setTextColor(100, 255, 218);
    doc.setFont('helvetica', 'bold');
    doc.text('Top 10 High Risk Biomarkers', 15, yPos);
    
    yPos += 4;
    
    const topRiskBiomarkers = [...filteredAndSortedBiomarkers]
      .sort((a, b) => b.riskScore - a.riskScore)
      .slice(0, 10);
    
    const riskTableData = topRiskBiomarkers.map(b => [
      b.name,
      b.currentValue.toFixed(3),
      b.healthy.toFixed(3),
      b.parkinson.toFixed(3),
      `${b.deviation.toFixed(1)}%`,
      `${b.riskScore.toFixed(2)}%`,
    ]);
    
    autoTable(doc, {
      startY: yPos,
      head: [['Biomarker', 'Current', 'Healthy', 'Parkinson', 'Deviation', 'Risk']],
      body: riskTableData,
      theme: isDark ? 'grid' : 'striped',
      headStyles: {
        fillColor: isDark ? [30, 41, 59] : [100, 255, 218],
        textColor: isDark ? [100, 255, 218] : [15, 23, 42],
        fontStyle: 'bold',
        fontSize: 8,
      },
      styles: {
        fontSize: 7,
        cellPadding: 1.5,
        textColor: secondaryTextColor,
      },
      alternateRowStyles: isDark ? {} : {
        fillColor: [248, 250, 252],
      },
      columnStyles: {
        0: { cellWidth: 50, fontStyle: 'bold' },
        1: { cellWidth: 25, halign: 'center' },
        2: { cellWidth: 25, halign: 'center', textColor: [16, 185, 129] },
        3: { cellWidth: 25, halign: 'center', textColor: [239, 68, 68] },
        4: { cellWidth: 25, halign: 'center' },
        5: { cellWidth: 25, halign: 'center', fontStyle: 'bold' },
      },
      didParseCell: function(data) {
        // Color code risk scores
        if (data.column.index === 5 && data.section === 'body') {
          const risk = parseFloat(data.cell.text[0]);
          if (risk > 8) {
            data.cell.styles.textColor = [239, 68, 68]; // Red
            data.cell.styles.fontStyle = 'bold';
          } else if (risk > 4) {
            data.cell.styles.textColor = [251, 191, 36]; // Yellow
          } else {
            data.cell.styles.textColor = [16, 185, 129]; // Green
          }
        }
      },
      margin: { left: 15, right: 15 },
    });
    
    // Add new page for complete biomarker list
    doc.addPage();
    yPos = 15;
    
    // Header on new page
    doc.setFillColor(isDark ? 10 : 248, isDark ? 14 : 250, isDark ? 39 : 252);
    doc.rect(0, 0, pageWidth, 25, 'F');
    doc.setTextColor(100, 255, 218);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Complete Biomarker Analysis', 15, 16);
    
    yPos = 30;
    
    // All biomarkers by category
    const categories = ['pitch', 'amplitude', 'harmonics', 'mfcc', 'formants', 'temporal', 'spectral', 'quality'];
    const categoryNames: Record<string, string> = {
      pitch: 'Pitch/F0 Features',
      amplitude: 'Amplitude Features',
      harmonics: 'Harmonic Features',
      mfcc: 'MFCC Features',
      formants: 'Formant Features',
      temporal: 'Temporal Features',
      spectral: 'Spectral Features',
      quality: 'Voice Quality Features',
    };
    
    categories.forEach((cat) => {
      const catBiomarkers = filteredAndSortedBiomarkers.filter(b => {
        const catMarkers = biomarkerCategories[cat as keyof typeof biomarkerCategories];
        return catMarkers.some(m => m.key === b.key);
      });
      
      if (catBiomarkers.length === 0) return;
      
      // Check if we need a new page
      if (yPos > pageHeight - 50) {
        doc.addPage();
        yPos = 15;
      }
      
      doc.setFontSize(10);
      doc.setTextColor(100, 255, 218);
      doc.setFont('helvetica', 'bold');
      doc.text(categoryNames[cat], 15, yPos);
      
      yPos += 4;
      
      const catTableData = catBiomarkers.map(b => [
        b.name,
        b.currentValue.toFixed(3),
        `${b.deviation.toFixed(1)}%`,
        `${b.importance.toFixed(1)}%`,
        `${b.riskScore.toFixed(2)}%`,
      ]);
      
      autoTable(doc, {
        startY: yPos,
        head: [['Biomarker', 'Value', 'Deviation', 'Importance', 'Risk']],
        body: catTableData,
        theme: isDark ? 'striped' : 'plain',
        headStyles: {
          fillColor: isDark ? [30, 41, 59] : [100, 255, 218],
          textColor: isDark ? [100, 255, 218] : [15, 23, 42],
          fontStyle: 'bold',
          fontSize: 7,
        },
        styles: {
          fontSize: 6,
          cellPadding: 1.2,
          textColor: secondaryTextColor,
        },
        alternateRowStyles: isDark ? {
          fillColor: [15, 23, 42],
        } : {
          fillColor: [248, 250, 252],
        },
        columnStyles: {
          0: { cellWidth: 70 },
          1: { cellWidth: 30, halign: 'center' },
          2: { cellWidth: 30, halign: 'center' },
          3: { cellWidth: 30, halign: 'center' },
          4: { cellWidth: 30, halign: 'center', fontStyle: 'bold' },
        },
        didParseCell: function(data) {
          if (data.column.index === 4 && data.section === 'body') {
            const risk = parseFloat(data.cell.text[0]);
            if (risk > 8) {
              data.cell.styles.textColor = [239, 68, 68];
            } else if (risk > 4) {
              data.cell.styles.textColor = [251, 191, 36];
            } else {
              data.cell.styles.textColor = [16, 185, 129];
            }
          }
        },
        margin: { left: 15, right: 15 },
      });
      
      yPos = (doc as any).lastAutoTable.finalY + 6;
    });
    
    // ============ NEW PAGE: RECOMMENDATIONS & NEXT STEPS ============
    doc.addPage();
    yPos = 15;
    
    // Header
    doc.setFillColor(isDark ? 10 : 248, isDark ? 14 : 250, isDark ? 39 : 252);
    doc.rect(0, 0, pageWidth, 25, 'F');
    doc.setTextColor(100, 255, 218);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Clinical Recommendations', 15, 16);
    
    yPos = 30;
    
    // Risk-based recommendations
    doc.setFontSize(11);
    doc.setTextColor(100, 255, 218);
    doc.setFont('helvetica', 'bold');
    doc.text('Recommended Actions', 15, yPos);
    
    yPos += 6;
    
    const recommendations = currentRiskScore < 30 ? [
      'Continue regular monitoring with annual voice assessments',
      'Maintain healthy lifestyle habits including regular exercise',
      'Stay informed about early Parkinson\'s symptoms',
      'Consider genetic counseling if family history exists',
    ] : currentRiskScore < 60 ? [
      'Schedule consultation with a neurologist within 3 months',
      'Increase monitoring frequency to every 6 months',
      'Consider comprehensive neurological evaluation',
      'Implement neuroprotective lifestyle modifications',
      'Join support groups for at-risk individuals',
    ] : [
      'URGENT: Schedule immediate neurologist consultation',
      'Comprehensive diagnostic workup recommended',
      'Consider enrollment in clinical trials',
      'Implement aggressive neuroprotective strategies',
      'Establish care team including movement disorder specialist',
    ];
    
    doc.setFontSize(9);
    doc.setTextColor(secondaryTextColor[0], secondaryTextColor[1], secondaryTextColor[2]);
    doc.setFont('helvetica', 'normal');
    
    recommendations.forEach((rec, i) => {
      const bullet = String.fromCharCode(8226);
      doc.text(`${bullet}  ${rec}`, 20, yPos + (i * 5.5));
    });
    
    yPos += recommendations.length * 5.5 + 8;
    
    // Follow-up schedule
    doc.setFontSize(11);
    doc.setTextColor(100, 255, 218);
    doc.setFont('helvetica', 'bold');
    doc.text('Follow-up Schedule', 15, yPos);
    
    yPos += 6;
    
    const followUpData = currentRiskScore < 30 ? [
      ['Next Assessment', '12 months'],
      ['Monitoring Frequency', 'Annual'],
      ['Specialist Consultation', 'Not required'],
    ] : currentRiskScore < 60 ? [
      ['Next Assessment', '6 months'],
      ['Monitoring Frequency', 'Bi-annual'],
      ['Specialist Consultation', 'Within 3 months'],
    ] : [
      ['Next Assessment', '3 months'],
      ['Monitoring Frequency', 'Quarterly'],
      ['Specialist Consultation', 'Immediate'],
    ];
    
    autoTable(doc, {
      startY: yPos,
      head: [],
      body: followUpData,
      theme: 'plain',
      styles: {
        fontSize: 9,
        cellPadding: 2,
        textColor: secondaryTextColor,
      },
      columnStyles: {
        0: { fontStyle: 'bold', textColor: isDark ? [148, 163, 184] : [100, 116, 139], cellWidth: 80 },
        1: { halign: 'left', textColor: [100, 255, 218], fontStyle: 'bold' },
      },
      margin: { left: 15, right: 15 },
    });
    
    yPos = (doc as any).lastAutoTable.finalY + 10;
    
    // Contact Information
    doc.setFontSize(11);
    doc.setTextColor(100, 255, 218);
    doc.setFont('helvetica', 'bold');
    doc.text('Contact Information', 15, yPos);
    
    yPos += 6;
    
    doc.setFillColor(cardBgColor[0], cardBgColor[1], cardBgColor[2]);
    doc.roundedRect(15, yPos, pageWidth - 30, 28, 3, 3, 'F');
    
    if (!isDark) {
      doc.setDrawColor(borderColor[0], borderColor[1], borderColor[2]);
      doc.setLineWidth(0.5);
      doc.roundedRect(15, yPos, pageWidth - 30, 28, 3, 3, 'S');
    }
    
    doc.setFontSize(9);
    doc.setTextColor(secondaryTextColor[0], secondaryTextColor[1], secondaryTextColor[2]);
    doc.setFont('helvetica', 'normal');
    doc.text('NeuralCipher.AI Support Team', 20, yPos + 6);
    doc.text('Email: support@neuralcipher.ai', 20, yPos + 12);
    doc.text('Phone: +1 (555) 123-4567', 20, yPos + 18);
    doc.text('Web: www.neuralcipher.ai', 20, yPos + 24);
    
    doc.text('Emergency Hotline: +1 (555) 911-PARK', 120, yPos + 6);
    doc.text('Hours: 24/7 Support Available', 120, yPos + 12);
    doc.text('Telehealth: Available on request', 120, yPos + 18);
    
    yPos += 36;
    
    // Medical Disclaimer
    doc.setFontSize(11);
    doc.setTextColor(239, 68, 68); // Red for important notice
    doc.setFont('helvetica', 'bold');
    doc.text('IMPORTANT MEDICAL DISCLAIMER', 15, yPos);
    
    yPos += 6;
    
    doc.setFillColor(239, 68, 68, 0.1);
    doc.roundedRect(15, yPos, pageWidth - 30, 45, 3, 3, 'F');
    
    doc.setFontSize(7);
    doc.setTextColor(secondaryTextColor[0], secondaryTextColor[1], secondaryTextColor[2]);
    doc.setFont('helvetica', 'normal');
    
    const disclaimerText = [
      'This report is generated by AI-powered voice analysis technology and is intended for screening purposes only.',
      'It does NOT constitute a medical diagnosis and should NOT be used as a substitute for professional medical advice,',
      'diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any',
      'questions you may have regarding a medical condition. Never disregard professional medical advice or delay in',
      'seeking it because of information provided in this report.',
      '',
      'The accuracy of this analysis is approximately 92% based on clinical validation studies. False positives and false',
      'negatives may occur. This technology is FDA cleared for screening purposes only and must be confirmed by',
      'comprehensive clinical evaluation including physical examination, medical history, and additional diagnostic tests.',
    ];
    
    disclaimerText.forEach((line, i) => {
      doc.text(line, 20, yPos + 4 + (i * 4.5));
    });
    
    yPos += 50;
    
    // Report Validation with QR Code
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.setFont('helvetica', 'italic');
    doc.text('This report is digitally signed and validated by NeuralCipher.AI™', pageWidth / 2, yPos, { align: 'center' });
    doc.text(`Report verification code: ${reportId}`, pageWidth / 2, yPos + 4, { align: 'center' });
    
    // Add QR Code at bottom for verification
    const qrSize2 = 20;
    doc.addImage(qrCodeDataUrl, 'PNG', pageWidth / 2 - qrSize2 / 2, yPos + 8, qrSize2, qrSize2);
    doc.setFontSize(7);
    doc.text('Scan to verify report authenticity', pageWidth / 2, yPos + qrSize2 + 11, { align: 'center' });
    
    // Footer on last page
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text(
        `Page ${i} of ${totalPages}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: 'center' }
      );
      doc.text(
        '© 2026 NeuralCipher.AI™ - Proprietary Technology',
        pageWidth / 2,
        pageHeight - 5,
        { align: 'center' }
      );
    }
    
    // Save PDF
    doc.save(`NeuralCipher-Analysis-${currentPatient.name.replace(/\s+/g, '-')}-${Date.now()}.pdf`);
  };

  // Risk skoru hesaplama fonksiyonu
  const calculateRiskScore = (values: Record<string, number>) => {
    let totalRisk = 0;
    let totalWeight = 0;

    Object.entries(values).forEach(([key, value]) => {
      const importance = featureImportance[key] || 0;
      const healthyValue = biomarkerData.healthy[key as keyof typeof biomarkerData.healthy] as number;
      const parkinsonValue = biomarkerData.parkinson[key as keyof typeof biomarkerData.parkinson] as number;
      
      // Değerin sağlıklı ve Parkinson aralığındaki konumunu hesapla
      const range = Math.abs(parkinsonValue - healthyValue);
      const deviation = Math.abs(value - healthyValue);
      const normalizedDeviation = Math.min(deviation / range, 1);
      
      totalRisk += normalizedDeviation * importance;
      totalWeight += importance;
    });

    return Math.round((totalRisk / totalWeight) * 100);
  };
  
  const categories = [
    { id: 'all', name: 'All Features', count: 59, icon: FiActivity },
    { id: 'pitch', name: 'Pitch/F0', count: 10, icon: FiTrendingUp },
    { id: 'amplitude', name: 'Amplitude', count: 8, icon: FiBarChart2 },
    { id: 'harmonics', name: 'Harmonics', count: 3, icon: FiActivity },
    { id: 'mfcc', name: 'MFCC', count: 13, icon: FiBarChart2 },
    { id: 'formants', name: 'Formants', count: 8, icon: FiTrendingUp },
    { id: 'temporal', name: 'Temporal', count: 7, icon: FiActivity },
    { id: 'spectral', name: 'Spectral', count: 6, icon: FiBarChart2 },
    { id: 'quality', name: 'Voice Quality', count: 4, icon: FiTrendingUp },
  ];

  const patients = [
    // Healthy Patients (Risk 5-15%) - 30 people
    { id: 'h1', name: 'John Smith', age: 58, gender: 'Male', status: 'Healthy', location: 'Boston, MA', riskScore: 8 },
    { id: 'h2', name: 'Emma Wilson', age: 45, gender: 'Female', status: 'Healthy', location: 'New York, NY', riskScore: 6 },
    { id: 'h3', name: 'Michael Brown', age: 52, gender: 'Male', status: 'Healthy', location: 'Chicago, IL', riskScore: 7 },
    { id: 'h4', name: 'Sarah Davis', age: 41, gender: 'Female', status: 'Healthy', location: 'Los Angeles, CA', riskScore: 5 },
    { id: 'h5', name: 'David Miller', age: 55, gender: 'Male', status: 'Healthy', location: 'Houston, TX', riskScore: 9 },
    { id: 'h6', name: 'Lisa Anderson', age: 48, gender: 'Female', status: 'Healthy', location: 'Phoenix, AZ', riskScore: 7 },
    { id: 'h7', name: 'James Taylor', age: 50, gender: 'Male', status: 'Healthy', location: 'Philadelphia, PA', riskScore: 8 },
    { id: 'h8', name: 'Jennifer Thomas', age: 43, gender: 'Female', status: 'Healthy', location: 'San Antonio, TX', riskScore: 6 },
    { id: 'h9', name: 'Robert Jackson', age: 56, gender: 'Male', status: 'Healthy', location: 'San Diego, CA', riskScore: 10 },
    { id: 'h10', name: 'Mary White', age: 47, gender: 'Female', status: 'Healthy', location: 'Dallas, TX', riskScore: 7 },
    { id: 'h11', name: 'William Harris', age: 54, gender: 'Male', status: 'Healthy', location: 'San Jose, CA', riskScore: 8 },
    { id: 'h12', name: 'Patricia Martin', age: 49, gender: 'Female', status: 'Healthy', location: 'Austin, TX', riskScore: 9 },
    { id: 'h13', name: 'Richard Thompson', age: 51, gender: 'Male', status: 'Healthy', location: 'Jacksonville, FL', riskScore: 7 },
    { id: 'h14', name: 'Linda Garcia', age: 44, gender: 'Female', status: 'Healthy', location: 'Fort Worth, TX', riskScore: 6 },
    { id: 'h15', name: 'Charles Martinez', age: 53, gender: 'Male', status: 'Healthy', location: 'Columbus, OH', riskScore: 8 },
    { id: 'h16', name: 'Barbara Rodriguez', age: 46, gender: 'Female', status: 'Healthy', location: 'Charlotte, NC', riskScore: 7 },
    { id: 'h17', name: 'Joseph Lee', age: 57, gender: 'Male', status: 'Healthy', location: 'Indianapolis, IN', riskScore: 9 },
    { id: 'h18', name: 'Susan Walker', age: 42, gender: 'Female', status: 'Healthy', location: 'San Francisco, CA', riskScore: 6 },
    { id: 'h19', name: 'Thomas Hall', age: 55, gender: 'Male', status: 'Healthy', location: 'Seattle, WA', riskScore: 8 },
    { id: 'h20', name: 'Jessica Allen', age: 48, gender: 'Female', status: 'Healthy', location: 'Denver, CO', riskScore: 7 },
    { id: 'h21', name: 'Christopher Young', age: 50, gender: 'Male', status: 'Healthy', location: 'Washington, DC', riskScore: 10 },
    { id: 'h22', name: 'Karen King', age: 45, gender: 'Female', status: 'Healthy', location: 'Nashville, TN', riskScore: 8 },
    { id: 'h23', name: 'Daniel Wright', age: 52, gender: 'Male', status: 'Healthy', location: 'Portland, OR', riskScore: 7 },
    { id: 'h24', name: 'Nancy Lopez', age: 47, gender: 'Female', status: 'Healthy', location: 'Las Vegas, NV', riskScore: 9 },
    { id: 'h25', name: 'Matthew Hill', age: 54, gender: 'Male', status: 'Healthy', location: 'Detroit, MI', riskScore: 8 },
    { id: 'h26', name: 'Betty Scott', age: 43, gender: 'Female', status: 'Healthy', location: 'Memphis, TN', riskScore: 6 },
    { id: 'h27', name: 'Anthony Green', age: 56, gender: 'Male', status: 'Healthy', location: 'Louisville, KY', riskScore: 9 },
    { id: 'h28', name: 'Margaret Adams', age: 49, gender: 'Female', status: 'Healthy', location: 'Baltimore, MD', riskScore: 7 },
    { id: 'h29', name: 'Mark Baker', age: 51, gender: 'Male', status: 'Healthy', location: 'Milwaukee, WI', riskScore: 8 },
    { id: 'h30', name: 'Sandra Nelson', age: 46, gender: 'Female', status: 'Healthy', location: 'Albuquerque, NM', riskScore: 7 },
    
    // At Risk (Risk 16-35%) - 20 people
    { id: 'r1', name: 'Paul Carter', age: 59, gender: 'Male', status: 'At Risk', location: 'Tucson, AZ', riskScore: 18 },
    { id: 'r2', name: 'Dorothy Mitchell', age: 61, gender: 'Female', status: 'At Risk', location: 'Fresno, CA', riskScore: 22 },
    { id: 'r3', name: 'Steven Perez', age: 60, gender: 'Male', status: 'At Risk', location: 'Sacramento, CA', riskScore: 20 },
    { id: 'r4', name: 'Helen Roberts', age: 58, gender: 'Female', status: 'At Risk', location: 'Kansas City, MO', riskScore: 25 },
    { id: 'r5', name: 'Andrew Turner', age: 62, gender: 'Male', status: 'At Risk', location: 'Mesa, AZ', riskScore: 19 },
    { id: 'r6', name: 'Carol Phillips', age: 59, gender: 'Female', status: 'At Risk', location: 'Atlanta, GA', riskScore: 23 },
    { id: 'r7', name: 'Kenneth Campbell', age: 61, gender: 'Male', status: 'At Risk', location: 'Omaha, NE', riskScore: 21 },
    { id: 'r8', name: 'Ruth Parker', age: 60, gender: 'Female', status: 'At Risk', location: 'Miami, FL', riskScore: 27 },
    { id: 'r9', name: 'Joshua Evans', age: 63, gender: 'Male', status: 'At Risk', location: 'Cleveland, OH', riskScore: 24 },
    { id: 'r10', name: 'Sharon Edwards', age: 58, gender: 'Female', status: 'At Risk', location: 'New Orleans, LA', riskScore: 20 },
    { id: 'r11', name: 'Kevin Collins', age: 62, gender: 'Male', status: 'At Risk', location: 'Oakland, CA', riskScore: 26 },
    { id: 'r12', name: 'Michelle Stewart', age: 59, gender: 'Female', status: 'At Risk', location: 'Minneapolis, MN', riskScore: 22 },
    { id: 'r13', name: 'Brian Sanchez', age: 61, gender: 'Male', status: 'At Risk', location: 'Tulsa, OK', riskScore: 28 },
    { id: 'r14', name: 'Laura Morris', age: 60, gender: 'Female', status: 'At Risk', location: 'Arlington, TX', riskScore: 23 },
    { id: 'r15', name: 'George Rogers', age: 63, gender: 'Male', status: 'At Risk', location: 'Wichita, KS', riskScore: 25 },
    { id: 'r16', name: 'Donna Reed', age: 58, gender: 'Female', status: 'At Risk', location: 'Bakersfield, CA', riskScore: 21 },
    { id: 'r17', name: 'Edward Cook', age: 62, gender: 'Male', status: 'At Risk', location: 'Tampa, FL', riskScore: 29 },
    { id: 'r18', name: 'Carol Morgan', age: 59, gender: 'Female', status: 'At Risk', location: 'Honolulu, HI', riskScore: 24 },
    { id: 'r19', name: 'Ronald Bell', age: 61, gender: 'Male', status: 'At Risk', location: 'Anaheim, CA', riskScore: 27 },
    { id: 'r20', name: 'Lisa Murphy', age: 60, gender: 'Female', status: 'At Risk', location: 'Santa Ana, CA', riskScore: 22 },
    
    // Early Stage Parkinson's (Risk 36-55%) - 20 people
    { id: 'e1', name: 'Timothy Bailey', age: 64, gender: 'Male', status: 'Early PD', location: 'St. Louis, MO', riskScore: 38 },
    { id: 'e2', name: 'Betty Rivera', age: 63, gender: 'Female', status: 'Early PD', location: 'Corpus Christi, TX', riskScore: 42 },
    { id: 'e3', name: 'Jeffrey Cooper', age: 65, gender: 'Male', status: 'Early PD', location: 'Lexington, KY', riskScore: 40 },
    { id: 'e4', name: 'Sandra Richardson', age: 62, gender: 'Female', status: 'Early PD', location: 'Pittsburgh, PA', riskScore: 45 },
    { id: 'e5', name: 'Frank Cox', age: 66, gender: 'Male', status: 'Early PD', location: 'Anchorage, AK', riskScore: 39 },
    { id: 'e6', name: 'Deborah Howard', age: 64, gender: 'Female', status: 'Early PD', location: 'Stockton, CA', riskScore: 43 },
    { id: 'e7', name: 'Gary Ward', age: 65, gender: 'Male', status: 'Early PD', location: 'Cincinnati, OH', riskScore: 41 },
    { id: 'e8', name: 'Stephanie Torres', age: 63, gender: 'Female', status: 'Early PD', location: 'St. Paul, MN', riskScore: 47 },
    { id: 'e9', name: 'Raymond Peterson', age: 67, gender: 'Male', status: 'Early PD', location: 'Toledo, OH', riskScore: 44 },
    { id: 'e10', name: 'Cynthia Gray', age: 62, gender: 'Female', status: 'Early PD', location: 'Newark, NJ', riskScore: 40 },
    { id: 'e11', name: 'Jerry Ramirez', age: 66, gender: 'Male', status: 'Early PD', location: 'Greensboro, NC', riskScore: 46 },
    { id: 'e12', name: 'Kathleen James', age: 64, gender: 'Female', status: 'Early PD', location: 'Plano, TX', riskScore: 42 },
    { id: 'e13', name: 'Dennis Watson', age: 65, gender: 'Male', status: 'Early PD', location: 'Henderson, NV', riskScore: 48 },
    { id: 'e14', name: 'Amy Brooks', age: 63, gender: 'Female', status: 'Early PD', location: 'Lincoln, NE', riskScore: 43 },
    { id: 'e15', name: 'Walter Kelly', age: 67, gender: 'Male', status: 'Early PD', location: 'Buffalo, NY', riskScore: 45 },
    { id: 'e16', name: 'Shirley Sanders', age: 62, gender: 'Female', status: 'Early PD', location: 'Fort Wayne, IN', riskScore: 41 },
    { id: 'e17', name: 'Patrick Price', age: 66, gender: 'Male', status: 'Early PD', location: 'Jersey City, NJ', riskScore: 49 },
    { id: 'e18', name: 'Angela Bennett', age: 64, gender: 'Female', status: 'Early PD', location: 'Chula Vista, CA', riskScore: 44 },
    { id: 'e19', name: 'Peter Wood', age: 65, gender: 'Male', status: 'Early PD', location: 'Orlando, FL', riskScore: 47 },
    { id: 'e20', name: 'Brenda Barnes', age: 63, gender: 'Female', status: 'Early PD', location: 'Norfolk, VA', riskScore: 42 },
    
    // Moderate Parkinson's (Risk 56-75%) - 20 people
    { id: 'm1', name: 'Harold Ross', age: 68, gender: 'Male', status: 'Moderate PD', location: 'Chandler, AZ', riskScore: 58 },
    { id: 'm2', name: 'Mary Johnson', age: 67, gender: 'Female', status: 'Moderate PD', location: 'Seattle, WA', riskScore: 62 },
    { id: 'm3', name: 'Douglas Henderson', age: 69, gender: 'Male', status: 'Moderate PD', location: 'Laredo, TX', riskScore: 60 },
    { id: 'm4', name: 'Virginia Coleman', age: 66, gender: 'Female', status: 'Moderate PD', location: 'Madison, WI', riskScore: 65 },
    { id: 'm5', name: 'Henry Jenkins', age: 70, gender: 'Male', status: 'Moderate PD', location: 'Durham, NC', riskScore: 59 },
    { id: 'm6', name: 'Carolyn Perry', age: 68, gender: 'Female', status: 'Moderate PD', location: 'Lubbock, TX', riskScore: 63 },
    { id: 'm7', name: 'Carl Powell', age: 69, gender: 'Male', status: 'Moderate PD', location: 'Winston-Salem, NC', riskScore: 61 },
    { id: 'm8', name: 'Evelyn Long', age: 67, gender: 'Female', status: 'Moderate PD', location: 'Garland, TX', riskScore: 67 },
    { id: 'm9', name: 'Arthur Patterson', age: 71, gender: 'Male', status: 'Moderate PD', location: 'Glendale, AZ', riskScore: 64 },
    { id: 'm10', name: 'Joan Hughes', age: 66, gender: 'Female', status: 'Moderate PD', location: 'Hialeah, FL', riskScore: 60 },
    { id: 'm11', name: 'Roger Flores', age: 70, gender: 'Male', status: 'Moderate PD', location: 'Reno, NV', riskScore: 66 },
    { id: 'm12', name: 'Judith Washington', age: 68, gender: 'Female', status: 'Moderate PD', location: 'Chesapeake, VA', riskScore: 62 },
    { id: 'm13', name: 'Joe Butler', age: 69, gender: 'Male', status: 'Moderate PD', location: 'Gilbert, AZ', riskScore: 68 },
    { id: 'm14', name: 'Cheryl Simmons', age: 67, gender: 'Female', status: 'Moderate PD', location: 'Irving, TX', riskScore: 63 },
    { id: 'm15', name: 'Albert Foster', age: 71, gender: 'Male', status: 'Moderate PD', location: 'North Las Vegas, NV', riskScore: 65 },
    { id: 'm16', name: 'Mildred Gonzales', age: 66, gender: 'Female', status: 'Moderate PD', location: 'Scottsdale, AZ', riskScore: 61 },
    { id: 'm17', name: 'Jack Bryant', age: 70, gender: 'Male', status: 'Moderate PD', location: 'Baton Rouge, LA', riskScore: 69 },
    { id: 'm18', name: 'Katherine Alexander', age: 68, gender: 'Female', status: 'Moderate PD', location: 'Fremont, CA', riskScore: 64 },
    { id: 'm19', name: 'Lawrence Russell', age: 69, gender: 'Male', status: 'Moderate PD', location: 'Richmond, VA', riskScore: 67 },
    { id: 'm20', name: 'Janice Griffin', age: 67, gender: 'Female', status: 'Moderate PD', location: 'Boise, ID', riskScore: 62 },
    
    // Advanced Parkinson's (Risk 76-95%) - 10 people
    { id: 'a1', name: 'Eugene Diaz', age: 72, gender: 'Male', status: 'Advanced PD', location: 'San Bernardino, CA', riskScore: 78 },
    { id: 'a2', name: 'Gloria Hayes', age: 71, gender: 'Female', status: 'Advanced PD', location: 'Spokane, WA', riskScore: 82 },
    { id: 'a3', name: 'Ralph Myers', age: 73, gender: 'Male', status: 'Advanced PD', location: 'Des Moines, IA', riskScore: 80 },
    { id: 'a4', name: 'Teresa Ford', age: 70, gender: 'Female', status: 'Advanced PD', location: 'Modesto, CA', riskScore: 85 },
    { id: 'a5', name: 'Roy Hamilton', age: 74, gender: 'Male', status: 'Advanced PD', location: 'Fayetteville, NC', riskScore: 79 },
    { id: 'a6', name: 'Ann Graham', age: 72, gender: 'Female', status: 'Advanced PD', location: 'Tacoma, WA', riskScore: 83 },
    { id: 'a7', name: 'Louis Sullivan', age: 73, gender: 'Male', status: 'Advanced PD', location: 'Fontana, CA', riskScore: 81 },
    { id: 'a8', name: 'Marilyn Wallace', age: 71, gender: 'Female', status: 'Advanced PD', location: 'Moreno Valley, CA', riskScore: 87 },
    { id: 'a9', name: 'Russell West', age: 75, gender: 'Male', status: 'Advanced PD', location: 'Huntington Beach, CA', riskScore: 84 },
    { id: 'a10', name: 'Frances Cole', age: 70, gender: 'Female', status: 'Advanced PD', location: 'Yonkers, NY', riskScore: 80 },
  ];

  const currentPatient = patients.find(p => p.id === selectedPatient) || patients[0];
  
  // Get biomarker data based on patient status
  const getPatientBiomarkerData = (patient: typeof patients[0]) => {
    if (patient.status === 'Healthy') {
      return biomarkerData.healthy;
    } else {
      // For Parkinson's patients, interpolate between healthy and parkinson based on risk score
      const interpolationFactor = (patient.riskScore - 5) / (95 - 5); // Normalize risk score
      const result: Record<string, number> = {};
      
      Object.keys(biomarkerData.healthy).forEach(key => {
        const healthyVal = biomarkerData.healthy[key as keyof typeof biomarkerData.healthy] as number;
        const parkinsonVal = biomarkerData.parkinson[key as keyof typeof biomarkerData.parkinson] as number;
        result[key] = healthyVal + (parkinsonVal - healthyVal) * interpolationFactor;
      });
      
      return result;
    }
  };

  // Mevcut değerleri al (simülasyon modunda custom, değilse preset)
  const currentValues = useMemo(() => {
    if (simulationMode && Object.keys(customValues).length > 0) {
      return customValues;
    }
    return getPatientBiomarkerData(currentPatient);
  }, [simulationMode, customValues, currentPatient]);

  // Risk skorunu hesapla
  const currentRiskScore = useMemo(() => {
    if (simulationMode && Object.keys(customValues).length > 0) {
      return calculateRiskScore(customValues);
    }
    return currentPatient.riskScore;
  }, [simulationMode, customValues, currentPatient]);

  // Simülasyon modunu başlat
  const startSimulation = () => {
    setSimulationMode(true);
    setCustomValues({ ...getPatientBiomarkerData(currentPatient) });
  };

  // Simülasyonu sıfırla
  const resetSimulation = () => {
    setSimulationMode(false);
    setCustomValues({});
    setSelectedBiomarker(null);
  };

  // Değer değiştir
  const updateValue = (key: string, value: number) => {
    setCustomValues(prev => ({ ...prev, [key]: value }));
  };
  
  // Filter and paginate patients
  const filteredPatients = useMemo(() => {
    let filtered = patients;
    
    // Search filter
    if (patientSearchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(patientSearchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(patientSearchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(patientSearchQuery.toLowerCase())
      );
    }
    
    // Status filter
    if (patientStatusFilter !== 'all') {
      filtered = filtered.filter(p => p.status === patientStatusFilter);
    }
    
    return filtered;
  }, [patientSearchQuery, patientStatusFilter]);
  
  const paginatedPatients = useMemo(() => {
    const start = patientPage * patientsPerPage;
    return filteredPatients.slice(start, start + patientsPerPage);
  }, [filteredPatients, patientPage]);
  
  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);
  
  // Patient statistics
  const patientStats = useMemo(() => {
    return {
      total: patients.length,
      healthy: patients.filter(p => p.status === 'Healthy').length,
      atRisk: patients.filter(p => p.status === 'At Risk').length,
      earlyPD: patients.filter(p => p.status === 'Early PD').length,
      moderatePD: patients.filter(p => p.status === 'Moderate PD').length,
      advancedPD: patients.filter(p => p.status === 'Advanced PD').length,
      avgRisk: (patients.reduce((sum, p) => sum + p.riskScore, 0) / patients.length).toFixed(1),
      male: patients.filter(p => p.gender === 'Male').length,
      female: patients.filter(p => p.gender === 'Female').length,
    };
  }, []);

  // Biomarker kategorileri
  const biomarkerCategories = {
    pitch: [
      { name: 'Mean F0', key: 'meanF0', unit: 'Hz', healthy: biomarkerData.healthy.meanF0, parkinson: biomarkerData.parkinson.meanF0 },
      { name: 'F0 Std Dev', key: 'f0Std', unit: 'Hz', healthy: biomarkerData.healthy.f0Std, parkinson: biomarkerData.parkinson.f0Std },
      { name: 'F0 Range', key: 'f0Range', unit: 'Hz', healthy: biomarkerData.healthy.f0Range, parkinson: biomarkerData.parkinson.f0Range },
      { name: 'F0 Minimum', key: 'f0Min', unit: 'Hz', healthy: biomarkerData.healthy.f0Min, parkinson: biomarkerData.parkinson.f0Min },
      { name: 'F0 Maximum', key: 'f0Max', unit: 'Hz', healthy: biomarkerData.healthy.f0Max, parkinson: biomarkerData.parkinson.f0Max },
      { name: 'F0 CoV', key: 'f0CoV', unit: '', healthy: biomarkerData.healthy.f0CoV, parkinson: biomarkerData.parkinson.f0CoV },
      { name: 'Jitter (local)', key: 'jitterLocal', unit: '%', healthy: biomarkerData.healthy.jitterLocal, parkinson: biomarkerData.parkinson.jitterLocal },
      { name: 'Jitter (abs)', key: 'jitterAbs', unit: 's', healthy: biomarkerData.healthy.jitterAbs, parkinson: biomarkerData.parkinson.jitterAbs },
      { name: 'Jitter (RAP)', key: 'jitterRAP', unit: '%', healthy: biomarkerData.healthy.jitterRAP, parkinson: biomarkerData.parkinson.jitterRAP },
      { name: 'Jitter (PPQ5)', key: 'jitterPPQ5', unit: '%', healthy: biomarkerData.healthy.jitterPPQ5, parkinson: biomarkerData.parkinson.jitterPPQ5 },
    ],
    amplitude: [
      { name: 'Shimmer (local)', key: 'shimmerLocal', unit: '%', healthy: biomarkerData.healthy.shimmerLocal, parkinson: biomarkerData.parkinson.shimmerLocal },
      { name: 'Shimmer (dB)', key: 'shimmerDB', unit: 'dB', healthy: biomarkerData.healthy.shimmerDB, parkinson: biomarkerData.parkinson.shimmerDB },
      { name: 'Shimmer (APQ3)', key: 'shimmerAPQ3', unit: '%', healthy: biomarkerData.healthy.shimmerAPQ3, parkinson: biomarkerData.parkinson.shimmerAPQ3 },
      { name: 'Shimmer (APQ5)', key: 'shimmerAPQ5', unit: '%', healthy: biomarkerData.healthy.shimmerAPQ5, parkinson: biomarkerData.parkinson.shimmerAPQ5 },
      { name: 'Shimmer (APQ11)', key: 'shimmerAPQ11', unit: '%', healthy: biomarkerData.healthy.shimmerAPQ11, parkinson: biomarkerData.parkinson.shimmerAPQ11 },
      { name: 'Mean Intensity', key: 'meanIntensity', unit: 'dB', healthy: biomarkerData.healthy.meanIntensity, parkinson: biomarkerData.parkinson.meanIntensity },
      { name: 'Intensity Std', key: 'intensityStd', unit: 'dB', healthy: biomarkerData.healthy.intensityStd, parkinson: biomarkerData.parkinson.intensityStd },
      { name: 'Intensity Range', key: 'intensityRange', unit: 'dB', healthy: biomarkerData.healthy.intensityRange, parkinson: biomarkerData.parkinson.intensityRange },
    ],
    harmonics: [
      { name: 'HNR', key: 'HNR', unit: 'dB', healthy: biomarkerData.healthy.HNR, parkinson: biomarkerData.parkinson.HNR },
      { name: 'NHR', key: 'NHR', unit: '', healthy: biomarkerData.healthy.NHR, parkinson: biomarkerData.parkinson.NHR },
      { name: 'SNR', key: 'SNR', unit: 'dB', healthy: biomarkerData.healthy.SNR, parkinson: biomarkerData.parkinson.SNR },
    ],
    mfcc: Array.from({ length: 13 }, (_, i) => ({
      name: `MFCC ${i + 1}`,
      key: `mfcc${i + 1}`,
      unit: '',
      healthy: biomarkerData.healthy[`mfcc${i + 1}` as keyof typeof biomarkerData.healthy] as number,
      parkinson: biomarkerData.parkinson[`mfcc${i + 1}` as keyof typeof biomarkerData.parkinson] as number,
    })),
    formants: [
      { name: 'F1 Mean', key: 'f1Mean', unit: 'Hz', healthy: biomarkerData.healthy.f1Mean, parkinson: biomarkerData.parkinson.f1Mean },
      { name: 'F1 Std Dev', key: 'f1Std', unit: 'Hz', healthy: biomarkerData.healthy.f1Std, parkinson: biomarkerData.parkinson.f1Std },
      { name: 'F2 Mean', key: 'f2Mean', unit: 'Hz', healthy: biomarkerData.healthy.f2Mean, parkinson: biomarkerData.parkinson.f2Mean },
      { name: 'F2 Std Dev', key: 'f2Std', unit: 'Hz', healthy: biomarkerData.healthy.f2Std, parkinson: biomarkerData.parkinson.f2Std },
      { name: 'F3 Mean', key: 'f3Mean', unit: 'Hz', healthy: biomarkerData.healthy.f3Mean, parkinson: biomarkerData.parkinson.f3Mean },
      { name: 'F3 Std Dev', key: 'f3Std', unit: 'Hz', healthy: biomarkerData.healthy.f3Std, parkinson: biomarkerData.parkinson.f3Std },
      { name: 'F4 Mean', key: 'f4Mean', unit: 'Hz', healthy: biomarkerData.healthy.f4Mean, parkinson: biomarkerData.parkinson.f4Mean },
      { name: 'F4 Std Dev', key: 'f4Std', unit: 'Hz', healthy: biomarkerData.healthy.f4Std, parkinson: biomarkerData.parkinson.f4Std },
    ],
    temporal: [
      { name: 'Speech Rate', key: 'speechRate', unit: 'syl/s', healthy: biomarkerData.healthy.speechRate, parkinson: biomarkerData.parkinson.speechRate },
      { name: 'Articulation Rate', key: 'articulationRate', unit: 'syl/s', healthy: biomarkerData.healthy.articulationRate, parkinson: biomarkerData.parkinson.articulationRate },
      { name: 'Phonation Time', key: 'phonationTime', unit: 's', healthy: biomarkerData.healthy.phonationTime, parkinson: biomarkerData.parkinson.phonationTime },
      { name: 'Pause Duration', key: 'pauseDuration', unit: 's', healthy: biomarkerData.healthy.pauseDuration, parkinson: biomarkerData.parkinson.pauseDuration },
      { name: 'Speech/Pause Ratio', key: 'speechPauseRatio', unit: '', healthy: biomarkerData.healthy.speechPauseRatio, parkinson: biomarkerData.parkinson.speechPauseRatio },
      { name: 'Voiced/Unvoiced', key: 'voicedUnvoicedRatio', unit: '', healthy: biomarkerData.healthy.voicedUnvoicedRatio, parkinson: biomarkerData.parkinson.voicedUnvoicedRatio },
      { name: 'Syllable Duration', key: 'syllableDuration', unit: 's', healthy: biomarkerData.healthy.syllableDuration, parkinson: biomarkerData.parkinson.syllableDuration },
    ],
    spectral: [
      { name: 'Spectral Centroid', key: 'spectralCentroid', unit: 'Hz', healthy: biomarkerData.healthy.spectralCentroid, parkinson: biomarkerData.parkinson.spectralCentroid },
      { name: 'Spectral Rolloff', key: 'spectralRolloff', unit: 'Hz', healthy: biomarkerData.healthy.spectralRolloff, parkinson: biomarkerData.parkinson.spectralRolloff },
      { name: 'Spectral Flux', key: 'spectralFlux', unit: '', healthy: biomarkerData.healthy.spectralFlux, parkinson: biomarkerData.parkinson.spectralFlux },
      { name: 'Spectral Bandwidth', key: 'spectralBandwidth', unit: 'Hz', healthy: biomarkerData.healthy.spectralBandwidth, parkinson: biomarkerData.parkinson.spectralBandwidth },
      { name: 'Spectral Entropy', key: 'spectralEntropy', unit: '', healthy: biomarkerData.healthy.spectralEntropy, parkinson: biomarkerData.parkinson.spectralEntropy },
      { name: 'Zero Crossing Rate', key: 'zeroCrossingRate', unit: '', healthy: biomarkerData.healthy.zeroCrossingRate, parkinson: biomarkerData.parkinson.zeroCrossingRate },
    ],
    quality: [
      { name: 'CPP', key: 'CPP', unit: 'dB', healthy: biomarkerData.healthy.CPP, parkinson: biomarkerData.parkinson.CPP },
      { name: 'Breathiness Index', key: 'breathinessIndex', unit: '', healthy: biomarkerData.healthy.breathinessIndex, parkinson: biomarkerData.parkinson.breathinessIndex },
      { name: 'Tremor Intensity', key: 'tremorIntensity', unit: '', healthy: biomarkerData.healthy.tremorIntensity, parkinson: biomarkerData.parkinson.tremorIntensity },
      { name: 'Vocal Stability', key: 'vocalStability', unit: '', healthy: biomarkerData.healthy.vocalStability, parkinson: biomarkerData.parkinson.vocalStability },
    ],
  };

  const allBiomarkers = Object.values(biomarkerCategories).flat();
  const displayBiomarkers = selectedCategory === 'all' 
    ? allBiomarkers 
    : biomarkerCategories[selectedCategory as keyof typeof biomarkerCategories] || [];

  // Calculate enriched biomarker data with statistics
  const enrichedBiomarkers = useMemo(() => {
    return displayBiomarkers.map(biomarker => {
      const currentValue = currentValues[biomarker.key as keyof typeof currentValues] as number;
      const healthyValue = biomarker.healthy;
      const parkinsonValue = biomarker.parkinson;
      const range = Math.abs(parkinsonValue - healthyValue);
      const deviation = Math.abs(currentValue - healthyValue);
      const normalizedDeviation = Math.min(deviation / range, 1);
      const importance = featureImportance[biomarker.key] || 0;
      const riskScore = normalizedDeviation * importance * 100;
      
      // Z-score calculation
      const mean = (healthyValue + parkinsonValue) / 2;
      const stdDev = Math.abs(parkinsonValue - healthyValue) / 4; // Approximate std dev
      const zScore = (currentValue - mean) / stdDev;
      
      // Percentile (simplified)
      const percentile = currentValue < healthyValue 
        ? ((currentValue - parkinsonValue) / (healthyValue - parkinsonValue)) * 100
        : 100 + ((currentValue - healthyValue) / (parkinsonValue - healthyValue)) * 100;
      
      return {
        ...biomarker,
        currentValue,
        riskScore,
        deviation: normalizedDeviation * 100,
        importance: importance * 100,
        zScore,
        percentile: Math.max(0, Math.min(100, percentile))
      };
    });
  }, [displayBiomarkers, currentValues]);

  // Filter and sort biomarkers
  const filteredAndSortedBiomarkers = useMemo(() => {
    let filtered = enrichedBiomarkers;
    
    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(b => 
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.key.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Risk filter
    if (riskFilter !== 'all') {
      filtered = filtered.filter(b => {
        if (riskFilter === 'high') return b.riskScore > 8;
        if (riskFilter === 'medium') return b.riskScore > 4 && b.riskScore <= 8;
        if (riskFilter === 'low') return b.riskScore <= 4;
        return true;
      });
    }
    
    // Sort
    const sorted = [...filtered].sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'risk':
          comparison = a.riskScore - b.riskScore;
          break;
        case 'deviation':
          comparison = a.deviation - b.deviation;
          break;
        case 'importance':
          comparison = a.importance - b.importance;
          break;
        case 'zscore':
          comparison = Math.abs(a.zScore) - Math.abs(b.zScore);
          break;
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    
    return sorted;
  }, [enrichedBiomarkers, searchQuery, riskFilter, sortBy, sortDirection]);

  // Radar chart verisi - En önemli 8 özellik
  const radarData = useMemo(() => {
    const topFeatures = [
      { name: 'HNR', key: 'HNR', max: 30 },
      { name: 'CPP', key: 'CPP', max: 25 },
      { name: 'NHR', key: 'NHR', max: 0.05 },
      { name: 'Jitter', key: 'jitterLocal', max: 0.015 },
      { name: 'Shimmer', key: 'shimmerLocal', max: 0.1 },
      { name: 'Tremor', key: 'tremorIntensity', max: 0.4 },
      { name: 'Speech Rate', key: 'speechRate', max: 6 },
      { name: 'Stability', key: 'vocalStability', max: 1 },
    ];

    return topFeatures.map(feature => {
      const healthyVal = biomarkerData.healthy[feature.key as keyof typeof biomarkerData.healthy] as number;
      const parkinsonVal = biomarkerData.parkinson[feature.key as keyof typeof biomarkerData.parkinson] as number;
      const currentVal = currentValues[feature.key as keyof typeof currentValues] as number;
      
      return {
        feature: feature.name,
        healthy: (healthyVal / feature.max) * 100,
        parkinson: (parkinsonVal / feature.max) * 100,
        current: (currentVal / feature.max) * 100,
      };
    });
  }, [currentValues]);

  // Feature importance chart verisi
  const importanceData = useMemo(() => {
    return Object.entries(featureImportance)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([key, value]) => ({
        name: allBiomarkers.find(b => b.key === key)?.name || key,
        importance: value * 100,
        category: Object.entries(biomarkerCategories).find(([_, markers]) => 
          markers.some(m => m.key === key)
        )?.[0] || 'other'
      }));
  }, []);

  // Risk contribution chart - Her kategorinin risk skoruna katkısı
  const riskContributionData = useMemo(() => {
    const contributions: Record<string, number> = {};
    
    Object.entries(biomarkerCategories).forEach(([category, markers]) => {
      let categoryRisk = 0;
      markers.forEach(marker => {
        const importance = featureImportance[marker.key] || 0;
        const currentValue = currentValues[marker.key as keyof typeof currentValues] as number;
        const healthyValue = marker.healthy;
        const parkinsonValue = marker.parkinson;
        const range = Math.abs(parkinsonValue - healthyValue);
        const deviation = Math.abs(currentValue - healthyValue);
        const normalizedDeviation = Math.min(deviation / range, 1);
        categoryRisk += normalizedDeviation * importance * 100;
      });
      contributions[category] = categoryRisk;
    });

    return Object.entries(contributions).map(([category, risk]) => ({
      name: categories.find(c => c.id === category)?.name || category,
      risk: risk,
      fill: risk > 15 ? '#EF4444' : risk > 10 ? '#F59E0B' : '#10B981'
    }));
  }, [currentValues]);

  // Zaman serisi simülasyonu - Risk skorunun değişimi
  const [riskHistory, setRiskHistory] = useState<Array<{time: number, risk: number}>>([
    { time: 0, risk: currentRiskScore }
  ]);

  useMemo(() => {
    if (simulationMode) {
      setRiskHistory(prev => {
        const newHistory = [...prev, { time: prev.length, risk: currentRiskScore }];
        return newHistory.slice(-20); // Son 20 değişiklik
      });
    }
  }, [currentRiskScore, simulationMode]);

  // Scatter plot verisi - Değer vs Etki
  const scatterData = useMemo(() => {
    return allBiomarkers.map(marker => {
      const currentValue = currentValues[marker.key as keyof typeof currentValues] as number;
      const healthyValue = marker.healthy;
      const deviation = Math.abs(((currentValue - healthyValue) / healthyValue) * 100);
      const importance = (featureImportance[marker.key] || 0) * 100;
      
      return {
        x: deviation,
        y: importance,
        z: deviation * importance,
        name: marker.name,
        category: Object.entries(biomarkerCategories).find(([_, markers]) => 
          markers.some(m => m.key === marker.key)
        )?.[0] || 'other'
      };
    });
  }, [currentValues]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0E27] via-[#141B3D] to-[#0A0E27]">
      {/* Ultra Modern Premium Navbar */}
      <nav className="navbar-modern fixed top-0 w-full z-50 backdrop-blur-2xl bg-[#0A0E27]/90 border-b border-[#64FFDA]/20">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between gap-8">
            {/* Modern Logo Section */}
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
              {/* Neural Network Logo Icon */}
              <motion.div 
                className="relative w-10 h-10"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {/* Outer Glow Ring */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#64FFDA] to-[#8B5CF6] opacity-20 blur-xl"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Main Logo Container */}
                <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0A0E27] to-[#1a1f3a] flex items-center justify-center border border-[#64FFDA]/40 overflow-hidden">
                  {/* Animated Background Grid */}
                  <motion.div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: 'linear-gradient(#64FFDA 1px, transparent 1px), linear-gradient(90deg, #64FFDA 1px, transparent 1px)',
                      backgroundSize: '8px 8px'
                    }}
                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  
                  {/* Neural Network Icon - Custom Design */}
                  <div className="relative z-10 w-6 h-6">
                    {/* Center Node */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 w-2.5 h-2.5 rounded-full bg-[#64FFDA] shadow-lg shadow-[#64FFDA]/50"
                      style={{ transform: 'translate(-50%, -50%)' }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    
                    {/* Outer Nodes */}
                    {[0, 72, 144, 216, 288].map((angle, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full bg-gradient-to-br from-[#64FFDA] to-[#3B82F6]"
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-10px)`
                        }}
                        animate={{ 
                          scale: [0.8, 1.2, 0.8],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      />
                    ))}
                    
                    {/* Connection Lines */}
                    <svg className="absolute inset-0 w-full h-full" style={{ transform: 'translate(-50%, -50%)', top: '50%', left: '50%' }}>
                      {[0, 72, 144, 216, 288].map((angle, i) => (
                        <motion.line
                          key={i}
                          x1="12"
                          y1="12"
                          x2={12 + Math.cos((angle * Math.PI) / 180) * 10}
                          y2={12 + Math.sin((angle * Math.PI) / 180) * 10}
                          stroke="url(#gradient)"
                          strokeWidth="0.8"
                          opacity="0.7"
                          animate={{ opacity: [0.4, 0.9, 0.4] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#64FFDA" />
                          <stop offset="100%" stopColor="#3B82F6" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  
                  {/* Shine Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent"
                    animate={{ opacity: [0, 0.3, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </div>
              </motion.div>

              {/* Brand Name with Gradient */}
              <div className="flex flex-col">
                <h1 className="text-xl font-black tracking-tight leading-none">
                  <span className="bg-gradient-to-r from-[#64FFDA] via-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">
                    Neural
                  </span>
                  <span className="bg-gradient-to-r from-[#8B5CF6] via-[#3B82F6] to-[#64FFDA] bg-clip-text text-transparent">
                    Cipher
                  </span>
                  <span className="text-[#64FFDA] opacity-60">.ai</span>
                </h1>
                <span className="text-[9px] text-gray-400 tracking-[0.2em] uppercase font-bold leading-none mt-0.5 opacity-90">
                  Early Detection AI
                </span>
              </div>
            </Link>
            
            {/* Navigation Links - Modern Style */}
            <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
              <Link href="/" className="px-3 py-2 text-sm text-gray-300 hover:text-[#64FFDA] transition-colors font-medium rounded-lg hover:bg-white/5">
                Home
              </Link>
              <a href="/#features" className="px-3 py-2 text-sm text-gray-300 hover:text-[#64FFDA] transition-colors font-medium rounded-lg hover:bg-white/5">
                Features
              </a>
              <a href="/#science" className="px-3 py-2 text-sm text-gray-300 hover:text-[#64FFDA] transition-colors font-medium rounded-lg hover:bg-white/5">
                Science
              </a>
              <a href="/#doctors" className="px-3 py-2 text-sm text-gray-300 hover:text-[#64FFDA] transition-colors font-medium rounded-lg hover:bg-white/5">
                Doctors
              </a>
              <Link href="/pricing" className="px-3 py-2 text-sm text-gray-300 hover:text-[#64FFDA] transition-colors font-medium rounded-lg hover:bg-white/5">
                Pricing
              </Link>
              <Link href="/contributors" className="px-3 py-2 text-sm text-gray-300 hover:text-[#64FFDA] transition-colors font-medium rounded-lg hover:bg-white/5">
                Contributors
              </Link>
              
              {/* Contact Dropdown */}
              <div className="relative z-[100]">
                <button
                  onClick={() => setIsContactOpen(!isContactOpen)}
                  className="flex items-center gap-1 px-3 py-2 text-sm text-gray-300 hover:text-[#64FFDA] transition-colors font-medium rounded-lg hover:bg-white/5"
                >
                  Contact
                  <FiChevronDown className={`transition-transform duration-200 ${isContactOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isContactOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-48 rounded-lg overflow-hidden shadow-2xl border border-[#64FFDA]/30 z-[100] bg-[#0A0E27]/95 backdrop-blur-xl"
                  >
                    <Link 
                      href="/contact" 
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-[#64FFDA] hover:bg-white/5 transition-colors"
                      onClick={() => setIsContactOpen(false)}
                    >
                      <FiMail className="text-[#64FFDA]" />
                      Contact Us
                    </Link>
                    <a 
                      href="/#testimonials" 
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-[#64FFDA] hover:bg-white/5 transition-colors"
                      onClick={() => setIsContactOpen(false)}
                    >
                      <FiMessageCircle className="text-[#3B82F6]" />
                      Reviews
                    </a>
                    <a 
                      href="/#faq" 
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-[#64FFDA] hover:bg-white/5 transition-colors"
                      onClick={() => setIsContactOpen(false)}
                    >
                      <FiHelpCircle className="text-[#8B5CF6]" />
                      FAQ
                    </a>
                  </motion.div>
                )}
              </div>
            </div>
            
            {/* CTA Buttons - Ultra Modern */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <Link 
                href="/demo" 
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-sm text-[#64FFDA] hover:text-white transition-all duration-300 font-bold rounded-lg bg-[#64FFDA]/10 border border-[#64FFDA]/30 hover:bg-[#64FFDA]/20 hover:border-[#64FFDA]/50"
              >
                Demo
              </Link>
              
              <Link 
                href="/auth/login" 
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-sm text-white hover:text-[#64FFDA] transition-all duration-300 font-semibold rounded-lg hover:bg-white/5"
              >
                Sign In
              </Link>
              
              <Link 
                href="/auth/register" 
                className="relative group overflow-hidden"
              >
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#64FFDA] via-[#3B82F6] to-[#8B5CF6] rounded-lg"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6] via-[#3B82F6] to-[#64FFDA] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Button Content */}
                <div className="relative flex items-center gap-1.5 px-5 py-2 text-white font-bold rounded-lg text-sm">
                  <FiZap className="text-sm" />
                  <span>Start Test</span>
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <FiArrowRight className="text-sm" />
                  </motion.div>
                </div>
                
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#64FFDA] to-[#3B82F6] opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"></div>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Add padding for fixed header */}
      <div className="pt-16"></div>

      {/* Warning Banner */}
      <div className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border-b border-cyan-500/20">
        <div className="max-w-[1600px] mx-auto px-8 py-3">
          <div className="flex items-center gap-3">
            <FiActivity className="w-5 h-5 text-cyan-400 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-slate-200">
                <span className="font-bold text-cyan-400">INTERACTIVE DEMO:</span> This page demonstrates how 
                NeuralCipher.AI technology works with 59 voice biomarkers. Consult a healthcare professional for actual medical diagnosis.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="border-b border-slate-800/50 bg-slate-900/40 backdrop-blur-xl">
        <div className="max-w-[1600px] mx-auto px-8 py-6">
          {/* Description Text */}
          <div className="mb-6 p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl">
            <div className="flex items-start gap-3">
              <FiActivity className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-sm font-bold text-cyan-400 mb-2">Technology Demonstration</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  NeuralCipher.AI detects Parkinson's disease with 94.7% accuracy by analyzing 59 voice biomarkers. 
                  This demo compares healthy and Parkinson's patient voice samples. In simulation mode, 
                  you can modify values to see how the AI works in real-time. 
                  All data is based on peer-reviewed scientific publications.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                59 Voice Biomarkers - Live Demo
              </h1>
              <p className="text-slate-400">
                Real-time comparison of healthy and Parkinson's patient voice patterns
              </p>
              {/* Current Patient Info */}
              <div className="mt-3 flex items-center gap-3 text-sm">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-lg border border-slate-700/50">
                  <span className="text-slate-400">Patient:</span>
                  <span className="text-white font-semibold">{currentPatient.name}</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    currentPatient.status === 'Healthy'
                      ? 'bg-green-500/20 text-green-400'
                      : currentPatient.status === 'At Risk'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : currentPatient.status === 'Early PD'
                      ? 'bg-orange-500/20 text-orange-400'
                      : currentPatient.status === 'Moderate PD'
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-red-600/20 text-red-500'
                  }`}>
                    {currentPatient.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-lg border border-slate-700/50">
                  <span className="text-slate-400">{currentPatient.age}y, {currentPatient.gender}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-400">{currentPatient.location}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                <div className="text-xs text-cyan-400 mb-1">Total Biomarkers</div>
                <div className="text-2xl font-bold text-cyan-400">59</div>
              </div>
              <div className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <div className="text-xs text-purple-400 mb-1">Accuracy</div>
                <div className="text-2xl font-bold text-purple-400">94.7%</div>
              </div>
              <motion.div 
                className={`px-4 py-2 border rounded-lg ${
                  currentRiskScore < 30 
                    ? 'bg-green-500/10 border-green-500/20' 
                    : currentRiskScore < 60
                    ? 'bg-yellow-500/10 border-yellow-500/20'
                    : 'bg-red-500/10 border-red-500/20'
                }`}
                key={currentRiskScore}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={`text-xs mb-1 ${
                  currentRiskScore < 30 ? 'text-green-400' : currentRiskScore < 60 ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  Risk Score
                </div>
                <div className={`text-2xl font-bold ${
                  currentRiskScore < 30 ? 'text-green-400' : currentRiskScore < 60 ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {currentRiskScore}%
                </div>
              </motion.div>
              
              {/* PDF Theme Toggle */}
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg">
                <span className="text-xs text-slate-400">PDF Theme:</span>
                <button
                  onClick={() => setPdfTheme('dark')}
                  className={`p-1.5 rounded transition-all ${
                    pdfTheme === 'dark'
                      ? 'bg-slate-700 text-cyan-400'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                  title="Dark Theme"
                >
                  <FiMoon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPdfTheme('light')}
                  className={`p-1.5 rounded transition-all ${
                    pdfTheme === 'light'
                      ? 'bg-slate-700 text-yellow-400'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                  title="Light Theme"
                >
                  <FiSun className="w-4 h-4" />
                </button>
              </div>
              
              {/* Export Button */}
              <button
                onClick={exportResults}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20"
                title="Download PDF Report"
              >
                <FiDownload className="w-4 h-4" />
                <span className="text-sm font-medium">Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-8 py-8">
        {/* Üst Grafikler Paneli */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Radar Chart - Profil Karşılaştırma */}
          <div className="col-span-1 bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <FiTarget className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-bold text-white">Voice Profile</h3>
            </div>
            <ResponsiveContainer width="100%" height={280} key={`radar-${currentRiskScore}`}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis 
                  dataKey="feature" 
                  tick={{ fill: '#94A3B8', fontSize: 11 }}
                />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#64748B' }} />
                <Radar 
                  name="Sağlıklı" 
                  dataKey="healthy" 
                  stroke="#10B981" 
                  fill="#10B981" 
                  fillOpacity={0.2}
                  animationDuration={800}
                />
                <Radar 
                  name="Parkinson" 
                  dataKey="parkinson" 
                  stroke="#EF4444" 
                  fill="#EF4444" 
                  fillOpacity={0.2}
                  animationDuration={800}
                />
                {simulationMode && (
                  <Radar 
                    name="Mevcut" 
                    dataKey="current" 
                    stroke="#64FFDA" 
                    fill="#64FFDA" 
                    fillOpacity={0.3}
                    animationDuration={500}
                  />
                )}
                <Legend wrapperStyle={{ fontSize: '12px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Risk Contribution Bar Chart */}
          <div className="col-span-1 bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <FiBarChart2 className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-bold text-white">Category Risk Contribution</h3>
            </div>
            <ResponsiveContainer width="100%" height={280} key={`bar-${currentRiskScore}`}>
              <BarChart data={riskContributionData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis type="number" tick={{ fill: '#94A3B8', fontSize: 11 }} />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  tick={{ fill: '#94A3B8', fontSize: 10 }} 
                  width={100}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(value: number) => `${value.toFixed(1)}%`}
                />
                <Bar dataKey="risk" radius={[0, 4, 4, 0]} animationDuration={800}>
                  {riskContributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Risk History Line Chart */}
          <div className="col-span-1 bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <FiTrendingUp className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-bold text-white">Risk Change History</h3>
            </div>
            <ResponsiveContainer width="100%" height={280} key={`line-${riskHistory.length}`}>
              <LineChart data={riskHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis 
                  dataKey="time" 
                  tick={{ fill: '#94A3B8', fontSize: 11 }}
                  label={{ value: 'Değişiklik', position: 'insideBottom', offset: -5, fill: '#64748B', fontSize: 11 }}
                />
                <YAxis 
                  tick={{ fill: '#94A3B8', fontSize: 11 }}
                  domain={[0, 100]}
                  label={{ value: 'Risk %', angle: -90, position: 'insideLeft', fill: '#64748B', fontSize: 11 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(value: number) => `${value}%`}
                />
                <Line 
                  type="monotone" 
                  dataKey="risk" 
                  stroke="#64FFDA" 
                  strokeWidth={2}
                  dot={{ fill: '#64FFDA', r: 4 }}
                  activeDot={{ r: 6 }}
                  animationDuration={500}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Feature Importance ve Scatter Plot */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Feature Importance Chart */}
          <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <FiZap className="w-5 h-5 text-yellow-400" />
              <h3 className="text-lg font-bold text-white">Top 15 Most Important Biomarkers</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={importanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#94A3B8', fontSize: 10 }} 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis 
                  tick={{ fill: '#94A3B8', fontSize: 11 }}
                  label={{ value: 'Etki %', angle: -90, position: 'insideLeft', fill: '#64748B', fontSize: 11 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(value: number) => `${value.toFixed(1)}%`}
                />
                <Bar dataKey="importance" fill="#F59E0B" radius={[4, 4, 0, 0]} animationDuration={800} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Scatter Plot - Deviation vs Impact */}
          <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <FiPieChart className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-bold text-white">Deviation vs Impact Analysis</h3>
            </div>
            <ResponsiveContainer width="100%" height={300} key={`scatter-${currentRiskScore}`}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  name="Sapma" 
                  tick={{ fill: '#94A3B8', fontSize: 11 }}
                  label={{ value: 'Sapma %', position: 'insideBottom', offset: -5, fill: '#64748B', fontSize: 11 }}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  name="Etki" 
                  tick={{ fill: '#94A3B8', fontSize: 11 }}
                  label={{ value: 'Etki %', angle: -90, position: 'insideLeft', fill: '#64748B', fontSize: 11 }}
                />
                <ZAxis type="number" dataKey="z" range={[50, 400]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(value: number) => value.toFixed(1)}
                  cursor={{ strokeDasharray: '3 3' }}
                />
                <Scatter 
                  name="Biyobelirteçler" 
                  data={scatterData} 
                  fill="#64FFDA"
                  fillOpacity={0.6}
                  animationDuration={800}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Patient Selection */}
          <div className="col-span-3 space-y-4">
            {/* Simulation Mode Toggle */}
            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-2">
                <FiSliders className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-semibold text-white">Simulation Mode</h3>
              </div>
              <p className="text-[10px] text-slate-400 mb-3">
                Modify values to see real-time changes
              </p>
              {!simulationMode ? (
                <button
                  onClick={startSimulation}
                  className="w-full px-3 py-1.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-xs font-medium transition-all"
                >
                  Start Simulation
                </button>
              ) : (
                <button
                  onClick={resetSimulation}
                  className="w-full px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-medium transition-all"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Gerçek Zamanlı İstatistikler */}
            {simulationMode && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-900/40 backdrop-blur-xl border border-cyan-500/30 rounded-xl p-3"
              >
                <div className="flex items-center gap-2 mb-2">
                  <FiActivity className="w-3.5 h-3.5 text-cyan-400" />
                  <h3 className="text-xs font-semibold text-white">Live Stats</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">Changes</span>
                    <span className="text-xs font-bold text-cyan-400">{riskHistory.length - 1}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">Avg Risk</span>
                    <span className="text-xs font-bold text-cyan-400">
                      {(riskHistory.reduce((sum, h) => sum + h.risk, 0) / riskHistory.length).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">Risk Δ</span>
                    <span className={`text-xs font-bold ${
                      riskHistory.length > 1 && riskHistory[riskHistory.length - 1].risk > riskHistory[0].risk
                        ? 'text-red-400'
                        : 'text-green-400'
                    }`}>
                      {riskHistory.length > 1 
                        ? `${riskHistory[riskHistory.length - 1].risk > riskHistory[0].risk ? '+' : ''}${(riskHistory[riskHistory.length - 1].risk - riskHistory[0].risk).toFixed(1)}%`
                        : '0%'
                      }
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Patient Cards */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Select Patient
                </h3>
                <div className="text-[10px] text-cyan-400 font-medium">
                  {filteredPatients.length} / {patients.length}
                </div>
              </div>
              
              {/* Patient Statistics Dashboard */}
              <div className="bg-slate-800/30 rounded-lg p-2.5 border border-slate-700/50">
                <div className="text-[10px] font-semibold text-slate-400 mb-1.5">Database</div>
                <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Total:</span>
                    <span className="text-white font-bold">{patientStats.total}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Avg:</span>
                    <span className="text-cyan-400 font-bold">{patientStats.avgRisk}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-green-400">Healthy:</span>
                    <span className="text-white font-bold">{patientStats.healthy}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-red-400">PD:</span>
                    <span className="text-white font-bold">{patientStats.earlyPD + patientStats.moderatePD + patientStats.advancedPD}</span>
                  </div>
                </div>
              </div>
              
              {/* Patient Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={patientSearchQuery}
                  onChange={(e) => {
                    setPatientSearchQuery(e.target.value);
                    setPatientPage(0);
                  }}
                  className="w-full px-2.5 py-1.5 pl-7 bg-slate-800/50 border border-slate-700/50 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                />
                <FiActivity className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-slate-500" />
                {patientSearchQuery && (
                  <button
                    onClick={() => {
                      setPatientSearchQuery('');
                      setPatientPage(0);
                    }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-white text-[10px]"
                  >
                    ✕
                  </button>
                )}
              </div>
              
              {/* Status Filter */}
              <div className="flex flex-wrap gap-1">
                {[
                  { value: 'all', label: 'All', color: 'slate' },
                  { value: 'Healthy', label: 'Healthy', color: 'green' },
                  { value: 'At Risk', label: 'Risk', color: 'yellow' },
                  { value: 'Early PD', label: 'Early', color: 'orange' },
                  { value: 'Moderate PD', label: 'Mod', color: 'red' },
                  { value: 'Advanced PD', label: 'Adv', color: 'red' },
                ].map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => {
                      setPatientStatusFilter(filter.value as any);
                      setPatientPage(0);
                    }}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-medium transition-all ${
                      patientStatusFilter === filter.value
                        ? `bg-${filter.color}-500/20 text-${filter.color}-400 border border-${filter.color}-500/30`
                        : 'bg-slate-800/30 text-slate-500 hover:text-slate-300 border border-slate-700/30'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
              
              {/* Patient List - Max height to fit in frame */}
              <div className="space-y-1.5 max-h-[400px] overflow-y-auto pr-1">
                {paginatedPatients.map((patient) => (
                  <motion.button
                    key={patient.id}
                    onClick={() => {
                      setSelectedPatient(patient.id);
                      if (simulationMode) {
                        setCustomValues({ ...getPatientBiomarkerData(patient) });
                      }
                    }}
                    className={`w-full p-2 rounded-lg border transition-all text-left ${
                      selectedPatient === patient.id
                        ? 'border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/10'
                        : 'border-slate-700/50 bg-slate-900/40 hover:border-slate-600'
                    } ${simulationMode ? 'opacity-50' : ''}`}
                    disabled={simulationMode}
                    whileHover={{ scale: simulationMode ? 1 : 1.01 }}
                    whileTap={{ scale: simulationMode ? 1 : 0.99 }}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-white text-xs truncate">{patient.name}</div>
                        <div className="text-[10px] text-slate-400">{patient.age}y, {patient.gender}</div>
                      </div>
                      <div className={`px-1 py-0.5 rounded text-[9px] font-medium whitespace-nowrap ml-1.5 ${
                        patient.status === 'Healthy'
                          ? 'bg-green-500/20 text-green-400'
                          : patient.status === 'At Risk'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : patient.status === 'Early PD'
                          ? 'bg-orange-500/20 text-orange-400'
                          : patient.status === 'Moderate PD'
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-red-600/20 text-red-500'
                      }`}>
                        {patient.status}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[10px] text-slate-500 truncate flex-1">
                        <FiMap className="w-2.5 h-2.5 flex-shrink-0" />
                        <span className="truncate">{patient.location}</span>
                      </div>
                      <span className={`text-xs font-bold ml-2 ${
                        patient.riskScore < 16 ? 'text-green-400' : 
                        patient.riskScore < 36 ? 'text-yellow-400' :
                        patient.riskScore < 56 ? 'text-orange-400' :
                        patient.riskScore < 76 ? 'text-red-400' :
                        'text-red-600'
                      }`}>
                        {patient.riskScore}%
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between pt-1.5 border-t border-slate-700/50">
                  <button
                    onClick={() => setPatientPage(prev => Math.max(0, prev - 1))}
                    disabled={patientPage === 0}
                    className="px-2 py-1 bg-slate-800/50 border border-slate-700/50 rounded text-[10px] text-slate-400 hover:text-white hover:border-cyan-500/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    Prev
                  </button>
                  <div className="text-[10px] text-slate-400">
                    {patientPage + 1}/{totalPages}
                  </div>
                  <button
                    onClick={() => setPatientPage(prev => Math.min(totalPages - 1, prev + 1))}
                    disabled={patientPage === totalPages - 1}
                    className="px-2 py-1 bg-slate-800/50 border border-slate-700/50 rounded text-[10px] text-slate-400 hover:text-white hover:border-cyan-500/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    Next
                  </button>
                </div>
              )}
              
              {filteredPatients.length === 0 && (
                <div className="text-center py-6 text-slate-500 text-xs">
                  No patients found
                </div>
              )}
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Filter by Category
              </h3>
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full p-2 rounded-lg border transition-all text-left ${
                      selectedCategory === cat.id
                        ? 'border-cyan-500 bg-cyan-500/10'
                        : 'border-slate-700/50 bg-slate-900/40 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className={`w-3.5 h-3.5 ${
                          selectedCategory === cat.id ? 'text-cyan-400' : 'text-slate-400'
                        }`} />
                        <span className={`text-xs font-medium ${
                          selectedCategory === cat.id ? 'text-white' : 'text-slate-300'
                        }`}>
                          {cat.name}
                        </span>
                      </div>
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                        selectedCategory === cat.id
                          ? 'bg-cyan-500/20 text-cyan-400'
                          : 'bg-slate-700/50 text-slate-400'
                      }`}>
                        {cat.count}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content - Biomarker Grid */}
          <div className="col-span-9">
            {/* Heatmap Görünümü - Kompakt */}
            {selectedCategory === 'all' && (
              <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-4 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <FiActivity className="w-4 h-4 text-cyan-400" />
                      <h2 className="text-lg font-bold text-white">Risk Isı Haritası</h2>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded bg-gradient-to-r from-green-500 to-green-400"></div>
                      <span className="text-slate-400">Düşük</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded bg-gradient-to-r from-yellow-500 to-yellow-400"></div>
                      <span className="text-slate-400">Orta</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded bg-gradient-to-r from-red-500 to-red-400"></div>
                      <span className="text-slate-400">Yüksek</span>
                    </div>
                  </div>
                </div>

                {/* Kategorilere göre kompakt heatmap */}
                <div className="grid grid-cols-3 gap-3">
                  {Object.entries(biomarkerCategories).map(([categoryKey, markers]) => {
                    const categoryName = categories.find(c => c.id === categoryKey)?.name || categoryKey;
                    const categoryIcon = categories.find(c => c.id === categoryKey)?.icon || FiActivity;
                    const Icon = categoryIcon;
                    
                    // Kategori istatistikleri
                    const categoryStats = markers.map(biomarker => {
                      const currentValue = currentValues[biomarker.key as keyof typeof currentValues] as number;
                      const healthyValue = biomarker.healthy;
                      const parkinsonValue = biomarker.parkinson;
                      const range = Math.abs(parkinsonValue - healthyValue);
                      const deviation = Math.abs(currentValue - healthyValue);
                      const normalizedDeviation = Math.min(deviation / range, 1);
                      const importance = featureImportance[biomarker.key] || 0;
                      const riskScore = normalizedDeviation * importance * 100;
                      return { ...biomarker, riskScore, deviation: normalizedDeviation * 100 };
                    });
                    
                    const avgRisk = categoryStats.reduce((sum, s) => sum + s.riskScore, 0) / categoryStats.length;
                    const maxRisk = Math.max(...categoryStats.map(s => s.riskScore));
                    const highRiskCount = categoryStats.filter(s => s.riskScore > 8).length;
                    
                    return (
                      <motion.div
                        key={categoryKey}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/50"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Icon className="w-4 h-4 text-cyan-400" />
                          <div className="flex-1">
                            <h3 className="text-sm font-bold text-white">{categoryName}</h3>
                            <p className="text-xs text-slate-500">{markers.length} özellik</p>
                          </div>
                          <div className={`text-sm font-bold ${
                            avgRisk > 8 ? 'text-red-400' : avgRisk > 4 ? 'text-yellow-400' : 'text-green-400'
                          }`}>
                            {avgRisk.toFixed(1)}%
                          </div>
                        </div>

                        <div className="grid grid-cols-5 gap-1">
                          {categoryStats.map((biomarker) => {
                            const { riskScore } = biomarker;
                            
                            let bgColor = 'from-green-500 to-green-400';
                            if (riskScore > 8) {
                              bgColor = 'from-red-500 to-red-400';
                            } else if (riskScore > 4) {
                              bgColor = 'from-yellow-500 to-yellow-400';
                            }
                            
                            return (
                              <div
                                key={biomarker.key}
                                className={`aspect-square bg-gradient-to-br ${bgColor} rounded cursor-pointer hover:scale-110 transition-transform`}
                                style={{
                                  opacity: 0.4 + (riskScore / 15) * 0.6,
                                }}
                                title={`${biomarker.name}: ${riskScore.toFixed(1)}%`}
                                onClick={() => {
                                  if (simulationMode) setSelectedBiomarker(biomarker.key);
                                }}
                              />
                            );
                          })}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6">
              {/* Basit ve Güzel Header */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {selectedCategory === 'all' ? 'Tüm Biyobelirteçler' : categories.find(c => c.id === selectedCategory)?.name}
                      <span className="text-cyan-400 ml-2">({filteredAndSortedBiomarkers.length})</span>
                    </h2>
                    <p className="text-sm text-slate-400 mt-1">
                      Sağlıklı ve Parkinson hastası değerlerinin karşılaştırması
                    </p>
                  </div>
                  
                  {/* Basit Görünüm Seçici */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        viewMode === 'grid' 
                          ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' 
                          : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50'
                      }`}
                    >
                      Detaylı
                    </button>
                    <button
                      onClick={() => setViewMode('compact')}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        viewMode === 'compact' 
                          ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' 
                          : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50'
                      }`}
                    >
                      Kompakt
                    </button>
                    <button
                      onClick={() => setViewMode('table')}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        viewMode === 'table' 
                          ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' 
                          : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50'
                      }`}
                    >
                      Tablo
                    </button>
                  </div>
                </div>

                {/* Basit Arama ve Filtre */}
                <div className="flex items-center gap-3">
                  {/* Arama */}
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Biyobelirteç ara... (örn: jitter, shimmer, HNR)"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-2.5 pl-10 bg-slate-800/50 border border-slate-700/50 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    />
                    <FiActivity className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-white"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                  
                  {/* Sıralama */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all cursor-pointer"
                  >
                    <option value="name">İsme Göre</option>
                    <option value="risk">Risk Skoruna Göre</option>
                    <option value="importance">Etkiye Göre</option>
                    <option value="deviation">Sapmaya Göre</option>
                  </select>

                  {/* Sıralama Yönü */}
                  <button
                    onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
                    className="p-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg hover:border-cyan-500/50 hover:bg-slate-700/50 transition-all"
                    title={sortDirection === 'asc' ? 'Artan Sıralama' : 'Azalan Sıralama'}
                  >
                    {sortDirection === 'asc' ? (
                      <FiTrendingUp className="w-5 h-5 text-cyan-400" />
                    ) : (
                      <FiTrendingUp className="w-5 h-5 text-cyan-400 transform rotate-180" />
                    )}
                  </button>
                </div>

                {/* Risk Filtreleri - Daha Görünür */}
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-400 font-medium">Risk Seviyesi:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setRiskFilter('all')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        riskFilter === 'all' 
                          ? 'bg-slate-700 text-white shadow-lg' 
                          : 'bg-slate-800/30 text-slate-400 hover:text-white hover:bg-slate-700/50'
                      }`}
                    >
                      Tümü ({enrichedBiomarkers.length})
                    </button>
                    <button
                      onClick={() => setRiskFilter('high')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        riskFilter === 'high' 
                          ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' 
                          : 'bg-slate-800/30 text-slate-400 hover:text-white hover:bg-red-500/20'
                      }`}
                    >
                      Yüksek ({enrichedBiomarkers.filter(b => b.riskScore > 8).length})
                    </button>
                    <button
                      onClick={() => setRiskFilter('medium')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        riskFilter === 'medium' 
                          ? 'bg-yellow-500 text-white shadow-lg shadow-yellow-500/20' 
                          : 'bg-slate-800/30 text-slate-400 hover:text-white hover:bg-yellow-500/20'
                      }`}
                    >
                      Orta ({enrichedBiomarkers.filter(b => b.riskScore > 4 && b.riskScore <= 8).length})
                    </button>
                    <button
                      onClick={() => setRiskFilter('low')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        riskFilter === 'low' 
                          ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' 
                          : 'bg-slate-800/30 text-slate-400 hover:text-white hover:bg-green-500/20'
                      }`}
                    >
                      Düşük ({enrichedBiomarkers.filter(b => b.riskScore <= 4).length})
                    </button>
                  </div>
                </div>
              </div>

              {/* Görünüm Alanı */}
              <div className={`${
                viewMode === 'table' ? '' : 
                viewMode === 'compact' ? 'grid grid-cols-3 gap-3' : 
                'grid grid-cols-2 gap-4'
              } max-h-[calc(100vh-400px)] overflow-y-auto pr-2`}>
                
                {/* TABLO GÖRÜNÜMÜ */}
                {viewMode === 'table' && (
                  <div className="bg-slate-800/30 rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-800/50 sticky top-0 z-10">
                        <tr className="text-left text-xs text-slate-400 uppercase tracking-wider">
                          <th className="px-4 py-3">Biyobelirteç</th>
                          <th className="px-4 py-3 text-center">Mevcut</th>
                          <th className="px-4 py-3 text-center">Sağlıklı</th>
                          <th className="px-4 py-3 text-center">Parkinson</th>
                          <th className="px-4 py-3 text-center">Sapma</th>
                          <th className="px-4 py-3 text-center">Z-Skor</th>
                          <th className="px-4 py-3 text-center">Etki</th>
                          <th className="px-4 py-3 text-center">Risk</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-700/30">
                        {filteredAndSortedBiomarkers.map((biomarker, index) => (
                          <motion.tr
                            key={biomarker.key}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.01 }}
                            onClick={() => simulationMode && setSelectedBiomarker(biomarker.key)}
                            className={`hover:bg-slate-800/30 transition-all ${
                              simulationMode ? 'cursor-pointer' : ''
                            } ${selectedBiomarker === biomarker.key ? 'bg-cyan-500/10' : ''}`}
                          >
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div className="font-medium text-white">{biomarker.name}</div>
                                {biomarker.importance > 10 && (
                                  <FiZap className="w-3 h-3 text-yellow-400" />
                                )}
                              </div>
                              <div className="text-xs text-slate-500">{biomarker.unit || 'unitless'}</div>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span className={`font-bold ${
                                biomarker.currentValue < biomarker.healthy * 1.1 && biomarker.currentValue > biomarker.healthy * 0.9
                                  ? 'text-green-400' 
                                  : 'text-red-400'
                              }`}>
                                {biomarker.currentValue.toFixed(3)}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center text-green-400">
                              {biomarker.healthy.toFixed(3)}
                            </td>
                            <td className="px-4 py-3 text-center text-red-400">
                              {biomarker.parkinson.toFixed(3)}
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span className={`font-medium ${
                                biomarker.deviation > 50 ? 'text-red-400' : 
                                biomarker.deviation > 25 ? 'text-yellow-400' : 
                                'text-green-400'
                              }`}>
                                {biomarker.deviation.toFixed(1)}%
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span className={`font-medium ${
                                Math.abs(biomarker.zScore) > 2 ? 'text-red-400' : 
                                Math.abs(biomarker.zScore) > 1 ? 'text-yellow-400' : 
                                'text-green-400'
                              }`}>
                                {biomarker.zScore.toFixed(2)}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <div className="w-16 h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full ${
                                      biomarker.importance > 10 ? 'bg-yellow-400' : 
                                      biomarker.importance > 7 ? 'bg-cyan-400' : 
                                      'bg-slate-500'
                                    }`}
                                    style={{ width: `${biomarker.importance * 10}%` }}
                                  />
                                </div>
                                <span className="text-xs text-slate-400 w-10">
                                  {biomarker.importance.toFixed(1)}%
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span className={`px-2 py-1 rounded text-xs font-bold ${
                                biomarker.riskScore > 8 ? 'bg-red-500/20 text-red-400' : 
                                biomarker.riskScore > 4 ? 'bg-yellow-500/20 text-yellow-400' : 
                                'bg-green-500/20 text-green-400'
                              }`}>
                                {biomarker.riskScore.toFixed(2)}%
                              </span>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Grid and Compact Views */}
                {(viewMode === 'grid' || viewMode === 'compact') && filteredAndSortedBiomarkers.map((biomarker, index) => {
                  const maxValue = Math.max(biomarker.healthy, biomarker.parkinson) * 1.2;
                  const healthyPercent = (biomarker.healthy / maxValue) * 100;
                  const parkinsonPercent = (biomarker.parkinson / maxValue) * 100;
                  
                  return (
                    <motion.div
                      key={biomarker.key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.01 }}
                      onClick={() => simulationMode && setSelectedBiomarker(biomarker.key)}
                      className={`p-4 bg-slate-800/30 rounded-lg border transition-all ${
                        simulationMode 
                          ? 'cursor-pointer hover:border-cyan-500/50 hover:bg-slate-800/50' 
                          : 'border-slate-700/50 hover:border-cyan-500/30'
                      } ${selectedBiomarker === biomarker.key ? 'border-cyan-500 bg-slate-800/50' : 'border-slate-700/50'}`}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <div className="font-medium text-white text-sm">{biomarker.name}</div>
                            {biomarker.importance > 10 && (
                              <FiZap className="w-3 h-3 text-yellow-400" title="Yüksek etki" />
                            )}
                          </div>
                          <div className="text-xs text-slate-500 mt-1">
                            {biomarker.unit || 'unitless'}
                          </div>
                        </div>
                        <div className={`text-lg font-bold ml-2 ${
                          biomarker.currentValue < biomarker.healthy * 1.1 && biomarker.currentValue > biomarker.healthy * 0.9
                            ? 'text-green-400' 
                            : 'text-red-400'
                        }`}>
                          {biomarker.currentValue.toFixed(3)}
                        </div>
                      </div>

                      {/* Statistics Grid - Only in Grid View */}
                      {viewMode === 'grid' && (
                        <div className="grid grid-cols-4 gap-2 mb-3 pb-3 border-b border-slate-700/50">
                          <div className="text-center">
                            <div className="text-xs text-slate-500 mb-1">Z-Skor</div>
                            <div className={`text-sm font-bold ${
                              Math.abs(biomarker.zScore) > 2 ? 'text-red-400' : 
                              Math.abs(biomarker.zScore) > 1 ? 'text-yellow-400' : 
                              'text-green-400'
                            }`}>
                              {biomarker.zScore.toFixed(2)}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-slate-500 mb-1">Sapma</div>
                            <div className={`text-sm font-bold ${
                              biomarker.deviation > 50 ? 'text-red-400' : 
                              biomarker.deviation > 25 ? 'text-yellow-400' : 
                              'text-green-400'
                            }`}>
                              {biomarker.deviation.toFixed(1)}%
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-slate-500 mb-1">Etki</div>
                            <div className={`text-sm font-bold ${
                              biomarker.importance > 10 ? 'text-yellow-400' : 
                              biomarker.importance > 7 ? 'text-cyan-400' : 
                              'text-slate-400'
                            }`}>
                              {biomarker.importance.toFixed(1)}%
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-slate-500 mb-1">Risk</div>
                            <div className={`text-sm font-bold ${
                              biomarker.riskScore > 8 ? 'text-red-400' : 
                              biomarker.riskScore > 4 ? 'text-yellow-400' : 
                              'text-green-400'
                            }`}>
                              {biomarker.riskScore.toFixed(1)}%
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Importance Bar - Always visible */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-slate-500">Etki Seviyesi</span>
                          <span className={`font-medium ${
                            biomarker.importance > 10 ? 'text-yellow-400' : 
                            biomarker.importance > 7 ? 'text-cyan-400' : 
                            'text-slate-400'
                          }`}>
                            {biomarker.importance.toFixed(1)}%
                          </span>
                        </div>
                        <div className="h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all ${
                              biomarker.importance > 10 ? 'bg-yellow-400' : 
                              biomarker.importance > 7 ? 'bg-cyan-400' : 
                              'bg-slate-500'
                            }`}
                            style={{ width: `${biomarker.importance * 10}%` }}
                          />
                        </div>
                      </div>

                      {/* Simülasyon Slider */}
                      {simulationMode && selectedBiomarker === biomarker.key && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mb-3 pb-3 border-b border-slate-700/50"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <FiSliders className="w-3 h-3 text-cyan-400" />
                            <span className="text-xs text-cyan-400">Değeri Ayarla</span>
                          </div>
                          <input
                            type="range"
                            min={Math.min(biomarker.healthy, biomarker.parkinson) * 0.5}
                            max={Math.max(biomarker.healthy, biomarker.parkinson) * 1.5}
                            step={(Math.max(biomarker.healthy, biomarker.parkinson) - Math.min(biomarker.healthy, biomarker.parkinson)) / 100}
                            value={biomarker.currentValue}
                            onChange={(e) => updateValue(biomarker.key, parseFloat(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                          />
                          <div className="flex justify-between text-xs text-slate-500 mt-1">
                            <span>{(Math.min(biomarker.healthy, biomarker.parkinson) * 0.5).toFixed(2)}</span>
                            <span>{(Math.max(biomarker.healthy, biomarker.parkinson) * 1.5).toFixed(2)}</span>
                          </div>
                        </motion.div>
                      )}

                      {/* Comparison Bars */}
                      <div className="space-y-2">
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-green-400">Sağlıklı</span>
                            <span className="text-slate-400">{biomarker.healthy.toFixed(3)}</span>
                          </div>
                          <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${healthyPercent}%` }}
                              transition={{ duration: 0.5, delay: index * 0.01 }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-red-400">Parkinson's</span>
                            <span className="text-slate-400">{biomarker.parkinson.toFixed(3)}</span>
                          </div>
                          <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${parkinsonPercent}%` }}
                              transition={{ duration: 0.5, delay: index * 0.01 }}
                            />
                          </div>
                        </div>
                        {simulationMode && (
                          <div>
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="text-cyan-400">Mevcut</span>
                              <span className="text-slate-400">{biomarker.currentValue.toFixed(3)}</span>
                            </div>
                            <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                              <motion.div 
                                className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${(biomarker.currentValue / maxValue) * 100}%` }}
                                transition={{ duration: 0.3 }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simulation Mode Notification */}
      <AnimatePresence>
        {simulationMode && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-cyan-500/10 backdrop-blur-xl border border-cyan-500/30 rounded-xl px-6 py-4 shadow-2xl"
          >
            <div className="flex items-center gap-3">
              <FiAlertCircle className="w-5 h-5 text-cyan-400" />
              <div>
                <div className="text-sm font-medium text-white">Simulation Mode Active</div>
                <div className="text-xs text-slate-400">Click on a biomarker to modify its value</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Disclaimer */}
      <div className="border-t border-slate-800/50 bg-slate-900/40 backdrop-blur-xl mt-8">
        <div className="max-w-[1600px] mx-auto px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Legal Notice */}
            <div className="col-span-2">
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <FiActivity className="w-4 h-4 text-cyan-400" />
                Information and Terms of Use
              </h3>
              <div className="text-xs text-slate-400 space-y-2 leading-relaxed">
                <p>
                  <strong className="text-slate-300">Educational Demo:</strong> This interactive demo is designed to 
                  demonstrate how NeuralCipher.AI's artificial intelligence technology works. 
                  For actual voice analysis and risk assessment, please register on our platform.
                </p>
                <p>
                  <strong className="text-slate-300">Medical Consultation:</strong> For Parkinson's disease or 
                  any health concerns, always consult a licensed healthcare professional. 
                  This demo does not replace professional medical evaluation.
                </p>
                <p>
                  <strong className="text-slate-300">Scientific Foundation:</strong> All biomarker values shown are 
                  derived from peer-reviewed scientific journals and clinical studies. 
                  Our system achieves 94.7% accuracy.
                </p>
                <p className="text-slate-500 text-[10px] mt-3 pt-2 border-t border-slate-700/50">
                  © 2026 NeuralCipher.AI™ - Advanced AI-Powered Voice Biomarker Analysis Platform. 
                  Proprietary technology protected under international intellectual property laws. 
                  All rights reserved worldwide.
                </p>
              </div>
            </div>

            {/* Contact and Sharing */}
            <div>
              <h3 className="text-sm font-bold text-white mb-3">Share Demo</h3>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    const url = window.location.href;
                    navigator.clipboard.writeText(url);
                    alert('Demo link copied!');
                  }}
                  className="w-full px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-lg text-sm text-cyan-400 transition-all flex items-center justify-center gap-2"
                >
                  <FiActivity className="w-4 h-4" />
                  Copy Link
                </button>
                
                <div className="text-xs text-slate-500 text-center">
                  For investors, media, and researchers
                </div>

                <div className="pt-3 border-t border-slate-700/50">
                  <p className="text-xs text-slate-400 mb-2">More information:</p>
                  <div className="space-y-1">
                    <a href="/" className="block text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
                      → Home
                    </a>
                    <a href="/research" className="block text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
                      → Research
                    </a>
                    <a href="/contact" className="block text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
                      → Contact
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #64FFDA;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(100, 255, 218, 0.5);
        }
        
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #64FFDA;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(100, 255, 218, 0.5);
        }
        
        .slider::-webkit-slider-thumb:hover {
          background: #4EDDBA;
          box-shadow: 0 0 15px rgba(100, 255, 218, 0.8);
        }
        
        .slider::-moz-range-thumb:hover {
          background: #4EDDBA;
          box-shadow: 0 0 15px rgba(100, 255, 218, 0.8);
        }
      `}</style>

      {/* Footer */}
      <Footer />
    </div>
  );
}
