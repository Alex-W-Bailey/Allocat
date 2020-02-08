const path = require('path');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const next = require( 'next' );

const db = require("./models");
const passport = require("./config/passport");
const corsOptions = require("./config/cors");

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next( { dev } );
const handle = nextApp.getRequestHandler();
const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(session({ secret: 'TBD', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsOptions));

require("./routes/apiRoutes")(app);

/**
 * app (next js ) will prepare our server with express, and then,
 * wrap express application inside next
 *
 */
nextApp.prepare()
	.then( () => {
		/**
		 * This will override the default '/about' next js route and when user goes to '/about'
		 * it will serve index.js because route '/' which we are rendering in app.render() belongs to index.js
		 */
		// app.get( '*', ( req, res ) => {
		// 	console.log("THIS ROUTE WAS HIT");
		// 	return app.render( req, res);
		// } );

		/**
		 * Wrapping express app inside next will allow us to create routes by using
		 * express js function inside of the next js build
		 *
		 * '*' means all routes which are not explicit , use this route for them.
		 */
		app.get( '*', ( req, res ) => {
			return handle( req, res );
		} );

		const FORCE_SCHEMA = process.env.NODE_ENV === 'test';

		db.sequelize
		.authenticate()
		.then(() => {
		  db.sequelize.sync({ force: FORCE_SCHEMA }).then(() => {			
			app.listen( PORT, ( err ) => {
				if ( err ) {
					throw err;
				}
				console.warn( `Ready on http://localhost:${PORT}` );
			} );
		  });
		})
		.catch(console.error); // eslint-disable-line no-console

	} );