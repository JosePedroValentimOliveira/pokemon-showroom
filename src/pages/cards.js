import React from "react"
import {  useStaticQuery,graphql } from "gatsby"


import Layout from "../components/layout"

import SEO from "../components/seo"

import {Wrapper,Image, Artist,BottomEdgeDown,BottomEdgeUp} from '../pageStyles/pageStyles';
import { COLORS } from "../constants";

const Cards = () => {

    const {wpcontent: {pageBy: {
        cardsPageMeta: { cardsBannerImage, cardsDescription }},
        cards:{edges:cards}
    }
      } = useStaticQuery(graphql`
    query{
        wpcontent {
            pageBy(pageId: 11) {
            cardsPageMeta {
                cardsDescription
                cardsBannerImage {
                altText
                sourceUrl
                imageFile {
                    childImageSharp {
                    fluid(quality: 100) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                    }
                }
                
                }
            }
            }
            cards {
            edges {
                node {
                cardMeta {
                    cardName
                    cardHealthPoints
                    cardAttack1
                    cardSetNumber
                    cardValue
                    cardImage{
                    altText
                    sourceUrl
                    imageFile {
                        childImageSharp {
                        fluid(quality: 100) {
                            ...GatsbyImageSharpFluid_withWebp
                        }
                        }
                    }
                    
                    }
                }
                }
            }
            }
        }
    }
    `)
     
    return (
       
        <Layout>
      <SEO title="Artists" />
      <Wrapper artistsColor={COLORS.BLACK} descriptionColor={COLORS.SECONDARY}>
        <div className="banner">
            
          <Image
            fluid={cardsBannerImage.imageFile.childImageSharp.fluid}
            alt={cardsBannerImage.altText}
          />
          <BottomEdgeDown color={COLORS.SECONDARY} />
        </div>
        <div className="description">
          <h2>We are pokemon showroom</h2>
          <p>{cardsDescription}</p>
          <BottomEdgeUp color={COLORS.BLACK} />
        </div>
        <div className="artists">
          <h2>Our Cards</h2>
          <div className="artist-items">
              
            {cards.map(( {node:{cardMeta}}) => {
               if(cardMeta.cardImage.imageFile != null){
               return(
                   <Artist to={`/${cardMeta.cardName.toLowerCase()}`} key={cardMeta.cardName}>
                  
                      
                 
                <Image
                  fluid={cardMeta.cardImage.imageFile.childImageSharp.fluid}
                  alt={cardMeta.cardImage.altText}
                />
                <div className="artist-info">
                  <p>
                    {cardMeta.cardName} {cardMeta.cardValue}
                  </p>
                 
                </div>
              </Artist>)}
               
            })}
          </div>
        </div>
      </Wrapper>
    </Layout>
    )
}

export default Cards
