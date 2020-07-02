/*
 * This is a tutorial on how to calculate the 4 point perspective transform
 * by mapping 4 points from a source image to 4 points to on a destination image
 *
 */

import Head from 'next/head';
import PerspectiveTransform from 'lib/perspective-transform';

export default function Page() {
  return (
    <>
      <Head>
        <title>Perspective Transform CSS3D Matrix</title>
      </Head>

      <div className="max-w-screen-lg mx-auto">
        <h1>4 Corner Perspective Transform</h1>
        <p>
          While building
          <a href="https://billclintonswag.com">https://billclintonswag.com</a> I found the need to
          compute CSS3D transform matrix that would map artwork into some three dimensional
          projection. This was proving very difficult to do and there weren't a lot of good
          resources out there to make this caluclation easy. CSS lets you easily provide the
          rotation, translation, scale and skew of an affine transformation. But if you don't know
          what those are upfront things are pretty difficult. What I needed was a way to calculate
          given the 4 corner points of the source image and the 4 corner points of the resultant
          transformation, what is the affine transformation matrix.
        </p>
        <p>
          There were a few Javascript and Python libraries online, but I wanted to understand the
          math going on behind the scenes. Furthermore, I didn't want to have to pull down an entire
          set of dependencies just so that I can compute this 3d matrix as a one off.
        </p>
        <p>
          Here is my attempt to explain what's going on for the curious mind and provide a simple
          calculator to allow you to compute your own perspective matrix for using CSS or other
          applications.
        </p>
        <div>
          <PerspectiveTransformAnimation />
        </div>
      </div>
    </>
  );
}

// const ALBUM_SIZE = [512.0, 512.0];
const ALBUM_SIZE = [465.0, 683.0];
// const ALBUM_SIZE = [465.0, 683.0].map(x => x / 3.0);
// const VIEWBOX_RATIO = 465.0 / 465.0;
const VIEWBOX_RATIO = 1.0;
const DEST_COORDS = [107, 238, 262, 288, 67, 384, 212, 436].map((x, idx) => {
  return VIEWBOX_RATIO * x;
});

function PerspectiveTransformAnimation() {
  const transform = PerspectiveTransform(
    [0, 0, ALBUM_SIZE[0], 0, 0, ALBUM_SIZE[1], ALBUM_SIZE[0], ALBUM_SIZE[1]],
    // DEST_COORDS
    DEST_COORDS.map((x, idx) => {
      if (idx % 2 == 0) {
        return x - 107;
      } else {
        return x - 238;
      }
    })
  );
  const m = transform.coeffs;

  // prettier-ignore
  const cssTransformMatrix = [
    m[0], m[3], 0, m[6],
    m[1], m[4], 0, m[7],
    0,    0,    1,    0,
    m[2], m[5], 0, m[8]
  ].join(', ');

  return (
    <>
      <div style={{ maxWidth: '465px' }}>
        <div
          className="relative overflow-hidden bg-blue-100"
          style={{
            height: '0',
            paddingTop: '146.88%'
          }}>
          <img className="absolute inset-0" src="/images/bill-clinton-swag.png" />
          <img
            className="absolute inset-0"
            src="/images/demo-album.png"
            style={{
              width: `${ALBUM_SIZE[0]}px`,
              height: `${ALBUM_SIZE[1]}px`,
              // height: 'auto',
              top: '34.84626647%',
              left: '23.01075269%',
              transformOrigin: '0 0',
              // transformOrigin: '50% 50%',
              // transform: `translateX(23.01075269%) translateY(34.84626647%) matrix3d(${cssTransformMatrix})`
              transform: `matrix3d(${cssTransformMatrix})`
            }}
          />
        </div>
      </div>
    </>
  );
}
