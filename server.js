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

nextApp.prepare()
	.then( () => {
		app.get( '*', ( req, res ) => {
			return handle( req, res);
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
		.catch(console.error);

	} );