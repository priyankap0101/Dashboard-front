// src/utils/exportUtils.js
import { saveAs } from 'file-saver';


export const exportToCSV = (data, filename, returnAsString = false) => {
    const csvData = data.map(row => Object.values(row).join(',')).join('\n');
    if (returnAsString) {
        return csvData;
    }
    const blob = new Blob([csvData], { type: 'text/csv' });
    saveAs(blob, filename);
};

export const exportToPDF = (data, filename, returnAsBlob = false) => {
    const doc = new jsPDF();
    const tableData = data.map(row => Object.values(row));
    doc.autoTable({ body: tableData });
    if (returnAsBlob) {
        return doc.output('blob');
    }
    doc.save(filename);
};
