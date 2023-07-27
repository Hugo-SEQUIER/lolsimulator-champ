import Link from "next/link";

export default function Release() {
  return (
    <div>
      <div className="character-banniere">
        <Link href={`/`}>
          <img src="../../images/logo.PNG" alt="logo S.GG" />
        </Link>
        <p
          style={{
            width: "1px",
            height: "100px",
            backgroundColor: "#f9f8f8",
            borderRadius: "20px",
          }}
        ></p>
        <h1>RELEASE</h1>
        <p
          style={{
            width: "1px",
            height: "100px",
            backgroundColor: "#f9f8f8",
            borderRadius: "20px",
          }}
        ></p>
      </div>
      <div className="about">
        <div>
          <h1>Release Notes: Version 1.0.0</h1>
          <p>
            We are excited to announce the first release of our League of
            Legends build simulator!
          </p>
          <h2>Features:</h2>
          <p>
            <li>
              Introducing 164 unique champions, each with their own attributes
              and abilities.
            </li>
            <li>
              Test and simulate different builds for each champion. Experiment
              with various combinations of items and runes to find the optimal
              setup.
            </li>
          </p>
          <h2>Known Issues and Future Developments:</h2>
          <p>
            <li>
              The current version does not yet simulate the amount of healing
              and shielding generated by items and abilities. This functionality
              will be added in a future release.
            </li>
            <li>
              Certain champions have stats that increase with stacks. For these
              champions, the number of stacks can be manipulated by adjusting
              the number of minions killed or the number of kills achieved. If
              the value of the stacks is not explicitly stated, it cannot be
              adjusted in this version.
            </li>
          </p>
          <h2>Feedback and Support:</h2>
          <p>
            Your feedback is valuable to us! If you encounter any issues or have
            suggestions for improvements, please don't hesitate to contact us at
            <a href="mailto:sequierh@gmail.com">sequierh@gmail.com</a> or on
            Discord at <strong>_hugo_12</strong>. <br /> <br /> Thank you for
            using our simulator, and we hope you enjoy the strategic depth it
            brings to your League of Legends gameplay!
          </p>
        </div>
      </div>
    </div>
  );
}
