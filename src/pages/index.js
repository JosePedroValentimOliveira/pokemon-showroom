import React from "react"
import {  useStaticQuery,graphql } from "gatsby"

import Layout from "../components/layout"

import SEO from "../components/seo"
import {Wrapper, Card,BottomEdgeUp} from '../pageStyles/pageStyles';
import { COLORS } from "../constants";
const IndexPage = () => {
  const {wpcontent:{pageBy:{homePageMeta:{homePageHeaderTitle,homePageHeaderFeaturedCards,homePageHeaderDescription,homePageHeaderBannerImage}}}} = useStaticQuery(graphql`
  query{
    wpcontent {
    pageBy(pageId: 9) {
      homePageMeta {
        homePageHeaderTitle
        homePageHeaderFeaturedCards {
          ... on WPGraphql_Card {
            id
            cardMeta {
              cardName
              cardHealthPoints
              cardAttack1
              cardSetNumber
              cardValue
              cardImage {
                altText
                sourceUrl
               
                slug
              }
            }
          }
        }
        homePageHeaderDescription
        homePageHeaderBannerImage {
          altText
          sourceUrl
          
        }
      }
    }
  }
}
  `)

  return (
    <Layout>
    <SEO title="Home" />
    <Wrapper>
    <div className="banner">
        <img className="w-full h-full object-cover " src={homePageHeaderBannerImage.sourceUrl} alt={homePageHeaderBannerImage.altText}/>
        <div className="inner-div items-center gap-8 rounded-xl border-2 border-white ">
          <p className="header-title pt-6">{homePageHeaderTitle}</p>
          
          <div className={"bg-gray-100 text-gray-900 w-3/12 rounded p-2 font-bold text-center"}><a href="#featured">Featured Cards</a></div>
        </div>
     
      </div>
      <div className="cards" id="featured">
      <div className="card-items">
      
          {homePageHeaderFeaturedCards.map(({cardMeta})=>{
 
            return(
              <Card to={`/${cardMeta.cardName.toLowerCase()}`} >
                <img className="w-full h-full object-contain" src={cardMeta.cardImage.sourceUrl} alt={cardMeta.cardImage.altText}/>
                <div className="card-info">
                  <p>{cardMeta.cardName} #{cardMeta.cardSetNumber}</p>
                  
                </div>
              </Card>
            )
            
          })}
          
        </div>
        </div>
      <div className="description">
    
        <p>{homePageHeaderDescription}</p>
        <BottomEdgeUp color={COLORS.PRIMARY}/>
      </div>
      
    </Wrapper>
  </Layout>
  )
}

export default IndexPage