import Image from 'next/image';
import Link from 'next/link';


const EventsPage= ({data})=>{
    return <div>
        <h1>Event Page</h1>
        {data.map(ev => ( 

        <Link key={ev.id} href={`/events/${ev.id}`} passHref> 
            
                <Image height={100} width={200} alt={`${ev.title}`} src={`${ev.image}`}/>
                <h2>{ev.title}</h2>
          
          </Link> 
        ))}

    </div>
}

export default EventsPage

export async function getServerSideProps(){

    const {events_categories} = await import('../../data/data.json');
    
    return { 
      props:{ 
        data:events_categories
      }
    };
  
  }