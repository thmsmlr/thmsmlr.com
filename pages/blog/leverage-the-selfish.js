import BlogPostLayout from '../../layouts/blog-post';

const Page = () => (
  <BlogPostLayout post={Page}>
    <p>If there’s one thing you can take to the bank it’s that I’m selfish.</p>
    <p>
      Most engineers would tell you the same. It’s nothing to be ashamed of. I will spend 5 hours to
      save 5 minutes of every day for the next year. So{' '}
      <a href="https://xkcd.com/1205/">should you</a>.
    </p>
    <p>I believe it’s what, in part, makes good engineers great engineers.</p>
    <p>
      If that’s the case, you’d be wise to leverage it. But how do you do that? It’s different in
      every situation, but the key is to build systems that <strong>align incentives</strong>.
    </p>
    <p>
      Consider a team that builds tools. If they use the tool to build the tool and you’re customers
      are almost guaranteed that it’ll get better. Why? Because I’m selfish. I don’t want to come
      into work and use crappy tools. Neither do you. Our incentives are aligned.
    </p>
    <p>
      It’s not always obvious how to do this. I still struggle to find these opportunities. It helps
      to continually ask,
    </p>
    <blockquote>
      <p>Does my team feel the same pain as our customers?</p>
    </blockquote>
    <p>People will go to extreme lengths to avoid pain.</p>
    <p>People are selfish.</p>
    <p>Leverage that.</p>
  </BlogPostLayout>
);

Page.title = 'Leverage the Selfish';
Page.date = new Date('2019-11-10');
Page.description =
  "If there's one thing you can take to the bank it's that people are selfish. Leverage that to build great software.";
Page.link = '/blog/leverage-the-selfish';
Page.readTimeInMinutes = 1;
Page.imageUrl = 'https://www.finerminds.com/wp-content/uploads/2019/07/shutterstock_1058897192.jpg';

export default Page;
