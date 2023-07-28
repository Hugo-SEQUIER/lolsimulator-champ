import Link from "next/link";

export default function About() {
  return (
    <div>
      <div className="character-banniere">
        <Link href={`/`}>
          <img src="../../images/logo.PNG" alt="logo LoL Simulator" />
        </Link>
        <p
          style={{
            width: "1px",
            height: "100px",
            backgroundColor: "#f9f8f8",
            borderRadius: "20px",
          }}
        ></p>
        <h1>ABOUT</h1>
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
        <p>
          My name is <strong>Hugo SEQUIER</strong>, a 21-year-old French student
          based in Paris. I am currently studying Data Science and Artificial
          Intelligence in the framework of an engineering apprenticeship
          program. I've been playing League of Legends since 2014, and my
          passion for the game has stayed strong ever since.
          <br />
          <br />
          Over the past 2-3 years, I have delved into software development, and
          for the past year, I've also immersed myself in Data Science. It's a
          journey of constant learning, exploration, and immense satisfaction.
          <br />
          <br />
          The project you see now, this website, is a testament to my journey
          and passion. It is a fusion of my interests - gaming, data science,
          and software development. Building this website using Next.js has been
          an enriching experience. I've spent over a month on it, working during
          my free time, solving problems, writing code, and finally bringing it
          to life. The process was challenging, yet incredibly rewarding, and I
          am proud of the result.
          <br />
          <br />
          The data used in this project is primarily sourced from the{" "}
          <a href="https://leagueoflegends.fandom.com/wiki">Wiki page</a>, a
          comprehensive resource for all things related to League of Legends.
          However, this project wouldn't have been possible without the
          monumental work done by <strong>Crixaliz</strong>, who created a
          Google Sheet with a plethora of reusable data related to the game's
          characters. I am deeply grateful for their contribution and want to
          express my sincere thanks and utmost respect. This website would not
          have seen the light of day without their effort.
          <br />
          <br />
          If you wish to contact me, feel free to reach out through email at{" "}
          <a href="mailto:sequierh@gmail.com">sequierh@gmail.com</a>, or connect
          with me on Discord at <strong>_hugo_12</strong>.
          <br />
          <br />
          Thank you for visiting my site, and I hope you find it useful and
          enjoyable.
        </p>
      </div>
    </div>
  );
}
