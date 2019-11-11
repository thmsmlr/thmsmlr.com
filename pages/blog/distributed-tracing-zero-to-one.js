import BlogPostLayout from '../../layouts/blog-post';

const Page = () => (
  <BlogPostLayout post={Page}>
    <p>
      So you’ve probably heard of distributed tracing by this point. It quickly went from it being a
      niche, new thing, to the thing everyone is talking about. And it’s no wonder, distributed
      tracing promises you the best of both worlds, context-aware debugging and micro services. You
      can ship your org chart and monitor it too.
    </p>
    <p>
      The issue is that for most organizations it requires a monumental effort to get your systems
      instrumented. Distributed tracing is only useful when you have close to full coverage of your
      system. Otherwise, while you are debugging an issue you’ll hit a wall. The traces will have
      huge gaps. There will be black boxes representing all the work done by other services. No
      visibility.
    </p>
    <img src="/traces.png" />
    <p>
      So how do you go from no tracing to a fully traced system? You have an interesting cold start
      problem on your hands. You could make it a company-wide initiative. You could get all your
      engineers in a room, evangelize the merits of the technology. You could explain to them that
      it’s a good idea, and that it’s an investment in their future. You could explain that even
      though they won’t see any benefits until everyone has done their part, it’s a worthwhile
      endeavor. You could ask them to trust you.
    </p>
    <p>
      But hey, let’s be real. That’s not likely to work. You work at a massive company, it’s hard to
      mobilize all the troops. You know how many meetings that would entail? You know how many
      roadmaps that’ll disturb?
    </p>
    <p>
      <em>Ah, but Thomas, you see I work at a startup!</em> Cool. Still probably isn’t going to
      work. You have to build features, remember? Grow or die.
    </p>
    <p>
      The issue with this approach is that you need to motivate your engineers to care about
      tracing, but until they all do, none of them will receive the benefits.
    </p>
    <p>
      Instead, you should figure out a way to give it to them for free. If every engineering gets
      tracing automatically, they don’t have to learn about tracing. If their service automatically
      propagates the trace identifier, upstream and downstream services will be able to see how
      traffic flows in and out of their service. The author of the service doesn’t even have to
      know! When the time comes that someone needs to look at some traces, they can see the benefit
      of the system because it already has 100% coverage. It’s at this point that the value of
      distributed tracing starts to set in. This is when your engineers can start exploring the
      production traces. They will see their traces connected end to end. They will see the skeleton
      of what could be. They’ll want more details. They’ll want finer granularity. That’s when your
      engineers will become motivated to add intra-service details to the traces. Suddenly your
      engineers will add their own tags and spans to the traces. You’ll start seeing value from day
      one, then without lifting a finger, the full value of distributing tracing will come.
    </p>
    <p>
      This is exactly what we did at <a href="https://twitter.com/stitchfix_algo">Stitch Fix</a>.
    </p>
    <p>
      We introduced an internal opinionated web framework in our most used language, Python. This
      framework wrapped an open-source web framework (think{' '}
      <a href="http://flask.pocoo.org">Flask</a>). When a request handler was registered with the
      framework, we’d wrap the handler to pull off any of the opentracing headers and stick it in a
      request-local storage. We’d then create a new span with whatever details we could glean from
      the incoming request –&nbsp;ip address, HTTP method, request size, etc. Then we’d call the
      provided request handler.
    </p>
    <p>
      We also wrapped our HTTP request library (think{' '}
      <a href="http://docs.python-requests.org/en/master/">Requests</a>). Whenever an HTTP request
      was made, we’d pull out the opentracing information from the aforementioned request-local
      storage, then attach it to the headers of the outbound HTTP request.
    </p>
    <p>
      Without uttering the words “distributed tracing”, every new service built would have it out of
      the box. When old services were deployed with new features, the build process would pick up
      the latest version of the framework. Within a month we had full coverage.
    </p>
    <p>
      It was then we could send out an email explaining the benefits of distributed tracing. At the
      bottom of the email, a link to <a href="https://lightstep.com">LightStep</a>.
    </p>
    <p>
      <em>Here are your traces, go explore!</em>
    </p>
  </BlogPostLayout>
);

Page.title = 'Distributed Tracing, from zero to one';
Page.date = '2019-04-26';
Page.description = "You don't a company wide strategic initiative.";
Page.link = '/blog/distributed-tracing-zero-to-one';
Page.readTimeInMinutes = 3;
Page.imageUrl = '/traces.png';

export default Page;
