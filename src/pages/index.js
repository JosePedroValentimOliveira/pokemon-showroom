import React from "react"
import {  useStaticQuery,graphql } from "gatsby"

import Layout from "../components/layout"

import SEO from "../components/seo"
import {Wrapper, Card,BottomEdgeUp,Image} from '../pageStyles/pageStyles';
import { COLORS } from "../constants";
const IndexPage = () => {
  const {wpcontent:{page:{homePageMeta:{homePageHeaderTitle,homePageFeaturedCards,homePageHeaderDescription,homePageHeaderBannerImage}}}} = useStaticQuery(graphql`
  query{
    wpcontent {
    page(id: "home-page", idType: URI) {
      homePageMeta {
        homePageHeaderTitle
        homePageHeaderDescription
        homePageHeaderBannerImage {
          sourceUrl
          altText
          
        }
        homePageFeaturedCards {
          ... on WPGraphql_Card {
            id
            cardMeta {
              cardName
              cardSetNumber
              cardImage{
                sourceUrl
                altText
                
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
    <SEO title="Home" />
    <Wrapper>
    <div className="banner">
        <img className="w-full h-full object-cover " src={require(`../images/cards/${homePageHeaderBannerImage.sourceUrl.split("/")[7]}`)} alt={homePageHeaderBannerImage.altText}/> 
        
        {/* <Image fluid={homePageHeaderBannerImage.imageFile.childImageSharp.fluid} alt={homePageHeaderBannerImage.altText}/> */}
        <div className="inner-div items-center gap-8 rounded-xl border-2 border-white ">
          <p className="header-title pt-6">{homePageHeaderTitle}</p>
          
          <div className={"bg-gray-100 text-gray-900 w-3/12 rounded p-2 font-bold text-center"}><a href="#featured">Featured Cards</a></div>
        </div>
     
      </div>
      <div className="cards" id="featured">
      <div className="card-items">
      
          {homePageFeaturedCards.map(({cardMeta})=>{
           
            return(
              <Card to={`/${cardMeta.cardName.toLowerCase()}`} >
               <img className="w-full h-full object-contain" src={require(`../images/cards/${cardMeta.cardImage.sourceUrl.split("/")[7]}`)} alt={cardMeta.cardImage.altText}/>
              {/* <Image fluid={cardMeta.cardImage.imageFile.childImageSharp.fluid} alt={cardMeta.cardImage.altText}/> */} 
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