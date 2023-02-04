import path from 'path'
import fs from 'fs'

function buildPath(){
  return path.join(process.cwd(),'src','data','data.json');
}

function extractData(filePath){

  const json=fs.readFileSync(filePath);
  const data=JSON.parse(json);
  return data;

}
export default function handler(req,res){
      const {method}=req;
      const filePath=buildPath();
      const {events_categories, allEvents}=extractData(filePath);
      if(!allEvents){
        res.status(404).json(
          {status:404,
          message: `Events data not found`
          }
        );
      }

      
      if(method === "POST"){
        const {email,eventId} = req.body;
        const newAllEvents=allEvents.map(ev=>{
          if(ev.id===eventId){
            if(ev.emails_registered.includes(email)){
              res.status(201).json({message: 'This email has already been registered'})
            }
            else
              return {
                ...ev,
                emails_registered:[...ev.emails_registered,email]
              };

        }
        return ev;
        
        });

        fs.writeFileSync(filePath,JSON.stringify({events_categories,allEvents:newAllEvents}));
        res.status(200).json({message: `Email ${email} registrado no evento ${eventId}`})
      
      }


    

    
}