
export const DOC_MAP = {
  "आधार": "Aadhaar","aadhaar":"Aadhaar","ration":"RationCard","रेशन":"RationCard",
    "शाळा सोडल्याचा":"SchoolLeaving","school leaving":"SchoolLeaving",
    "लाईट बिल":"ElectricityBill","electric bill":"ElectricityBill",
    "form 16":"Form16","फॉर्म-१६":"Form16","income":"IncomeProof","उत्पन्न":"IncomeProof",
    "सेनिअर":"SeniorCitizen","medical":"Medical","वैद्यकीय":"Medical",
    "caste":"Caste","जातीचा":"Caste"
};
export function classifyText(t){
  if(!t) return ["Unknown", 0.2];
  const s = t.toLowerCase();
  let score=0, label="Unknown";
  for(const [k,v] of Object.entries(DOC_MAP)){
    if(s.includes(k)){ score++; label=v; }
  }
  const conf = score ? Math.min(0.99, 0.5 + 0.1*score) : 0.2;
  return [label, Math.round(conf*100)/100];
}
