import Image from 'next/image';
import Link from 'next/link';

const Page= ({data,city})=>{
    return <div>
        <h1>{city}</h1>
        {data.map(ev => (
            <Link key={ev.id} href={`/events/${ev.city}/${ev.id}`} passHref>
                
                    <Image height={300} width={300} alt={`${ev.title}`} src={`${ev.image}`}/>
                    <h2>{ev.title}</h2>
                    
                
            </Link> 
        ))}

    </div>
}

export default Page;

export async function getStaticPaths(){

    const {events_categories}=await import('../../../data/data.json');
    const allPaths=events_categories.map((ev)=>{
        return {
            params:{
                cat:ev.id.toString(),
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

    const id = context?.params.cat;
    const {allEvents} = await import('../../../data/data.json');
    const cityEvents=allEvents.filter((ev)=>id===ev.city);
    
    return { 
      props:{ 
        data:cityEvents,
        city:id
      }

    };
  
  }