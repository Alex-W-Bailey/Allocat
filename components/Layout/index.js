import Head from "next/head";
import Header from "../Header";

const Layout = props => {
  return (
    <div>
      <Head>
        <meta charset='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta http-equiv='X-UA-Compatible' content='ie=edge' />
        <title>Bootstrap test</title>
        <link
          rel='stylesheet'
          href='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'
          integrity='sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T'
          crossorigin='anonymous'
        ></link>
        <link href="https://fonts.googleapis.com/css?family=Quicksand&display=swap" rel="stylesheet"></link>
        <script
          src='https://code.jquery.com/jquery-3.2.1.slim.min.js'
          integrity='sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN'
          crossorigin='anonymous'
        ></script>
        <script
          src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js'
          integrity='sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q'
          crossorigin='anonymous'
        ></script>
      </Head>

      <Header />
      {props.children}
    </div>
  );
};

export default Layout;

// import Header from './Header'

// const layoutStyle = {
// 	margin: 20,
// 	padding: 20,
// 	border: '1px solid #DDD'
// };

// const Layout = props => (
// 	<div style={layoutStyle}>
// 		<Header />
// 		{props.children}
// 	</div>
// );

// export default Layout
