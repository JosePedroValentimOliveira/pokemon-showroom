import React from "react"
import {  useStaticQuery,graphql } from "gatsby"


import Layout from "../components/layout"

import SEO from "../components/seo"

import {Wrapper, Card,BottomEdgeDown,BottomEdgeUp} from '../pageStyles/pageStyles';
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
      <SEO title="Cards" />
      <Wrapper cardsColor={COLORS.BLACK} descriptionColor={COLORS.WHITE}>
        <div className="banner">
            
          <img className="w-full h-full object-cover "
            src={cardsBannerImage.sourceUrl}
            alt={cardsBannerImage.altText}
          />
          <BottomEdgeDown color={COLORS.BLACK} />
        </div>
        <div className="description">
          <h2>We are pokemon showroom</h2>
          <p>{cardsDescription}</p>
          <BottomEdgeUp color={COLORS.BLACK} />
        </div>
        <div className="cards">
          <h2>Our Cards</h2>
          <div className="card-items">
              
            {cards.map(( {node:{cardMeta}}) => {
               
               return(
                   <Card to={`/${cardMeta.cardName.toLowerCase()}`} key={cardMeta.cardName}>
                  
                      
                 
                <img className="w-full h-full object-contain"
                  src={cardMeta.cardImage.sourceUrl}
                  alt={cardMeta.cardImage.altText}
                />
                <div className="card-info">
                  <p>
                    {cardMeta.cardName} #{cardMeta.cardSetNumber}
                  </p>
                 
                </div>
              </Card>)
               
            })}
          </div>
        </div>
      </Wrapper>
    </Layout>
    )
}

export default Cards
