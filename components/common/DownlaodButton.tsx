"use client"

import React from 'react';
import { Button } from '@/components/ui/button';
import html2pdf from 'html2pdf.js';
import * as XLSX from 'xlsx';
interface ClientDownloadButtonProps {
  contentId: string;
  leaves: any[];
  // dateRange: { from: Date | undefined; to: Date | undefined }; 
}

const ClientDownloadButton: React.FC<ClientDownloadButtonProps> = ({ contentId, leaves }) => {
  const handleDownload = () => {
    const element = document.getElementById(contentId);
    if (element) {
      const options = {
        margin: 1,
        filename: 'LeaveDetails.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, width: element.offsetWidth },
        jsPDF: { unit: 'px', format: [element.offsetWidth, element.offsetHeight], orientation: 'landscape' },
      };
      html2pdf().from(element).set(options).save();
    } 
  };
  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(leaves); 
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Leave Details');
    workbook.Props = {
      Title: "Leave Details",
      Subject: "Leave Records",
      Author: "Your Name",
      CreatedDate: new Date(),
      'readOnly': true,
    };
    
    XLSX.writeFile(workbook, 'LeaveDetails.xlsx');
  };

  return (
    <div className='flex gap-x-5'>
      <Button onClick={handleDownload}>
        Download(PDF)
      </Button>
      <Button onClick={handleDownloadExcel}>
      Download(EXCEL)
      </Button>
    </div>
  );
};

export default ClientDownloadButton;
