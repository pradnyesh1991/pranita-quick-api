
import { setCORS } from "./_util.js";

export default async function handler(req, res){
  setCORS(res);
  if(req.method === "OPTIONS") return res.status(200).end();
  if(req.method !== "POST"){
    return res.status(405).json({error:"Use POST"});
  }
  try{
    const b = typeof req.body === "string" ? JSON.parse(req.body||"{}") : (req.body||{});
    const fields = b.fields||{};
    const name = fields.name || "अर्जदार";
    const dob  = fields.dob;
    const addr = fields.address;
    const pin  = fields.pincode;
    const missing = b.missing || [];
    const prof = b.profile || "प्रमाणपत्र";
    const lang = b.language || "eng+mar";

    let r = "";
    if(String(lang).includes("mar")){
      r = (missing.length
        ? `${name} यांनी ${prof} प्रमाणपत्रासाठी आवश्यक कागदपत्रांपैकी ${missing.join(", ")} उपलब्ध नाहीत. म्हणून अर्ज अपूर्ण आहे.`
        : `${name} यांनी ${prof} प्रमाणपत्रासाठी आवश्यक सर्व कागदपत्रे सादर केली आहेत. अर्ज पूर्ण मानण्यात येतो.`);
      if(dob) r += ` जन्मतारीख: ${dob}.`;
      if(addr) r += ` पत्ता: ${addr}` + (pin?` (${pin})`:"") + ".";
    } else {
      r = (missing.length
        ? `Applicant ${name} has applied for ${prof}. Missing documents: ${missing.join(", ")}. Hence the application is incomplete.`
        : `Applicant ${name} has submitted all required documents for ${prof}. Application is complete.`);
      if(dob) r += ` DOB: ${dob}.`;
      if(addr) r += ` Address: ${addr}` + (pin?` (${pin})`:"") + ".";
    }
    return res.status(200).json({ remark: r });
  }catch(e){
    return res.status(400).json({ error: String(e) });
  }
}
