export default () => (
  <div className="flex items-center">
    <img className="mr-4 rounded-full" src="/images/profile-pic.jpg" />
    <p>
      Personal blog of{' '}
      <a
        className="text-blue-600 border-b border-blue-600 cursor-pointer hover:border-transparent"
        target="_blank"
        href="https://twitter.com/thmsmlr">
        Thomas Millar
      </a>
      .
      <br />
      The place where my ideas go to die.
    </p>
  </div>
);
