// This file is some test code for determining if eslint-plugin-react-hooks is working properly
// See Ch.10 of "Learning React" by Alex Banks

const gnar = "gnarly";

const info = ({         // If eslint-react is working, info will be squiggly-underlined
  file = __filename,    // __filename will be squiggly-underlined
  dir = __dirname       // __dirname squiggly-underlined
}) => (
  <p>                   {/* Also <p> squiggly-underlined */}
    {dir}: {file}
  </p>
);

switch (gnar) {
  default:
    console.log("gnarly");
    break;
}