import { useState } from "react";
import algoliasearch from 'algoliasearch/lite';
import { Link } from "react-router-dom";
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-hooks-web';


export default function Modal({ closeModal }) {
  const searchClient = algoliasearch('4S6GCGZALP', '2e97ce9cc2b75b94588b02307d058cdf');
  const [showHits, setShowHits] = useState(false);

  return (
    <div style={{zIndex:'999',}} className="fixed inset-0 z-10 overflow-y-auto">
      <div className="fixed inset-0 w-full h-full bg-black opacity-40" onClick={closeModal}></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div style={{maxHeight:'60vh', overflowY:'scroll'}} className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
          <InstantSearch  indexName="products" searchClient={searchClient} >
            <SearchBox className="rounded"  />
            <Hits hitComponent={HitComponent}   />
          
   
          </InstantSearch>
        </div>
      </div>
    </div>
  );
}

const HitComponent = ({ hit }) => {
  return (
    <div        
>
        
    <Link to={`/product/${hit.objectID}`}>
  

       <img style={{height:'50px', width:'auto'}} src={hit.img} alt={hit.title} />
       <div>
       <h3 className='font-semibold'>{hit.title}</h3>
       <div style={{ display: 'flex', flexDirection: 'row' }}>
          {hit.effect.map((effect, index) => (
            <p
              key={index}
              className='text-xs text-slate-700'
              style={{ paddingRight:'6px'}}
            >
              {effect}
            </p>
          ))}
        </div>
       <p>{hit.desc.split(' ').slice(0, 20).join(' ')}...</p>
       </div>
     </Link>
   </div>
  );
};
