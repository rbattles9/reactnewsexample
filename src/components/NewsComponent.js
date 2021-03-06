import React, { Component } from 'react'
import NewsItems from './NewsItems'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingSpinner from './LoadingSpinner';

export class NewsComponent extends Component {
  static defaultProps = {
    pageSize: 6,
    country: "in",
    category: "general"
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    }
  }
  async updatenews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=3cface0623b84e599253463d119cfffb&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true
    })
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
  }
  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=3cface0623b84e599253463d119cfffb&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({
    //     loading: true
    // })
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
    await this.updatenews();
  }
  // handlePrevClick = async () => {
  //     // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=3cface0623b84e599253463d119cfffb&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  //     // this.setState({
  //     //     loading:true
  //     // })
  //     // let data = await fetch(url);
  //     // let parsedData = await data.json()
  //     // this.setState({
  //     //     page: this.state.page - 1,
  //     //     articles: parsedData.articles,
  //     //     loading:true
  //     // })
  //     await this.setState({
  //         page: this.state.page-1
  //     });
  //     await this.updatenews();
  // }
  // handleNextClick = async () => {
  //     // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=3cface0623b84e599253463d119cfffb&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //     // this.setState({
  //     //     loading:true
  //     // })
  //     // let data = await fetch(url);
  //     // let parsedData = await data.json()
  //     // this.setState({
  //     //     page: this.state.page + 1,
  //     //     articles: parsedData.articles,
  //     //     loading:false
  //     // })
  //     await this.setState({
  //         page: this.state.page+1
  //     });
  //     await this.updatenews();
  // }
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1, loading: true });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=3cface0623b84e599253463d119cfffb&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false
    });
  };

  render() {
    return (
      <>
        <h2 className="mb-3 text-center">{this.capitalizeFirstLetter(this.props.category)}-Top Headlines</h2>
        {/* {this.state.loading && <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only"></span>
                </div>
            </div>} */}
        {this.state.loading && <LoadingSpinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          // loader={<div className="d-flex justify-content-center">
          //     <div className="spinner-border" role="status">
          //         <span className="sr-only"></span>
          //     </div></div>}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return <div className="col-md-4" key={element.url}><NewsItems title={element.title} description={element.description} imageURL={element.urlToImage} URL={element.url} /></div>
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    )
  }
}
export default NewsComponent







{/* import React, { Component } from 'react'
// import NewsItems from './NewsItems'
// import LoadingSpinner from './LoadingSpinner'
// import PropTypes from 'prop-types'
// import InfiniteScroll from "react-infinite-scroll-component";



// export default class NewsComponent extends Component {
//   // articles = [
//   //   {
//   //     "source": { "id": "reuters", "name": "Reuters" },
//   //     "author": null,
//   //     "title": "South Africa says no signal of increased Omicron severity yet - Reuters",
//   //     "description": "South African scientists see no sign that the Omicron coronavirus variant is causing more severe illness, they said on Friday, as officials announced plans to roll out vaccine boosters with daily infections approaching an all-time high.",
//   //     "url": "https://www.reuters.com/world/africa/south-africa-sees-positive-signs-hospital-data-amid-omicron-wave-2021-12-10/",
//   //     "urlToImage": "https://www.reuters.com/resizer/G_7oere0SUcanJyPsNQzzvdgEKU=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/BKD73KAEDBIRPCZHRUHIIAKXLM.jpg",
//   //     "publishedAt": "2021-12-10T10:13:00Z",
//   //     "content": "JOHANNESBURG, Dec 10 (Reuters) - South African scientists see no sign that the Omicron coronavirus variant is causing more severe illness, they said on Friday, as officials announced plans to roll ou??? [+3357 chars]"
//   //   },
//   //   {
//   //     "source": { "id": "reuters", "name": "Reuters" },
//   //     "author": null,
//   //     "title": "Migrant truck crashes in Mexico killing 54 - Reuters Canada",
//   //     "description": "Fifty-four mostly Central Americans were killed on Thursday when the truck they were in flipped over in southern Mexico, in one of the worst accidents involving migrants who risk their lives to reach the United States.",
//   //     "url": "https://www.reuters.com/world/americas/least-49-people-killed-mexico-trailer-accident-officials-say-2021-12-09/",
//   //     "urlToImage": "https://www.reuters.com/resizer/cdvnd-yVn5DzsrSNR8_BDu19uzc=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/R5QM2MSMTFOB3MNHH67CKKYUGE.jpg",
//   //     "publishedAt": "2021-12-10T09:37:00Z",
//   //     "content": "TUXTLA GUTIERREZ, Mexico, Dec 9 (Reuters) - Fifty-four mostly Central Americans were killed on Thursday when the truck they were in flipped over in southern Mexico, in one of the worst accidents invo??? [+4414 chars]"
//   //   },
//   //   {
//   //     "source": { "id": null, "name": "BBC News" },
//   //     "author": "https://www.facebook.com/bbcnews",
//   //     "title": "Covid-19: Face masks required in more indoor venues in England - BBC News",
//   //     "description": "The updated rules are among new measures to tackle the spread of the Omicron coronavirus variant.",
//   //     "url": "https://www.bbc.com/news/uk-59602664",
//   //     "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/1C24/production/_122040270_gettyimages-1281585398.jpg",
//   //     "publishedAt": "2021-12-10T08:42:00Z",
//   //     "content": "By Alex KleidermanBBC News\r\nImage source, Getty Images\r\nFace coverings are now compulsory in most indoor venues in England, under measures to tackle the Omicron variant.\r\nThe new rules require people??? [+4859 chars]"
//   //   },
//   //   {
//   //     "source": { "id": "reuters", "name": "Reuters" },
//   //     "author": null,
//   //     "title": "China and Nicaragua re-establish ties in blow to U.S. and Taiwan - Reuters",
//   //     "description": "China and Nicaragua re-established diplomatic ties on Friday after the Central American country broke relations with Chinese-claimed Taiwan, boosting Beijing in a part of the world long considered the United States' backyard and angering Washington.",
//   //     "url": "https://www.reuters.com/world/china/china-nicaragua-hold-talks-city-tianjin-following-taiwan-break-2021-12-10/",
//   //     "urlToImage": "https://www.reuters.com/resizer/bZg02OoCzvSBvbhP5AxF56qHsR4=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/ZYTMSM24A5JO3A2XSMJ5UTXPHQ.jpg",
//   //     "publishedAt": "2021-12-10T08:39:00Z",
//   //     "content": "BEIJING/TAIPEI, Dec 10 (Reuters) - China and Nicaragua re-established diplomatic ties on Friday after the Central American country broke relations with Chinese-claimed Taiwan, boosting Beijing in a p??? [+4431 chars]"
//   //   },
//   //   {
//   //     "source": { "id": null, "name": "Investing.com" },
//   //     "author": "Reuters",
//   //     "title": "Asian shares ease as markets await US inflation data By Reuters - Investing.com",
//   //     "description": "Asian shares ease as markets await U.S. inflation data",
//   //     "url": "https://www.investing.com/news/economy/asian-shares-slip-ahead-of-key-us-inflation-data-2706661",
//   //     "urlToImage": "https://i-invdn-com.investing.com/news/STOCK-EXCHANGE-RUSSIAN-TRADING-SYSTEMS_800x533_L_1414427815.jpg",
//   //     "publishedAt": "2021-12-10T06:31:00Z",
//   //     "content": "By Alun John\r\nHONG KONG (Reuters) - Asian shares and European futures slipped on Friday as traders edged away from riskier assets amid renewed concerns about COVID-19 and caution ahead of key U.S. in??? [+3342 chars]"
//   //   },
//   //   {
//   //     "source": { "id": "cnn", "name": "CNN" },
//   //     "author": "Omar Jimenez and Travis Caldwell, CNN",
//   //     "title": "A jury found Jussie Smollett guilty of falsely reporting a hate crime. Here's what comes next - CNN",
//   //     "description": "Former \"Empire\" actor Jussie Smollett was found guilty Thursday on five counts of felony disorderly conduct for making false reports to police that he was the victim of a hate crime in January 2019.",
//   //     "url": "https://www.cnn.com/2021/12/10/us/jussie-smollett-trial-guilty-next-steps/index.html",
//   //     "urlToImage": "https://cdn.cnn.com/cnnnext/dam/assets/211209215619-04-smollett-arrives-court-1209-super-tease.jpg",
//   //     "publishedAt": "2021-12-10T06:16:00Z",
//   //     "content": "(CNN)Former \"Empire\" actor Jussie Smollett was found guilty Thursday on five counts of felony disorderly conduct for making false reports to police that he was the victim of a hate crime in January 2??? [+4187 chars]"
//   //   },
//   //   {
//   //     "source": { "id": null, "name": "ESPN" },
//   //     "author": "Dave McMenamin",
//   //     "title": "Los Angeles Lakers' Anthony Davis says team needs to play like 'underdogs' after loss to Grizzlies - ESPN",
//   //     "description": "Anthony Davis called on the Los Angeles Lakers to \"lock in more\" against undermanned teams after L.A. fell to a Grizzlies team playing without Ja Morant.",
//   //     "url": "https://www.espn.com/nba/story/_/id/32834603/los-angeles-lakers-anthony-davis-says-team-needs-play-underdogs-loss-grizzlies",
//   //     "urlToImage": "https://a3.espncdn.com/combiner/i?img=%2Fmedia%2Fmotion%2F2021%2F1210%2Fss_20211209_223345011_183396690%2Fss_20211209_223345011_183396690.jpg",
//   //     "publishedAt": "2021-12-10T06:09:42Z",
//   //     "content": "MEMPHIS -- After the Los Angeles Lakers squandered an early lead against an undermanned Grizzlies team in Thursday's 108-95 loss, Anthony Davis said L.A.'s identity is far from the championship conte??? [+4202 chars]"
//   //   },
//   //   {
//   //     "source": { "id": "associated-press", "name": "Associated Press" },
//   //     "author": "Laura Ungar",
//   //     "title": "Pandemic mystery: Scientists focus on COVID's animal origins - Associated Press",
//   //     "description": "Nearly two years into the COVID-19 pandemic, the origin of the virus tormenting the world remains shrouded in mystery. Most scientists believe it emerged in the wild and jumped from bats to humans, either directly or through another animal.",
//   //     "url": "https://apnews.com/article/coronavirus-pandemic-science-health-pandemics-covid-19-pandemic-083bd75a801f9824e0b9ad7316062a5c",
//   //     "urlToImage": "https://storage.googleapis.com/afs-prod/media/90e0115ed0cb42ff9e8303f391ff25d2/2018.jpeg",
//   //     "publishedAt": "2021-12-10T06:07:42Z",
//   //     "content": "Nearly two years into the COVID-19 pandemic, the origin of the virus tormenting the world remains shrouded in mystery.\r\nMost scientists believe it emerged in the wild and jumped from bats to humans, ??? [+7136 chars]"
//   //   },
//   //   {
//   //     "source": { "id": null, "name": "NBCSports.com" },
//   //     "author": "Curtis Crabtree",
//   //     "title": "Thursday Night Football: Vikings withstand furious Steelers rally in 36-28 victory - NBC Sports",
//   //     "description": "The Minnesota Vikings just can???t do anything easy. After jumping out to a 29-0 lead over the Pittsburgh Steelers, it took a Harrison Smith pass breakup of a throw into the end zone to Pat Freiermuth on the final play of regulation to ultimately seal away a 36???",
//   //     "url": "https://profootballtalk.nbcsports.com/2021/12/09/thursday-night-football-vikings-withstand-furious-steelers-rally-in-36-28-victory/",
//   //     "urlToImage": "https://profootballtalk.nbcsports.com/wp-content/uploads/sites/25/2021/12/GettyImages-1358173866-e1639110487907.jpg",
//   //     "publishedAt": "2021-12-10T04:55:00Z",
//   //     "content": "The Minnesota Vikings just can???t do anything easy.\r\nAfter jumping out to a 29-0 lead over the Pittsburgh Steelers, it took a Harrison Smith pass breakup of a throw into the end zone to Pat Freiermuth??? [+2875 chars]"
//   //   },
//   //   {
//   //     "source": { "id": null, "name": "TMZ" },
//   //     "author": "TMZ Staff",
//   //     "title": "Ex-NFL Star Demaryius Thomas Dead At 33, 5x Pro Bowler - TMZ",
//   //     "description": "Former NFL star Demaryius Thomas has died at the age of 33.",
//   //     "url": "https://www.tmz.com/2021/12/09/ex-nfl-star-demaryius-thomas-dead-denver-broncos/",
//   //     "urlToImage": "https://imagez.tmz.com/image/8a/16by9/2021/12/10/8a043c766d9b4e48af15adbaf983b9e4_xl.jpg",
//   //     "publishedAt": "2021-12-10T04:41:00Z",
//   //     "content": "Demaryius Thomas, Super Bowl champion and five-time Pro Bowler, has died at the age of 33, police tell TMZ Sports.\r\nThe cause of death is currently unclear ... but police tell us they found Thomas de??? [+1006 chars]"
//   //   },
//   //   {
//   //     "source": { "id": "cnn", "name": "CNN" },
//   //     "author": "Evan Simko-Bednarski and Eric Levenson, CNN",
//   //     "title": "Family of student shot in Oxford High School attack files lawsuit against school district and employees - CNN",
//   //     "description": "The parents of two Oxford High School students are suing school officials, claiming last week's fatal school shootings in Michigan were \"entirely preventable,\" and that the defendants \"created and increased the dangers then-existing at Oxford High School.\"",
//   //     "url": "https://www.cnn.com/2021/12/09/us/oxford-school-shooting-lawsuit/index.html",
//   //     "urlToImage": "https://cdn.cnn.com/cnnnext/dam/assets/211203232108-02-oxford-high-school-memorial-1203-super-tease.jpg",
//   //     "publishedAt": "2021-12-10T04:24:00Z",
//   //     "content": "(CNN)The parents of two Oxford High School students are suing school officials, claiming last week's fatal school shootings in Michigan were \"entirely preventable,\" and that the defendants \"created a??? [+5541 chars]"
//   //   },
//   //   {
//   //     "source": { "id": null, "name": "Deadline" },
//   //     "author": "Alexandra Del Rosario",
//   //     "title": "The Game Awards Winners List: ???It Takes Two??? Scores Game Of The Year; ???Deathloop???, ???Forza Horizon 5??? & ???Kena??? Among Honorees - Deadline",
//   //     "description": "Hazelight Studios and EA???s It Takes Two took home several prizes at The Game Awards 2021, including best family game, best multiplayer game, and game of the year. The annual ceremony returned to a live ceremony at the Microsoft Theater in Los Angeles on Thurs???",
//   //     "url": "https://deadline.com/2021/12/the-game-awards-winners-list-it-takes-two-scores-game-of-the-year-deathloop-kena-1234887555/",
//   //     "urlToImage": "https://deadline.com/wp-content/uploads/2021/12/HXDLVhmdqPzGJMtfysBjti-e1639089976373.png?w=1024",
//   //     "publishedAt": "2021-12-10T04:13:00Z",
//   //     "content": "Hazelight Studios and EA???s It Takes Two took home several prizes at The Game Awards 2021, including best family game, best multiplayer game, and game of the year. The annual ceremony returned to a li??? [+3810 chars]"
//   //   },
//   //   {
//   //     "source": { "id": "cnn", "name": "CNN" },
//   //     "author": "Miguel Marquez and Holly Yan, CNN",
//   //     "title": "Covid-19 patients at this hospital are dying 'at a rate we've never seen die before' -- and it's taking a toll on health care workers - CNN",
//   //     "description": "Nurse Katie Sefton never thought Covid-19 could get this bad -- and certainly not this late in the pandemic.",
//   //     "url": "https://www.cnn.com/2021/12/09/us/hospital-covid-19-deaths-michigan/index.html",
//   //     "urlToImage": "https://cdn.cnn.com/cnnnext/dam/assets/211209211245-michigan-nurse-marquez-vpx-super-tease.jpg",
//   //     "publishedAt": "2021-12-10T04:05:00Z",
//   //     "content": null
//   //   },
//   //   {
//   //     "source": { "id": null, "name": "The Guardian" },
//   //     "author": "Julian Borger, Shah Meer Baloch, Sam Levine",
//   //     "title": "???An urgent matter???: Biden warns democracy is under threat at summit - The Guardian",
//   //     "description": "President opens two-day summit with 80 world leaders as experts warn democratic rights are under assault in the US",
//   //     "url": "https://amp.theguardian.com/us-news/2021/dec/09/joe-biden-summit-for-democracy",
//   //     "urlToImage": "https://i.guim.co.uk/img/media/f4008e6ad65e145ae2442520ce843c20351d755a/0_238_4000_2401/master/4000.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=a448ef874e07fd1fab277c05cf14e638",
//   //     "publishedAt": "2021-12-10T03:59:00Z",
//   //     "content": "Joe Biden has launched his virtual Summit for Democracy with a warning that democratic rights and norms are under threat around the world, including in the US.\r\nFacing video links with 80 world leade??? [+4766 chars]"
//   //   },
//   //   {
//   //     "source": { "id": "nbc-news", "name": "NBC News" },
//   //     "author": "Reuters",
//   //     "title": "State judge rules citizen enforcement of Texas abortion law unconstitutional - NBC News",
//   //     "description": "A judge in Texas ruled on Thursday that a law prohibiting abortions after about six weeks violated the state's constitution because it allows private citizens to sue abortion providers.",
//   //     "url": "https://www.nbcnews.com/politics/politics-news/state-judge-rules-citizen-enforcement-texas-abortion-law-unconstitutional-n1285712",
//   //     "urlToImage": "https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/newscms/2021_49/3524270/211209-texas-patient-ultrasound-ac-1044p.jpg",
//   //     "publishedAt": "2021-12-10T03:53:00Z",
//   //     "content": "A judge in Texas ruled on Thursday that a law prohibiting abortions after about six weeks violated the state's constitution because it allows private citizens to sue abortion providers.\r\nState Distri??? [+1642 chars]"
//   //   },
//   //   {
//   //     "source": { "id": null, "name": "YouTube" },
//   //     "author": null,
//   //     "title": "Starbucks Workers In Buffalo Vote To Unionize - MSNBC",
//   //     "description": "On Thursday, Starbucks workers in Buffalo saw their store become the first company-owned Starbucks to unionize in its 50-year history. ???Those folks just won ...",
//   //     "url": "https://www.youtube.com/watch?v=7rI7_hIJdRY",
//   //     "urlToImage": "https://i.ytimg.com/vi/7rI7_hIJdRY/maxresdefault.jpg",
//   //     "publishedAt": "2021-12-10T03:45:00Z",
//   //     "content": null
//   //   },
//   //   {
//   //     "source": { "id": null, "name": "Deadline" },
//   //     "author": "Tom Tapp",
//   //     "title": "Wave Of Post-Thanksgiving Covid Cases Hits Los Angeles As Experts Worry About December Holidays, Winter Surge - Deadline",
//   //     "description": "Exactly two weeks after the Thanksgiving holiday gatherings of family and friends, Los Angeles County is seeing a resulting increase in Covid-19 cases, according to Public Health Director Barbara Ferrer. She also called the trend a possible start of yet anoth???",
//   //     "url": "https://deadline.com/2021/12/post-thanksgiving-covid-cases-wave-los-angeles-1234888518/",
//   //     "urlToImage": "https://deadline.com/wp-content/uploads/2021/03/AdobeStock_90015597.jpeg?w=1024",
//   //     "publishedAt": "2021-12-10T03:31:00Z",
//   //     "content": "Exactly two weeks after the Thanksgiving holiday gatherings of family and friends, Los Angeles County is seeing a resulting increase in Covid-19 cases, according to Public Health Director Barbara Fer??? [+4820 chars]"
//   //   },
//   //   {
//   //     "source": { "id": "cnn", "name": "CNN" },
//   //     "author": "Story by Reuters",
//   //     "title": "Filipino journalist shot dead in 'cowardly' killing, say Philippine authorities - CNN",
//   //     "description": "A Filipino journalist who formerly worked with Reuters has been killed in a drive-by shooting, authorities said on Thursday, one of more than a dozen journalists killed in the country in the past five years.",
//   //     "url": "https://www.cnn.com/2021/12/09/business/philippines-journalist-killing-intl-hnk/index.html",
//   //     "urlToImage": "https://cdn.cnn.com/cnnnext/dam/assets/211209220247-tease-only-map-calbayog-samar-province-super-tease.jpg",
//   //     "publishedAt": "2021-12-10T03:30:00Z",
//   //     "content": "Manila, PhilippinesA Filipino journalist who formerly worked with Reuters has been killed in a drive-by shooting, authorities said on Thursday, one of more than a dozen journalists killed in the coun??? [+2134 chars]"
//   //   },
//   //   {
//   //     "source": { "id": "engadget", "name": "Engadget" },
//   //     "author": "https://www.engadget.com/about/editors/jessica-conditt",
//   //     "title": "'Among Us' is heading to VR with help from the 'I Expect You To Die' team - Engadget",
//   //     "description": "It's first-person social sleuthing..",
//   //     "url": "https://www.engadget.com/among-us-vr-meta-quest-2-psvr-032156187.html",
//   //     "urlToImage": "https://s.yimg.com/os/creatr-uploaded-images/2021-12/d5405770-5967-11ec-acce-0603cd4ee46b",
//   //     "publishedAt": "2021-12-10T03:24:33Z",
//   //     "content": "It may not be suspicious, but it certainly is a surprise. Among Us is getting the first-person, VR treatment, and the experience is heading to PlayStation VR, Meta Quest 2 and Steam. There's no relea??? [+906 chars]"
//   //   },
//   //   {
//   //     "source": { "id": null, "name": "MMA Fighting" },
//   //     "author": "Damon Martin",
//   //     "title": "Cody Garbrandt, Sean O???Malley have to be separated after heated exchange during UFC 269 presser - MMA Fighting",
//   //     "description": "Cody Garbrandt and Sean O???Malley aren???t fighting each other but they still needed security to get between them after a heated war of words on stage at the UFC 269 press conference.",
//   //     "url": "https://www.mmafighting.com/2021/12/9/22827284/cody-garbrandt-sean-omalley-have-to-be-separated-after-heated-exchange-during-ufc-269-presser",
//   //     "urlToImage": "https://cdn.vox-cdn.com/thumbor/Wp-inm9i4gmiH0-1hEblqqFa3yk=/0x0:4431x2320/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/23077782/1358163726.jpg",
//   //     "publishedAt": "2021-12-10T02:46:33Z",
//   //     "content": "Cody Garbrandt and Sean OMalley arent fighting each other at UFC 269, but you certainly couldnt tell by the way they went after each other at Thursdays pre-fight press conference.\r\nFollowing numerous??? [+3348 chars]"
//   //   }
//   // ];

//   static defaultProps = {
//     pageSize: 9,
//     // country: 'in'
//   }
//   static propType = {
//     // country: PropTypes.string,
//     pageSize: PropTypes.number,
//     category: PropTypes.string
//   }
//   constructor() {
//     super();
//     this.state = {
//       articles: [],
//       page: 1,
//       loading: true,
//       totalResults: 0
//     }
//   }

//   async updateNews() {
//     let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=3cface0623b84e599253463d119cfffb&page=${this.state.page}&pageSize=${this.props.pageSize}&category=${this.props.category}`
//     this.setState({
//       loading: true
//     })
//     let data = await fetch(url);
//     let parsedData = await data.json();
//     this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false });
//     console.log(this.state.page)
//   }

//   async componentDidMount() {
//     this.updateNews()
//   }
//   // handleNextClick = async () => {
//   //   if (!(Math.ceil(this.state.totalResults / this.props.pageSize) < this.state.page + 1)) {
//   //     let url = `https://newsapi.org/v2/top-headlines?apiKey=3cface0623b84e599253463d119cfffb&page=${this.state.page + 1}&pageSize=${this.props.pageSize}&category=${this.props.category}`;
//   //     this.setState({
//   //       loading: true
//   //     })
//   //     let data = await fetch(url);
//   //     let parsedData = await data.json();
//   //     this.setState({
//   //       page: this.state.page + 1,
//   //       articles: parsedData.articles,
//   //       loading: false
//   //     })
//   //     //     console.log(this.state.articles)
//   //     //     console.log(this.state.page)
//   //   }
//   // }
//   // handlePrevClick = async () => {
//   //   if (!(this.state.page <= 1)) {
//   //     let url = `https://newsapi.org/v2/top-headlines?apiKey=3cface0623b84e599253463d119cfffb&page=${this.state.page - 1}&pageSize=${this.props.pageSize}&category=${this.props.category}`;
//   //     this.setState({ loading: true })
//   //     let data = await fetch(url);
//   //     let parsedData = await data.json();
//   //     this.setState({
//   //       page: this.state.page - 1,
//   //       articles: parsedData.articles,
//   //       loading: false
//   //     })
//   //     console.log(this.state.articles)
//   //     console.log(this.state.page)
//   //   }
//   // }
//   fetchData = async () => {
//     this.setState({ page: this.state.page + 1 })
//     let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=3cface0623b84e599253463d119cfffb&page=${this.state.page}&pageSize=${this.props.pageSize}&category=${this.props.category}`
//     let data = await fetch(url);
//     let parsedData = await data.json();
//     this.setState({ articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults, loading: false });

//   }

//   render() {
//     return (
//       <div>
//         <h2 className="text-center">NewsMonkey - Top Headlines</h2>
//         <InfiniteScroll
//           dataLength={this.state.articles.length} //This is important field to render the next data
//           next={this.fetchData}
//           hasMore={this.state.articles.length !== this.state.totalResults}
//           loader={<LoadingSpinner />}>
//           <div>

//             {this.state.loading && <LoadingSpinner />}
//             <div className="row" style={{ justifyContent: "center" }}>
//               {this.state.articles.map((elements) => {
//                 return <div className="col-md-3 my-3 mx-3" key={elements.url}>
//                   <NewsItems title={elements.title ? elements.title.slice(0, 40) : "Description:"} description={elements.description ? elements.description.slice(0, 80) : "No Description found"} imageURL={elements.urlToImage} URL={elements.url} />
//                 </div>
//               })}

//             </div>
//           </div>
//         </InfiniteScroll>
//         {/* <div className="container d-flex justify-content-between">

//           <button disabled={this.state.page <= 1} type="button" className="btn btn-primary" onClick={this.handlePrevClick}>&larr; Previous</button>

//           <button disabled={this.state.page === Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>

//         </div> 
//       </div >

//        */}