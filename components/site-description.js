export default () => (
  <div className="root">
    <img src="/images/profile-pic.jpg" />
    <p>
      Personal blog of{' '}
      <a target="_blank" href="https://twitter.com/thmsmlr">
        Thomas Millar
      </a>
      .
      <br />
      Thoughts on building algorithmically powered products.
    </p>
    <style jsx>{`
      img {
        border-radius: 50%;
        margin-right: 15px;
      }
      p {
        margin: 0;
      }
      .root {
        display: flex;
        align-items: center;
      }
    `}</style>
  </div>
);
