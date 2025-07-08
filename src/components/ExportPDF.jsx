// src/components/ExportPDF.jsx
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const ExportPDF = ({ data, type }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.text(`${type === 'trip' ? 'Trip Details' : 'Trip Itinerary'}`, 14, 20);
    
    // Add trip information (for both types)
    if (type === 'trip') {
      doc.setFontSize(12);
      doc.text(`Name: ${data.name}`, 14, 30);
      doc.text(`Destination: ${data.destination}`, 14, 40);
      doc.text(`Dates: ${new Date(data.startDate).toLocaleDateString()} - ${new Date(data.endDate).toLocaleDateString()}`, 14, 50);
    } else {
      // For itinerary, show trip info at top
      doc.setFontSize(12);
      doc.text(`Trip: ${data.trip.name}`, 14, 30);
      doc.text(`Destination: ${data.trip.destination}`, 14, 40);
      
      // Add itinerary table
      doc.autoTable({
        head: [['Day', 'Time', 'Activity', 'Notes']],
        body: data.items.map(item => [
          item.day,
          item.time || '-',
          item.activity,
          item.notes || '-'
        ]),
        startY: 50,
        theme: 'grid'
      });
    }

    doc.save(`${type === 'trip' ? data.name : data.trip.name + '_itinerary'}.pdf`);
  };

  return (
    <button 
      onClick={generatePDF}
      className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm"
    >
      Export as PDF
    </button>
  );
};

export default ExportPDF;