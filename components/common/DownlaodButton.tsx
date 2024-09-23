"use client"

import React from 'react';
import { Button } from '@/components/ui/button';
import html2pdf from 'html2pdf.js';
interface ClientDownloadButtonProps {
  contentId: string;
  leaves: any[];
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

  return (
    <div className='flex gap-x-5'>
      <Button onClick={handleDownload}>
        Download(PDF)
      </Button>
    </div>
  );
};

export default ClientDownloadButton;
