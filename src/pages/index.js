import React from "react"
import {  useStaticQuery,graphql } from "gatsby"

import Layout from "../components/layout"

import SEO from "../components/seo"
import {Wrapper,Image, Artist,BottomEdgeDown,BottomEdgeUp} from '../pageStyles/pageStyles';
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
                imageFile {
                  childImageSharp {
                    fluid(quality: 100) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
                slug
              }
            }
          }
        }
        homePageHeaderDescription
        homePageHeaderBannerImage {
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

  `)

  return (
    <Layout>
    <SEO title="Home" />
    <Wrapper>
    <div className="banner">
        <Image fluid={homePageHeaderBannerImage.imageFile.childImageSharp.fluid} alt={homePageHeaderBannerImage.altText}/>
        <div className="inner-div">
          <p className="header-title">{homePageHeaderTitle}</p>
          <p  className="header-description">{homePageHeaderDescription}</p>
        </div>
        <BottomEdgeDown color={COLORS.BLACK}/>
      </div>
      <div className="description">
        <p>{homePageHeaderDescription}</p>
        <BottomEdgeUp color={COLORS.PRIMARY}/>
      </div>
      <div className="artist-items">
          {homePageHeaderFeaturedCards.map(({cardMeta})=>{
            
            return(
              <Artist to={`/${cardMeta.cardName}`}>
                <Image fluid={cardMeta.cardImage.imageFile.childImageSharp.fluid} alt={cardMeta.cardImage.altText}/>
                <div className="artist-info">
                  <p>{cardMeta.cardName}</p>
                  <p>{cardMeta.cardValue} euro</p>
                </div>
              </Artist>
            )
            
          })}
        </div>
    </Wrapper>
  </Layout>
  )
}

export default IndexPage
