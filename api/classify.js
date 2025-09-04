
import { classifyText, setCORS } from "./_util.js";

export default async function handler(req, res){
  setCORS(res);
  if(req.method === "OPTIONS") return res.status(200).end();
  if(req.method !== "POST"){
    return res.status(405).json({error:"Use POST"});
  }
  try{
    const body = typeof req.body === "string" ? JSON.parse(req.body||"{}") : (req.body||{});
    const [label, score] = classifyText(body.text||"");
    return res.status(200).json({ label, score });
  }catch(e){
    return res.status(400).json({ error: String(e) });
  }
}
