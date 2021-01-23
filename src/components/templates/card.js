import React from 'react'
import {graphql} from 'gatsby';
import Layout from '../layout';
import SEO from '../seo';
import {Wrapper,Image} from './templateStyles/artistStyles';

const CardTemplate = ({data}) => {
  console.log(data);
  return (
   <div>Hello</div>
  )
}

export default CardTemplate

export const pageQuery = graphql`
  query($id:ID!){
    wpcontent {
      card(id: $id, idType: ID) {
    cardMeta {
      cardName
      cardHealthPoints
      cardAttack1
      cardSetNumber
      cardValue
      cardImage {
        sourceUrl
        imageFile {
          childImageSharp {
            fluid(quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        altText
      }
    }
  }
  }
  }
`