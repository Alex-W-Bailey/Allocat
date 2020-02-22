const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const next = require('next');

const db = require("./models");
const passport = require("passport");
const corsOptions = require("./config/cors");
const isAuthenticated = require("./config/middleware/isAuthenticated");

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const app = express();

// Define middleware here
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(session({ secret: "TBD", resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsOptions));

require("./routes/apiRoutes")(app);

nextApp.prepare()
	.then( () => {
		app.get( '/', ( req, res ) => {
			return handle( req, res);
		});

		app.get( '/login', ( req, res ) => {
			return handle( req, res);
		});

		app.get( '/register', ( req, res ) => {
			return handle( req, res);
		});

		app.get( '/projects', isAuthenticated, ( req, res ) => {
			return handle(req, res);
		});

		app.get( '/newProject', (req, res) => {
			return handle(req, res);
		});

		app.get( '/project/[id]', isAuthenticated, (req, res) => {
			return handle(req, res);
		})

		app.get( '*', ( req, res ) => {
			return handle( req, res);
		});
		const FORCE_SCHEMA = process.env.NODE_ENV === 'test';

		db.sequelize
		.authenticate()
		.then(() => {
		  db.sequelize.sync({ force: false }).then(() => {			
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

