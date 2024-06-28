import React from 'react';
import './techSpecs.css'; // Import the CSS file

const tableData = [
  // Replace with your actual data for 11 rows (spec and value properties)
  { spec: 'Supply', value: 'Lithium-ion polymer accumulator' },
  { spec: 'Weight', value: '56g' },
  { spec: 'Color', value: 'Black' },
  { spec: 'Sensitivity', value: '+- 750 mV' },
  { spec: 'Input Impedance', value: '>1 GOhm' },
  { spec: 'Safety Class', value: '||' },
  { spec: 'Battery Time', value: '>3 hours' },
  { spec: 'Bluetooth', value: '2.1' },
  { spec: 'Accelerometer', value: '3-axis' },
  { spec: 'Gyroscope', value: '3-axis' },
  { spec: 'Certification', value: 'CE' },
];

const TableSpecs = () => {
  return (
    <>
    <div className="centered-table">
    <h1 className="tableSpecs-title">Technical Specifications</h1>
      <table className="table-specs">
        <thead> 
          <tr>
            <th>Specification</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.spec}</td>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default TableSpecs;