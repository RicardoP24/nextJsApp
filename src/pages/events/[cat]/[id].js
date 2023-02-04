import Image from 'next/image';
import { useRouter } from 'next/router';
import React,{useRef} from 'react';

const Page= ({data})=>{
    const inputEmail=useRef();
    const router=useRouter();

    const onSubmit=async (e)=>{

        e.preventDefault();
        const email=inputEmail.current.value;
        const eventId=router?.query.id;

        try {
            const response= await fetch('../../api/email-registration',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({email,eventId})
            });

            if(!response.ok)throw new Error(`${response.status}`);
            const data=await response.json();
            console.log('POST',data);
            
        } catch (error) {
            
        }
    }

    return <>
        {data.map(ev=>(

            <>
            <h1 key={ev.id}>{ev.title}</h1>
            <Image height={300} width={300} alt={`${ev.title}`} src={`${ev.image}`}/>
            <p>{ev.description}</p>
            <form onSubmit={onSubmit}>
                <input ref={inputEmail} type="email"/>
                <button type='submit'>Submit</button>
            </form>
            </>

        ))}
    </>
}

export default Page;

export async function getStaticPaths(){

    const {allEvents}=await import('../../../data/data.json');
    const allPaths=allEvents.map((ev)=>{
        return {
            params:{
                cat:ev.city.toString(),
                id:ev.id.toString(),
            }
        };
    });

    return {
       paths: allPaths,
       fallback: false
    }
    
}
//get static props pode ser usado sozinho quando a pagina é estática (sem path variável)
export async function getStaticProps(context){

    const id = context?.params.id;
    const {allEvents} = await import('../../../data/data.json');
    const cityEvents=allEvents.filter((ev)=>id===ev.id);
    
    return { 
      props:{ 
        data:cityEvents,
        eventName:id
      }

    };
  
  }