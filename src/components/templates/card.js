import React from 'react'
import {graphql} from 'gatsby';
import Layout from '../layout';
import SEO from '../seo';
import {Wrapper} from './templateStyles/cardStyles';

const CardTemplate = ({data:{wpcontent:{card:{cardMeta,typing:{edges:typing}}}}}) => {
  
  return (
   <Layout>
     <SEO title="card"/>
     <Wrapper>
       <div className="card-container">
        <div className="card-image">
        <img className="w-full h-full object-contain" src={cardMeta.cardImage.sourceUrl} alt={cardMeta.cardImage.altText}/>
        </div>
        <div className="card-info">
          <h2>{cardMeta.cardName}</h2>
          <h3>€{cardMeta.cardValue}</h3>
s
          <p className="info">
            <strong>Health points: </strong>{cardMeta.cardHealthPoints}
          </p>
          <p className="info">
            <strong>First Attack: </strong>{cardMeta.cardAttack1}
          </p>
          <p className="info">
            <strong>Set number: </strong>{cardMeta.cardSetNumber}
          </p>
          <p className="info flex-row">
            <strong>Typing: </strong>
            <div className="flex flex-row items-center gap-2">
            {typing.map(({node:type})=>(
              <div>
                <img  src={require(`../../images/types/${type.name.toLowerCase()}.gif`)} alt={type.name}/>
              </div>
            ))}
            </div>
          </p>
          
          
        </div>
       </div>
     </Wrapper>
   </Layout>
  )
}

export default CardTemplate

export const pageQuery = graphql`
  query($id:ID!){
    wpcontent {
      card(id: $id, idType: ID) {
        typing {
        edges {
          node {
            name
          }
        }
      }
    cardMeta {
      cardName
      cardHealthPoints
      cardAttack1
      cardSetNumber
      cardValue
      cardImage {
        sourceUrl
        
        altText
      }
    }
  }
  }
  }
`