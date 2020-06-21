import BlogPostLayout from '../../layouts/blog-post';

const Page = () => (
  <BlogPostLayout post={Page}>
    <p>
      This story starts back in College. I was a student at the University of Waterloo. I hated my
      statistics class and I was looking for an excuse to do anything other than learn the central
      limit theorem.
    </p>
    <p>
      One night I was cooking dinner with my roommates and he mentioned that his little brother was
      tumblr famous. This was crazy to me. I had never met anyone remotely internet famous. We
      pulled up his tumblr blog, and scrolled a bit. Some great memes. Then there it was,{' '}
      <a href="https://billclintonswag.com">Bill Clinton Swag</a>.
    </p>
    <img src="/images/billclintonswag-original.png" />
    <p>
      It was perfect. I had my excuse to ditch statistics. The photo was simple enough that I could
      probably code up some kind of photoshop style script and let users create their own image. I
      had been meaning to learn Ruby on Rails anyways.
    </p>
    <p>
      I spent two days going through some tutorials, scraped together some code from stackoverflow,
      learned the math behind{' '}
      <a href="https://en.wikipedia.org/wiki/3D_projection#Perspective_projection">
        perspective transforms
      </a>
      , bought the domain and we were live.
    </p>
    <img src="/images/billclintonswag-site-original.png" />
    <p>
      I posted the site on reddit, pulled open the realtime Google Analytics dashboard and waited. A
      few people clicked on the link and made it to the site. Though people were bouncing off the
      home page very quickly. I live coded some tweaks, added some labels, and tried to steer people
      towards the search bar. Finally when I added the explicit steps, people started to make their
      way through to flow and generated their own "swags".
    </p>
    <p>
      I sat around for a few hours, watched the traffic. It wasn't anything too spectacular - a
      thousand page views or so. It was 2011, and I was 18 years old and this was the first thing I
      had put on the internet. I was thrilled! I logged off, went to bed.
    </p>
    <p>A few days passed. I periodically checked the analytics. Back to that statistics class.</p>
    <p>
      It was a few years before I thought about Bill Clinton Swag again. I was doing an internship
      in New York, and my sisters were down to visit. We were grabbing a slice and my sister asked
      me about it. I had forgotten about the site, but was still paying for the hosting. I pulled up
      the analytics.
    </p>
    <img src="/images/bcs-analytics-2013.png" />
    <p>Apparently I had gone viral in Brazil at some point along the way.</p>
    <h3>Fast forward a few years</h3>
    <p>
      It's late 2019, I have a job. I'm sitting around looking for a side project to work on. I'm
      still paying for Bill Clinton Swag. Occasionally people tweet me that it's broken. I'll log
      onto the server, tweak some things, restart the app server, whatever needs to be done. I'm
      coming up dry on new ideas, so I figure I'll give Bill Clinton Swag some love.
    </p>
    <p>
      I throw out the code and start fresh. The site will still be as simple as the original, but
      it'll be mobile friendly. Also I'll use the latest CSS 3dmatrix transform trickery to give you
      the ability to preview the final swag before it's rendered. Few weeks later, an hour here and
      there, and I have it done. The site is back online.
    </p>
    <img src="/images/billclintonswag-site-mobile.png" />
    <p>
      I go through Twitter and reply to those year old tweets saying the site is back online. I
      don't bother posting it to Reddit. I didn't really build it to get more attention, I just
      wanted it back up and running. For the people that continued to stumble upon it, they can
      enjoy.
    </p>
    <p>This time around however, I remember to check the analytics more frequently.</p>
    <p>
      It was April. The middle of the pandemic. It started happening again. This time, however, it
      wasn't Brazil. It was Poland.
    </p>
    <img src="/images/bcs-analytics-poland.png" />
    <p>
      This was way more traffic than last time! In one week I had surpassed the total traffic the
      site had seen since it was first created in 2011.
    </p>
    <p>
      That's when the tweets started rolling in. I had linked my Twitter handle at the bottom of the
      page and people started tweeting me with bugs. Apparently I had hit my API rate limit on the
      Last.FM API I was using to search for the album artwork.
    </p>
    <p>
      I was scrambling to think up a way to fix the problem. I was clearly way above my rate limits
      on the API. The best thing I could think of on the spot was to create 4 more developer
      accounts with Last.FM, randomize which key I used on page load, and hope the traffic levels
      out. Totally not a chill thing to do, but it was the best I could think of. I wanted to ride
      the wave.
    </p>
    <p>That's when someone in the UK decided to make it an Instagram challenge.</p>
    <p>
      Within a span of 48 hours. The site went from 600 concurrent users to 50k concurrent users.
      There aren't enough fake email addresses in the world that would give me the number of
      developer keys that I needed to support that kind of traffic.
    </p>
    <img src="/images/bcs-analytics-max.png" />
    <p>
      I had to come up with a better idea to get around the rate limiting. That's when I realized
      Last.FM had a search page on their website. You can visit,
    </p>
    <p>
      <a href="https://www.last.fm/search/albums?q=kanye">
        https://www.last.fm/search/albums?q=kanye
      </a>
    </p>
    <p>
      You will see a webpage with the search results. Well... I figured they are probably not going
      to rate limit their own site right? Besides, the search API was running in a lambda function
      deployed into every AWS region using <a href="https://vercel.com">Vercel</a>. That would
      probably be pretty difficult to IP block.
    </p>
    <p>
      So I changed the code in the lambda to download the HTML of that web page, parse it, then
      return the results as JSON. It wasn't fast, but it worked. Users were happy.
    </p>
    <h3>Vercel came calling</h3>
    <p>
      It was around now that my hosting company <a href="https://vercel.com">Vercel</a> sent me an
      email. At the time I was still on a free hobby plan and I was generating more traffic than
      some of their biggest customers. They were happy for my success, but given I wasn't paying for
      any of the bandwidth, they asked if I could drop their logo on the site. Totally reasonable,
      happy to oblige. I just wanted to ride the wave.
    </p>
    <p>
      Then, more disaster. I started hitting a different kind of API rate limit. It wasn't the
      Last.FM rate limit. I had already solved that. Instead I was hitting an internal AWS Lambda
      rate limit for the maximum concurrency a lambda can run. I hit the rate limit of the AWS
      product that is known for it's infinite scaling!
    </p>
    <p>
      This is when the folks at <a href="https://vercel.com">Vercel</a> jumped in to save the day.{' '}
      <a href="https://twitter.com/timer150">Joe Haddad</a> walked me through how to better use
      their built-in CDN to try to get more cache hits on the lambda function instead of invoking it
      for every search query. The theory was that most people are searching for top-40 music so
      there will probably be a decent cache hit rate limiting the number of times the lambda was
      invoked. It worked beautifully.
    </p>
    <img src="/images/bcs-lambda-errors-fixed.png" />
    <h3>Last.FM came calling</h3>
    <p>
      Things were kind of working. There were some API errors here and there, people were
      complaining that they couldn't find the album they wanted. Nothing too bad. That's when I
      opened Twitter and saw this.
    </p>
    <img src="/images/bcs-lastfm-tweet.png" />
    <p>
      This is when my stomach dropped. <a href="https://twitter.com/benxo">Ben</a> is a lead
      developer at Last.FM and I had spent the last few days trying to circumvent their fair use
      limits. I thought to myself "Party's over, time to shut this thing down".
    </p>
    <p>
      Luckily, when I DM'd him, he was actually super supportive. He congratulated my on the
      success, but mentioned that if it went on for too much longer he was going to have to pull
      access from remote embedding of their album artwork images.
    </p>
    <p>
      Apparently I was generating 5 times the amount of traffic to their CDN than their own users!
    </p>
    <p>
      I looked through the code, realized the were using Fastly for their image CDN. I read through
      the fastly docs, and found out a way to reduce the image size that I was downloading a bunch.
      I pushed a new version of the site and Ben was happy.
    </p>
    <img src="/images/bcs-lastfm-cdn-traffic.png" />
    <p>
      A week glued to Twitter and Google Analytics, fixing bugs, I was ready to take a break. It was
      time to put away VIM and just scroll through Instagram and see what people were saying.
    </p>
    <h3>Memorable Posts</h3>
    <p>
      The sad part of trying to keep this thing up and running for the entire week, I wasn't really
      able to enjoy the moment. I got some time and started scrolling through some of the posts and
      found that people were starting to recreate the image with their own record collections.
    </p>
    <img src="/images/bcs-image-recreation.png" style={{ maxWidth: '400px' }} />
    <p>Even LL Cool J made a Bill Clinton Swag.</p>
    <img src="/images/bcs-ll-cool-j.jpeg" style={{ maxWidth: '400px' }} />
    <p>
      I guess I really knew that the website made it when bloggers started writing{' '}
      <a href="https://mashable.com/article/bill-clinton-swag-meme/">opinion pieces</a> about how
      the meme was "problematic". Nice take Anna.
    </p>
    <p>
      It also got written up in{' '}
      <a href="https://www.oprahmag.com/entertainment/a32268298/bill-clinton-album-meme-explained/">
        Oprah Magazine
      </a>
      . That was kinda cool.
    </p>
    <p>
      I got interviewed by{' '}
      <a href="https://crackmagazine.net/article/long-reads/interview-bill-clinton-swag-meme/">
        Crack Magazine
      </a>
      .
    </p>
    <h3>Conclusion</h3>
    <p>
      Well it was a fun 15 minute. I really want to thank the folks at{' '}
      <a href="https://vercel.com">Vercel</a> and <a href="https://last.fm">Last.FM</a> for
      bankrolling the meme. You didn't ask to, but it was very generous that you didn't shut me
      down. I appreciate that.
    </p>
    <p>
      If you're an engineer and want the tldr to make something scale. Put it on Vercel, make the
      website static, cache as many API endpoints as possible. Watch your metrics, there's always
      another optimization.
    </p>
    <p>
      If you want to learn more, hit me up on <a href="https://twitter.com/thmsmlr">Twitter</a> with
      questions and I can go into any of the details.
    </p>
  </BlogPostLayout>
);

Page.title = 'Well that was unexpected';
Page.date = new Date('2020-06-04');
Page.description =
  'When the internet hugs you, it can be hard to breath. The story of how Bill Clinton Swag went from nothing to a viral sensation. How I kept things up and running';
Page.link = '/blog/well-that-was-unexpected';
Page.readTimeInMinutes = 7;
Page.imageUrl = 'https://thmsmlr.com/images/bcs-thumbnail.png';

export default Page;
