import Link from "next/link";

export default function Privacy() {
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
        <h1>PRIVACY POLICY</h1>
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
        <h1>Privacy Policy</h1>
        <p>
          Last updated: 27 / 07 / 2023
          <br />
          <br />
          My name is Hugo SEQUIER, and I'm the developer and operator of this
          website. I respect your privacy and am committed to protecting it
          through this Privacy Policy.
          <br />
          <br />
          This Privacy Policy governs your access to and use of this website,
          including any content, functionality and services offered on or
          through this website.
          <br /> <br />S GG is not endorsed by Riot Games and does not reflect
          the views or opinions of Riot Games or anyone officially involved in
          producing or managing Riot Games properties. Riot Games and all
          associated properties are trademarks or registered trademarks of Riot
          Games, Inc.
        </p>
        <h2>Information We Collect</h2>
        <p>
          Currently, this website does not collect personal information like
          your name, email address, phone number, or other personal data.
        </p>
        <h2>Cookies</h2>
        <p>At this time, we do not use cookies for tracking purposes.</p>
        <h2>Third-Party Use of Cookies</h2>
        <p>
          We may use third-party Service Providers, such as Google Analytics, to
          monitor and analyze the use of our website. Google Analytics is a web
          analytics service offered by Google that tracks and reports website
          traffic. This data is shared with other Google services and may be
          used to personalize the ads of its own advertising network. You can
          opt-out of having made your activity on the website available to
          Google Analytics by installing the Google Analytics opt-out browser
          add-on. The add-on prevents the Google Analytics JavaScript (ga.js,
          analytics.js, and dc.js) from sharing information with Google
          Analytics about visits activity.
          <br /> <br />
          For more information on the privacy practices of Google, please visit
          the Google Privacy & Terms web page:{" "}
          <a href="http://www.google.com/intl/en/policies/privacy/">
            http://www.google.com/intl/en/policies/privacy/
          </a>
        </p>
        <h2>Changes to This Privacy Policy</h2>
        <p>
          This Privacy Policy is effective as of 27 / 07 / 2023 and will remain
          in effect except with respect to any changes in its provisions in the
          future, which will be in effect immediately after being posted on this
          page.
          <br /> <br />
          We reserve the right to update or change our Privacy Policy at any
          time. You will be notified of any changes through a prominent notice
          provided on our website, prior to the change becoming effective. Your
          continued use of the website after the posting of any changes to the
          Privacy Policy on this page will constitute your acknowledgment of the
          modifications and your consent to abide and be bound by the modified
          Privacy Policy.
        </p>
        <h2>Contact Information</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy,
          please contact me at{" "}
          <a href="mailto:sequierh@gmail.com">sequierh@gmail.com</a>, or connect
          with me on Discord at <strong>_hugo_12</strong>.
        </p>
      </div>
    </div>
  );
}
