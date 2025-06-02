// src/components/PDFReport.jsx
import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const PDFReport = ({ analysisText }) => {
  const reportRef = useRef();

  const downloadPDF = async () => {
    const element = reportRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    const width = pdf.internal.pageSize.getWidth();
    const height = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, 'PNG', 0, 0, width, height);
    pdf.save('恋愛診断レポート.pdf');
  };

  return (
    <div>
      <div ref={reportRef} style={{ padding: '20px', background: '#fff', color: '#000' }}>
        <h2>あなたへの恋愛アドバイス</h2>
        <p>{analysisText}</p>
      </div>
      <button onClick={downloadPDF} className="mt-4 bg-pink-500 text-white px-4 py-2 rounded">
        📄 PDFで保存する
      </button>
    </div>
  );
};

export default PDFReport;
