const scanner = (text) => {
    const results = {};
  
    // Example regex patterns for detection
    const panRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/g; // PAN card
    const ssnRegex = /\b\d{3}-\d{2}-\d{4}\b/g;    // US SSN
    const creditCardRegex = /\b(?:\d[ -]*?){13,16}\b/g; // Credit Card
  
    const panMatches = text.match(panRegex);
    const ssnMatches = text.match(ssnRegex);
    const ccMatches = text.match(creditCardRegex);
  
    if (panMatches) results.panNumbers = panMatches;
    if (ssnMatches) results.ssn = ssnMatches;
    if (ccMatches) results.creditCardNumbers = ccMatches;
  
    return results;
  };
  
  const classifyData = (scanResults) => {
    if (!scanResults || Object.keys(scanResults).length === 0) {
        return 'Unknown';
      }
    
      if (scanResults.creditCardNumbers?.length > 0) {
        return 'PCI';
      }
      if (scanResults.ssn?.length > 0) {
        return 'PII';
      }
      if (scanResults.panNumbers?.length > 0) {
        return 'PII';
      }
    
      return 'General';
  
    
  };
  
  module.exports = { scanner, classifyData };
  

