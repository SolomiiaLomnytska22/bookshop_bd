const fs = require('fs');
const { Parser } = require('json2csv');
const xmlbuilder = require('xmlbuilder');
const pdf = require('pdfkit');

// Export array to CSV
export function exportArrayToCSV(data, filename) {
    const parser = new Parser();
    const csv = parser.parse(data);
    fs.writeFileSync(filename, csv);
}

// Export array to XML
export function exportArrayToXML(data, filename) {
    const root = xmlbuilder.create('root');
    data.forEach((item, index) => {
        const child = root.ele(`item_${index}`);
        Object.keys(item).forEach(key => {
            child.ele(key, item[key]);
        });
    });
    const xml = root.end({ pretty: true });
    fs.writeFileSync(filename, xml);
}

// Export array to JSON
export function exportArrayToJSON(data, filename) {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filename, jsonData);
}

// Export array to RTF (Rich Text Format)
export function exportArrayToRTF(data, filename) {
    let rtfContent = '{\\rtf1\\ansi\n';
    data.forEach((item, index) => {
        rtfContent += `Item ${index + 1}:\n`;
        Object.keys(item).forEach(key => {
            rtfContent += `${key}: ${item[key]}\\par\n`;
        });
        rtfContent += '\\par\n';
    });
    rtfContent += '}';
    fs.writeFileSync(filename, rtfContent);
}

// Export array to PDF
export function exportArrayToPDF(data, filename) {
    const doc = new pdf();
    data.forEach((item, index) => {
        doc.text(`Item ${index + 1}:`);
        Object.keys(item).forEach(key => {
            doc.text(`${key}: ${item[key]}`);
        });
        doc.moveDown();
    });
    doc.pipe(fs.createWriteStream(filename));
    doc.end();
}